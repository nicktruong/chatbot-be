import { ActionedBaseDto } from '@/common/dto';
import { enumh } from '@/utils/helpers';
import { ApiProperty } from '@nestjs/swagger';
import { CardTypeEnum, GroupTypeEnum } from '../card-type.enum';

export class GotCardTypeDto extends ActionedBaseDto {
  @ApiProperty({
    enum: CardTypeEnum,
    default: enumh.getFirstKey<typeof CardTypeEnum>(CardTypeEnum),
  })
  type: CardTypeEnum;

  @ApiProperty({ example: 'Lorem' })
  name: string;

  @ApiProperty({ format: 'date-time' })
  desc: string;

  @ApiProperty({
    enum: GroupTypeEnum,
    default: enumh.getFirstKey<typeof GroupTypeEnum>(GroupTypeEnum),
  })
  groupType: GroupTypeEnum;
}
