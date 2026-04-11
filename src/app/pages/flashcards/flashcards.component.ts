import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QaStateService } from '../../services/qa-state.service';
import { MarkdownExportService } from '../../services/export.service';
import { TtsService } from '../../services/tts.service';
import { QaCategory, QAItem } from '../../models/qa.model';
import { LucideAngularModule, ChevronLeft, ChevronRight, Shuffle, Download, Volume2, Inbox, Square } from 'lucide-angular';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in pb-12">
      
      <!-- Toolbox Header -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex items-center gap-4 w-full md:w-auto">
          <select [ngModel]="selectedCategory()" (ngModelChange)="onCategoryChange($event)" class="w-full md:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 cursor-pointer">
            <option value="All">All Categories</option>
            <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
          </select>
          
          <button (click)="shuffleCards()" class="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-bold border border-slate-200 shadow-sm">
            <lucide-icon [img]="Shuffle" [size]="18"></lucide-icon>
            <span>Shuffle</span>
          </button>
        </div>
        
        <div class="flex items-center gap-4 w-full md:w-auto">
          <div class="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <lucide-icon [img]="Volume2" [size]="16" class="text-slate-500"></lucide-icon>
            <span>Speed: {{ttsRate}}x</span>
            <input type="range" min="0.5" max="1.5" step="0.1" [(ngModel)]="ttsRate" class="w-20 md:w-24 accent-blue-500 cursor-pointer">
          </div>
          
          <button (click)="exportPdf()" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-colors font-bold shadow-md">
            <lucide-icon [img]="Download" [size]="18"></lucide-icon>
            <span class="hidden md:inline">Export PDF</span>
          </button>
        </div>
      </div>

      <!-- Flashcards Area -->
      <div *ngIf="filteredList().length > 0; else noCards" class="flex flex-col items-center gap-8 mt-4">
        
        <!-- Progress -->
        <div class="flex items-center justify-between w-full max-w-4xl px-2">
          <p class="text-slate-500 font-bold tracking-wide text-sm bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
            CARD {{ currentIndex() + 1 }} OUT OF {{ filteredList().length }}
          </p>
          <div class="text-xs font-bold text-slate-400">Click card to reveal answer</div>
        </div>

        <!-- Carousel Layout with Buttons -->
        <div class="relative flex items-center justify-center w-full max-w-5xl gap-4">
          
          <!-- Prev Button -->
          <button (click)="prevCard()" class="absolute left-0 lg:-left-12 z-20 p-5 bg-white shadow-lg border border-slate-200 text-slate-700 rounded-full transition-transform hover:scale-110 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center text-4xl" [disabled]="currentIndex() === 0">
            <lucide-icon [img]="ChevronLeft" [size]="36"></lucide-icon>
          </button>

          <!-- 3D Card -->
          <div class="perspective-1000 w-full max-w-3xl h-[450px] sm:h-[400px] cursor-pointer group mx-16 lg:mx-0" (click)="flipCard()">
            <div class="relative w-full h-full duration-500 transform-style-3d shadow-2xl rounded-[2rem] border border-slate-200"
                 [ngClass]="{'rotate-y-180': isFlipped}">
              
              <!-- Front (Question) -->
              <div class="absolute inset-0 backface-hidden bg-white rounded-[2rem] overflow-hidden">
                <!-- Inner padding wrapper to avoid flexbox reflow bugs in Chrome 3D context -->
                <div class="w-full h-full p-8 flex flex-col relative text-center items-center justify-center">
                  
                  <span class="absolute top-6 left-6 inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                    {{ currentItem()?.category }}
                  </span>
                  
                  <button (click)="speak(currentItem()?.question, $event)" 
                    class="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 hover:bg-slate-200 rounded-full transition-colors font-bold z-10 text-sm shadow-sm border"
                    [ngClass]="isSpeakingQuestion() ? 'bg-red-100 text-red-600 border-red-200' : 'bg-slate-100 text-slate-700 border-slate-200'">
                    <lucide-icon [img]="isSpeakingQuestion() ? Square : Volume2" [size]="18"></lucide-icon>
                    <span class="hidden sm:inline">{{ isSpeakingQuestion() ? 'Stop' : 'Listen (원어민 발음)' }}</span>
                  </button>
                  
                  <ng-container *ngIf="showText">
                    <div class="w-full mt-4 px-4 block">
                      <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
                        {{ currentItem()?.question || 'Question parsing error' }}
                      </h3>
                    </div>
                  </ng-container>

                </div>
              </div>

              <!-- Back (Answer) -->
              <div class="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[2rem] overflow-hidden">
                <div class="w-full h-full p-8 flex flex-col relative pt-20">
                   <button (click)="speak(currentItem()?.answer, $event)" 
                    class="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 hover:bg-white/20 rounded-full transition-colors font-bold z-10 text-sm shadow-sm backdrop-blur-sm border"
                    [ngClass]="isSpeakingAnswer() ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-white/10 text-blue-300 border-white/10'">
                    <lucide-icon [img]="isSpeakingAnswer() ? Square : Volume2" [size]="18"></lucide-icon>
                    <span class="hidden sm:inline">{{ isSpeakingAnswer() ? 'Stop' : 'Listen (원어민 발음)' }}</span>
                  </button>
                  
                  <ng-container *ngIf="showText">
                    <div class="block w-full h-full overflow-y-auto px-2 custom-scrollbar text-left pb-4">
                      <p class="text-lg sm:text-xl font-medium leading-relaxed text-slate-100 whitespace-pre-wrap">
                        {{ currentItem()?.answer }}
                      </p>
                    </div>
                  </ng-container>
                </div>
              </div>
              
            </div>
          </div>

          <!-- Next Button -->
          <button (click)="nextCard()" class="absolute right-0 lg:-right-12 z-20 p-5 bg-white shadow-lg border border-slate-200 text-slate-700 rounded-full transition-transform hover:scale-110 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center text-4xl" [disabled]="currentIndex() === filteredList().length - 1">
            <lucide-icon [img]="ChevronRight" [size]="36"></lucide-icon>
          </button>

        </div>

      </div>
      
      <ng-template #noCards>
        <div class="flex flex-col items-center justify-center p-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 mt-8">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <lucide-icon [img]="Inbox" [size]="32"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-700 mb-2">No flashcards found</h3>
          <p class="text-slate-500">Go to All List & Manage to add new cards or select 'All Categories'.</p>
        </div>
      </ng-template>

    </div>
  `
})
export class FlashcardsComponent {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Shuffle = Shuffle;
  readonly Download = Download;
  readonly Volume2 = Volume2;
  readonly Inbox = Inbox;
  readonly Square = Square;

  private state = inject(QaStateService);
  private exportService = inject(MarkdownExportService);
  private tts = inject(TtsService);

  readonly categories: QaCategory[] = ['Personality', 'Technical (Semiconductor/MES)', 'Project Experience'];
  
  selectedCategory = signal<string>('All');
  currentIndex = signal<number>(0);
  
  isFlipped = false;
  ttsRate = 1.0;

  get qaList() {
    return this.state.qaList();
  }

  filteredList = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.qaList;
    return this.qaList.filter(item => item.category === cat);
  });

  currentItem = computed(() => {
    const list = this.filteredList();
    const idx = this.currentIndex();
    if (list.length > 0 && idx < list.length) {
      return list[idx];
    }
    return null;
  });

  isSpeakingQuestion = computed(() => {
    return this.tts.isSpeaking() && (this.tts.currentText() === this.currentItem()?.question);
  });

  isSpeakingAnswer = computed(() => {
    return this.tts.isSpeaking() && (this.tts.currentText() === this.currentItem()?.answer);
  });

  onCategoryChange(newCat: string) {
    this.tts.stop();
    this.selectedCategory.set(newCat);
    this.currentIndex.set(0);
    this.isFlipped = false;
  }

  nextCard() {
    this.tts.stop();
    if (this.currentIndex() < this.filteredList().length - 1) {
      this.isFlipped = false;
      this.remountContent();
      setTimeout(() => this.currentIndex.update(v => v + 1), 150);
    }
  }

  prevCard() {
    this.tts.stop();
    if (this.currentIndex() > 0) {
      this.isFlipped = false;
      this.remountContent();
      setTimeout(() => this.currentIndex.update(v => v - 1), 150);
    }
  }

  shuffleCards() {
    this.tts.stop();
    const arr: QAItem[] = JSON.parse(JSON.stringify(this.state.qaList()));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    this.state.qaList.set(arr);
    this.currentIndex.set(0);
    this.isFlipped = false;
    this.remountContent();
  }

  flipCard() {
    this.tts.stop();
    this.isFlipped = !this.isFlipped;
  }

  // Force DOM node recreation to fix WebKit 3D text disappearance bug
  showText = true;
  private remountContent() {
    this.showText = false;
    setTimeout(() => this.showText = true, 50);
  }

  speak(text: string | undefined, event: Event) {
    event.stopPropagation(); // Prevent card from flipping when clicking the button
    if (text) {
      this.tts.toggleSpeak(text, this.ttsRate);
    }
  }

  exportPdf() {
    this.exportService.generatePdf(this.qaList);
  }

  ngOnDestroy() {
    this.tts.stop();
  }
}
