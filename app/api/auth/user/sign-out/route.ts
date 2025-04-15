import { NextRequest, NextResponse } from "next/server";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();
  const session = await auth();
  try {
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Invalid session credentials",
        },
        {
          status: 400,
        }
      );
    }

    // Query for user data from db
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
        id: id,
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

    await signOut({
      redirectTo: "/",
      redirect: true,
    });

    // Return user data
    return NextResponse.json({
      message: "Logout successful",
    });
  } catch (error: Error | any) {
    throw new Error(`Error fetching user profile up: ${error.message}`);
  }
};
