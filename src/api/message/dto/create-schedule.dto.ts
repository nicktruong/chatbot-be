import { IsDateString, IsOptional, IsUUID } from 'class-validator';

import { CreateMessageDto } from './create-message.dto';

export class CreateScheduleDto extends CreateMessageDto {
  @IsDateString()
  scheduledDate: string;

  @IsUUID()
  @IsOptional()
  messageId: string;
}
