import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_product')
  getHello(productName: string): string {
    console.log("Listen from product service");
    return productName;
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
