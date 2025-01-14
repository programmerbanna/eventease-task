import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { RegisterAttendeeInput } from './dto/register-attendee.input';
import { RealtimeGateway } from '../websockets/realtime.gateway';

@Injectable()
export class AttendeeService {
  constructor(
    private prisma: PrismaService,
    private realtimeGateway: RealtimeGateway,
  ) {}

  async register(registerAttendeeInput: RegisterAttendeeInput, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: registerAttendeeInput.eventId },
      include: { attendees: true },
    });

    if (!event) {
      throw new ForbiddenException('Event not found');
    }

    if (event.attendees.length >= event.maxAttendees) {
      throw new ForbiddenException('Event has reached maximum capacity');
    }

    if (event.attendees.some((attendee) => attendee.id === userId)) {
      throw new ForbiddenException('You are already registered for this event');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: registerAttendeeInput.eventId },
      data: {
        attendees: {
          connect: { id: userId },
        },
      },
      include: {
        creator: true,
        attendees: true,
      },
    });

    const attendee = updatedEvent.attendees.find((a) => a.id === userId);
    if (attendee) {
      this.realtimeGateway.emitNewAttendee(event.id, attendee);
    }

    if (updatedEvent.attendees.length >= updatedEvent.maxAttendees) {
      this.realtimeGateway.emitEventFull(event.id);
    }

    return updatedEvent;
  }

  async unregister(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      throw new ForbiddenException('Event not found');
    }

    if (!event.attendees.some((attendee) => attendee.id === userId)) {
      throw new ForbiddenException('You are not registered for this event');
    }

    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        attendees: {
          disconnect: { id: userId },
        },
      },
      include: {
        creator: true,
        attendees: true,
      },
    });
  }
}
