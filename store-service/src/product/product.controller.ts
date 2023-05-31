import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Get()
  getUser(@Query() query){
    if(!query.name)
    return `Please add Query param as "?name=Product1"`;

    return this.productService.getProduct(query.name);
  }
}
