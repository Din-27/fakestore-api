import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async SignUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.userService.findOne({
      where: { username: String(createUserDto.username) },
    });

    if (userExists.length > 0) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const data = {
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      password: hash,
    };
    createUserDto.password = hash;
    const newUser = await this.userService.create({ ...data });
    const tokens = await this.GetTokens(
      Number(newUser.id),
      createUserDto.username,
    );
    return {
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      tokens,
    };
  }

  async SignIn(data: AuthDto) {
    const user = await this.userService.findOne({
      where: { username: String(data.username) },
    });
    if (user.length === 0) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(
      user[0].password,
      data.password,
    );

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.GetTokens(user[0].id, user[0].username);
    return {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      username: user[0].username,
      tokens,
    };
  }

  async RefreshTokens(refreshToken: string) {
    let accessUser: any;
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      accessUser = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      where: { username: String(accessUser.username) },
    });
    if (!user) throw new BadRequestException('User does not exist');
    const tokens = await this.GetTokens(user[0].id, user[0].username);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async GetTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
