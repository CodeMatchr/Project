import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { Chat } from './chat';

@Module({
  controllers: [ChatController],
  providers: [Chat]
})
export class ChatModule {}