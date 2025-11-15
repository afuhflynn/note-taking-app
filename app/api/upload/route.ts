import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/minio-client";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  const bytes = Buffer.from(await file.arrayBuffer());

  const upload = new PutObjectCommand({
    Bucket: process.env.MINIO_BUCKET,
    Key: file.name,
    Body: bytes,
    ContentType: file.type,
  });

  await s3.send(upload);

  return Response.json({
    message: "File uploaded",
    key: file.name,
  });
}
