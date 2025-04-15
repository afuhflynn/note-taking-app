import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { signInSchema } from "@/zod/zod.schema";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
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
  callbacks: {
    async signIn({ profile }) {
      // Check if user does not exist in db if using github
      // A profile was passed on, then github or google was used
      if (profile) {
        const email = profile.email;
        const userExists = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        });

        // Update user email verification date and updated at status if they exist
        if (userExists) {
          userExists.emailVerified = new Date(Date.now());
          userExists.updatedAt = new Date(Date.now());

          const updatedUser = await prisma.user.update({
            where: {
              email: email as string,
            },
            data: userExists,
          });

          return {
            ...updatedUser,
            password: undefined, /// Hide user password on return
          };
        }

        const newUser: User = {
          image: profile.avatar_url as string,
          bio: profile.bio as string,
          name: profile.name as string,
          username: profile.preferred_username as string,
          email: email as string,
          emailVerified: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          createdAt: new Date(Date.now()),
        };

        // Create new user db record
        const user = await prisma.user.create({
          data: newUser,
        });

        await prisma.account.create({
          data: {
            userId: user.id,
            type: "github",
            provider: "github",
            providerAccountId: profile.id as string,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });

        return {
          ...user,
          password: undefined, /// Hide user password on return
        };
      }
    },
  },
});
