import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailVerificationSchemaToken } from "@/zod/zod.schema";

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

    // Update db
    await prisma.user.update({
      where: {
        email: foundUser.email as string,
      },
      data: {
        emailVerified: true,
        emailVerificationCodeExpiresAt: new Date(Date.now()),
        emailVerificationCode: null,
        emailVerificationTokenExpiresAt: new Date(Date.now()),
        emailVerificationToken: null,
      },
    });

    // Return user data
    console.log(
      "success",
      `User, ${foundUser?.email} email verified successfully`
    );
    return NextResponse.json({
      message: "Email verified successful",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    console.error(`Email verification failed ${error.message}`);
    return NextResponse.json(
      {
        error: `Email verification failed ${error.message}`,
      },
      { status: 500 }
    );
  }
};
