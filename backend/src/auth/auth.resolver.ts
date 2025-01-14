import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: any,
  ) {
    console.log('Login attempt for:', loginInput.email);
    const user = context.req.user;
    console.log('User from context:', user);

    if (!user) {
      throw new UnauthorizedException('Authentication failed');
    }

    const result = await this.authService.login(user);
    console.log('Login result:', result);

    context.res.cookie('Authentication', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return result;
  }

  @Mutation(() => Auth)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
