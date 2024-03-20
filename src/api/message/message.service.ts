import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message, Schedule } from './entities';
import { CreateMessageDto, CreateScheduleDto } from './dto';
import { MessageRepository, ScheduleRepository } from './repositories';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: MessageRepository,
    @InjectRepository(Schedule) private scheduleRepository: ScheduleRepository,
  ) {}

  public async createMessage(data: CreateMessageDto): Promise<Message> {
    const { value, sender, receiver, clientId, botId } = data;

    const message = this.messageRepository.create({
      value,
      sender,
      receiver,
      clientId,
      bot: { id: botId },
    });

    await this.messageRepository.save(message);

    return message;
  }

  public async scheduleMessage(data: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.scheduleRepository.create({
      scheduledDate: data.scheduledDate,
      message: { id: data.messageId },
    });

    await this.scheduleRepository.save(schedule);

    return schedule;
  }

  public async getByClientId(clientId: string): Promise<Message[]> {
    const messages = await this.messageRepository.find({ where: { clientId } });

    return messages;
  }

  public async getAll(botId: string): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { bot: { id: botId } },
      order: { createdAt: 'DESC' },
    });

    return messages;
  }
}
