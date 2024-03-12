import { InjectController, InjectRoute } from '@/decorators';

import { CardType } from './entities';
import cardTypeRoutes from './card-type.routes';
import { CardTypeService } from './card-type.service';

@InjectController({ name: cardTypeRoutes.index })
export class CardTypeController {
  constructor(private cardTypeService: CardTypeService) {}

  @InjectRoute(cardTypeRoutes.getAll)
  public async getAll(): Promise<CardType[]> {
    const cardTypes = await this.cardTypeService.getAll();

    return cardTypes;
  }
}
