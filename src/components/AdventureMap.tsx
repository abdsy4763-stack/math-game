import React from 'react';
import { motion } from 'motion/react';
import { Lock, Play, Star } from 'lucide-react';
import { LevelInfo, Character } from '../types/game';
import { CartoonCharacter } from './CartoonCharacter';
import { sounds } from '../utils/soundEffects';

interface AdventureMapProps {
  levels: LevelInfo[];
  levelScores: Record<number, number>;
  totalStars: number;
  selectedCharacter: Character;
  onSelectLevel: (level: LevelInfo) => void;
  activeGrade: 'grade1' | 'grade2';
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  levels,
  levelScores,
  totalStars,
  selectedCharacter,
  onSelectLevel,
  activeGrade
}) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8">
      {/* Hero Welcome Banner with cartoon companion */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 md:p-8 text-white shadow-xl border-4 border-amber-300 mb-10 relative overflow-hidden">
        {/* Playful background circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-600/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right max-w-lg">
            <span className="inline-block bg-white/20 text-amber-950 font-black text-xs md:text-sm px-3 py-1 rounded-full mb-2 border border-white/30">
              {activeGrade === 'grade1' ? '🌟 مرحلة الصف الأول الابتدائي' : '🚀 مرحلة الصف الثاني الابتدائي'}
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-sm mb-2">
              خريطة مغامرات الرياضيات
            </h1>
            <p className="text-sm md:text-base text-amber-100 font-medium leading-relaxed">
              اختر جزيرتك المفضلة، حل المسائل المسلية، واجمع النجوم الذهبية لتفتح كنوز وجوائز جديدة!
            </p>
          </div>

          {/* Cheerful Animated Companion */}
          <div className="shrink-0">
            <CartoonCharacter
              character={selectedCharacter}
              state="happy"
              speechText={`هيا يا بطل! معك ${totalStars} نجمة، أي جزيرة سنستكشف الآن؟`}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Levels Pathway Grid */}
      <div className="relative">
        {/* Island Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((lvl, index) => {
            const isUnlocked = totalStars >= lvl.requiredStarsToUnlock;
            const starsEarned = levelScores[lvl.id] || 0;

            return (
              <motion.div
                key={lvl.id}
                whileHover={isUnlocked ? { scale: 1.03, translateY: -4 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                className={`relative rounded-3xl p-5 md:p-6 transition-all border-4 shadow-lg flex flex-col justify-between min-h-[220px] ${
                  isUnlocked
                    ? 'bg-white border-amber-300 hover:border-amber-400 hover:shadow-xl cursor-pointer'
                    : 'bg-slate-100/90 border-slate-300 opacity-80 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (isUnlocked) {
                    sounds.playPop();
                    onSelectLevel(lvl);
                  } else {
                    sounds.playError();
                  }
                }}
              >
                {/* Level Top Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    المرحلة {index + 1}
                  </span>

                  {/* Stars Status */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= starsEarned
                            ? 'text-amber-400 fill-amber-400 animate-pulse'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Island Details */}
                <div className="flex items-start gap-4 my-2">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md shrink-0 bg-gradient-to-tr ${lvl.color} text-white border-2 border-white`}
                  >
                    {lvl.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
                      {lvl.title}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">
                      {lvl.subtitle}
                    </p>
                    <span className="inline-block text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md mt-2">
                      {lvl.islandName}
                    </span>
                  </div>
                </div>

                {/* Bottom Action / Lock Info */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {isUnlocked ? (
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>{starsEarned > 0 ? 'العب مجدداً' : 'ابدأ المغامرة'}</span>
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-200 text-slate-600 font-bold text-xs rounded-xl">
                      <Lock className="w-4 h-4 text-slate-500" />
                      <span>تحتاج إلى {lvl.requiredStarsToUnlock} نجوم لفتح هذه الجزيرة</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
