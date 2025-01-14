import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { LoggingService } from '../common/services/logging.service';

@Catch()
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  constructor(private logger: LoggingService) {
    super();
  }

  catch(exception: Error, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.message;

    this.logger.error(`WebSocket Error: ${error}`, exception.stack);

    client.emit('error', {
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
