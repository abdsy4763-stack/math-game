import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Sparkles, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Character, Sticker } from '../types/game';
import { CartoonCharacter } from './CartoonCharacter';
import { sounds } from '../utils/soundEffects';

interface RewardModalProps {
  isOpen: boolean;
  starsEarned: number;
  coinsEarned: number;
  levelTitle: string;
  character: Character;
  newStickersUnlocked: Sticker[];
  onPlayAgain: () => void;
  onBackToMap: () => void;
  onOpenStickers: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  isOpen,
  starsEarned,
  coinsEarned,
  levelTitle,
  character,
  newStickersUnlocked,
  onPlayAgain,
  onBackToMap,
  onOpenStickers
}) => {
  useEffect(() => {
    if (isOpen) {
      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 border-4 border-amber-400 shadow-2xl relative text-center overflow-hidden"
      >
        {/* Glow behind */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-yellow-400/30 rounded-full blur-2xl pointer-events-none" />

        {/* Level Complete Badge */}
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs md:text-sm font-black px-4 py-1.5 rounded-full mb-3 border border-amber-300">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>تم إكمال المرحلة بنجاح!</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
          {levelTitle}
        </h2>
        <p className="text-sm font-semibold text-slate-500 mb-6">
          عمل مبهر وإتقان رائع يا بطل الرياضيات!
        </p>

        {/* Stars Celebration Display */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3].map((starIdx) => (
            <motion.div
              key={starIdx}
              initial={{ scale: 0, rotate: -30 }}
              animate={{
                scale: starIdx <= starsEarned ? [0, 1.4, 1] : 1,
                rotate: 0
              }}
              transition={{ delay: 0.2 * starIdx, duration: 0.5 }}
            >
              <Star
                className={`w-14 h-14 md:w-16 md:h-16 drop-shadow-md ${
                  starIdx <= starsEarned
                    ? 'text-amber-400 fill-amber-400 animate-bounce'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Companion Celebration Avatar */}
        <div className="flex justify-center my-3">
          <CartoonCharacter
            character={character}
            state="happy"
            speechText={character.phrases.correct[0]}
            size="md"
          />
        </div>

        {/* Coins Reward Badge */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="flex items-center gap-1.5 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
            <span className="text-2xl">🪙</span>
            <span className="text-lg font-black text-amber-800">+{coinsEarned} عملة ذهبية</span>
          </div>
        </div>

        {/* Unlocked New Stickers if any */}
        {newStickersUnlocked.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300"
          >
            <div className="flex items-center justify-center gap-1 text-purple-800 font-black text-sm mb-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>مبارك! فتحت ملصقاً جديداً في ألبومك!</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              {newStickersUnlocked.map((stk) => (
                <div
                  key={stk.id}
                  onClick={onOpenStickers}
                  className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-purple-300 shadow-xs cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="text-xl">{stk.icon}</span>
                  <span className="text-xs font-bold text-purple-900">{stk.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => {
              sounds.playPop();
              onPlayAgain();
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm rounded-2xl transition-transform active:scale-95 border border-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة المرحلة</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onBackToMap();
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95"
          >
            <span>تابع المغامرة</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
