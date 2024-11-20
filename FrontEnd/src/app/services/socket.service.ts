import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    // Conectar al servidor
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', this.socket.id);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    this.socket.on('disconnect', () => {
      console.warn('Disconnected from Socket.IO server');
    });
  }

  // Emitir evento
  emit(event: string, data: any): void {
    if (this.socket.connected) {
      this.socket.emit(event, data);
      console.log('Socket Emit');
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  }

  // Escuchar evento
  on<T>(event: string): Observable<T> {
    return new Observable((observer) => {
      const handler = (data: T) => {
        try {
          observer.next(data);
        } catch (error) {
          observer.error(error);
        }
      };

      this.socket.on(event, handler);
      console.log('Socket ON');

      return () => {
        console.log('Socket ON REturn');
        this.socket.off(event, handler);
      };
    });
  }
}
