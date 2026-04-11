import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex flex-col font-sans">
      <header class="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity" routerLink="/flashcards">
            <img src="assets/shiba_logo.png" alt="VerbalEdge Logo" class="w-10 h-10 object-cover rounded-xl shadow-lg ring-2 ring-blue-300 hover:scale-105 transition-transform bg-slate-800">
            <div class="flex flex-col">
              <h1 class="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 tracking-tight leading-none mb-0.5">
                VerbalEdge
              </h1>
              <span class="text-[10px] text-teal-300/80 font-bold uppercase tracking-widest leading-none">English Interview Pro</span>
            </div>
          </div>
          <nav class="flex gap-2">
            <a routerLink="/flashcards" routerLinkActive="bg-white/20 text-white font-semibold" class="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium">Flashcards</a>
            <a routerLink="/manager" routerLinkActive="bg-white/20 text-white font-semibold" class="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium">All List & Manage</a>
          </nav>
        </div>
      </header>
      
      <main class="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
}
