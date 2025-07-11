import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transrcipt } from '../transrcipt';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, RouterModule],
  templateUrl: './loading.html',
  styleUrl: './loading.sass'
})
export class Loading {
  @ViewChild('planeImg') planeImg!: ElementRef
  constructor(private renderer: Renderer2, public transcriptService:Transrcipt) { }
}
