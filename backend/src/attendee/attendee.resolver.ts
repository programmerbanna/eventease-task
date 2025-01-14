import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { Event } from '../event/entities/event.entity';
import { RegisterAttendeeInput } from './dto/register-attendee.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver()
export class AttendeeResolver {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  registerAttendee(
    @Args('registerAttendeeInput') registerAttendeeInput: RegisterAttendeeInput,
    @Context() context,
  ) {
    return this.attendeeService.register(
      registerAttendeeInput,
      context.req.user.userId,
    );
  }

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  unregisterAttendee(
    @Args('eventId') eventId: string,
    @Context() context,
  ) {
    return this.attendeeService.unregister(eventId, context.req.user.userId);
  }
}