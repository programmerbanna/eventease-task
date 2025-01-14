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
  async registerAttendee(
    @Args('registerAttendeeInput') registerAttendeeInput: RegisterAttendeeInput,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    console.log('Registering attendee with:', {
      registerAttendeeInput,
      userId,
    });
    return this.attendeeService.register(registerAttendeeInput, userId);
  }

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  async unregisterAttendee(
    @Args('eventId') eventId: string,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return this.attendeeService.unregister(eventId, userId);
  }
}
