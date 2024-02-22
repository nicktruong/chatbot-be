import { Repository } from 'typeorm';

import { Bot } from './entities/bot.entity';

export class BotRepository extends Repository<Bot> {}
