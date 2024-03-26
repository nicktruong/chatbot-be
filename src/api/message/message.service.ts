import { CronJob } from 'cron';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';

import { SocketService } from '@/modules/socket/socket.service';

import { Message, Schedule } from './entities';
import { CreateMessageDto, CreateScheduleDto } from './dto';
import { MessageRepository, ScheduleRepository } from './repositories';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: MessageRepository,
    @InjectRepository(Schedule) private scheduleRepository: ScheduleRepository,
    private socketService: SocketService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  public async createMessage(data: CreateMessageDto): Promise<Message> {
    const { value, sender, receiver, clientId, botId } = data;

    const message = this.messageRepository.create({
      value,
      sender,
      receiver,
      clientId,
      isRead: false,
      bot: { id: botId },
    });

    await this.messageRepository.save(message);

    return message;
  }

  public async scheduleMessage(data: CreateScheduleDto): Promise<Schedule> {
    let message = await this.messageRepository.findOneBy({
      id: data.messageId,
    });

    if (!message) {
      message = await this.createMessage(data);
    }

    const schedule = this.scheduleRepository.create({
      scheduledDate: data.scheduledDate,
      message: { id: message.id },
    });

    await this.scheduleRepository.save(schedule);

    const date = new Date(data.scheduledDate);
    const job = new CronJob(date, async () => {
      const schedule = await this.scheduleRepository.findOneBy({
        scheduledDate: date,
      });

      if (!schedule.isSent) {
        this.socketService.socket.emit('message', message);
        await this.scheduleRepository.update(
          { id: schedule.id },
          { isSent: true },
        );
      }
    });

    this.schedulerRegistry.addCronJob(`schedule-message-${message.id}`, job);
    job.start();

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
