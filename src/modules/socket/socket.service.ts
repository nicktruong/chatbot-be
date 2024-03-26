import type { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  public socket: Server = null;
}
