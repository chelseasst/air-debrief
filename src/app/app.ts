import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transrcipt } from './transrcipt';
import { Home } from './home/home';
import { Loading } from './loading/loading';
import { Summary } from './summary/summary';
import { Error } from './error/error';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, Home, Loading, Summary, Error],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'air-debrief';

  constructor(public viewService: Transrcipt) { }
}
