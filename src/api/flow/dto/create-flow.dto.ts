import {
  IsEnum,
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { FlowTypeEnum } from '@/api/flow-type/enums';

export class CreateFlowDto {
  @IsEnum(FlowTypeEnum)
  @ApiProperty({
    enum: FlowTypeEnum,
    default: enumh.getFirstKey<typeof FlowTypeEnum>(FlowTypeEnum),
  })
  flowType: FlowTypeEnum;

  @IsUUID()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  botId: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 'New Workflow 1',
  })
  name?: string;
}
