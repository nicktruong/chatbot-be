import { IsString, IsUUID } from 'class-validator';

export class SendMessageDto {
  @IsString()
  value: string;

  @IsString()
  sender: string;

  @IsString()
  receiver: string;

  @IsUUID()
  botId: string;
}
