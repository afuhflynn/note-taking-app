import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { resetPasswordSchemaServer } from "@/zod/zod.schema";
import { logger } from "@/utils/logger";

export const PUT = async (req: NextRequest) => {
  const { token, password } = await req.json();

  const validatedCredentials = resetPasswordSchemaServer.safeParse({
    password,
    token,
  });
  if (validatedCredentials.error)
    return NextResponse.json(
      { error: validatedCredentials.error.message },
      { status: 400 }
    );
  try {
    // Query for user data from db
    const foundUser = await prisma.user.findFirst({
      where: {
        passwordResetToken: validatedCredentials.data.token,
        passwordResetTokenExpiresAt: { gt: new Date() },
      },
    });

    if (!foundUser)
      return NextResponse.json(
        {
          error: "Invalid password reset link. Request for a new reset link.",
        },
        { status: 403 }
      );

    // Generate new password hash
    const pwdHash = await hash(validatedCredentials.data.password, 10);

    if (!pwdHash)
      return NextResponse.json(
        {
          error: "An unexpected error occurred. Please try again",
        },
        { status: 500 }
      );
    foundUser.password = pwdHash;

    // Update user record in db
    const updatedUser = await prisma.user.update({
      where: {
        email: foundUser.email as string,
      },
      data: foundUser,
    });

    // Return user data
    return NextResponse.json({
      user: { ...updatedUser, password: undefined }, // Hide user password on return.
      message: "Password updated successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error resetting user password ${error.message}`);
    return NextResponse.json(
      {
        error: `Error resetting password: ${error.message}`,
      },
      { status: 500 }
    );
  }
};
