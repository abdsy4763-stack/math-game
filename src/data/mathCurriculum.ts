import { LevelInfo, MathQuestion, GradeLevel } from '../types/game';

export const LEVELS: LevelInfo[] = [
  // === الصف الأول الابتدائي (Grade 1) ===
  {
    id: 1,
    grade: 'grade1',
    category: 'counting',
    title: 'عد الكنوز اللطيفة',
    subtitle: 'الأعداد من 1 إلى 10',
    islandName: 'جزيرة الفواكه المرحة 🍎',
    requiredStarsToUnlock: 0,
    icon: '🍎',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-400'
  },
  {
    id: 2,
    grade: 'grade1',
    category: 'addition',
    title: 'سلة الجمع البسيط',
    subtitle: 'جمع الأعداد حتى 10',
    islandName: 'واحة الجمع السريع ➕',
    requiredStarsToUnlock: 2,
    icon: '➕',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-400'
  },
  {
    id: 3,
    grade: 'grade1',
    category: 'subtraction',
    title: 'مغامرة الطرح اللطيف',
    subtitle: 'كم بقي معنا؟ حتى 10',
    islandName: 'غابة الطرح والمرح 🎈',
    requiredStarsToUnlock: 4,
    icon: '🎈',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-400'
  },
  {
    id: 4,
    grade: 'grade1',
    category: 'comparison',
    title: 'تمساح الأرقام الجائع',
    subtitle: 'أكبر من (>)، أصغر من (<)، يساوي (=)',
    islandName: 'بحيرة التمساح الذكي 🐊',
    requiredStarsToUnlock: 7,
    icon: '🐊',
    color: 'from-teal-400 to-emerald-600',
    borderColor: 'border-teal-400'
  },
  {
    id: 5,
    grade: 'grade1',
    category: 'patterns',
    title: 'قطار الأرقام المتتالية',
    subtitle: 'اكتشف الرقم المفقود في السلسلة',
    islandName: 'محطة قطار الأرقام 🚂',
    requiredStarsToUnlock: 10,
    icon: '🚂',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-400'
  },
  {
    id: 6,
    grade: 'grade1',
    category: 'addition',
    title: 'تحدي إطار العشرة',
    subtitle: 'الجمع حتى 20 ومكونات العشرة',
    islandName: 'قلعة الأبطال الصغار 🏰',
    requiredStarsToUnlock: 13,
    icon: '⭐',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-400'
  },

  // === الصف الثاني الابتدائي (Grade 2) ===
  {
    id: 7,
    grade: 'grade2',
    category: 'place_value',
    title: 'أبراج الآحاد والعشرات',
    subtitle: 'قيمة الرقم في منزلة الآحاد والعشرات',
    islandName: 'مدينة الأبراج المكعبة 🏙️',
    requiredStarsToUnlock: 0,
    icon: '🏢',
    color: 'from-indigo-400 to-violet-600',
    borderColor: 'border-indigo-400'
  },
  {
    id: 8,
    grade: 'grade2',
    category: 'addition',
    title: 'جمع العشرات الذكي',
    subtitle: 'جمع أعداد من رقمين حتى 100',
    islandName: 'وادي الجمع الذهبي 🪙',
    requiredStarsToUnlock: 2,
    icon: '💡',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500'
  },
  {
    id: 9,
    grade: 'grade2',
    category: 'subtraction',
    title: 'طرح الأعداد حتى 100',
    subtitle: 'طرح العشرات والآحاد بمهارة',
    islandName: 'كهف الألغاز الحسابية 💎',
    requiredStarsToUnlock: 4,
    icon: '💎',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500'
  },
  {
    id: 10,
    grade: 'grade2',
    category: 'multiplication',
    title: 'مجموعات الضرب الممتعة',
    subtitle: 'الضرب كجمع متكرر (جداول 2 و 3 و 5)',
    islandName: 'حديقة المجموعات المتساوية 🐝',
    requiredStarsToUnlock: 7,
    icon: '✖️',
    color: 'from-emerald-500 to-teal-700',
    borderColor: 'border-emerald-500'
  },
  {
    id: 11,
    grade: 'grade2',
    category: 'fractions',
    title: 'حفلة بيتزا الكسور',
    subtitle: 'الكسور البسيطة: النصف والربع',
    islandName: 'مطبخ الشيف الصغير 🍕',
    requiredStarsToUnlock: 10,
    icon: '🍕',
    color: 'from-orange-400 to-red-500',
    borderColor: 'border-orange-400'
  },
  {
    id: 12,
    grade: 'grade2',
    category: 'patterns',
    title: 'تحدي قفزات الأرانب (العد القفزي)',
    subtitle: 'العد القفزي اثنينات، خمسات، وعشرات',
    islandName: 'قمة أبطال الرياضيات الكبرى 👑',
    requiredStarsToUnlock: 13,
    icon: '👑',
    color: 'from-fuchsia-500 to-purple-700',
    borderColor: 'border-fuchsia-500'
  }
];

