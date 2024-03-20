import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import { CreateScheduleDto } from './dto';
import { Message, Schedule } from './entities';

import messageRoutes from './message.routes';
import { MessageService } from './message.service';

@InjectController({ name: messageRoutes.index })
export class MessageController {
  constructor(private messageService: MessageService) {}

  @InjectRoute(messageRoutes.schedule)
  async schedule(@Body() data: CreateScheduleDto): Promise<Schedule> {
    const schedule = await this.messageService.scheduleMessage(data);

    return schedule;
  }

  @InjectRoute(messageRoutes.getAll)
  async getAll(@Param('botId') botId: string): Promise<Message[]> {
    const messages = await this.messageService.getAll(botId);

    return messages;
  }
}
