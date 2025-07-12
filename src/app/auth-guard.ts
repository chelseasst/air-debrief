import { CanActivateFn } from '@angular/router';
import { Transcript } from './transcript';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const transcriptService = inject(Transcript);
  const currentPath = state.url;

  if (currentPath === '/home') {
    transcriptService.listening.set(false);
    transcriptService.loading.set(false);
    transcriptService.hasSummary.set(false);
  }
  if (currentPath === '/summary') {
    transcriptService.hasSummary.set(true);
    transcriptService.listening.set(false);
    transcriptService.loading.set(false);
  }
  return true;
};
