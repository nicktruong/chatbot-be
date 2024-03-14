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
    const { value, sender, receiver, botId } = data;

    const chat = this.messageRepository.create({
      value,
      sender,
      receiver,
      bot: { id: botId },
    });

    await this.messageRepository.save(chat);

    return chat;
  }
}
