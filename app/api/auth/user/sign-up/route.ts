// import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/zod/zod.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  // Validate request body
  const validatedCredentials = await signUpSchema.safeParseAsync({
    email,
    password,
  });
  try {
    // Throw new error if request body validation fails
    if (validatedCredentials.error) {
      throw new Error(`${validatedCredentials.error.message}`);
    }

    // Check if user already exists in db
    const userExists = await prisma.user.findUnique({
      where: {
        email: validatedCredentials.data.email,
      },
    });

    // Return 409 if user account already exists
    if (userExists)
      return NextResponse.json(
        {
          error: `User with email ${email} already exists.`,
        },
        { status: 409 }
      );

    // Hash new user password
    const pwdHash = await hash(validatedCredentials.data.password, 10);

    // Throw new error if pwdHash fails for some reason
    if (!pwdHash)
      return NextResponse.json(
        {
          error: "An unexpected error occurred. Please try again.",
        },
        { status: 500 }
      );
    // Create new db record
    const newUser: User = {
      email: validatedCredentials.data.email,
      password: pwdHash,
      updatedAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
    };

    const user = await prisma.user.create({
      data: newUser,
    });
  } catch (error: Error | any) {
    throw new Error(`Error signing up: ${error.message}`);
  }
};
