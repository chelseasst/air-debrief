import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transcript } from '../transcript';

@Component({
  selector: 'app-summary',
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.html',
  styleUrl: './summary.sass'
})
export class Summary {
  error: string | null = null;
  final!: { wins: string[], mistakes: string[], summary: string, error: null | string };
  constructor(public transcriptService: Transcript) { }

  ngOnInit() {
    if (this.transcriptService.final().error) {
      this.error = this.transcriptService.final().error || null
    }else{
      this.final = this.transcriptService.final();
    }
  }
}
