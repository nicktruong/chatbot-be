import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import { Card } from './entities';
import { CreateCardDto } from './dto';

import cardRoutes from './card.routes';
import { CardService } from './card.service';

@InjectController({ name: cardRoutes.index })
export class CardController {
  constructor(private cardService: CardService) {}

  @InjectRoute(cardRoutes.create)
  public async createOne(@Body() data: CreateCardDto): Promise<Card> {
    const createdCard = await this.cardService.create(data);

    return createdCard;
  }

  @InjectRoute(cardRoutes.getAll)
  public async getAll(@Param('nodeId') nodeId: string): Promise<Card[]> {
    const cards = await this.cardService.getAll(nodeId);

    return cards;
  }

  @InjectRoute(cardRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<number> {
    const { affected } = await this.cardService.deleteById(id);

    return affected;
  }
}
