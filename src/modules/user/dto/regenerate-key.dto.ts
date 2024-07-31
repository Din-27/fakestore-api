import { ApiProperty } from '@nestjs/swagger';

export class ReGenKeyDto {
  @ApiProperty({
    type: String,
    example: 'free',
    description: 'This is a required property',
  })
  type: string;
  @ApiProperty({
    type: String,
    example: 'c9644f04-d382-4371-806c-75873afbde89',
    description: 'This is a required property',
  })
  key: string;
}
