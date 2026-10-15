import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { sounds } from '../utils/soundEffects';

interface InteractiveCountersProps {
  iconType: 'apple' | 'star' | 'carrot' | 'fish' | 'butterfly' | 'balloon';
  count1: number;
  count2?: number; // for addition (second group)
  subtractedCount?: number; // for subtraction
  onAllCounted?: (totalCounted: number) => void;
}

export const InteractiveCounters: React.FC<InteractiveCountersProps> = ({
  iconType,
  count1,
  count2 = 0,
  subtractedCount = 0,
  onAllCounted
}) => {
  const [clickedItems, setClickedItems] = useState<Record<string, number>>({});
  const [counterBadge, setCounterBadge] = useState<number>(0);

  // Reset when props change
  useEffect(() => {
    setClickedItems({});
    setCounterBadge(0);
  }, [count1, count2, subtractedCount, iconType]);

  const getEmoji = (type: string) => {
    switch (type) {
      case 'apple': return '🍎';
      case 'star': return '⭐';
      case 'carrot': return '🥕';
      case 'fish': return '🐟';
      case 'butterfly': return '🦋';
      case 'balloon': return '🎈';
      default: return '🍎';
    }
  };

  const handleItemClick = (key: string) => {
    if (clickedItems[key] !== undefined) return;

    const nextCount = counterBadge + 1;
    setCounterBadge(nextCount);
    setClickedItems(prev => ({ ...prev, [key]: nextCount }));
    sounds.playItemTap(nextCount - 1);

    const totalItems = count1 + count2 - subtractedCount;
    if (nextCount === totalItems && onAllCounted) {
      onAllCounted(nextCount);
    }
  };

  const renderGroup = (count: number, groupKey: string, isSubtractedGroup: boolean = false) => {
    return Array.from({ length: count }).map((_, idx) => {
      const itemKey = `${groupKey}_${idx}`;
      const isClicked = clickedItems[itemKey] !== undefined;
      const countNumber = clickedItems[itemKey];

      return (
        <motion.div
          key={itemKey}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => !isSubtractedGroup && handleItemClick(itemKey)}
          className={`relative p-3 rounded-2xl flex items-center justify-center cursor-pointer select-none transition-all ${
            isSubtractedGroup
              ? 'bg-rose-50 border-2 border-dashed border-rose-300 opacity-60 line-through'
              : isClicked
              ? 'bg-amber-100 border-2 border-amber-400 shadow-sm'
              : 'bg-white border-2 border-amber-200 shadow-sm hover:border-amber-400'
          }`}
        >
          {/* Main Item Emoji */}
          <span className={`text-4xl md:text-5xl transition-transform ${isClicked ? 'scale-110' : ''}`}>
            {getEmoji(iconType)}
          </span>

          {/* Clicked Index Badge */}
          {isClicked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-sm shadow-md"
            >
              {countNumber}
            </motion.div>
          )}

          {/* Subtracted indicator */}
          {isSubtractedGroup && (
            <span className="absolute inset-0 flex items-center justify-center text-rose-600 font-black text-3xl">
              ✕
            </span>
          )}
        </motion.div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-3 w-full">
      {/* Addition two distinct groups with a friendly plus sign */}
      {count2 > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Group 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-amber-50/80 rounded-2xl border border-amber-200">
            {renderGroup(count1, 'g1')}
          </div>

          <div className="text-3xl md:text-4xl font-black text-amber-600 px-2 animate-bounce">
            +
          </div>

          {/* Group 2 */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200">
            {renderGroup(count2, 'g2')}
          </div>
        </div>
      ) : subtractedCount > 0 ? (
        /* Subtraction view: remaining items vs subtracted items */
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="w-full text-center text-xs font-bold text-amber-700 mb-1">المتبقي:</span>
            {renderGroup(count1 - subtractedCount, 'rem')}
          </div>

          <div className="text-3xl font-black text-rose-500 px-1">
            -
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-rose-50 rounded-2xl border border-dashed border-rose-300">
            <span className="w-full text-center text-xs font-bold text-rose-700 mb-1">المأكول / المطروح:</span>
            {renderGroup(subtractedCount, 'sub', true)}
          </div>
        </div>
      ) : (
        /* Single counting group */
        <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-white/80 rounded-3xl border-2 border-amber-200 max-w-xl">
          {renderGroup(count1, 'single')}
        </div>
      )}

      {/* Helpful Hint for Little Hands */}
      <p className="text-xs md:text-sm font-medium text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
        💡 المس العناصر لعدّها واحداً تلو الآخر!
      </p>
    </div>
  );
};
