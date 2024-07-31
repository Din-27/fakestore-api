import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KeyEntity } from './entity/create-key.entity';

@Injectable()
export class KeyService {
  constructor(private prisma: PrismaService) {}
  create(createKey: KeyEntity) {
    return this.prisma.key.create({
      data: createKey,
    });
  }

  findAll() {
    return `This action returns all key`;
  }

  findOne(id: number) {
    return `This action returns a #${id} key`;
  }

  update(
    where: any,
    data: {
      key: string;
    },
  ) {
    return this.prisma.key.update({
      data,
      where,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} key`;
  }
}
