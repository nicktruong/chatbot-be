import type { IWsValidatorExceptionResponse } from '@/filters';

import { Message } from './entities';
import { SendMessageDto } from './dto';

export interface ClientToServerEvents {
  message: (payload: SendMessageDto) => void;
}

export interface ServerToClientEvents {
  message: (payload: Message) => void;
  error: (payload: IWsValidatorExceptionResponse) => void;
}
