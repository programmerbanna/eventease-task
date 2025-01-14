import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  private activeSessions: Map<string, string> = new Map(); // userId -> socketId

  setActiveSession(userId: string, socketId: string) {
    const existingSocketId = this.activeSessions.get(userId);
    if (existingSocketId && existingSocketId !== socketId) {
      // Return the existing socket ID that needs to be disconnected
      return existingSocketId;
    }
    this.activeSessions.set(userId, socketId);
    return null;
  }

  removeSession(userId: string) {
    this.activeSessions.delete(userId);
  }

  getSocketId(userId: string): string | undefined {
    return this.activeSessions.get(userId);
  }
}
