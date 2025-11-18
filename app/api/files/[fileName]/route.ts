import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/minio-client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
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
    const { fileName } = await params;
    const objectKey = `users/${session.user.id}/images/${fileName}`;

    const cmd = new GetObjectCommand({
      Bucket: process.env.MINIO_BUCKET,
      Key: objectKey,
    });

    const { Body, ContentType } = await s3.send(cmd);

    return new Response(Body as any, {
      headers: {
        "Content-Type": ContentType ?? "application/octet-stream",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error fetching image",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
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
    const { fileName } = await params;
    const objectKey = `users/${session.user.id}/images/${fileName}`;

    const cmd = new DeleteObjectCommand({
      Bucket: process.env.MINIO_BUCKET,
      Key: objectKey,
    });

    await s3.send(cmd);

    return NextResponse.json(
      {
        message: "File deleted successfully.",
        success: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error deleting image",
        success: false,
      },
      { status: 500 }
    );
  }
}
