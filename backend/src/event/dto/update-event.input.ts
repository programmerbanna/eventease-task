import { InputType, Field, ID } from '@nestjs/graphql';
import { CreateEventInput } from './create-event.input';
import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;
}