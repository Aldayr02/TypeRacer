import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboard: { username: string; score: number }[] = [];

  constructor(
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('LeaderboardComponent constructor Start');
    this.socketService
      .on<{ username: string; score: number }[]>('update-leaderboard')
      .subscribe((data) => {
        console.log('Leaderboard updated:', data);
        this.leaderboard = data;
        this.cdr.detectChanges(); // Forzar la detección de cambios
        console.log('Leaderboard:', this.leaderboard);
      });
    console.log('LeaderboardComponent constructor END');
  }

  ngOnInit(): void {
    console.log('LeaderboardComponent ngOnInit');
  }
}
