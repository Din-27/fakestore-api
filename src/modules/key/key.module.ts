import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [KeyService, PrismaService],
})
export class KeyModule {}
