import { ApiProperty } from '@nestjs/swagger';

import { ActionedBaseDto } from '@/common/dto';
import { GotFlowTypeDto } from '@/api/flow-type/dto';

export class GotFlowDto extends ActionedBaseDto {
  @ApiProperty({
    example: 'Workflow 1',
  })
  name: string;

  @ApiProperty()
  flowType: GotFlowTypeDto;
}
