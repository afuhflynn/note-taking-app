// import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { signUpSchema } from "@/zod/zod.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

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
      return NextResponse.json(
        {
          error: `${validatedCredentials.error.message}`,
        },
        { status: 400 }
      );
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

    const user = await prisma.user.create({
      data: {
        email: validatedCredentials.data.email,
        password: pwdHash,
      },
    });

    if (!user)
      return NextResponse.json(
        {
          error: "An unexpected error occurred. Please try again.",
        },
        { status: 500 }
      );

    return NextResponse.json(
      {
        message: "Account created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error: Error | any) {
    logger.error(
      `Error signing up, user with email: ${email} ${error.message}`
    );
    return NextResponse.json(
      {
        error: `Error signing up: ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
};
