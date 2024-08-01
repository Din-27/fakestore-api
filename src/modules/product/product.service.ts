import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: any) {
    return this.prisma.product.findMany(where);
  }
}
