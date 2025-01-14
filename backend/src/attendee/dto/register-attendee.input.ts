import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterAttendeeInput {
  @Field()
  @IsNotEmpty()
  eventId: string;
}