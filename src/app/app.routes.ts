import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'flashcards', pathMatch: 'full' },
  { path: 'manager', loadComponent: () => import('./pages/qa-manager/qa-manager.component').then(m => m.QaManagerComponent) },
  { path: 'flashcards', loadComponent: () => import('./pages/flashcards/flashcards.component').then(m => m.FlashcardsComponent) },
];
