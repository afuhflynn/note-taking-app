import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchemaServer } from "@/zod/zod.schema";
import { logger } from "@/utils/logger";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  // Validate the req body
  const validatedCredential = forgotPasswordSchemaServer.safeParse(email);
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

    // TODO: Update user db object

    // Return user data
    return NextResponse.json({
      message: "Email sent successful",
    });
  } catch (error: Error | any) {
    logger.error(`Error sending password reset email ${error.message}`);
    return NextResponse.json(
      {
        error: `Error sending password reset email: ${error.message}`,
      },
      { status: 500 }
    );
  }
};
