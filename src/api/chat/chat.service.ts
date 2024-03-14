import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from './entities';
import { SendMessageDto } from './dto';
import { MessageRepository } from './repositories';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private messageRepository: MessageRepository,
  ) {}

  public async createMessage(data: SendMessageDto): Promise<Message> {
    const chat = this.messageRepository.create(data);

    await this.messageRepository.save(chat);

    return chat;
  }
}
