export type GradeLevel = 'grade1' | 'grade2';

export type MathCategory = 
  | 'counting'        // عد الأشياء
  | 'addition'        // الجمع البسيط
  | 'subtraction'     // الطرح البسيط
  | 'comparison'      // مقارنة الأعداد (> < =)
  | 'place_value'     // القيمة المنزلية (آحاد وعشرات)
  | 'patterns'        // الأنماط والأعداد الناقصة
  | 'multiplication'  // مقدمة الضرب (مجموعات)
  | 'fractions';      // الكسور البسيطة (نصف وربع)

export interface MathQuestion {
  id: string;
  grade: GradeLevel;
  category: MathCategory;
  questionText: string;
  questionSpeechText?: string;
  visualType: 'items' | 'ten_frame' | 'crocodile' | 'blocks' | 'multi_groups' | 'pie_fraction' | 'numbers_only';
  visualData?: {
    itemIcon?: 'apple' | 'star' | 'carrot' | 'fish' | 'butterfly' | 'balloon';
    count1?: number;
    count2?: number;
    subtractedCount?: number;
    tens?: number;
    ones?: number;
    num1?: number;
    num2?: number;
    groups?: number;
    itemsPerGroup?: number;
    fractionPart?: number;
    fractionTotal?: number;
    patternItems?: (number | string)[];
  };
  options: (number | string)[];
  correctAnswer: number | string;
  explanation: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  animal: 'rabbit' | 'bear' | 'owl' | 'robot';
  avatarColor: string;
  greeting: string;
  favoriteFoodOrItem: string;
  phrases: {
    correct: string[];
    wrong: string[];
    idle: string[];
  };
}

export interface LevelInfo {
  id: number;
  grade: GradeLevel;
  category: MathCategory;
  title: string;
  subtitle: string;
  islandName: string;
  requiredStarsToUnlock: number;
  icon: string;
  color: string;
  borderColor: string;
}

export interface UserProgress {
  playerName: string;
  selectedCharacterId: string;
  activeGrade: GradeLevel;
  starsCount: number;
  coinsCount: number;
  levelScores: Record<number, number>; // levelId -> stars (1-3)
  unlockedStickers: string[];
  soundEnabled: boolean;
  voiceEnabled: boolean;
  lastPlayedTimestamp: number;
}

export interface Sticker {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAtStars: number;
  badgeBg: string;
}
