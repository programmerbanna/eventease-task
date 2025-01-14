import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterInput } from './dto/register.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerInput.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerInput.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...registerInput,
        password: hashedPassword,
      },
    });

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log('AuthService.validateUser - Searching for user:', email);

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log('User found:', user ? 'Yes' : 'No');
    console.log('Stored password hash:', user?.password);

    if (!user) {
      console.log('User not found');
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    console.log('Attempted password:', password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    if (!user || !user.id || !user.email) {
      throw new UnauthorizedException('Invalid user data');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    if (!token) {
      throw new UnauthorizedException('Failed to generate token');
    }

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
