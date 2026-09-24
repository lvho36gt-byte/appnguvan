export type NavItem =
  | 'home'
  | 'curriculum'
  | 'ai-workspace'
  | 'ai-ecosystem'
  | 'reading'
  | 'mindmap'
  | 'games'
  | 'tutor'
  | 'profile'
  | 'teacher';

export type GradeLevel = '6' | '7' | '8' | '9';

export interface UserProfile {
  name: string;
  className: string;
  school: string;
  avatar: string;
  totalExercises: number;
  completedExercises: number;
  streakDays: number;
  avgScore: number;
  studyHours: number;
  unlockedBadges: string[];
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface ReadingQuestion {
  id: string;
  level: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';
  question: string;
  hint1: string;
  hint2: string;
  explanation: string;
  sampleAnswer: string;
}

export interface ReadingText {
  id: string;
  title: string;
  author: string;
  grade: GradeLevel;
  passage: string;
  questions: ReadingQuestion[];
}

export interface GameQuestionItem {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface UnitItem {
  id: string;
  order: number;
  title: string;
  description: string;
  readingPassages: string[];
  writingSkill: string;
  vietnamesePractice: string;
  speakingListening: string;
}

export interface GradeCurriculum {
  grade: number;
  units: UnitItem[];
}
