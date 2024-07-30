import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/auth.constant';
import { ExtractTokenFromHeader } from './extract-token.utils';
import { Request } from 'express';

export class DecodedToken extends ExtractTokenFromHeader {
  constructor(private jwtService: JwtService) {
    super();
  }

  async Factory(req: Request): Promise<any> {
    const token = this.extractTokenFromHeader(req);
    return await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
  }
}
