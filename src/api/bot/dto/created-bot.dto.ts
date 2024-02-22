import { ApiProperty } from '@nestjs/swagger';

import { ActionedBaseDto } from '@/common/dto';

export class CreatedBotDto extends ActionedBaseDto {
  @ApiProperty({ example: 'Lorem' })
  name: string;

  @ApiProperty({ format: 'date-time' })
  publishDate: Date;
}