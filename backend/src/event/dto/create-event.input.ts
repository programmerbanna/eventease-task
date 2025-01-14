import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsInt, Min, IsDateString } from "class-validator";

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsDateString()
  date: string;

  @Field()
  @IsNotEmpty()
  location: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  maxAttendees: number;
}
