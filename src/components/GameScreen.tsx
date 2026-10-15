import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Volume2, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LevelInfo, MathQuestion, Character } from '../types/game';
import { getQuestionsForLevel } from '../data/mathCurriculum';
import { CartoonCharacter } from './CartoonCharacter';
import { MathVisualizer } from './MathVisualizer';
import { sounds } from '../utils/soundEffects';
import { speakArabic, stopArabicSpeech, subscribeToSpeechState } from '../utils/speech';

interface GameScreenProps {
  level: LevelInfo;
  character: Character;
  voiceEnabled: boolean;
  onExit: () => void;
  onLevelComplete: (levelId: number, starsEarned: number, coinsEarned: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  level,
  character,
  voiceEnabled,
  onExit,
  onLevelComplete
}) => {
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [companionState, setCompanionState] = useState<'idle' | 'happy' | 'thinking' | 'encouraging'>('idle');
  const [companionMessage, setCompanionMessage] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Subscribe to speech narration state
  useEffect(() => {
    return subscribeToSpeechState((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  // Load questions on mount
  useEffect(() => {
    const list = getQuestionsForLevel(level.id);
    setQuestions(list);
    setCurrentIdx(0);
    setCorrectCount(0);
    setWrongAttempts(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCompanionState('idle');
    setCompanionMessage(character.greeting);
  }, [level, character]);

  const currentQ = questions[currentIdx];

  // Auto-speak question if voice is enabled
  useEffect(() => {
    if (currentQ && voiceEnabled) {
      const textToRead = currentQ.questionSpeechText || currentQ.questionText;
      speakArabic(textToRead);
    }
    return () => {
      stopArabicSpeech();
    };
  }, [currentIdx, currentQ, voiceEnabled]);

  const handleSpeakQuestion = () => {
    if (!currentQ) return;
    sounds.playPop();
    const textToRead = currentQ.questionSpeechText || currentQ.questionText;
    speakArabic(textToRead);
  };

  const handleSelectAnswer = (option: string | number) => {
    if (isAnswered && isCorrect) return; // already solved

    sounds.playPop();
    setSelectedOption(option);
    const correct = String(option).trim() === String(currentQ.correctAnswer).trim();

    if (correct) {
      setIsAnswered(true);
      setIsCorrect(true);
      setCorrectCount(prev => prev + 1);
      setCompanionState('happy');

      const praise = character.phrases.correct[Math.floor(Math.random() * character.phrases.correct.length)];
      setCompanionMessage(praise);

      sounds.playSuccess();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setIsAnswered(true);
      setIsCorrect(false);
      setWrongAttempts(prev => prev + 1);
      setCompanionState('encouraging');

      const cheer = character.phrases.wrong[Math.floor(Math.random() * character.phrases.wrong.length)];
      setCompanionMessage(cheer);

      sounds.playError();
    }
  };

  const handleNextQuestion = () => {
    sounds.playPop();
    stopArabicSpeech();

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setCompanionState('idle');
      setCompanionMessage('');
    } else {
      // Finished all questions in this level
      const total = questions.length;
      let stars = 1;
      if (correctCount >= total) {
        stars = 3;
      } else if (correctCount >= total * 0.7) {
        stars = 2;
      }
      const coins = stars * 15;
      onLevelComplete(level.id, stars, coins);
    }
  };

  const handleRetryCurrent = () => {
    sounds.playPop();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCompanionState('thinking');
    setCompanionMessage('فكّر بهدوء وجرب اختياراً آخر!');
  };

  if (!currentQ) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Level Nav Bar */}
      <div className="flex items-center justify-between gap-3 bg-white/90 p-4 rounded-3xl border-2 border-amber-300 shadow-md mb-6">
        <button
          onClick={() => {
            sounds.playPop();
            stopArabicSpeech();
            onExit();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm rounded-full transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الخريطة</span>
        </button>

        {/* Level Title */}
        <div className="text-center">
          <h2 className="text-sm md:text-lg font-black text-amber-900 flex items-center justify-center gap-1.5">
            <span>{level.icon}</span>
            <span>{level.title}</span>
          </h2>
          <span className="text-[11px] font-semibold text-amber-700">
            {level.islandName}
          </span>
        </div>

        {/* Questions Progress Indicator */}
        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx < currentIdx
                  ? 'bg-emerald-500 scale-100'
                  : idx === currentIdx
                  ? 'bg-amber-500 scale-125 ring-2 ring-amber-300 ring-offset-1'
                  : 'bg-slate-200'
              }`}
            />
          ))}
          <span className="text-xs font-black text-amber-800 mr-1.5">
            {currentIdx + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Companion Column (Left on RTL, Right on LTR) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center bg-gradient-to-b from-amber-100/90 to-orange-100/90 p-5 rounded-3xl border-2 border-amber-300 shadow-sm order-2 md:order-1">
          <CartoonCharacter
            character={character}
            state={companionState}
            speechText={companionMessage}
            size="md"
          />

          <div className="mt-4 text-center">
            <span className="text-xs font-bold text-amber-900 bg-white/80 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
              صديقك: {character.name}
            </span>
          </div>
        </div>

        {/* Question & Interactive Work Area */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 md:p-8 border-3 border-amber-300 shadow-xl flex flex-col justify-between order-1 md:order-2 min-h-[460px]">
          <div>
            {/* Question Header with Audio Narration Button */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-snug">
                {currentQ.questionText}
              </h3>
              <button
                onClick={handleSpeakQuestion}
                className={`shrink-0 p-2.5 sm:px-3 sm:py-2 rounded-2xl border shadow-sm transition-all active:scale-95 flex items-center gap-1.5 ${
                  isSpeaking
                    ? 'bg-amber-400 border-amber-500 text-amber-950 ring-4 ring-amber-200 animate-pulse'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300'
                }`}
                title="استمع للمسألة بصوت عربي فصيح وواضح"
                aria-label="استمع للمسألة"
              >
                <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce text-amber-950' : 'text-amber-800'}`} />
                <span className="text-xs font-black hidden sm:inline">
                  {isSpeaking ? 'جاري القراءة...' : 'استمع'}
                </span>
              </button>
            </div>

            {/* Interactive Visual Manipulative */}
            <MathVisualizer
              question={currentQ}
              userSelection={selectedOption !== null ? selectedOption : undefined}
            />
          </div>

          {/* Answer Options Grid */}
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let btnStyle = 'bg-slate-50 border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

                if (isSelected) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg ring-4 ring-emerald-200';
                  } else {
                    btnStyle = 'bg-rose-500 border-2 border-rose-600 text-white shadow-lg animate-shake';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!isAnswered ? { scale: 1.05 } : {}}
                    whileTap={!isAnswered ? { scale: 0.95 } : {}}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`py-4 px-3 rounded-2xl font-black text-2xl md:text-3xl transition-all shadow-sm flex items-center justify-center min-h-[64px] ${btnStyle}`}
                  >
                    <span>{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback & Navigation Bar */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3"
                >
                  {isCorrect ? (
                    <>
                      <div className="flex items-center gap-2 text-emerald-700 font-black text-sm md:text-base">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <span>{currentQ.explanation}</span>
                      </div>

                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base rounded-2xl shadow-lg transition-transform active:scale-95"
                      >
                        <span>{currentIdx + 1 === questions.length ? 'إنهاء المرحلة 🏆' : 'المسألة التالية'}</span>
                        <Sparkles className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-rose-600 font-bold text-sm md:text-base">
                        حاول مرة أخرى! أنت ذكي وقادر على حلها!
                      </div>

                      <button
                        onClick={handleRetryCurrent}
                        className="flex items-center gap-2 py-2.5 px-5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-md transition-transform active:scale-95"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>جرب ثانية</span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
