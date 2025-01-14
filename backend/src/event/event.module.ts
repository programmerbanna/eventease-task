import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { EventService } from './events.service';

@Module({
  providers: [EventResolver, EventService],
})
export class EventModule {}
