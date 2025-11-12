// import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/utils/Emails/send.emails";
import { generateToken } from "@/utils/generate-token";
import { generateVerificationCode } from "@/utils/generateCode";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  try {
    // Throw new error if request body validation fails
    if (!email) {
      return NextResponse.json(
        {
          error: `No email available. Please provide a valid email address.`,
        },
        { status: 400 }
      );
    }

    // Check if user exists in db
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Return 400 if user is not found
    if (!user)
      return NextResponse.json(
        {
          error: `User with email ${email} does not exist.`,
        },
        { status: 409 }
      );

    // send verification email
    const code = generateVerificationCode();
    const token = generateToken();
    sendVerificationEmail(code, email, "User", token, {
      "X-Category": "Verification Email",
    });

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        email: email,
        emailVerificationCode: code,
        emailVerificationToken: token,
        emailVerificationCodeExpiresAt: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ), // 24 hours
        emailVerificationTokenExpiresAt: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ),
      },
    });

    if (!user)
      return NextResponse.json(
        {
          error: "An unexpected error occurred. Please try again.",
        },
        { status: 500 }
      );

    // send verification email
    await sendVerificationEmail(code, email, updatedUser.name || email, token, {
      "X-Category": "Verification Email",
    });

    return NextResponse.json(
      {
        message: "Email sent successfully",
      },
      {
        status: 201,
      }
    );
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
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
