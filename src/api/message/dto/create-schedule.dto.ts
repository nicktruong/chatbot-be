import { IsDateString, IsUUID } from 'class-validator';

import { SendMessageDto } from './send-message.dto';

export class CreateScheduleDto extends SendMessageDto {
  @IsDateString()
  scheduledDate: string;

  @IsUUID()
  messageId: string;
}
