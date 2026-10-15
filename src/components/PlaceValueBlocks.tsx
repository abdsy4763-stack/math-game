import React from 'react';
import { motion } from 'motion/react';
import { sounds } from '../utils/soundEffects';

interface PlaceValueBlocksProps {
  tens: number;
  ones: number;
}

export const PlaceValueBlocks: React.FC<PlaceValueBlocksProps> = ({ tens, ones }) => {
  const handleTensClick = () => {
    sounds.playPop();
  };

  const handleOnesClick = () => {
    sounds.playItemTap();
  };

  return (
    <div className="flex flex-col items-center gap-4 my-3 w-full max-w-xl">
      <div className="grid grid-cols-2 gap-4 w-full">
        {/* Tens Tower Section */}
        <div className="bg-indigo-50/90 rounded-2xl p-4 border-2 border-indigo-200 flex flex-col items-center">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-sm md:text-base font-extrabold text-indigo-900">
              العشرات ({tens})
            </span>
            <span className="text-xs text-indigo-600 font-semibold">
              = {tens * 10}
            </span>
          </div>

          {/* Tens Columns */}
          <div className="flex flex-wrap items-end justify-center gap-3 min-h-[140px]">
            {Array.from({ length: tens }).map((_, colIdx) => (
              <motion.div
                key={`ten_${colIdx}`}
                whileHover={{ scale: 1.05 }}
                onClick={handleTensClick}
                className="flex flex-col gap-0.5 bg-indigo-600 p-1 rounded-lg shadow-md cursor-pointer border border-indigo-700 hover:bg-indigo-500 transition-colors"
                title="عمود مكون من 10 مكعبات"
              >
                {Array.from({ length: 10 }).map((_, blockIdx) => (
                  <div
                    key={`t_${colIdx}_${blockIdx}`}
                    className="w-5 h-2.5 bg-indigo-300 rounded-xs border-t border-indigo-200 shadow-inner"
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ones Units Section */}
        <div className="bg-amber-50/90 rounded-2xl p-4 border-2 border-amber-200 flex flex-col items-center">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-sm md:text-base font-extrabold text-amber-900">
              الآحاد ({ones})
            </span>
            <span className="text-xs text-amber-600 font-semibold">
              = {ones}
            </span>
          </div>

          {/* Ones cubes grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 min-h-[140px] content-center">
            {Array.from({ length: ones }).map((_, idx) => (
              <motion.div
                key={`one_${idx}`}
                whileHover={{ scale: 1.2, rotate: 10 }}
                onClick={handleOnesClick}
                className="w-6 h-6 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-md shadow-md border-2 border-amber-600 cursor-pointer flex items-center justify-center text-[10px] font-black text-amber-950"
              >
                1
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs md:text-sm font-semibold text-indigo-900 bg-indigo-100/80 px-4 py-1.5 rounded-full">
        🧱 كل برج أزرق = 10 مكعبات كاملة | كل مكعب أصفر = 1 واحد
      </div>
    </div>
  );
};
