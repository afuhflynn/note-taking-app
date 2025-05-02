import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailVerificationSchema } from "@/zod/zod.schema";
import { logger } from "@/utils/logger";

export const POST = async (req: NextRequest) => {
  const { code } = await req.json();
  // Validate the req body
  const validatedCredential = emailVerificationSchema.safeParse(code);
  try {
    if (validatedCredential.error) {
      return NextResponse.json(
        {
          error: validatedCredential.error.message,
        },
        {
          status: 400,
        }
      );
    }

    // Query for user data from db
    const foundUser = await prisma.user.findFirst({
      where: {
        emailVerificationCode: validatedCredential.data.code,
        emailVerificationCodeExpiresAt: { gt: new Date() },
      },
    });

    if (!foundUser)
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );

    // Update user db object
    foundUser.emailVerified = new Date(Date.now());
    foundUser.emailVerificationCodeExpiresAt = new Date(Date.now());
    foundUser.emailVerificationCode = null;
    foundUser.emailVerificationTokenExpiresAt = new Date(Date.now());
    foundUser.emailVerificationToken = null;

    // Update db
    await prisma.user.update({
      where: {
        email: foundUser.email as string,
      },
      data: foundUser,
    });

    // Return user data
    logger.log(
      "success",
      `User, ${foundUser?.email} email verified successfully`
    );
    return NextResponse.json({
      message: "Email verified successful",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Email verification failed ${error.message}`);
    return NextResponse.json(
      {
        error: `Email verification failed ${error.message}`,
      },
      { status: 500 }
    );
  }
};
