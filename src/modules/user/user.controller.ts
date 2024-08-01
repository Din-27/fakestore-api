import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { DecodedToken } from 'src/common/filters/decoded-token.utils';
import { Request } from 'express';
import { KeyService } from '../key/key.service';
import { ReGenKeyDto } from './dto/regenerate-key.dto';
import { GenKeyDto } from './dto/generate-key.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly keyService: KeyService,
    private readonly userService: UserService,
    private readonly decodedToken: DecodedToken,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findByUnique({
      select: {
        id: true,
        name: true,
      },
      where: { id: Number(id) },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(
      {
        where: { id: Number(id) },
      },
      updateUserDto,
    );
  }

  @Post()
  async generateApiKey(@Body() data: GenKeyDto, @Res() req: Request) {
    const { sub } = await this.decodedToken.Factory(req);
    const key = crypto.randomUUID();
    const createKey = this.keyService.create({
      key,
      ...data,
      userKeyId: sub,
    });
    return createKey;
  }

  @Post()
  async reGenerateApiKey(@Body() data: ReGenKeyDto, @Req() req: Request) {
    const { sub } = await this.decodedToken.Factory(req);
    const reGenkey = crypto.randomUUID();
    const reCreateKey = this.keyService.update(
      {
        where: { ...data, userKeyId: sub },
      },
      {
        key: reGenkey,
      },
    );
    return reCreateKey;
  }
}
