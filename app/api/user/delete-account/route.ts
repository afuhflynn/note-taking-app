import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteAccountSchemaServer } from "@/zod/zod.schema";

export const DELETE = async (req: NextRequest) => {
  const { email, id } = await req.json();
  // Validate the req body
  const validatedCredential = deleteAccountSchemaServer.safeParse({
    email,
    id,
  });
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
    const foundUser = await prisma.user.findUnique({
      where: {
        id: validatedCredential.data.id,
        email: validatedCredential.data.email,
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

    // NOTE: Delete user from db

    const deletedUser = await prisma.user.delete({
      where: {
        email: foundUser?.email as string,
        id: foundUser?.id,
      },
    });
    // Return user data
    return NextResponse.json({
      message: "User deleted successful",
      user: deletedUser,
    });

    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    console.error(`Error deleting user account ${error.message}`);
    return NextResponse.json(
      {
        error: `Error deleting user account: ${error.message}`,
      },
      { status: 500 }
    );
  }
};
