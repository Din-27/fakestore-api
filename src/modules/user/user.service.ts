import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findOne(where: any) {
    return this.prisma.user.findMany(where);
  }

  findByUnique(where: any) {
    return this.prisma.user.findUnique(where);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(where: any, data: UpdateUserDto) {
    return this.prisma.user.update({
      data,
      where,
    });
  }

  remove(where: any) {
    return this.prisma.user.delete({
      where,
    });
  }
}
