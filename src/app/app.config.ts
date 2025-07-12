import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ //defines global services for the app
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes) //inject the routes into the app
  ]
};
//No need to import RouterModule.forRoot(routes) anymore
//All components that need routing, can access this one