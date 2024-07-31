import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { KeyModule } from '../key/key.module';
import { KeyService } from '../key/key.service';
import { DecodedToken } from 'src/common/filters/decoded-token.utils';

@Module({
  imports: [KeyModule],
  controllers: [UserController],
  providers: [UserService, DecodedToken, PrismaService, JwtService, KeyService],
})
export class UserModule {}
