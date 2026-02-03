import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get all user tags
export async function GET(_: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 },
    );
  }
  try {
    const tags = await prisma.tag.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!tags) {
      return NextResponse.json(
        {
          error: "No tags found!",
          success: false,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(tags);
  } catch (error: Error | any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An unexptected error occurred getting tags.",
        success: false,
      },
      { status: 500 },
    );
  }
}
