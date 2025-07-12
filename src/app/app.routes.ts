import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Error } from './error/error';
import { Summary } from './summary/summary';
import { authGuard } from './auth-guard';
import { Loading } from './loading/loading';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: Home,
        canActivate: [authGuard],
    },
    { path: 'loading', component: Loading, canActivate: [authGuard] },
    { path: 'summary', component: Summary, canActivate: [authGuard] },
    { path: '**', component: Error, canActivate: [authGuard] }
];