// Helper to shuffle choices
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Arabic words for numbers 1 to 20
export const ARABIC_NUM_WORDS: Record<number, string> = {
  1: 'واحِد',
  2: 'اثْنان',
  3: 'ثَلاثَة',
  4: 'أَرْبَعَة',
  5: 'خَمْسَة',
  6: 'سِتَّة',
  7: 'سَبْعَة',
  8: 'ثَمانِيَة',
  9: 'تِسْعَة',
  10: 'عَشَرَة',
  11: 'أَحَدَ عَشَر',
  12: 'اثْنا عَشَر',
  13: 'ثَلاثَةَ عَشَر',
  14: 'أَرْبَعَةَ عَشَر',
  15: 'خَمْسَةَ عَشَر',
  16: 'سِتَّةَ عَشَر',
  17: 'سَبْعَةَ عَشَر',
  18: 'ثَمانِيَةَ عَشَر',
  19: 'تِسْعَةَ عَشَر',
  20: 'عِشْرُون'
};

// Generate rich, pedagogical questions for each level with authentic classical Arabic speech
export function getQuestionsForLevel(levelId: number): MathQuestion[] {
  switch (levelId) {
    // Level 1: Counting objects (1 to 10)
    case 1: {
      const counts = [3, 5, 4, 7, 6];
      const itemsList: ('apple' | 'star' | 'carrot' | 'fish' | 'balloon')[] = [
        'apple', 'carrot', 'star', 'fish', 'balloon'
      ];
      const spokenItemNames: Record<string, string> = {
        apple: 'تُفَّاحات',
        carrot: 'جَزَرات',
        star: 'نُجُوم',
        fish: 'أَسْماك',
        balloon: 'بالونات'
      };
      const displayItemNames: Record<string, string> = {
        apple: 'تفاحات',
        carrot: 'جزرات',
        star: 'نجوم',
        fish: 'أسماك',
        balloon: 'بالونات'
      };

      return counts.map((c, idx) => {
        const item = itemsList[idx % itemsList.length];
        const correct = c;
        const options = shuffle([correct, correct + 1, Math.max(1, correct - 1), correct + 2]);
        return {
          id: `l1_q${idx + 1}`,
          grade: 'grade1',
          category: 'counting',
          questionText: `كم عدد الـ${displayItemNames[item]} المعروضة أمامك؟ (اضغط عليها لعدها!)`,
          questionSpeechText: `كَمْ عَدَدُ ال${spokenItemNames[item]} المَعْرُوضَةِ أَمامَكَ فِي الصُّورَة؟ اِلْمِسْها لِتَعُدَّها!`,
          visualType: 'items',
          visualData: {
            itemIcon: item,
            count1: c
          },
          options,
          correctAnswer: correct,
          explanation: `أحسنت! عدد ${displayItemNames[item]} هو ${correct}.`
        };
      });
    }

    // Level 2: Simple addition up to 10
    case 2: {
      const pairs = [
        { a: 2, b: 3, item: 'apple' as const, aWord: 'اثْنَيْن', bWord: 'ثَلاثَة' },
        { a: 4, b: 1, item: 'carrot' as const, aWord: 'أَرْبَعَة', bWord: 'واحِد' },
        { a: 3, b: 3, item: 'star' as const, aWord: 'ثَلاثَة', bWord: 'ثَلاثَة' },
        { a: 5, b: 2, item: 'fish' as const, aWord: 'خَمْسَة', bWord: 'اثْنَيْن' },
        { a: 4, b: 4, item: 'balloon' as const, aWord: 'أَرْبَعَة', bWord: 'أَرْبَعَة' }
      ];
      return pairs.map((p, idx) => {
        const sum = p.a + p.b;
        const options = shuffle([sum, sum + 1, Math.max(1, sum - 1), sum + 2]);
        return {
          id: `l2_q${idx + 1}`,
          grade: 'grade1',
          category: 'addition',
          questionText: `ما ناتج الجمع: ${p.a} + ${p.b} = ؟`,
          questionSpeechText: `ما ناتِجُ جَمْعِ ${p.aWord} زائِد ${p.bWord}؟ كَمْ يُساوِي المَجْمُوع؟`,
          visualType: 'items',
          visualData: {
            itemIcon: p.item,
            count1: p.a,
            count2: p.b
          },
          options,
          correctAnswer: sum,
          explanation: `ممتاز! ${p.a} مع ${p.b} يساوي ${sum}.`
        };
      });
    }

    // Level 3: Simple subtraction up to 10
    case 3: {
      const problems = [
        { total: 5, sub: 2, totalWord: 'خَمْسَة', subWord: 'اثْنَيْن', item: 'balloon' as const, reason: 'طار منها بالونتان' },
        { total: 6, sub: 3, totalWord: 'سِتَّة', subWord: 'ثَلاثَة', item: 'apple' as const, reason: 'أكل الأرنب 3 تفاحات' },
        { total: 7, sub: 2, totalWord: 'سَبْعَة', subWord: 'اثْنَيْن', item: 'fish' as const, reason: 'سبحت سمكتان بعيداً' },
        { total: 4, sub: 1, totalWord: 'أَرْبَعَة', subWord: 'واحِد', item: 'carrot' as const, reason: 'أكل سُمسُم جزرة واحدة' },
        { total: 8, sub: 4, totalWord: 'ثَمانِيَة', subWord: 'أَرْبَعَة', item: 'star' as const, reason: 'اختفت 4 نجوم خلف السحاب' }
      ];
      return problems.map((prob, idx) => {
        const remaining = prob.total - prob.sub;
        const options = shuffle([remaining, remaining + 1, Math.max(0, remaining - 1), remaining + 2]);
        return {
          id: `l3_q${idx + 1}`,
          grade: 'grade1',
          category: 'subtraction',
          questionText: `كان لدينا ${prob.total}، و${prob.reason}. كم بقي لدينا؟ (${prob.total} - ${prob.sub} = ؟)`,
          questionSpeechText: `كانَ مَعَنا ${prob.totalWord}، طُرِحَ مِنْها ${prob.subWord}. ${prob.totalWord} ناقِص ${prob.subWord}، كَمْ بَقِيَ مَعَنا؟`,
          visualType: 'items',
          visualData: {
            itemIcon: prob.item,
            count1: prob.total,
            subtractedCount: prob.sub
          },
          options,
          correctAnswer: remaining,
          explanation: `رائع! ${prob.total} ناقص ${prob.sub} يعطينا ${remaining}.`
        };
      });
    }

    // Level 4: Comparison (< > =) with Crocodile
    case 4: {
      const pairs = [
        { n1: 7, n2: 4, w1: 'سَبْعَة', w2: 'أَرْبَعَة', expected: '>' },
        { n1: 3, n2: 8, w1: 'ثَلاثَة', w2: 'ثَمانِيَة', expected: '<' },
        { n1: 5, n2: 5, w1: 'خَمْسَة', w2: 'خَمْسَة', expected: '=' },
        { n1: 9, n2: 6, w1: 'تِسْعَة', w2: 'سِتَّة', expected: '>' },
        { n1: 2, n2: 9, w1: 'اثْنَيْن', w2: 'تِسْعَة', expected: '<' }
      ];
      return pairs.map((pair, idx) => {
        return {
          id: `l4_q${idx + 1}`,
          grade: 'grade1',
          category: 'comparison',
          questionText: `أي رمز تختار لتمساح الأرقام الجائع لمقارنة ${pair.n1} و ${pair.n2}؟`,
          questionSpeechText: `قارِنْ بَيْنَ العَدَدَيْنِ: ${pair.w1} و ${pair.w2}. أَيَّ رَمْزٍ يَخْتارُ تِمْساحُ الأَرْقامِ الجائِع؟`,
          visualType: 'crocodile',
          visualData: {
            num1: pair.n1,
            num2: pair.n2
          },
          options: ['>', '<', '='],
          correctAnswer: pair.expected,
          explanation: pair.expected === '='
            ? `العددان متساويان تماماً: ${pair.n1} = ${pair.n2}`
            : pair.expected === '>'
            ? `التمساح يفتح فمه للعدد الأكبر: ${pair.n1} أكبر من ${pair.n2}`
            : `التمساح يفتح فمه للعدد الأكبر: ${pair.n1} أصغر من ${pair.n2}`
        };
      });
    }

    // Level 5: Number Patterns & Missing Numbers
    case 5: {
      const patterns = [
        { sequence: [1, 2, 3, '؟', 5], correct: 4, options: [3, 4, 6, 5], speech: 'واحِد، اثْنان، ثَلاثَة، ما الرَّقْمُ التّالِي لِيَكْتَمِلَ القِطار؟' },
        { sequence: [2, 4, 6, '؟', 10], correct: 8, options: [7, 8, 9, 12], speech: 'نَقْفِزُ بِاثْنَيْن: اثْنان، أَرْبَعَة، سِتَّة، ما الرَّقْمُ المَفْقُود؟' },
        { sequence: [5, 6, '؟', 8, 9], correct: 7, options: [6, 7, 10, 4], speech: 'خَمْسَة، سِتَّة، ثُمَّ ما الرَّقْمُ الَّذِي يَأْتِي بَعْدَهُما؟' },
        { sequence: [10, 9, 8, '؟', 6], correct: 7, options: [5, 7, 8, 6], speech: 'عَدٌّ تَنازُلِيّ: عَشَرَة، تِسْعَة، ثَمانِيَة، ما هُوَ الرَّقْمُ المَفْقُود؟' },
        { sequence: [1, 3, 5, '؟', 9], correct: 7, options: [6, 7, 8, 11], speech: 'أَعْدادٌ فَرْدِيَّة: واحِد، ثَلاثَة، خَمْسَة، ما الرَّقْمُ التّالِي؟' }
      ];
      return patterns.map((p, idx) => {
        return {
          id: `l5_q${idx + 1}`,
          grade: 'grade1',
          category: 'patterns',
          questionText: `ما هو الرقم المناسب في مكان علامة الاستفهام (؟) ليكتمل القطار؟`,
          questionSpeechText: p.speech,
          visualType: 'numbers_only',
          visualData: {
            patternItems: p.sequence
          },
          options: shuffle(p.options),
          correctAnswer: p.correct,
          explanation: `إجابة ذكية جداً! الرقم المفقود في السلسلة هو ${p.correct}.`
        };
      });
    }

    // Level 6: Ten Frame & Addition up to 20
    case 6: {
      const problems = [
        { a: 10, b: 4, sum: 14, speech: 'عَشَرَةٌ كامِلَةٌ مَعَ أَرْبَعَة، كَمْ يُصْبِحُ المَجْمُوعُ في إِطارِ العَشَرَة؟' },
        { a: 8, b: 5, sum: 13, speech: 'ثَمانِيَةٌ زائِد خَمْسَة، كَمْ يُساوِي المَجْمُوع؟' },
        { a: 10, b: 7, sum: 17, speech: 'عَشَرَةٌ مَعَ سَبْعَة، كَمْ يُساوِي النّاتِج؟' },
        { a: 9, b: 3, sum: 12, speech: 'تِسْعَةٌ زائِد ثَلاثَة، كَمْ يُساوِي؟' },
        { a: 6, b: 6, sum: 12, speech: 'سِتَّةٌ زائِد سِتَّة، كَمْ ناتِجُ الجَمْع؟' }
      ];
      return problems.map((p, idx) => {
        const options = shuffle([p.sum, p.sum + 1, p.sum - 1, p.sum + 2]);
        return {
          id: `l6_q${idx + 1}`,
          grade: 'grade1',
          category: 'addition',
          questionText: `باستخدام إطار العشرة، ما ناتج جمع: ${p.a} + ${p.b} = ؟`,
          questionSpeechText: p.speech,
          visualType: 'ten_frame',
          visualData: {
            count1: p.a,
            count2: p.b
          },
          options,
          correctAnswer: p.sum,
          explanation: `عظيم! عشرة كاملة مع ${p.b} يعطينا ${p.sum}.`
        };
      });
    }

    // === Grade 2 Levels ===
    // Level 7: Place value (tens & ones)
    case 7: {
      const numbers = [
        { tens: 3, ones: 4, value: 34, speech: 'ثَلاثُ عَشَراتٍ وأَرْبَعَةُ آحاد، ما هُوَ العَدَدُ الكُلِّي؟' },
        { tens: 5, ones: 2, value: 52, speech: 'خَمْسُ عَشَراتٍ واثْنانِ في الآحاد، كَمْ يُساوِي العَدَد؟' },
        { tens: 2, ones: 7, value: 27, speech: 'عَشْرَتانِ وسَبْعَةُ آحاد، كَمْ قِيمَةُ العَدَد؟' },
        { tens: 4, ones: 0, value: 40, speech: 'أَرْبَعُ عَشَراتٍ وصِفْرٌ في الآحاد، ما هُوَ العَدَد؟' },
        { tens: 6, ones: 5, value: 65, speech: 'سِتُّ عَشَراتٍ وخَمْسَةُ آحاد، ما هُوَ العَدَد؟' }
      ];
      return numbers.map((item, idx) => {
        const options = shuffle([item.value, item.tens * 10 + item.ones + 1, item.tens * 10 + item.ones - 2, item.ones * 10 + item.tens]);
        return {
          id: `l7_q${idx + 1}`,
          grade: 'grade2',
          category: 'place_value',
          questionText: `لدينا (${item.tens}) حزم عشرات و (${item.ones}) مكعبات آحاد. ما هو العدد الكلي؟`,
          questionSpeechText: item.speech,
          visualType: 'blocks',
          visualData: {
            tens: item.tens,
            ones: item.ones
          },
          options,
          correctAnswer: item.value,
          explanation: `مبهر! ${item.tens} عشرات (= ${item.tens * 10}) و ${item.ones} آحاد يعطينا العدد ${item.value}.`
        };
      });
    }

    // Level 8: Addition up to 100
    case 8: {
      const sums = [
        { n1: 25, n2: 13, ans: 38, speech: 'احْسُبْ ناتِجَ الجَمْع: خَمْسَةٌ وعِشْرُونَ زائِد ثَلاثَةَ عَشَر، كَمْ يُساوِي؟' },
        { n1: 42, n2: 30, ans: 72, speech: 'اثْنانِ وأَرْبَعُونَ زائِد ثَلاثِينَ، كَمْ يُساوِي المَجْمُوع؟' },
        { n1: 53, n2: 24, ans: 77, speech: 'ثَلاثَةٌ وخَمْسُونَ زائِد أَرْبَعَةٍ وعِشْرِينَ، ما هُوَ النّاتِج؟' },
        { n1: 36, n2: 41, ans: 77, speech: 'سِتَّةٌ وثَلاثُونَ زائِد واحِدٍ وأَرْبَعِينَ، كَمْ يُساوِي؟' },
        { n1: 60, n2: 25, ans: 85, speech: 'سِتُّونَ زائِد خَمْسَةٍ وعِشْرِينَ، كَمْ يُصْبِحُ العَدَد؟' }
      ];
      return sums.map((s, idx) => {
        const options = shuffle([s.ans, s.ans + 10, s.ans - 2, s.ans + 3]);
        return {
          id: `l8_q${idx + 1}`,
          grade: 'grade2',
          category: 'addition',
          questionText: `احسب ناتج الجمع: ${s.n1} + ${s.n2} = ؟`,
          questionSpeechText: s.speech,
          visualType: 'numbers_only',
          visualData: {
            num1: s.n1,
            num2: s.n2
          },
          options,
          correctAnswer: s.ans,
          explanation: `أحسنت! نجمع الآحاد معاً والعشرات معاً: ${s.n1} + ${s.n2} = ${s.ans}.`
        };
      });
    }

    // Level 9: Subtraction up to 100
    case 9: {
      const subs = [
        { n1: 58, n2: 23, ans: 35, speech: 'احْسُبْ ناتِجَ الطَّرْح: ثَمانِيَةٌ وخَمْسُونَ ناقِص ثَلاثَةٍ وعِشْرِينَ، كَمْ يَتَبَقَّى؟' },
        { n1: 76, n2: 40, ans: 36, speech: 'سِتَّةٌ وسَبْعُونَ ناقِص أَرْبَعِينَ، كَمْ يَبْقَى؟' },
        { n1: 64, n2: 31, ans: 33, speech: 'أَرْبَعَةٌ وسِتُّونَ ناقِص واحِدٍ وثَلاثِينَ، ما هُوَ النّاتِج؟' },
        { n1: 85, n2: 50, ans: 35, speech: 'خَمْسَةٌ وثَمانُونَ ناقِص خَمْسِينَ، كَمْ يُساوِي؟' },
        { n1: 49, n2: 25, ans: 24, speech: 'تِسْعَةٌ وأَرْبَعُونَ ناقِص خَمْسَةٍ وعِشْرِينَ، كَمْ يَبْقَى؟' }
      ];
      return subs.map((s, idx) => {
        const options = shuffle([s.ans, s.ans + 10, s.ans - 1, s.ans + 4]);
        return {
          id: `l9_q${idx + 1}`,
          grade: 'grade2',
          category: 'subtraction',
          questionText: `احسب ناتج الطرح: ${s.n1} - ${s.n2} = ؟`,
          questionSpeechText: s.speech,
          visualType: 'numbers_only',
          visualData: {
            num1: s.n1,
            num2: s.n2
          },
          options,
          correctAnswer: s.ans,
          explanation: `عمل رائع! نطرح الآحاد أولاً ثم العشرات: ${s.n1} - ${s.n2} = ${s.ans}.`
        };
      });
    }

    // Level 10: Intro to Multiplication (equal groups)
    case 10: {
      const mults = [
        { groups: 3, perGroup: 2, ans: 6, speech: 'لَدَيْنا ثَلاثُ مَجْمُوعاتٍ، فِي كُلِّ واحِدَةٍ تُفّاحَتان. ما حاصِلُ ضَرْبِ ثَلاثَة فِي اثْنَيْن؟' },
        { groups: 4, perGroup: 2, ans: 8, speech: 'أَرْبَعُ مَجْمُوعاتٍ، فِي كُلِّ مِنْها نَجْمَتان. أَرْبَعَة ضَرْب اثْنَيْن كَمْ يُساوِي؟' },
        { groups: 2, perGroup: 5, ans: 10, speech: 'مَجْمُوعَتانِ، فِي كُلِّ واحِدَةٍ خَمْسُ سَمَكات. اثْنان ضَرْب خَمْسَة كَمْ يُساوِي؟' },
        { groups: 3, perGroup: 3, ans: 9, speech: 'ثَلاثُ سِلالٍ، فِي كُلِّ سَلَّةٍ ثَلاثُ جَزَرات. ثَلاثَة ضَرْب ثَلاثَة كَمْ يُساوِي؟' },
        { groups: 5, perGroup: 2, ans: 10, speech: 'خَمْسَةُ أَزْواجٍ مِنَ الفَراشات. خَمْسَة ضَرْب اثْنَيْن كَمْ يُساوِي؟' }
      ];
      return mults.map((m, idx) => {
        const options = shuffle([m.ans, m.ans + 2, m.ans - 2, m.ans + 4]);
        return {
          id: `l10_q${idx + 1}`,
          grade: 'grade2',
          category: 'multiplication',
          questionText: `لدينا ${m.groups} مجموعات متساوية في كل منها ${m.perGroup} عناصر. ما حاصل الضرب: ${m.groups} × ${m.perGroup} = ؟`,
          questionSpeechText: m.speech,
          visualType: 'multi_groups',
          visualData: {
            groups: m.groups,
            itemsPerGroup: m.perGroup
          },
          options,
          correctAnswer: m.ans,
          explanation: `ممتاز! الضرب يعني جمع متكرر: ${m.groups} مجموعات من ${m.perGroup} تساوي ${m.ans}.`
        };
      });
    }

    // Level 11: Fractions (Halves and Quarters)
    case 11: {
      const fractions = [
        {
          question: 'قسمنا البيتزا إلى جزأين متساويين، وأكلنا جزءاً واحداً. ما الكسر الذي يمثل الجزء المأكول؟',
          speech: 'قَسَّمْنا البِيتْزا إِلى جُزْأَيْنِ مُتَساوِيَيْنِ، وأَكَلْنا جُزْءاً واحِداً. ما هُوَ الكَسْرُ الَّذِي يُمَثِّلُ النِّصْف؟',
          part: 1,
          total: 2,
          correct: '1/2 (نصف)',
          options: ['1/2 (نصف)', '1/4 (ربع)', '1 (واحد كامل)', '2/3']
        },
        {
          question: 'قسمنا كعكة الفراولة إلى 4 قطع متساوية، وأخذ سُمسُم قطعة واحدة. كم أخذ سُمسُم؟',
          speech: 'قَسَّمْنا كَعْكَةَ الفَراوِلَةِ إِلى أَرْبَعِ قِطَعٍ مُتَساوِيَة، وأَخَذَ سُمْسُم قِطْعَةً واحِدَة. ما هُوَ الكَسْرُ الَّذِي يُمَثِّلُ الرُّبْع؟',
          part: 1,
          total: 4,
          correct: '1/4 (ربع)',
          options: ['1/4 (ربع)', '1/2 (نصف)', '3/4', '2/4']
        },
        {
          question: 'إذا تلوّن جزءان من أصل 4 أجزاء متساوية، فهذا يعادل نصف الدائرة (2/4 = 1/2)؟',
          speech: 'جُزْءانِ مِنْ أَصْلِ أَرْبَعَةِ أَجْزاءٍ مُتَساوِيَة، ما هُوَ الكَسْرُ المُكافِئُ لَه؟',
          part: 2,
          total: 4,
          correct: 'نصف (1/2)',
          options: ['نصف (1/2)', 'ربع (1/4)', 'ثلث (1/3)', 'خمس']
        },
        {
          question: 'تفاحة قسّمها دبدوب إلى نصفين متساويين. كم نصفاً يوجد في التفاحة الكاملة؟',
          speech: 'تُفّاحَةٌ واحِدَةٌ كامِلَة، كَمْ نِصْفاً مُتَساوِياً يُوجَدُ فِيها؟',
          part: 2,
          total: 2,
          correct: '2 نصفين',
          options: ['2 نصفين', '4 أنصاف', '3 أنصاف', '1 نصف']
        }
      ];
      return fractions.map((f, idx) => {
        return {
          id: `l11_q${idx + 1}`,
          grade: 'grade2',
          category: 'fractions',
          questionText: f.question,
          questionSpeechText: f.speech,
          visualType: 'pie_fraction',
          visualData: {
            fractionPart: f.part,
            fractionTotal: f.total
          },
          options: shuffle(f.options),
          correctAnswer: f.correct,
          explanation: `رائع جداً! الكسر الصحيح هو: ${f.correct}.`
        };
      });
    }

    // Level 12: Skip counting (2s, 5s, 10s)
    case 12: {
      const skips = [
        { sequence: [10, 20, 30, '؟', 50], correct: 40, speech: 'العَدُّ القَفْزِيُّ بِالعَشَرات: عَشَرَة، عِشْرُون، ثَلاثُون، ما العَدَدُ التّالِي؟', options: [35, 40, 45, 60] },
        { sequence: [5, 10, 15, '؟', 25], correct: 20, speech: 'العَدُّ القَفْزِيُّ بِالخَمْسات: خَمْسَة، عَشَرَة، خَمْسَةَ عَشَر، ما العَدَدُ التّالِي؟', options: [18, 20, 22, 30] },
        { sequence: [12, 14, 16, '؟', 20], correct: 18, speech: 'نَقْفِزُ بِاثْنَيْن: اثْنا عَشَر، أَرْبَعَةَ عَشَر، سِتَّةَ عَشَر، ما هُوَ الرَّقْمُ المَفْقُود؟', options: [17, 18, 19, 22] },
        { sequence: [20, 25, 30, '؟', 40], correct: 35, speech: 'عِشْرُون، خَمْسَةٌ وعِشْرُون، ثَلاثُون، ما العَدَدُ الَّذِي يَلِيهِما؟', options: [32, 35, 38, 45] },
        { sequence: [50, 60, 70, 80, '؟'], correct: 90, speech: 'خَمْسُون، سِتُّون، سَبْعُون، ثَمانُون، ما هُوَ العَدَدُ الأَخِير؟', options: [85, 90, 95, 100] }
      ];
      return skips.map((s, idx) => {
        return {
          id: `l12_q${idx + 1}`,
          grade: 'grade2',
          category: 'patterns',
          questionText: `قفزات الأبطال بالعد القفزي! ما الرقم المناسب في مكان علامة الاستفهام؟`,
          questionSpeechText: s.speech,
          visualType: 'numbers_only',
          visualData: {
            patternItems: s.sequence
          },
          options: shuffle(s.options),
          correctAnswer: s.correct,
          explanation: `عبقري! بالعد قفزياً الرقم الصحيح هو ${s.correct}.`
        };
      });
    }

    default:
      return [];
  }
}

