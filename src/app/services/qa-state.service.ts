import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QAItem, QaCategory } from '../models/qa.model';

@Injectable({
  providedIn: 'root'
})
export class QaStateService {
  private readonly STORAGE_KEY = 'lam_interview_qa_data';
  
  // The primary state using Angular Signals
  readonly qaList = signal<QAItem[]>([]);
  
  constructor(private http: HttpClient) {
    this.loadInitialData();
    
    // Automatically save to localStorage whenever qaList changes
    effect(() => {
      const data = this.qaList();
      if (data.length > 0) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      }
    });
  }

  /**
   * Load data from localStorage or fallback to assets/data.json
   */
  private loadInitialData() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Deep validation to check for corrupted empty object arrays
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].question) {
          this.qaList.set(parsed);
          return;
        }
      } catch (e) {
        console.error('Failed to parse stats from localStorage', e);
      }
    }
    
    // Fallback to initial assets
    this.loadDefaultJson();
  }

  /**
   * Public method to forcefully reset/load from local assets/data.json
   */
  loadDefaultJson() {
    this.http.get<QAItem[]>('assets/data.json').subscribe({
      next: (data) => {
        this.qaList.set(data);
        alert('data.json 내용을 성공적으로 가져왔습니다!');
      },
      error: (err) => {
        console.error('Failed to load initial data.json', err);
        alert('data.json 파일을 불러오는데 실패했습니다.');
      }
    });
  }

  addQa(item: Omit<QAItem, 'id'>) {
    const newItem: QAItem = {
      ...item,
      id: crypto.randomUUID()
    };
    this.qaList.update(list => [...list, newItem]);
  }

  updateQa(updatedItem: QAItem) {
    this.qaList.update(list => list.map(item => item.id === updatedItem.id ? updatedItem : item));
  }

  deleteQa(id: string) {
    this.qaList.update(list => list.filter(item => item.id !== id));
  }

  /**
   * Export JSON file
   */
  exportJson() {
    const dataStr = JSON.stringify(this.qaList(), null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qa_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import from JSON File
   */
  importJson(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          this.qaList.set(parsed);
          alert('Successfully imported data.');
        } else {
          alert('Invalid JSON file format.');
        }
      } catch (err) {
        alert('Failed to read file.');
      }
    };
    reader.readAsText(file);
  }
}
