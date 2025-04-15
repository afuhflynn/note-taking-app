import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const GET = async (_: NextRequest) => {
  const session = await auth();
  try {
    if (!session?.user) {
      return NextResponse.redirect("/", { status: 303 }); // Redirect status code
    }

    // Query for user data from db
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!foundUser) return NextResponse.redirect("/", { status: 303 });

    // Return user data
    return NextResponse.json({
      user: { ...foundUser, password: undefined }, // Hide user password on return.
      message: "User data fetched successfully",
    });
  } catch (error: Error | any) {
    throw new Error(`Error fetching user profile up: ${error.message}`);
  }
};
