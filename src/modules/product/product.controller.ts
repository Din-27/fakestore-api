import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne({
      where: { id: Number(id) },
    });
  }
}
