import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Timer, Zap, Trophy, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GradeLevel, MathQuestion, Character } from '../types/game';
import { generateRandomQuestion } from '../data/mathCurriculum';
import { CartoonCharacter } from './CartoonCharacter';
import { sounds } from '../utils/soundEffects';

interface SpeedChallengeProps {
  isOpen: boolean;
  grade: GradeLevel;
  character: Character;
  onClose: () => void;
  onReward: (stars: number, coins: number) => void;
}

export const SpeedChallenge: React.FC<SpeedChallengeProps> = ({
  isOpen,
  grade,
  character,
  onClose,
  onReward
}) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover'>('intro');
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<MathQuestion | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('gameover');
      sounds.playFanfare();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });

      const starsBonus = Math.min(3, Math.floor(score / 5));
      const coinsBonus = score * 5;
      onReward(starsBonus, coinsBonus);
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, score, onReward]);

  const startNewGame = () => {
    sounds.playPop();
    setTimeLeft(45);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setCurrentQ(generateRandomQuestion(grade));
    setGameState('playing');
  };

  const handleSelectOption = (opt: string | number) => {
    if (!currentQ || feedback !== null) return;

    sounds.playPop();
    const correct = String(opt).trim() === String(currentQ.correctAnswer).trim();

    if (correct) {
      sounds.playSuccess();
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFeedback('correct');

      setTimeout(() => {
        setFeedback(null);
        setCurrentQ(generateRandomQuestion(grade));
      }, 350);
    } else {
      sounds.playError();
      setStreak(0);
      setFeedback('wrong');

      setTimeout(() => {
        setFeedback(null);
        setCurrentQ(generateRandomQuestion(grade));
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 border-4 border-emerald-400 shadow-2xl relative flex flex-col min-h-[460px] justify-between text-center overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors z-10"
          aria-label="إغلاق التحدي"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Intro Screen */}
        {gameState === 'intro' && (
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="w-20 h-20 bg-emerald-100 rounded-3xl border-2 border-emerald-300 flex items-center justify-center text-4xl mb-3 shadow-inner">
              ⚡
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
              سباق السرعة الحسابي (45 ثانية)
            </h2>
            <p className="text-sm font-semibold text-slate-500 mb-6 max-w-xs">
              أجب عن أكبر عدد من المسائل السريعة لتربح نجوماً وعملات ذهبية إضافية!
            </p>

            <div className="my-2">
              <CartoonCharacter
                character={character}
                state="happy"
                speechText="أنا جاهز، هل أنت مستعد للسباق يا بطل؟"
                size="sm"
              />
            </div>

            <button
              onClick={startNewGame}
              className="mt-6 flex items-center justify-center gap-2 py-3.5 px-8 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>ابدأ التحدي الآن!</span>
            </button>
          </div>
        )}

        {/* 2. Playing Screen */}
        {gameState === 'playing' && currentQ && (
          <div className="flex flex-col justify-between h-full">
            {/* Timer and Score Status Bar */}
            <div className="flex items-center justify-between gap-3 bg-emerald-50 p-3 rounded-2xl border border-emerald-200 mb-4">
              <div className="flex items-center gap-1.5 text-emerald-800 font-black text-sm">
                <Timer className="w-5 h-5 text-emerald-600 animate-spin" />
                <span>{timeLeft} ثانية</span>
              </div>

              {streak > 2 && (
                <div className="flex items-center gap-1 bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-xs font-black animate-bounce">
                  <Zap className="w-3.5 h-3.5" />
                  <span>تتابع خارق x{streak}!</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-slate-800 font-black text-sm">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>النقاط: {score}</span>
              </div>
            </div>

            {/* Time progress bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4 border border-slate-200">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 10 ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${(timeLeft / 45) * 100}%` }}
              />
            </div>

            {/* Question Display */}
            <div className="my-auto py-4">
              <span className="text-xs font-bold text-slate-500 mb-2 block">
                احسب بأسرع ما يمكنك:
              </span>
              <div className="text-3xl md:text-5xl font-black text-slate-800 tracking-wider">
                {currentQ.questionText}
              </div>

              {/* Visual Groups or items if applicable */}
              {currentQ.visualData?.count1 && currentQ.visualData?.count2 && (
                <div className="flex items-center justify-center gap-2 mt-3 text-2xl">
                  <span>🍎 x {currentQ.visualData.count1}</span>
                  <span className="font-black text-emerald-600">+</span>
                  <span>🍏 x {currentQ.visualData.count2}</span>
                </div>
              )}
            </div>

            {/* Choices Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`py-4 px-2 rounded-2xl text-2xl font-black shadow-md border-2 transition-transform active:scale-95 ${
                    feedback === 'correct'
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : feedback === 'wrong'
                      ? 'bg-rose-400 text-white border-rose-500'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="flex flex-col items-center justify-center my-auto">
            <span className="text-5xl mb-2">🎉</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
              انتهى الوقت! رائع جداً!
            </h2>
            <p className="text-sm font-semibold text-slate-500 mb-4">
              تمكنت من حل <span className="font-black text-emerald-600 text-lg">{score}</span> مسائل صحيحة!
            </p>

            <div className="flex items-center justify-center gap-4 my-3 bg-amber-50 p-4 rounded-2xl border border-amber-300">
              <div className="flex items-center gap-1 text-amber-800 font-black">
                <span className="text-xl">⭐</span>
                <span>+{Math.min(3, Math.floor(score / 5))} نجوم</span>
              </div>
              <div className="flex items-center gap-1 text-amber-800 font-black">
                <span className="text-xl">🪙</span>
                <span>+{score * 5} عملة</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6 w-full">
              <button
                onClick={startNewGame}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow transition-transform active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>سباق جديد</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm rounded-2xl transition-colors"
              >
                <span>العودة للخريطة</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
