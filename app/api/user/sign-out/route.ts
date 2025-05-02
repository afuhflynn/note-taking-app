import { NextRequest, NextResponse } from "next/server";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signOutSchema } from "@/zod/zod.schema";
import { logger } from "@/utils/logger";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();
  const session = await auth();

  const validatedCredential = signOutSchema.safeParse(id);
  try {
    if (!session?.user || validatedCredential.error) {
      return NextResponse.json(
        {
          error:
            validatedCredential.error?.message || "Invalid session credentials",
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
        id: validatedCredential.data.id,
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
      redirect: false,
    });

    // Return user data
    return NextResponse.json({
      message: "Logout successful",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    console.error(error);
    logger.error(`Error signing out user ${error.message}`);
    return NextResponse.json(
      {
        error: `Error signing out: ${error.message}`,
      },
      { status: 500 }
    );
  }
};
