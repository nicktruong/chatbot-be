import { Repository } from 'typeorm';

import { Message } from '../entities';

export class MessageRepository extends Repository<Message> {}
