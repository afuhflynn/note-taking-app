import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/minio-client";
import { NextResponse } from "next/server";
import { ensureBucket } from "@/lib/minio-utils";

export async function POST(req: NextResponse) {
  const form = await req.formData();
  const file = form.get("file") as File;

  const bytes = Buffer.from(await file.arrayBuffer());

  await ensureBucket(process.env.MINIO_BUCKET!);

  const upload = new PutObjectCommand({
    Bucket: process.env.MINIO_BUCKET,
    Key: file.name,
    Body: bytes,
    ContentType: file.type,
  });
  await s3.send(upload);

  return NextResponse.json({
    message: "File uploaded",
    key: file.name,
  });
}