// Generate random question for speed mini-challenge
export function generateRandomQuestion(grade: GradeLevel): MathQuestion {
  if (grade === 'grade1') {
    const type = Math.random() > 0.4 ? 'add' : 'sub';
    if (type === 'add') {
      const a = Math.floor(Math.random() * 6) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const ans = a + b;
      const aWord = ARABIC_NUM_WORDS[a] || String(a);
      const bWord = ARABIC_NUM_WORDS[b] || String(b);
      return {
        id: `speed_${Date.now()}_${Math.random()}`,
        grade: 'grade1',
        category: 'addition',
        questionText: `كم حاصل جمع: ${a} + ${b} = ؟`,
        questionSpeechText: `${aWord} زائِد ${bWord} كَمْ يُساوِي؟`,
        visualType: 'items',
        visualData: {
          itemIcon: 'apple',
          count1: a,
          count2: b
        },
        options: shuffle([ans, ans + 1, Math.max(1, ans - 1), ans + 2]),
        correctAnswer: ans,
        explanation: `${a} + ${b} = ${ans}`
      };
    } else {
      const a = Math.floor(Math.random() * 6) + 4;
      const b = Math.floor(Math.random() * 3) + 1;
      const ans = a - b;
      const aWord = ARABIC_NUM_WORDS[a] || String(a);
      const bWord = ARABIC_NUM_WORDS[b] || String(b);
      return {
        id: `speed_${Date.now()}_${Math.random()}`,
        grade: 'grade1',
        category: 'subtraction',
        questionText: `كم حاصل طرح: ${a} - ${b} = ؟`,
        questionSpeechText: `${aWord} ناقِص ${bWord} كَمْ يُساوِي؟`,
        visualType: 'items',
        visualData: {
          itemIcon: 'star',
          count1: a,
          subtractedCount: b
        },
        options: shuffle([ans, ans + 1, Math.max(0, ans - 1), ans + 2]),
        correctAnswer: ans,
        explanation: `${a} - ${b} = ${ans}`
      };
    }
  } else {
    // Grade 2 speed questions
    const op = Math.random();
    if (op < 0.4) {
      // 2-digit add
      const a = Math.floor(Math.random() * 40) + 10;
      const b = Math.floor(Math.random() * 30) + 10;
      const ans = a + b;
      return {
        id: `speed_${Date.now()}`,
        grade: 'grade2',
        category: 'addition',
        questionText: `${a} + ${b} = ؟`,
        questionSpeechText: `${a} زائِد ${b} كَمْ يُساوِي؟`,
        visualType: 'numbers_only',
        options: shuffle([ans, ans + 10, ans - 2, ans + 5]),
        correctAnswer: ans,
        explanation: `${a} + ${b} = ${ans}`
      };
    } else if (op < 0.7) {
      // 2-digit sub
      const a = Math.floor(Math.random() * 40) + 40;
      const b = Math.floor(Math.random() * 30) + 10;
      const ans = a - b;
      return {
        id: `speed_${Date.now()}`,
        grade: 'grade2',
        category: 'subtraction',
        questionText: `${a} - ${b} = ؟`,
        questionSpeechText: `${a} ناقِص ${b} كَمْ يَتَبَقَّى؟`,
        visualType: 'numbers_only',
        options: shuffle([ans, ans + 10, ans - 2, ans + 4]),
        correctAnswer: ans,
        explanation: `${a} - ${b} = ${ans}`
      };
    } else {
      // multiplication
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 3) + 2;
      const ans = a * b;
      const aWord = ARABIC_NUM_WORDS[a] || String(a);
      const bWord = ARABIC_NUM_WORDS[b] || String(b);
      return {
        id: `speed_${Date.now()}`,
        grade: 'grade2',
        category: 'multiplication',
        questionText: `${a} × ${b} = ؟`,
        questionSpeechText: `${aWord} ضَرْب ${bWord} كَمْ يُساوِي؟`,
        visualType: 'multi_groups',
        visualData: {
          groups: a,
          itemsPerGroup: b
        },
        options: shuffle([ans, ans + 2, Math.max(2, ans - 2), ans + 4]),
        correctAnswer: ans,
        explanation: `${a} × ${b} = ${ans}`
      };
    }
  }
}
