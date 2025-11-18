import { s3 } from "@/utils/minio-client";
import { HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

export async function ensureBucket(bucketName: string) {
  try {
    await s3.send(
      new HeadBucketCommand({
        Bucket: bucketName,
      })
    );
    return true;
  } catch (error: Error | any) {
    if (error.$metadata?.httpStatusCode === 404) {
      // Bucket missing create it
      await s3.send(
        new CreateBucketCommand({
          Bucket: bucketName,
        })
      );
      return true;
    } else {
      throw error; // reall error
    }
  }
}
