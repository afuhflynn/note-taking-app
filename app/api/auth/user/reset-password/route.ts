import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export const PUT = async (req: NextRequest) => {
  const { token, password } = await req.json();
  if (!token || !password)
    return NextResponse.json(
      { error: "A password and token must be provided" },
      { status: 400 }
    );
  try {
    // Query for user data from db
    const foundUser = await prisma.user.findUnique({
      include: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { $gt: [Date.now()] },
      },
    });

    if (!foundUser)
      return NextResponse.json(
        {
          error: "Invalid reset link",
        },
        { status: 403 }
      );

    // Generate new password hash
    const pwdHash = await hash(password, 10);

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
  } catch (error: Error | any) {
    throw new Error(`Error fetching user profile up: ${error.message}`);
  }
};
