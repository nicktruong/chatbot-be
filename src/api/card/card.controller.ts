import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import cardRoutes from './card.routes';
import { CardService } from './card.service';
import { CreateCardDto, CreatedCardDto, GotCardDto } from './dto';

@InjectController({ name: cardRoutes.index })
export class CardController {
  constructor(private cardService: CardService) {}

  @InjectRoute(cardRoutes.create)
  public async createOne(@Body() data: CreateCardDto): Promise<CreatedCardDto> {
    const createdCard = await this.cardService.create(data);

    return createdCard;
  }

  @InjectRoute(cardRoutes.getAll)
  public async getAll(@Param('nodeId') nodeId: string): Promise<GotCardDto[]> {
    const cards = await this.cardService.getAll(nodeId);

    return cards;
  }
}
