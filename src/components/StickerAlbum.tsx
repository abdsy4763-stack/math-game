import React from 'react';
import { motion } from 'motion/react';
import { X, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { STICKERS } from '../data/stickers';
import { sounds } from '../utils/soundEffects';

interface StickerAlbumProps {
  isOpen: boolean;
  totalStars: number;
  unlockedStickerIds: string[];
  onClose: () => void;
}

export const StickerAlbum: React.FC<StickerAlbumProps> = ({
  isOpen,
  totalStars,
  unlockedStickerIds,
  onClose
}) => {
  if (!isOpen) return null;

  const unlockedCount = STICKERS.filter(s => totalStars >= s.unlockedAtStars).length;
  const progressPercent = Math.round((unlockedCount / STICKERS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 border-4 border-amber-400 shadow-2xl relative max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
          aria-label="إغلاق الألبوم"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs md:text-sm font-black px-4 py-1.5 rounded-full mb-2 border border-purple-300">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>دفتر أوسمة وملصقات الأبطال</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">
            ألبوم الجوائز الشرفية
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
            كلما جمعت نجوماً أكثر في رحلتك، فتحت ملصقات وأوسمة فخرية جديدة!
          </p>

          {/* Progress Bar */}
          <div className="mt-4 max-w-sm mx-auto">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
              <span>تم فتح {unlockedCount} من {STICKERS.length} ملصق</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-amber-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="overflow-y-auto pr-1 pl-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-2">
          {STICKERS.map((sticker) => {
            const isUnlocked = totalStars >= sticker.unlockedAtStars;

            return (
              <motion.div
                key={sticker.id}
                whileHover={isUnlocked ? { scale: 1.04 } : {}}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                  isUnlocked
                    ? `${sticker.badgeBg} shadow-md`
                    : 'bg-slate-50 border-dashed border-slate-300 opacity-60'
                }`}
              >
                {/* Sticker Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-2 shadow-inner ${
                    isUnlocked ? 'bg-white' : 'bg-slate-200'
                  }`}
                >
                  {isUnlocked ? (
                    <span className="animate-pulse">{sticker.icon}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                {/* Sticker Title */}
                <h3 className="font-black text-sm md:text-base text-slate-900 mb-1">
                  {sticker.name}
                </h3>
                <p className="text-[11px] leading-tight text-slate-600 mb-2">
                  {sticker.description}
                </p>

                {/* Status Footer */}
                <div className="mt-auto">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>تم الحصول عليه</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-300">
                      يحتاج {sticker.unlockedAtStars} ⭐
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
