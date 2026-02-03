import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/minio-client";
import { NextResponse } from "next/server";
import { ensureBucket } from "@/lib/minio-utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextResponse) {
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
    const form = await req.formData();
    const file = form.get("file") as File;

    const bytes = Buffer.from(await file.arrayBuffer());

    await ensureBucket(process.env.MINIO_BUCKET!);

    const objectKey = `users/${session.user.id}/images/${file.name}`;

    const upload = new PutObjectCommand({
      Bucket: process.env.MINIO_BUCKET,
      Key: objectKey,
      Body: bytes,
      ContentType: file.type,
    });
    const uploadRequest = await s3.send(upload);

    if (!uploadRequest) {
      return NextResponse.json(
        {
          error: "Image upload failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "File uploaded",
      key: file.name,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error uploading image",
        success: false,
      },
      { status: 500 },
    );
  }
}
