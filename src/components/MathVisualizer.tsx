import React from 'react';
import { motion } from 'motion/react';
import { MathQuestion } from '../types/game';
import { InteractiveCounters } from './InteractiveCounters';
import { PlaceValueBlocks } from './PlaceValueBlocks';
import { ComparisonCrocodile } from './ComparisonCrocodile';

interface MathVisualizerProps {
  question: MathQuestion;
  userSelection?: string | number;
}

export const MathVisualizer: React.FC<MathVisualizerProps> = ({ question, userSelection }) => {
  const { visualType, visualData } = question;

  // 1. Ten Frame (إطار العشرة)
  if (visualType === 'ten_frame') {
    const c1 = visualData?.count1 || 0;
    const c2 = visualData?.count2 || 0;
    const total = c1 + c2;

    return (
      <div className="flex flex-col items-center gap-3 my-3">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Frame 1: 10 grid (2 rows of 5) */}
          <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200 shadow-sm flex flex-col gap-2">
            <span className="text-xs font-bold text-indigo-700 text-center">إطار العشرة الأول</span>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }).map((_, i) => {
                const filled = i < c1;
                return (
                  <div
                    key={`f1_${i}`}
                    className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center border-2 ${
                      filled
                        ? 'bg-amber-400 border-amber-500 shadow-inner'
                        : 'bg-slate-50 border-dashed border-slate-300'
                    }`}
                  >
                    {filled && <span className="text-xl">⭐</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frame 2 if total > 10 */}
          {c2 > 0 && (
            <div className="bg-white p-3 rounded-2xl border-2 border-emerald-200 shadow-sm flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 text-center">إطار الإضافة (+{c2})</span>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, i) => {
                  const filled = i < c2;
                  return (
                    <div
                      key={`f2_${i}`}
                      className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center border-2 ${
                        filled
                          ? 'bg-emerald-400 border-emerald-500 shadow-inner'
                          : 'bg-slate-50 border-dashed border-slate-300'
                      }`}
                    >
                      {filled && <span className="text-xl">🌟</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <span className="text-xs font-bold text-slate-500">
          المجموع: {c1} + {c2} = {total}
        </span>
      </div>
    );
  }

  // 2. Interactive Clickable Items (Counters, Addition, Subtraction)
  if (visualType === 'items') {
    return (
      <InteractiveCounters
        iconType={visualData?.itemIcon || 'apple'}
        count1={visualData?.count1 || 0}
        count2={visualData?.count2}
        subtractedCount={visualData?.subtractedCount}
      />
    );
  }

  // 3. Crocodile Comparison
  if (visualType === 'crocodile') {
    return (
      <ComparisonCrocodile
        num1={visualData?.num1 || 0}
        num2={visualData?.num2 || 0}
        selectedOperator={userSelection ? String(userSelection) : undefined}
      />
    );
  }

  // 4. Place Value Blocks (Tens and Ones)
  if (visualType === 'blocks') {
    return (
      <PlaceValueBlocks
        tens={visualData?.tens || 0}
        ones={visualData?.ones || 0}
      />
    );
  }

  // 5. Multiplication Groups (مجموعات متساوية)
  if (visualType === 'multi_groups') {
    const groups = visualData?.groups || 2;
    const perGroup = visualData?.itemsPerGroup || 2;

    return (
      <div className="flex flex-col items-center gap-3 my-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: groups }).map((_, gIdx) => (
            <motion.div
              key={`grp_${gIdx}`}
              whileHover={{ scale: 1.05 }}
              className="bg-emerald-50 border-2 border-emerald-300 p-3 rounded-2xl flex flex-col items-center shadow-sm"
            >
              <span className="text-xs font-bold text-emerald-800 mb-1">المجموعة {gIdx + 1}</span>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-200">
                {Array.from({ length: perGroup }).map((_, iIdx) => (
                  <span key={`grp_item_${gIdx}_${iIdx}`} className="text-2xl md:text-3xl">
                    🍎
                  </span>
                ))}
              </div>
              <span className="text-xs font-extrabold text-emerald-600 mt-1">
                {perGroup} عناصر
              </span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs md:text-sm font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          💡 {groups} مجموعات متساوية في كل واحدة منها {perGroup} عناصر
        </p>
      </div>
    );
  }

  // 6. Pie Fraction (الكسور البسيطة: نصف وربع)
  if (visualType === 'pie_fraction') {
    const part = visualData?.fractionPart || 1;
    const total = visualData?.fractionTotal || 2;

    return (
      <div className="flex flex-col items-center gap-3 my-3">
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-amber-600 bg-amber-200 shadow-md flex items-center justify-center overflow-hidden">
          {/* Pizza background details */}
          <div className="absolute inset-1 rounded-full border border-dashed border-amber-400 opacity-60 pointer-events-none" />

          {/* SVG Fraction Pie */}
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {total === 2 && (
              <>
                {/* Part 1 (Half 1 - Highlighted) */}
                <path
                  d="M50 50 L100 50 A50 50 0 0 1 0 50 Z"
                  fill="#F59E0B"
                  stroke="#B45309"
                  strokeWidth="2"
                />
                {/* Part 2 (Half 2) */}
                <path
                  d="M50 50 L0 50 A50 50 0 0 1 100 50 Z"
                  fill="#FEF3C7"
                  stroke="#B45309"
                  strokeWidth="2"
                />
              </>
            )}
            {total === 4 && (
              <>
                {/* 4 Quarter Slices */}
                {Array.from({ length: 4 }).map((_, sliceIdx) => {
                  const isColored = sliceIdx < part;
                  const angles = [0, 90, 180, 270, 360];
                  const startA = (angles[sliceIdx] * Math.PI) / 180;
                  const endA = (angles[sliceIdx + 1] * Math.PI) / 180;
                  const x1 = 50 + 50 * Math.cos(startA);
                  const y1 = 50 + 50 * Math.sin(startA);
                  const x2 = 50 + 50 * Math.cos(endA);
                  const y2 = 50 + 50 * Math.sin(endA);
                  const path = `M50 50 L${x1} ${y1} A50 50 0 0 1 ${x2} ${y2} Z`;

                  return (
                    <path
                      key={`slice_${sliceIdx}`}
                      d={path}
                      fill={isColored ? '#F97316' : '#FFEDD5'}
                      stroke="#C2410C"
                      strokeWidth="2"
                    />
                  );
                })}
              </>
            )}
          </svg>

          {/* Middle label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 px-3 py-1 rounded-xl text-sm font-black text-slate-800 shadow border border-amber-300">
              🍕 {part} من {total}
            </span>
          </div>
        </div>

        <p className="text-xs md:text-sm font-semibold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full">
          الجزء الملون يمثل {part} من أصل {total} أجزاء متساوية
        </p>
      </div>
    );
  }

  // 7. Pattern Train or Number Sequence
  if (visualData?.patternItems) {
    return (
      <div className="flex flex-col items-center gap-3 my-4 w-full">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-3 bg-sky-50 rounded-3xl border-2 border-sky-300 shadow-sm max-w-xl">
          <span className="text-3xl md:text-4xl pl-2">🚂</span>
          {visualData.patternItems.map((val, idx) => {
            const isMissing = val === '؟';
            return (
              <motion.div
                key={`pat_${idx}`}
                whileHover={{ scale: 1.05 }}
                className={`w-12 h-14 md:w-16 md:h-18 rounded-2xl flex flex-col items-center justify-center font-black text-xl md:text-2xl shadow-md border-b-4 transition-all ${
                  isMissing
                    ? 'bg-amber-400 border-amber-600 text-amber-950 animate-bounce'
                    : 'bg-white border-sky-400 text-sky-800'
                }`}
              >
                <span>{isMissing && userSelection ? userSelection : val}</span>
                <div className="w-2 h-2 rounded-full bg-slate-300 mt-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default clean number calculation display if no visual manipulatives needed
  if (visualData?.num1 !== undefined && visualData?.num2 !== undefined) {
    return (
      <div className="flex items-center justify-center gap-4 my-4 p-4 bg-amber-50/80 rounded-2xl border border-amber-200">
        <span className="text-3xl md:text-5xl font-black text-amber-950">{visualData.num1}</span>
        <span className="text-2xl md:text-4xl font-black text-amber-600">{question.category === 'addition' ? '+' : '-'}</span>
        <span className="text-3xl md:text-5xl font-black text-amber-950">{visualData.num2}</span>
        <span className="text-2xl md:text-4xl font-black text-amber-600">=</span>
        <span className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-dashed border-amber-400 flex items-center justify-center text-2xl md:text-3xl font-black text-amber-700 shadow-inner">
          {userSelection !== undefined ? userSelection : '؟'}
        </span>
      </div>
    );
  }

  return null;
};
