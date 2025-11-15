import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "us-east-1", // Required but MinIO ignores it
  endpoint: process.env.MINIO_ENDPOINT,
  forcePathStyle: true, // IMPORTANT for MinIO
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
});
