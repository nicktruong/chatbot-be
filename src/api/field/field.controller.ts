import { Body, Param } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';

import { Field } from './entities';
import fieldRoutes from './field.routes';
import { FieldService } from './field.service';
import { UpdateFieldDto, UpdatedFieldDto } from './dto';

@InjectController({ name: fieldRoutes.index })
export class FieldController {
  constructor(private fieldService: FieldService) {}

  @InjectRoute(fieldRoutes.getCardFields)
  public async getCardsFields(
    @Param('cardId') cardId: string,
  ): Promise<Field[]> {
    const fields = await this.fieldService.getCardFields(cardId);

    return fields;
  }

  @InjectRoute(fieldRoutes.update)
  public async update(@Body() data: UpdateFieldDto): Promise<UpdatedFieldDto> {
    const updatedField = await this.fieldService.update(data);

    return updatedField;
  }
}
