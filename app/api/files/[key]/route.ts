import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/minio";

export async function GET(_, { params }) {
  const cmd = new GetObjectCommand({
    Bucket: process.env.MINIO_BUCKET,
    Key: params.key,
  });

  const { Body, ContentType } = await s3.send(cmd);

  return new Response(Body as any, {
    headers: {
      "Content-Type": ContentType ?? "application/octet-stream",
    },
  });
}
