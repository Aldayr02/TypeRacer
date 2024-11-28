import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-typeracer',
  templateUrl: './typeracer.component.html',
  styleUrls: ['./typeracer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TyperacerComponent {
  targetText: string = 'Este es el texto de ejemplo para practicar escritura.';
  userInput: string = '';
  startTime: number | null = null;
  wpm: number = 0;
  accuracy: number = 100;

  // Inicia el cronómetro al escribir la primera letra
  handleInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    if (!this.startTime && input.length > 0) {
      this.startTime = Date.now();
    }

    this.userInput = input;
    this.calculateWpm();
    this.calculateAccuracy();
  }

  // Calcula las palabras por minuto
  calculateWpm(): void {
    if (this.startTime) {
      const elapsedTime = (Date.now() - this.startTime) / 1000 / 60; // minutos
      const wordsTyped = this.userInput.trim().split(/\s+/).length;
      this.wpm = Math.round(wordsTyped / elapsedTime);
    }
  }

  // Calcula la precisión
  calculateAccuracy(): void {
    const targetChars = this.targetText.split('');
    const inputChars = this.userInput.split('');

    const correctChars = inputChars.filter(
      (char, index) => char === targetChars[index]
    ).length;

    this.accuracy = Math.round((correctChars / targetChars.length) * 100);
  }

  // Reinicia el juego
  reset(): void {
    this.userInput = '';
    this.startTime = null;
    this.wpm = 0;
    this.accuracy = 100;
  }
}
