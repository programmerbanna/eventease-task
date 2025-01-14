import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppResolver } from './app.resolver';
import { PrismaModule } from './common/prisma/prisma.module';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { AttendeeModule } from './attendee/attendee.module';
import { RealtimeModule } from './websockets/realtime.module';
import { LoggingService } from './common/services/logging.service';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/middleware/error.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    EventModule,
    AttendeeModule,
    RealtimeModule,
  ],
  providers: [
    AppService,
    AppResolver,
    LoggingService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
