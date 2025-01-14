import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';
import { SessionService } from './session.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebsocketExceptionsFilter } from './websocket.filter';
import { LoggingService } from '../common/services/logging.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    RealtimeGateway,
    SessionService,
    WebsocketExceptionsFilter,
    LoggingService,
  ],
  exports: [RealtimeGateway],
})
export class RealtimeModule {}
