import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EventService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventsService: EventService) {}

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @Context() context,
  ) {
    return this.eventsService.create(createEventInput, context.req.user.id);
  }

  @Query(() => [Event])
  findAllEvents() {
    return this.eventsService.findAll();
  }

  @Query(() => Event)
  findOneEvent(@Args('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
    @Context() context,
  ) {
    return this.eventsService.update(
      updateEventInput.id,
      updateEventInput,
      context.req.user.id,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  removeEvent(@Args('id') id: string, @Context() context) {
    return this.eventsService.remove(id, context.req.user.id);
  }
}
