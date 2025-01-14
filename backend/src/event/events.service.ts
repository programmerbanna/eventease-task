import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(createEventInput: CreateEventInput, userId: string) {
    return this.prisma.event.create({
      data: {
        ...createEventInput,
        date: new Date(createEventInput.date),
        creatorId: userId,
      },
      include: {
        creator: true,
        attendees: true,
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      include: {
        creator: true,
        attendees: true,
      },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        creator: true,
        attendees: true,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventInput: UpdateEventInput, userId: string) {
    const event = await this.findOne(id);

    if (event.creatorId !== userId) {
      throw new ForbiddenException('You can only update your own events');
    }

    return this.prisma.event.update({
      where: { id },
      data: {
        ...updateEventInput,
        date: updateEventInput.date
          ? new Date(updateEventInput.date)
          : undefined,
      },
      include: {
        creator: true,
        attendees: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    const event = await this.findOne(id);

    if (event.creatorId !== userId) {
      throw new ForbiddenException('You can only delete your own events');
    }

    await this.prisma.event.delete({ where: { id } });
    return true;
  }
}
