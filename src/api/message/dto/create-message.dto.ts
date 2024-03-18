import { IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  value: string;

  @IsString()
  sender: string;

  @IsString()
  receiver: string;

  @IsUUID()
  clientId: string;

  @IsUUID()
  botId: string;
}
