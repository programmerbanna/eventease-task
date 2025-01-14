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

  emitNewAttendee(eventId: string, attendee: any, eventTitle: string) {
    console.log('Emitting newAttendee event:', {
      eventId,
      attendee,
      eventTitle,
    });
    this.server.emit('newAttendee', {
      eventId,
      attendeeName: attendee.name,
      eventTitle,
    });
  }

  emitEventFull(eventId: string, eventTitle: string) {
    this.server.emit('eventFull', {
      eventId,
      eventTitle,
    });
  }

  emitEventUpdated(eventId: string, eventTitle: string) {
    console.log('Emitting eventUpdated:', { eventId, eventTitle });
    this.server.emit('eventUpdated', {
      eventId,
      eventTitle,
    });
  }

  emitAttendeeUnregistered(eventId: string, attendee: any, eventTitle: string) {
    console.log('Emitting attendeeUnregistered event:', {
      eventId,
      attendeeName: attendee.name,
      eventTitle,
    });
    this.server.emit('attendeeUnregistered', {
      eventId,
      attendeeName: attendee.name,
      eventTitle,
    });
  }
}
