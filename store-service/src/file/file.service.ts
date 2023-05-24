import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config'
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import { FileEntity } from './file.entity';
import { CreateFileDTO } from './file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class FileService {
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly region: string;
  private readonly bucketName: string;
  
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly configService: ConfigService,
  ) {
    this.accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
    this.secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
    this.region = this.configService.get('AWS_REGION');
    this.bucketName = this.configService.get('AWS_BUCKET_NAME');
  }

  private getS3() {
    return new S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
    })
  }

  async uploadFile(dataBuffer: Buffer, fileName: string) {
    const s3 = this.getS3();

    const uploadResult = await s3.upload({
      Bucket: this.bucketName,
      Body: dataBuffer,
      Key: `${uuid()}-${fileName}`,
    }).promise();

    const newFile: CreateFileDTO = {
      fileName,
      key: uploadResult.Key,
      url: uploadResult.Location,
    } 

    const result = await this.fileRepository.save(newFile);

    return result;
  }

  async getFileById(id: number) {
    const file = await this.fileRepository.findOneBy({ id });

    const s3 = this.getS3();

    const response = await s3.getObject({ Bucket: this.bucketName, Key: file.key }).promise();

    const fileContent = response.Body.toString('utf-8');

    return fileContent;
  }
}
