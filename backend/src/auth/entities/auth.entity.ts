import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
