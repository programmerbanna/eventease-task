import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  log(message: string) {
    super.log(message);
  }

  debug(message: string) {
    super.debug(message);
  }
}