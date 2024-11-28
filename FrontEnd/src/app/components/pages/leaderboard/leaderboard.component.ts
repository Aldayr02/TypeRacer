import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboard: { username: string; score: number }[] = [];
  private socket!: Socket;

  constructor() {
    // Establecer conexión con el servidor Socket.IO
    this.socket = io('http://localhost:3000');
    // this.socket.on('connect', () => {
    //   console.log('Connected to Socket.IO server:', this.socket.id);
    // });
    // this.socket.on('connect_error', (err) => {
    //   console.error('Connection error:', err.message);
    // });
    // this.socket.on('disconnect', () => {
    //   console.warn('Disconnected from Socket.IO server');
    // });
    // // Escuchar el evento de actualización del leaderboard
    // this.socket.on(
    //   'update-leaderboard',
    //   (data: { username: string; score: number }[]) => {
    //     this.leaderboard = data;
    //     console.log(this.leaderboard);
    //   }
    // );
  }

  ngOnInit(): void {
    console.log('OnInit');
  }

  // emitEvent(event: string, data: any): void {
  //   if (this.socket?.connected) {
  //     this.socket.emit(event, data);
  //     console.log('Socket Emit');
  //   } else {
  //     console.log('Socket not connected. Cannot emit event:', event);
  //   }
  // }
}
