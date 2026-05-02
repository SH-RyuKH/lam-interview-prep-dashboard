import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QAItem, QaCategory } from '../models/qa.model';
import { environment } from '../../environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class QaStateService {
  private readonly STORAGE_KEY = 'lam_interview_qa_data';
  
  // The primary state using Angular Signals
  readonly qaList = signal<QAItem[]>([]);
  
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);
  private qaCollection = collection(this.db, 'qaList');
  
  // Track if we already attempted to load default json to prevent loop
  private attemptedDefaultLoad = false;
  
  constructor(private http: HttpClient) {
    this.setupFirestoreListener();
  }

  private setupFirestoreListener() {
    onSnapshot(this.qaCollection, (snapshot) => {
      if (snapshot.empty && this.qaList().length === 0 && !this.attemptedDefaultLoad) {
        // If Firestore is empty, try loading from assets and populate Firestore
        this.attemptedDefaultLoad = true;
        this.loadDefaultJsonToFirestore();
      } else {
        const data: QAItem[] = [];
        snapshot.forEach(doc => {
          data.push({ ...doc.data() } as QAItem);
        });
        this.qaList.set(data);
      }
    }, (error) => {
      console.error("Error listening to Firestore:", error);
    });
  }

  private loadDefaultJsonToFirestore() {
    this.http.get<QAItem[]>('assets/data.json').subscribe({
      next: async (data) => {
        try {
          if (!data || data.length === 0) return;
          // Upload to Firestore using batch
          const batch = writeBatch(this.db);
          data.forEach(item => {
            // ensure it has an id
            const id = item.id || crypto.randomUUID();
            item.id = id;
            const docRef = doc(this.qaCollection, id);
            batch.set(docRef, item);
          });
          await batch.commit();
          console.log('Successfully initialized Firestore with data.json');
        } catch (error) {
          console.error('Failed to initialize Firestore', error);
        }
      },
      error: (err) => {
        console.error('Failed to load initial data.json', err);
      }
    });
  }

  /**
   * Public method to forcefully reset/load from local assets/data.json
   */
  loadDefaultJson() {
    this.http.get<QAItem[]>('assets/data.json').subscribe({
      next: async (data) => {
        try {
          const batch = writeBatch(this.db);
          data.forEach(item => {
            const id = item.id || crypto.randomUUID();
            item.id = id;
            const docRef = doc(this.qaCollection, id);
            batch.set(docRef, item);
          });
          await batch.commit();
          alert('data.json 내용을 성공적으로 Firestore에 복원했습니다!');
        } catch(e) {
          console.error(e);
          alert('Firestore에 저장하는데 실패했습니다.');
        }
      },
      error: (err) => {
        console.error('Failed to load initial data.json', err);
        alert('data.json 파일을 불러오는데 실패했습니다.');
      }
    });
  }

  async addQa(item: Omit<QAItem, 'id'>) {
    const id = crypto.randomUUID();
    const newItem: QAItem = {
      ...item,
      id
    };
    const docRef = doc(this.qaCollection, id);
    await setDoc(docRef, newItem);
  }

  async updateQa(updatedItem: QAItem) {
    const docRef = doc(this.qaCollection, updatedItem.id);
    await updateDoc(docRef, { ...updatedItem });
  }

  async deleteQa(id: string) {
    const docRef = doc(this.qaCollection, id);
    await deleteDoc(docRef);
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
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          const batch = writeBatch(this.db);
          parsed.forEach(item => {
            const id = item.id || crypto.randomUUID();
            item.id = id;
            const docRef = doc(this.qaCollection, id);
            batch.set(docRef, item);
          });
          await batch.commit();
          alert('Successfully imported data to Firestore.');
        } else {
          alert('Invalid JSON file format.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to read file or write to Firestore.');
      }
    };
    reader.readAsText(file);
  }
}
