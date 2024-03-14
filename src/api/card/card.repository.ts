import { Repository } from 'typeorm';

import { Card } from './entities';

export class CardRepository extends Repository<Card> {}
