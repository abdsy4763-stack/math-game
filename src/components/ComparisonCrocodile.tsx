import React from 'react';
import { motion } from 'motion/react';

interface ComparisonCrocodileProps {
  num1: number;
  num2: number;
  selectedOperator?: string;
}

export const ComparisonCrocodile: React.FC<ComparisonCrocodileProps> = ({
  num1,
  num2,
  selectedOperator
}) => {
  // Render animated crocodile mouth or operator
  const renderCrocodile = () => {
    if (selectedOperator === '>') {
      // Mouth open to the right (in RTL, num1 is on the right, num2 on left, so open to num1)
      return (
        <motion.div
          initial={{ scale: 0.8, rotate: -15 }}
          animate={{ scale: [1, 1.1, 1], rotate: 0 }}
          className="flex flex-col items-center justify-center p-2 bg-emerald-100 rounded-2xl border-2 border-emerald-400"
        >
          <span className="text-4xl md:text-5xl">🐊</span>
          <span className="text-3xl md:text-4xl font-black text-emerald-700">&gt;</span>
        </motion.div>
      );
    } else if (selectedOperator === '<') {
      return (
        <motion.div
          initial={{ scale: 0.8, rotate: 15 }}
          animate={{ scale: [1, 1.1, 1], rotate: 0 }}
          className="flex flex-col items-center justify-center p-2 bg-emerald-100 rounded-2xl border-2 border-emerald-400"
        >
          <span className="text-4xl md:text-5xl scale-x-[-1]">🐊</span>
          <span className="text-3xl md:text-4xl font-black text-emerald-700">&lt;</span>
        </motion.div>
      );
    } else if (selectedOperator === '=') {
      return (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.1, 1] }}
          className="flex flex-col items-center justify-center p-2 bg-amber-100 rounded-2xl border-2 border-amber-400"
        >
          <span className="text-4xl md:text-5xl">🐊💤</span>
          <span className="text-3xl md:text-4xl font-black text-amber-700">=</span>
        </motion.div>
      );
    }

    // Default question state:
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 border-3 border-dashed border-emerald-400 rounded-2xl flex flex-col items-center justify-center bg-white shadow-inner animate-pulse">
        <span className="text-2xl md:text-3xl">🐊</span>
        <span className="text-sm font-bold text-emerald-700">؟</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 my-2">
      <div className="flex items-center justify-center gap-4 md:gap-8 bg-white/90 p-6 rounded-3xl border-2 border-emerald-200 shadow-sm">
        {/* Right Number (In RTL, first number is on the right) */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-black text-white shadow-md">
            {num1}
          </div>
          <div className="flex gap-1 justify-center max-w-[90px] flex-wrap">
            {Array.from({ length: Math.min(num1, 10) }).map((_, i) => (
              <span key={i} className="text-xs">🟡</span>
            ))}
          </div>
        </div>

        {/* Crocodile Symbol */}
        <div className="flex flex-col items-center justify-center">
          {renderCrocodile()}
        </div>

        {/* Left Number */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-black text-white shadow-md">
            {num2}
          </div>
          <div className="flex gap-1 justify-center max-w-[90px] flex-wrap">
            {Array.from({ length: Math.min(num2, 10) }).map((_, i) => (
              <span key={i} className="text-xs">🟢</span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs md:text-sm font-medium text-emerald-800 bg-emerald-100/80 px-4 py-1.5 rounded-full">
        🐊 تمساح الأرقام الجائع يفتح فمه دائماً ليلتهم العدد الأكبر!
      </p>
    </div>
  );
};
