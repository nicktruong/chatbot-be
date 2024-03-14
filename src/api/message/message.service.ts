import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateScheduleDto, SendMessageDto } from './dto';
import { Message, Schedule } from './entities';
import { MessageRepository, ScheduleRepository } from './repositories';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: MessageRepository,
    @InjectRepository(Schedule) private scheduleRepository: ScheduleRepository,
  ) {}

  public async createMessage(data: SendMessageDto): Promise<Message> {
    const { value, sender, receiver, botId } = data;

    const message = this.messageRepository.create({
      value,
      sender,
      receiver,
      bot: { id: botId },
    });

    await this.messageRepository.save(message);

    return message;
  }

  public async scheduleMessage(data: CreateScheduleDto): Promise<Schedule> {
    console.log({ data });
    const schedule = this.scheduleRepository.create({
      scheduledDate: data.scheduledDate,
      message: { id: data.messageId },
    });

    await this.scheduleRepository.save(schedule);

    return schedule;
  }
}
