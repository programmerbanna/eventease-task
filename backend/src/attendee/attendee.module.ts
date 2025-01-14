import { Module } from '@nestjs/common';
import { AttendeeResolver } from './attendee.resolver';
import { AttendeeService } from './attendee.service';
import { RealtimeModule } from '../websockets/realtime.module';

@Module({
  imports: [RealtimeModule],
  providers: [AttendeeResolver, AttendeeService],
})
export class AttendeeModule {}
