import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailVerificationSchemaToken } from "@/zod/zod.schema";
import { logger } from "@/utils/logger";

export const POST = async (req: NextRequest) => {
  const { token } = await req.json();

  // Validate the req body
  const validatedCredential = emailVerificationSchemaToken.safeParse(token);
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
        emailVerificationToken: validatedCredential.data.token,
        emailVerificationTokenExpiresAt: { gt: new Date() },
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
    foundUser.emailVerificationCode = undefined;
    foundUser.emailVerificationTokenExpiresAt = new Date(Date.now());
    foundUser.emailVerificationToken = undefined;

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
  } catch (error: Error | any) {
    logger.error(`Email verification failed ${error.message}`);
    return NextResponse.json(
      {
        error: `Email verification failed ${error.message}`,
      },
      { status: 500 }
    );
  }
};
