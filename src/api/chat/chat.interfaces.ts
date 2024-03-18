import { Server } from 'socket.io';

import type { IWsValidatorExceptionResponse } from '@/filters';

import { Message } from '../message/entities';

export interface ServerToClientEvents {
  step: (payload: string) => void;
  message: (payload: Message) => void;
  requireAnswer: (payload: boolean) => void;
  error: (payload: IWsValidatorExceptionResponse) => void;
}

export type SocketServer = Server<any, ServerToClientEvents>;
