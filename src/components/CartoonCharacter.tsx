import React from 'react';
import { motion } from 'motion/react';
import { Character } from '../types/game';
import { sounds } from '../utils/soundEffects';

interface CartoonCharacterProps {
  character: Character;
  state: 'idle' | 'happy' | 'thinking' | 'encouraging';
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
  onCharacterClick?: () => void;
}

export const CartoonCharacter: React.FC<CartoonCharacterProps> = ({
  character,
  state,
  speechText,
  size = 'md',
  showSpeechBubble = true,
  onCharacterClick
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32 md:w-40 md:h-40',
    lg: 'w-48 h-48 md:w-56 md:h-56'
  };

  const getAnimationVariants = () => {
    switch (state) {
      case 'happy':
        return {
          y: [0, -18, 0, -10, 0],
          rotate: [0, -5, 5, -3, 0],
          scale: [1, 1.08, 1],
          transition: { duration: 0.8, repeat: Infinity, repeatDelay: 1 }
        };
      case 'thinking':
        return {
          rotate: [0, 6, 0, 6, 0],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'encouraging':
        return {
          scale: [1, 1.05, 1],
          y: [0, -6, 0],
          transition: { duration: 1.2, repeat: Infinity }
        };
      case 'idle':
      default:
        return {
          y: [0, -4, 0],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }
        };
    }
  };

  const handleTap = () => {
    sounds.playPop();
    if (onCharacterClick) {
      onCharacterClick();
    }
  };

  // SVG Render for Simsim the Rabbit
  const renderRabbit = () => (
    <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-md">
      {/* Ears */}
      <motion.g
        animate={state === 'happy' ? { rotate: [-10, 10, -10] } : {}}
        transition={{ duration: 0.6, repeat: Infinity }}
      >
        <path d="M60 90 C40 10 70 0 85 80 Z" fill="#FED7AA" stroke="#F97316" strokeWidth="4" />
        <path d="M64 80 C50 25 70 15 80 75 Z" fill="#F472B6" opacity="0.6" />
        <path d="M140 90 C160 10 130 0 115 80 Z" fill="#FED7AA" stroke="#F97316" strokeWidth="4" />
        <path d="M136 80 C150 25 130 15 120 75 Z" fill="#F472B6" opacity="0.6" />
      </motion.g>

      {/* Body */}
      <circle cx="100" cy="165" r="45" fill="#FFEDD5" stroke="#F97316" strokeWidth="4" />
      <circle cx="100" cy="170" r="28" fill="#FFF7ED" />

      {/* Head */}
      <ellipse cx="100" cy="110" rx="55" ry="48" fill="#FED7AA" stroke="#F97316" strokeWidth="4" />

      {/* Cheeks */}
      <ellipse cx="65" cy="125" rx="10" ry="7" fill="#FDA4AF" opacity="0.7" />
      <ellipse cx="135" cy="125" rx="10" ry="7" fill="#FDA4AF" opacity="0.7" />

      {/* Eyes */}
      {state === 'happy' ? (
        <>
          <path d="M70 105 Q80 92 90 105" stroke="#431407" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M110 105 Q120 92 130 105" stroke="#431407" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="80" cy="102" r="8" fill="#431407" />
          <circle cx="83" cy="99" r="3" fill="#FFFFFF" />
          <circle cx="120" cy="102" r="8" fill="#431407" />
          <circle cx="123" cy="99" r="3" fill="#FFFFFF" />
        </>
      )}

      {/* Cute Bunny Nose & Mouth */}
      <polygon points="100,116 93,110 107,110" fill="#F43F5E" />
      <path d="M93 118 Q100 126 100 121 Q100 126 107 118" stroke="#431407" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Bunny Whiskers */}
      <line x1="50" y1="116" x2="30" y2="114" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="122" x2="32" y2="125" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
      <line x1="150" y1="116" x2="170" y2="114" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
      <line x1="150" y1="122" x2="168" y2="125" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

      {/* Carrot held in hand */}
      <g transform="translate(130, 140) rotate(25)">
        <polygon points="0,10 30,0 20,25" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
        <path d="M28 2 Q35 -8 40 -5 Q32 2 30 5" fill="#22C55E" />
      </g>
    </svg>
  );

  // SVG Render for Dabdoub the Bear
  const renderBear = () => (
    <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-md">
      {/* Ears */}
      <circle cx="55" cy="75" r="24" fill="#B45309" stroke="#78350F" strokeWidth="4" />
      <circle cx="55" cy="75" r="14" fill="#FDE68A" />
      <circle cx="145" cy="75" r="24" fill="#B45309" stroke="#78350F" strokeWidth="4" />
      <circle cx="145" cy="75" r="14" fill="#FDE68A" />

      {/* Body */}
      <ellipse cx="100" cy="165" rx="55" ry="46" fill="#D97706" stroke="#78350F" strokeWidth="4" />
      <ellipse cx="100" cy="168" rx="35" ry="28" fill="#FDE68A" />

      {/* Head */}
      <circle cx="100" cy="115" r="54" fill="#D97706" stroke="#78350F" strokeWidth="4" />

      {/* Muzzle */}
      <ellipse cx="100" cy="126" rx="26" ry="20" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="100" cy="118" rx="11" ry="8" fill="#451A03" />
      <path d="M100 126 C100 134 92 136 88 131 M100 126 C100 134 108 136 112 131" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Eyes */}
      {state === 'happy' ? (
        <>
          <path d="M72 100 Q80 90 88 100" stroke="#451A03" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M112 100 Q120 90 128 100" stroke="#451A03" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="80" cy="98" r="7" fill="#451A03" />
          <circle cx="82" cy="96" r="2.5" fill="#FFFFFF" />
          <circle cx="120" cy="98" r="7" fill="#451A03" />
          <circle cx="122" cy="96" r="2.5" fill="#FFFFFF" />
        </>
      )}

      {/* Cute Rosy Cheeks */}
      <circle cx="68" cy="120" r="7" fill="#F43F5E" opacity="0.4" />
      <circle cx="132" cy="120" r="7" fill="#F43F5E" opacity="0.4" />

      {/* Honey Pot */}
      <g transform="translate(130, 145)">
        <path d="M5 10 L30 10 L27 35 L8 35 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
        <ellipse cx="17.5" cy="10" rx="12.5" ry="4" fill="#FCD34D" />
        <text x="12" y="27" fontSize="12" fill="#78350F" fontWeight="bold">🍯</text>
      </g>
    </svg>
  );

  // SVG Render for Touta the Owl
  const renderOwl = () => (
    <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-md">
      {/* Feathery Ear Tufts */}
      <polygon points="50,90 35,40 75,65" fill="#6366F1" stroke="#4338CA" strokeWidth="3" />
      <polygon points="150,90 165,40 125,65" fill="#6366F1" stroke="#4338CA" strokeWidth="3" />

      {/* Body & Head */}
      <ellipse cx="100" cy="130" rx="58" ry="65" fill="#818CF8" stroke="#4338CA" strokeWidth="4" />
      <ellipse cx="100" cy="145" rx="38" ry="42" fill="#EEF2FF" />

      {/* Feather patterns on belly */}
      <path d="M85 140 Q100 148 115 140" stroke="#6366F1" strokeWidth="2" fill="none" />
      <path d="M80 155 Q100 163 120 155" stroke="#6366F1" strokeWidth="2" fill="none" />
      <path d="M88 170 Q100 178 112 170" stroke="#6366F1" strokeWidth="2" fill="none" />

      {/* Big Owl Eyes & Glasses */}
      <circle cx="75" cy="105" r="26" fill="#FFFFFF" stroke="#4338CA" strokeWidth="4" />
      <circle cx="125" cy="105" r="26" fill="#FFFFFF" stroke="#4338CA" strokeWidth="4" />
      <line x1="97" y1="105" x2="103" y2="105" stroke="#4338CA" strokeWidth="4" />

      {/* Pupils */}
      {state === 'happy' ? (
        <>
          <path d="M65 105 Q75 95 85 105" stroke="#312E81" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M115 105 Q125 95 135 105" stroke="#312E81" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="75" cy="105" r="10" fill="#312E81" />
          <circle cx="78" cy="102" r="3.5" fill="#FFFFFF" />
          <circle cx="125" cy="105" r="10" fill="#312E81" />
          <circle cx="128" cy="102" r="3.5" fill="#FFFFFF" />
        </>
      )}

      {/* Smart Yellow Beak */}
      <polygon points="100,128 92,116 108,116" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />

      {/* Academic mini star / diploma in hand */}
      <text x="140" y="150" fontSize="24">⭐</text>
    </svg>
  );

  // SVG Render for Koko the Robot
  const renderRobot = () => (
    <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-md">
      {/* Antenna */}
      <line x1="100" y1="65" x2="100" y2="35" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="30" r="10" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
      {/* Glowing antenna pulse */}
      <circle cx="100" cy="30" r="5" fill="#FDE047" />

      {/* Body */}
      <rect x="55" y="130" width="90" height="60" rx="16" fill="#38BDF8" stroke="#0284C7" strokeWidth="4" />
      {/* Screen on chest */}
      <rect x="70" y="142" width="60" height="36" rx="8" fill="#0C4A6E" />
      <text x="82" y="167" fill="#38BDF8" fontSize="16" fontFamily="monospace" fontWeight="bold">1+1</text>

      {/* Head */}
      <rect x="50" y="65" width="100" height="70" rx="20" fill="#7DD3FC" stroke="#0284C7" strokeWidth="4" />

      {/* Ears/Bolts */}
      <rect x="36" y="88" width="14" height="24" rx="4" fill="#0284C7" />
      <rect x="150" y="88" width="14" height="24" rx="4" fill="#0284C7" />

      {/* Eyes Display */}
      {state === 'happy' ? (
        <>
          <path d="M70 100 Q80 88 90 100" stroke="#0369A1" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M110 100 Q120 88 130 100" stroke="#0369A1" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="80" cy="98" r="9" fill="#0284C7" />
          <circle cx="82" cy="95" r="3" fill="#FFFFFF" />
          <circle cx="120" cy="98" r="9" fill="#0284C7" />
          <circle cx="122" cy="95" r="3" fill="#FFFFFF" />
        </>
      )}

      {/* Cheerful Robot Mouth (LED bar) */}
      <rect x="80" y="118" width="40" height="6" rx="3" fill="#F59E0B" />
    </svg>
  );

  const renderCharacterSVG = () => {
    switch (character.animal) {
      case 'bear':
        return renderBear();
      case 'owl':
        return renderOwl();
      case 'robot':
        return renderRobot();
      case 'rabbit':
      default:
        return renderRabbit();
    }
  };

  const displayText = speechText || character.greeting;

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          key={displayText}
          className="relative max-w-xs mb-2 px-4 py-2 bg-white text-slate-800 text-sm md:text-base font-bold rounded-2xl shadow-lg border-2 border-amber-300 text-center z-10"
        >
          <span>{displayText}</span>
          {/* Bubble Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-300" />
          <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-white" />
        </motion.div>
      )}

      {/* Character Animated Avatar */}
      <motion.div
        animate={getAnimationVariants()}
        onClick={handleTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizeMap[size]} cursor-pointer relative group transition-transform`}
        role="button"
        tabIndex={0}
        aria-label={`شخصية ${character.name}`}
      >
        {renderCharacterSVG()}
      </motion.div>
    </div>
  );
};
