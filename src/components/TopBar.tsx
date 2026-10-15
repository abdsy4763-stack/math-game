import React from 'react';
import { Volume2, VolumeX, Sparkles, Award, Timer, Settings, Share2 } from 'lucide-react';
import { GradeLevel, Character } from '../types/game';
import { sounds } from '../utils/soundEffects';

interface TopBarProps {
  playerName: string;
  starsCount: number;
  totalPossibleStars: number;
  activeGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  selectedCharacter: Character;
  onCharacterSwitchClick: () => void;
  onOpenStickers: () => void;
  onOpenCertificate: () => void;
  onOpenSpeedChallenge: () => void;
  onOpenShare: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  playerName,
  starsCount,
  totalPossibleStars,
  activeGrade,
  onGradeChange,
  selectedCharacter,
  onCharacterSwitchClick,
  onOpenStickers,
  onOpenCertificate,
  onOpenSpeedChallenge,
  onOpenShare,
  onOpenSettings,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="sticky top-0 z-30 bg-amber-500/95 backdrop-blur-md text-white shadow-md border-b-4 border-amber-600 px-3 py-2.5 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Companion & Player Welcome */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playPop();
              onCharacterSwitchClick();
            }}
            className="flex items-center gap-1.5 bg-amber-600/90 hover:bg-amber-700 p-1.5 pr-2.5 pl-3 rounded-full border-2 border-amber-300 transition-transform active:scale-95 shadow-sm group"
            title="انقر لتغيير الشخصية الكرتونية"
          >
            <span className="text-xl group-hover:scale-125 transition-transform">
              {selectedCharacter.animal === 'rabbit' && '🐰'}
              {selectedCharacter.animal === 'bear' && '🐻'}
              {selectedCharacter.animal === 'owl' && '🦉'}
              {selectedCharacter.animal === 'robot' && '🤖'}
            </span>
            <div className="text-right leading-tight">
              <span className="text-xs font-bold block text-amber-100">
                {selectedCharacter.name}
              </span>
              <span className="text-[10px] text-amber-200">
                مرحبا {playerName}!
              </span>
            </div>
          </button>

          {/* Grade Selector Switcher */}
          <div className="flex bg-amber-700/80 p-0.5 rounded-full border border-amber-400/50">
            <button
              onClick={() => {
                sounds.playPop();
                onGradeChange('grade1');
              }}
              className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all ${
                activeGrade === 'grade1'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-amber-100 hover:text-white'
              }`}
            >
              الصف الأول 🎒
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                onGradeChange('grade2');
              }}
              className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all ${
                activeGrade === 'grade2'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-amber-100 hover:text-white'
              }`}
            >
              الصف الثاني 📚
            </button>
          </div>
        </div>

        {/* Center/Right: Actions & Counters */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Star Counter */}
          <div className="flex items-center gap-1 bg-amber-600/90 px-3 py-1.5 rounded-full border border-amber-300 shadow-inner">
            <span className="text-lg animate-pulse">⭐</span>
            <span className="font-black text-sm md:text-base text-yellow-200">
              {starsCount}
            </span>
            <span className="text-xs text-amber-200">
              / {totalPossibleStars}
            </span>
          </div>

          {/* Quick Action: Stickers Album */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenStickers();
            }}
            className="flex items-center gap-1 bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm transition-transform active:scale-95 border border-rose-300"
            title="دفتر الملصقات والجوائز"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">الملصقات</span>
          </button>

          {/* Quick Action: Speed Challenge */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenSpeedChallenge();
            }}
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm transition-transform active:scale-95 border border-emerald-300"
            title="تحدي السرعة 60 ثانية"
          >
            <Timer className="w-4 h-4" />
            <span className="hidden sm:inline">التحدي السريع</span>
          </button>

          {/* Quick Action: Certificate */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenCertificate();
            }}
            className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm transition-transform active:scale-95 border border-purple-300"
            title="شهادة التميز"
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">الشهادة</span>
          </button>

          {/* Quick Action: Share Game */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenShare();
            }}
            className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm transition-transform active:scale-95 border border-sky-300"
            title="مشاركة اللعبة"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">مشاركة</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleSound();
            }}
            className="p-2 bg-amber-600/90 hover:bg-amber-700 rounded-full border border-amber-300 text-amber-100 hover:text-white transition-colors"
            title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
            aria-label={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-300" />}
          </button>

          {/* Settings / Parent panel */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenSettings();
            }}
            className="p-2 bg-amber-600/90 hover:bg-amber-700 rounded-full border border-amber-300 text-amber-100 hover:text-white transition-colors"
            title="الإعدادات ولوحة المعلم"
            aria-label="الإعدادات ولوحة المعلم"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
