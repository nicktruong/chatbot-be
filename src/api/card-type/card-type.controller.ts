import { InjectController, InjectRoute } from '@/decorators';
import cardTypeRoutes from './card-type.routes';
import { CardTypeService } from './card-type.service';
import { GotCardTypeDto } from './dto';

@InjectController({ name: cardTypeRoutes.index })
export class CardTypeController {
  constructor(private cardTypeService: CardTypeService) {}

  @InjectRoute(cardTypeRoutes.getAll)
  public async getAll(): Promise<GotCardTypeDto[]> {
    const cardTypes = await this.cardTypeService.getAll();

    return cardTypes;
  }
}
