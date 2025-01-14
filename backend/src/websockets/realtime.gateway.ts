import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  emitNewAttendee(eventId: string, attendee: any) {
    this.server.emit(`event:${eventId}:newAttendee`, {
      eventId,
      attendee: {
        id: attendee.id,
        name: attendee.name,
        email: attendee.email,
      },
    });
  }

  emitEventFull(eventId: string) {
    this.server.emit(`event:${eventId}:full`);
  }
}
