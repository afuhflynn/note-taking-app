import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/minio-client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 }
    );
  }

  try {
    const cmd = new ListObjectsV2Command({
      Bucket: process.env.MINIO_BUCKET,
      Prefix: `users/${session.user.id}/images`,
    });

    const data = await s3.send(cmd);

    const imageKeys = data.Contents?.map((obj) => obj.Key);

    return NextResponse.json(imageKeys);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error fethcing images",
        success: false,
      },
      { status: 500 }
    );
  }
}
