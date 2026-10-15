import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, Mic, RotateCcw, BookOpen, GraduationCap, Check } from 'lucide-react';
import { GradeLevel, UserProgress } from '../types/game';
import { sounds } from '../utils/soundEffects';

interface ParentTeacherPanelProps {
  isOpen: boolean;
  progress: UserProgress;
  onUpdateName: (name: string) => void;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const ParentTeacherPanel: React.FC<ParentTeacherPanelProps> = ({
  isOpen,
  progress,
  onUpdateName,
  onToggleSound,
  onToggleVoice,
  onResetProgress,
  onClose
}) => {
  const [nameInput, setNameInput] = useState<string>(progress.playerName);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);
  const [nameSavedToast, setNameSavedToast] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      sounds.playPop();
      onUpdateName(nameInput.trim());
      setNameSavedToast(true);
      setTimeout(() => setNameSavedToast(false), 2000);
    }
  };

  const handleConfirmReset = () => {
    sounds.playError();
    onResetProgress();
    setShowConfirmReset(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 border-4 border-amber-400 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
          aria-label="إغلاق لوحة الإعدادات"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs md:text-sm font-black px-4 py-1.5 rounded-full mb-2 border border-blue-300">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>لوحة الإشراف والتوجيه</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">
            لوحة المعلم وولي الأمر
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
            متابعة إنجاز الطفل، وضبط خيارات القراءة الصوتية والتقدم التعليمي
          </p>
        </div>

        {/* Section 1: Student Name Configuration */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 mb-4">
          <label className="block text-xs font-black text-amber-900 mb-2">
            اسم الطالب / الطفل المعتمد في اللعبة والشهادة:
          </label>
          <form onSubmit={handleSaveName} className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="مثال: أحمد، سارة، مريم..."
              className="flex-1 px-4 py-2 bg-white rounded-xl border border-amber-300 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow transition-colors"
            >
              حفظ
            </button>
          </form>
          {nameSavedToast && (
            <span className="text-xs font-bold text-emerald-600 mt-1.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              تم حفظ اسم البطل بنجاح!
            </span>
          )}
        </div>

        {/* Section 2: Audio & Accessibility Controls */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-black text-slate-800 block">المؤثرات الصوتية والموسيقى</span>
                <span className="text-[11px] text-slate-500 font-semibold">أصوات النغمات والألعاب التفاعلية</span>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playPop();
                onToggleSound();
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                progress.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  progress.soundEnabled ? '-translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-100 rounded-xl text-purple-800">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-black text-slate-800 block">القراءة الصوتية باللغة العربية الفصحى</span>
                <span className="text-[11px] text-slate-500 font-semibold">نطق فصيح وواضح لمسائل الرياضيات بصوت كرتوني مخصص للأطفال</span>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playPop();
                onToggleVoice();
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                progress.voiceEnabled ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  progress.voiceEnabled ? '-translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 3: Educational Curriculum Reference for Parents */}
        <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-black text-indigo-900 mb-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>المهارات الرياضية المغطاة في التطبيق:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-indigo-950">
            <div className="bg-white/80 p-2 rounded-lg border border-indigo-100">
              <strong className="text-indigo-800 block mb-0.5">الصف الأول الابتدائي:</strong>
              • عد العناصر حتى 10 و 20<br/>
              • الجمع والطرح البصري والملموس<br/>
              • تمساح المقارنة (&gt; &lt; =)<br/>
              • الأنماط وإطار العشرة
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-indigo-100">
              <strong className="text-indigo-800 block mb-0.5">الصف الثاني الابتدائي:</strong>
              • القيمة المنزلية: الآحاد والعشرات<br/>
              • جمع وطرح الأعداد حتى 100<br/>
              • مقدمة الضرب (مجموعات متساوية)<br/>
              • الكسور البسيطة (النصف والربع) والعد القفزي
            </div>
          </div>
        </div>

        {/* Section 4: Progress Reset */}
        <div className="border-t border-slate-200 pt-4">
          {showConfirmReset ? (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-2xl text-center">
              <p className="text-xs font-bold text-rose-800 mb-2">
                هل أنت متأكد من تصفير نجوم ومراحل الطفل للبدء من جديد؟
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleConfirmReset}
                  className="px-3 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700"
                >
                  نعم، صفّر التقدم
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-300"
                >
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين التقدم والنجوم من البداية</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
