import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transcript } from '../transcript';

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
  private stopTriggered = false
  rulesVisible: boolean = false;

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  constructor(public transcriptService: Transcript) { }

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
    if (this.stopTriggered === true) return
    this.stopTriggered = true
    this.stopTimer();
    this.transcriptService.stop();
  }
  toggleRulesOpen(event: Event): void {
    event.stopPropagation(); //stops the event from reaching the parent
    this.rulesVisible = true;
  }
  toggleRulesClose(): void {
    this.rulesVisible = false;
  }
}

