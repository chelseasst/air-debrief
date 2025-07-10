import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transrcipt } from '../transrcipt';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.sass'
})
export class Home {
  timer = signal('00:00:00');
  private startTime: number = 0;
  private intervalId: any;

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  constructor(public transcriptService: Transrcipt) { }

  start() {
    this.playVideo();
    this.beginListening();
    this.startTimer();
  }
  startTimer(): void {
    this.startTime = Date.now();
    this.intervalId = setInterval(() => {
      const timePassed = Date.now() - this.startTime;

      const hours = Math.floor(timePassed / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((timePassed % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((timePassed % 60000) / 1000).toString().padStart(2, '0');


      this.timer.set(`${hours}:${minutes}:${seconds}`);
    }, 1000)
  }
  stopTimer(): void {
    clearInterval(this.intervalId);
    this.timer.set('00:00:00');
  }
  private beginListening(): void {
    this.transcriptService.listen();
  }

  playVideo() {
    const video = this.video.nativeElement;
    video?.play().catch(err => {
      console.warn('Video could not be played:', err);
    });
  }
  async stop() {
    this.stopTimer();
    this.transcriptService.stop();
  }
}

