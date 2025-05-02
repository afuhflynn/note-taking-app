// import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/utils/Emails/send.emails";
import { generateToken } from "@/utils/generate-token";
import { generateVerificationCode } from "@/utils/generateCode";
import { logger } from "@/utils/logger";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  try {
    // Throw new error if request body validation fails
    if (!password || !email) {
      return NextResponse.json(
        {
          error: `Both email and passwords are required`,
        },
        { status: 400 }
      );
    }

    // Check if user already exists in db
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
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
    const pwdHash = await hash(password, 10);

    // Throw new error if pwdHash fails for some reason
    if (!pwdHash)
      return NextResponse.json(
        {
          error: "An unexpected error occurred. Please try again.",
        },
        { status: 500 }
      );
    // send verification email
    const code = generateVerificationCode();
    const token = generateToken();
    sendVerificationEmail(code, email, "User", token, {
      "X-Category": "Verification Email",
    });

    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwdHash,
        emailVerificationCode: code,
        emailVerificationToken: token,
        emailVerificationCodeExpiresAt: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ), // 24 hours
        emailVerificationTokenExpiresAt: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ),
        emailVerified: null, // Make sure that the user account is set as not yet verified
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
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(
      `Error signing up, user with email: ${email} ${error.message}`
    );
    return NextResponse.json(
      {
        error: `Error signing up. Please try again later`,
      },
      {
        status: 500,
      }
    );
  }
};
