import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any) {
    this.logger.debug('me query called with user:', user);

    if (!user?.id) {
      this.logger.error('No user ID found in request');
      throw new Error('User not authenticated');
    }

    const userData = await this.userService.findById(user.id);
    this.logger.debug('Found user data:', userData);

    if (!userData) {
      this.logger.error(`No user found for ID: ${user.id}`);
      throw new Error('User not found');
    }

    return userData;
  }
}
