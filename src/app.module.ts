import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DecodedToken } from 'src/common/filters/decoded-token.utils';
import { JwtModule } from '@nestjs/jwt';
import { KeyModule } from './modules/key/key.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    HttpModule,
    DecodedToken,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    KeyModule,
  ],
})
export class AppModule {}
