import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DecodedToken } from 'src/common/filters/decoded-token.utils';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    HttpModule,
    ConfigModule.forRoot(),
    DecodedToken,
  ],
})
export class AppModule {}
