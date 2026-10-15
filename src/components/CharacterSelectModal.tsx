import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { Character } from '../types/game';
import { CartoonCharacter } from './CartoonCharacter';
import { sounds } from '../utils/soundEffects';

interface CharacterSelectModalProps {
  isOpen: boolean;
  selectedCharacterId: string;
  onSelectCharacter: (char: Character) => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  isOpen,
  selectedCharacterId,
  onSelectCharacter,
  onClose
}) => {
  if (!isOpen) return null;

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
          aria-label="إغلاق نافذة اختيار الشخصية"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-3xl mb-1 block">✨</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">
            اختر صديقك الكرتوني المفضل!
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
            سيكون رفيقك في رحلة الرياضيات ويشجعك في كل مسألة!
          </p>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto p-1">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedCharacterId;

            return (
              <motion.div
                key={char.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sounds.playPop();
                  onSelectCharacter(char);
                }}
                className={`p-4 rounded-3xl border-3 flex flex-col items-center text-center cursor-pointer transition-all relative ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 shadow-md ring-4 ring-amber-200'
                    : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center shadow">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                <div className="my-1">
                  <CartoonCharacter
                    character={char}
                    state={isSelected ? 'happy' : 'idle'}
                    showSpeechBubble={false}
                    size="sm"
                  />
                </div>

                <h3 className="text-lg font-black text-slate-800 mt-2">
                  {char.name}
                </h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full mt-1">
                  {char.title}
                </span>

                <p className="text-xs text-slate-600 font-medium mt-2 italic px-2">
                  "{char.greeting}"
                </p>

                <div className="mt-3 text-[11px] font-semibold text-slate-500">
                  العنصر المفضل: {char.favoriteFoodOrItem}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
