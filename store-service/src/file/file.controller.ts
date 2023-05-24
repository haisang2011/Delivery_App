import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileUploadService: FileService,
  ) {}
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadedFile = await this.fileUploadService.uploadFile(file.buffer, file.originalname);
    return `File has been uploaded ${JSON.stringify(file.originalname)}`       
  }

  @Get(':id')
  async getFileById(@Param('id') id: number) {
    const response = await this.fileUploadService.getFileById(id);
    return `Response: ${response}`;
  }
}
