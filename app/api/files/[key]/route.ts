import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/minio-client";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const cmd = new GetObjectCommand({
    Bucket: process.env.MINIO_BUCKET,
    Key: key,
  });

  const { Body, ContentType } = await s3.send(cmd);

  return new Response(Body as any, {
    headers: {
      "Content-Type": ContentType ?? "application/octet-stream",
    },
  });
}
