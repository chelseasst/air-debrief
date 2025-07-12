import 'zone.js';  
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig) //wires everything in the config to the root component - AppComponent
  .catch((err) => console.error(err));
