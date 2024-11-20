import { Component } from '@angular/core';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor() {
    console.log('NOtFOund');
  }
}
