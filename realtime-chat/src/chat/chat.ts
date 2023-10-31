import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './types';

@WebSocketGateway(4010, { transports: ['websocket', 'polling'], cors: { Origin: '*' } })
export class Chat {

     @WebSocketServer()
     server: Server
     logger = new Logger();
     
     @SubscribeMessage('join')
     handleJoin(
     @MessageBody() room: string,
     @ConnectedSocket() socket: Socket
     ): void {
          this.logger.warn('Join Room ! - ' + JSON.stringify(room))
          socket.join(room);
     }

     @SubscribeMessage('send')
     handleSend(@MessageBody() data: MessageDto) {
          const { room } = data;
          this.logger.warn('Send Event ! - ' + JSON.stringify(data));
          this.server.to(String(room)).emit('receive', data);
     }
}