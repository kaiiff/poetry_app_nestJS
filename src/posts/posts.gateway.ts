// src/posts/posts.gateway.ts

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PostsGateway {
  @WebSocketServer()
  server: Server;

   emitNewPost(post: any) {
    this.server.emit('postCreated', post); // 🔥 emit event to all clients
  }
}
