import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Printer, Award, Sparkles, Check } from 'lucide-react';
import { Character, GradeLevel } from '../types/game';
import { sounds } from '../utils/soundEffects';

interface CertificateModalProps {
  isOpen: boolean;
  playerName: string;
  onUpdatePlayerName: (name: string) => void;
  grade: GradeLevel;
  starsCount: number;
  character: Character;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  playerName,
  onUpdatePlayerName,
  grade,
  starsCount,
  character,
  onClose
}) => {
  const [editingName, setEditingName] = useState<string>(playerName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  const handleSaveName = () => {
    sounds.playPop();
    if (editingName.trim()) {
      onUpdatePlayerName(editingName.trim());
    }
    setIsEditing(false);
  };

  const todayStr = new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const gradeTitle = grade === 'grade1' ? 'الصف الأول الابتدائي' : 'الصف الثاني الابتدائي';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white print:fixed print:inset-0">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 border-4 border-amber-400 shadow-2xl relative flex flex-col max-h-[92vh] overflow-y-auto print:border-none print:shadow-none print:max-w-none print:w-full print:h-full print:p-8"
      >
        {/* Close Button - hidden in print */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors print:hidden"
          aria-label="إغلاق الشهادة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Container */}
        <div className="border-8 border-double border-amber-500 rounded-2xl p-6 md:p-8 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/50 text-center relative overflow-hidden">
          {/* Corner Ornaments */}
          <div className="absolute top-2 right-2 text-2xl text-amber-500">⚜️</div>
          <div className="absolute top-2 left-2 text-2xl text-amber-500">⚜️</div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-500">⚜️</div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-500">⚜️</div>

          {/* Emblem Icon */}
          <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white">
            <Award className="w-10 h-10" />
          </div>

          <span className="text-xs md:text-sm font-extrabold text-amber-700 uppercase tracking-widest block mb-1">
            مملكة أبطال الرياضيات الصغار
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-amber-900 mb-4 font-serif">
            شهادة تفوق وتميز حسابي
          </h2>

          <p className="text-sm md:text-base text-slate-600 font-semibold mb-2">
            تُمنح هذه الشهادة بكل فخر واعتزاز إلى بطل الأرقام الرائع:
          </p>

          {/* Player Name Display & Quick Edit */}
          <div className="my-3">
            {isEditing ? (
              <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="px-3 py-1.5 border-2 border-amber-400 rounded-xl text-center font-black text-xl text-amber-950 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="inline-block relative group">
                <span className="text-2xl md:text-4xl font-black text-amber-800 border-b-2 border-dashed border-amber-400 pb-1 px-4 cursor-pointer">
                  {playerName || 'بطل الرياضيات'}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[11px] text-amber-600 block mt-1 hover:underline print:hidden"
                >
                  (انقر لتعديل اسمك على الشهادة)
                </button>
              </div>
            )}
          </div>

          <p className="text-xs md:text-sm text-slate-700 font-medium max-w-md mx-auto leading-relaxed my-4">
            تقديراً لجهوده المتميزة وتفوقه في حل مسائل الرياضيات وإتقان مهارات 
            <span className="font-bold text-amber-800"> {gradeTitle} </span> 
            وجمعه رصيداً مميزاً من النجوم الذهبية!
          </p>

          {/* Stars & Companion Stamp */}
          <div className="flex items-center justify-around my-6 pt-4 border-t border-amber-200">
            {/* Stars Count */}
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-black text-amber-600">
                {starsCount} ⭐
              </span>
              <span className="text-xs font-bold text-slate-500">
                نجمة ذهبية متألقة
              </span>
            </div>

            {/* Seal / Companion Signature */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner mb-1">
                {character.animal === 'rabbit' && '🐰'}
                {character.animal === 'bear' && '🐻'}
                {character.animal === 'owl' && '🦉'}
                {character.animal === 'robot' && '🤖'}
              </div>
              <span className="text-xs font-black text-amber-900 block">
                ختم وتوقيع {character.name}
              </span>
            </div>

            {/* Date */}
            <div className="text-center">
              <span className="block text-xs md:text-sm font-black text-slate-700">
                {todayStr}
              </span>
              <span className="text-xs font-bold text-slate-500">
                تاريخ الإنجاز
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls - hidden during print */}
        <div className="flex items-center justify-center gap-3 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md transition-transform active:scale-95"
          >
            <Printer className="w-5 h-5" />
            <span>طباعة أو حفظ الشهادة</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
