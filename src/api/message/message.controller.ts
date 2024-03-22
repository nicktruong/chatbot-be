import { InjectController, InjectRoute } from '@/decorators';
import messageRoutes from './message.routes';
import { Schedule } from './entities';
import { CreateScheduleDto } from './dto';
import { MessageService } from './message.service';
import { Body } from '@nestjs/common';

@InjectController({ name: messageRoutes.index })
export class MessageController {
  constructor(private messageService: MessageService) {}

  @InjectRoute(messageRoutes.schedule)
  async schedule(@Body() data: CreateScheduleDto): Promise<Schedule> {
    const schedule = await this.messageService.scheduleMessage(data);

    return schedule;
  }
}
