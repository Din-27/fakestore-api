import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from '../../common/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from '../../common/strategy/refreshToken.strategy';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    UserService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtService,
  ],
})
export class AuthModule {}
