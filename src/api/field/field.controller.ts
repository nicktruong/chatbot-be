import { Body, Param } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';

import { Field } from './entities';
import { UpdateFieldDto } from './dto';
import fieldRoutes from './field.routes';
import { FieldService } from './field.service';

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
  public async update(
    @Param('fieldId') fieldId: string,
    @Body() data: UpdateFieldDto,
  ): Promise<void> {
    await this.fieldService.update(fieldId, data);
  }
}
