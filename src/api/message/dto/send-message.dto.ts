import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class SendMessageDto {
  @IsString()
  value: string;

  @IsString()
  sender: string;

  @IsString()
  receiver: string;

  @IsBoolean()
  answer: boolean;

  @IsString()
  currentStep: string;

  @IsUUID()
  clientId: string;

  @IsUUID()
  botId: string;
}
