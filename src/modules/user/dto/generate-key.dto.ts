import { ApiProperty } from '@nestjs/swagger';

export class GenKeyDto {
  @ApiProperty({
    type: String,
    example: 'free',
    description: 'This is a required property',
  })
  type: string;
}
