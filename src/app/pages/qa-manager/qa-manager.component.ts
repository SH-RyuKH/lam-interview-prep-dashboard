import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QaStateService } from '../../services/qa-state.service';
import { QaCategory, QAItem } from '../../models/qa.model';
import { LucideAngularModule, Import, Download, Trash2, PlusCircle } from 'lucide-angular';

@Component({
  selector: 'app-qa-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in pb-12">
      <!-- Header / Actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">All Questions List & Manage</h2>
          <p class="text-slate-500 text-sm mt-1">View all interview questions, add new ones, or import data.</p>
        </div>
        <div class="flex gap-2">
          <button (click)="loadDefault()" class="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-sm">
            <lucide-icon [img]="Import" [size]="18"></lucide-icon>
            Load data.json
          </button>
          <button (click)="exportData()" class="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-medium text-sm">
            <lucide-icon [img]="Download" [size]="18"></lucide-icon>
            Export Backup
          </button>
        </div>
      </div>

      <div class="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6">
        
        <!-- Add Form (Moved to left visually on large screens, bottom on mobile) -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-24">
            <h3 class="text-lg font-bold mb-4 text-slate-800">Add New QA</h3>
            
            <div class="flex flex-col gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <select [(ngModel)]="newCategory" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer">
                  <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Question</label>
                <textarea [(ngModel)]="newQuestion" rows="3" placeholder="e.g. Tell me about yourself" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Answer</label>
                <textarea [(ngModel)]="newAnswer" rows="6" placeholder="Your standard interview answer..." class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
              </div>
              
              <button (click)="addQa()" class="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-bold shadow-md shadow-blue-200">
                <lucide-icon [img]="PlusCircle" [size]="20"></lucide-icon>
                Save entry
              </button>
            </div>
          </div>
        </div>
        
        <!-- List -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          <div *ngIf="qaList.length === 0" class="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <p class="text-slate-500">No QA entries found. Please add or import some.</p>
          </div>
          
          <div *ngFor="let item of qaList" class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start gap-4">
              <div class="flex-1">
                <span class="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md mb-3">
                  {{ item.category }}
                </span>
                <p class="font-bold text-slate-800 text-lg mb-2">Q: {{ item.question }}</p>
                <p class="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed border-l-4 border-blue-200 pl-3">A: {{ item.answer }}</p>
              </div>
              <button (click)="deleteQa(item.id)" class="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 flex-shrink-0">
                <lucide-icon [img]="Trash2" [size]="20"></lucide-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class QaManagerComponent {
  // Inject Lucide icons into the component
  readonly Import = Import;
  readonly Download = Download;
  readonly Trash2 = Trash2;
  readonly PlusCircle = PlusCircle;

  private state = inject(QaStateService);

  readonly categories: QaCategory[] = ['Personality', 'Technical (Semiconductor/MES)', 'Project Experience'];
  
  newCategory: QaCategory = 'Personality';
  newQuestion = '';
  newAnswer = '';

  get qaList() {
    return this.state.qaList();
  }

  addQa() {
    if (!this.newQuestion.trim() || !this.newAnswer.trim()) return;
    this.state.addQa({
      category: this.newCategory,
      question: this.newQuestion,
      answer: this.newAnswer
    });
    this.newQuestion = '';
    this.newAnswer = '';
  }

  deleteQa(id: string) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.state.deleteQa(id);
    }
  }

  exportData() {
    this.state.exportJson();
  }

  loadDefault() {
    this.state.loadDefaultJson();
  }
}
