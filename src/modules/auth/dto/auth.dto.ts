import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthDto {
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
}
