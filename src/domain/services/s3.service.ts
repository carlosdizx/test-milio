import { Injectable, NotFoundException } from '@nestjs/common';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
config();

const Bucket = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;

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
      throw new NotFoundException("File in S3 does not exist");
    }
  }
}
