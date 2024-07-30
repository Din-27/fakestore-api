import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  name: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  email: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  username: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  password: string;
  @ApiPropertyOptional({
    type: Number,
    description: 'This is an optional property',
  })
  refreshToken: string;
}
