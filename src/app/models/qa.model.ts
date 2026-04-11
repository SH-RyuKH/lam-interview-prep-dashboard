export type QaCategory = 'Personality' | 'Technical (Semiconductor/MES)' | 'Project Experience';

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: QaCategory;
}
