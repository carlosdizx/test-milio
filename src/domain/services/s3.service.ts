import { Injectable } from '@nestjs/common';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

const Bucket = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region }); // Reemplaza con tu región de preferencia
  }

  async getFileContent(Key: string) {
    const getObjectCommand = new GetObjectCommand({
      Bucket,
      Key,
    });

    try {
      const response = await this.s3Client.send(getObjectCommand);
      return response.Body;
    } catch (error) {
      console.error('Error retrieving file from S3:', error);
      throw error;
    }
  }
}
