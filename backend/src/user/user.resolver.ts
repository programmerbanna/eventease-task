import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@Context() context) {
    return this.usersService.findById(context.req.user.userId);
  }
}
