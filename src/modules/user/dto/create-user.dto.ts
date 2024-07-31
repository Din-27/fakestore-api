import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'John',
    description: 'This is a required property',
  })
  name: string;
  @ApiProperty({
    type: String,
    example: 'John@gmail.com',
    description: 'This is a required property',
  })
  email: string;
  @ApiProperty({
    type: String,
    example: 'john123',
    description: 'This is a required property',
  })
  username: string;
  @ApiPropertyOptional({
    type: String,
    example: '1234',
    description: 'This is an optional property',
  })
  password: string;
  @ApiPropertyOptional({
    type: Number,
    example: 'test',
    description: 'This is an optional property',
  })
  refreshToken?: string;
}
