import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
// import { User } from "@prisma/client";
import { signInSchema } from "@/zod/zod.schema";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
// import { v4 as uuid } from "uuid";

import { CustomPrismaAdapter } from "@/lib/custom-prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          username: profile.preferred_username,
          email: profile.email,
          image: profile.avatar_url,
          bio: profile.bio,
          updatedAt: new Date(Date.now()),
          emailVerified: new Date(Date.now()),
        };
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = await signInSchema.safeParseAsync(
          credentials
        );

        // Throw new error if request body validation fails
        if (validatedCredentials.error) {
          throw new Error(`${validatedCredentials.error.message}`);
        }
        const foundUser = await prisma.user.findUnique({
          where: {
            email: validatedCredentials.data.email,
          },
        });

        // Check if user data was found in the db
        if (!foundUser) {
          throw new Error("Invalid email or password");
        }

        // Compare user password with hash in db
        const match = await compare(
          validatedCredentials.data.password,
          foundUser?.password as string
        );

        if (!match) {
          throw new Error("Invalid email or password");
        }

        // Update user email verified field
        foundUser.emailVerified = new Date(Date.now());
        foundUser.updatedAt = new Date(Date.now());

        await prisma.user.update({
          where: {
            email: foundUser.email as string,
          },
          data: foundUser,
        });

        // return foundUser object with their profile data
        return { ...foundUser, password: undefined }; // Hide user password
      },
    }),
  ],
});
