import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date: Date;

  @Field()
  location: string;

  @Field(() => Int)
  maxAttendees: number;

  @Field(() => User)
  creator: User;

  @Field(() => String)
  creatorId: string;

  @Field(() => [User])
  attendees: User[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
