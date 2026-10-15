import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProgress, GradeLevel, LevelInfo, Character, Sticker } from './types/game';
import { CHARACTERS } from './data/characters';
import { LEVELS } from './data/mathCurriculum';
import { STICKERS } from './data/stickers';
import { sounds } from './utils/soundEffects';
import { TopBar } from './components/TopBar';
import { AdventureMap } from './components/AdventureMap';
import { GameScreen } from './components/GameScreen';
import { RewardModal } from './components/RewardModal';
import { StickerAlbum } from './components/StickerAlbum';
import { CertificateModal } from './components/CertificateModal';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { SpeedChallenge } from './components/SpeedChallenge';
import { ParentTeacherPanel } from './components/ParentTeacherPanel';
import { ShareModal } from './components/ShareModal';

const STORAGE_KEY = 'math_heroes_app_progress_v1';

const defaultProgress: UserProgress = {
  playerName: 'بطل الرياضيات',
  selectedCharacterId: 'simsim',
  activeGrade: 'grade1',
  starsCount: 0,
  coinsCount: 0,
  levelScores: {},
  unlockedStickers: ['first_star'],
  soundEnabled: true,
  voiceEnabled: true,
  lastPlayedTimestamp: Date.now()
};

export default function App() {
  // Load progress from localStorage or fallback
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProgress, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return defaultProgress;
  });

  // Navigation states
  const [activeScreen, setActiveScreen] = useState<'map' | 'game'>('map');
  const [currentLevel, setCurrentLevel] = useState<LevelInfo | null>(null);

  // Modals state
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false);
  const [rewardData, setRewardData] = useState<{
    stars: number;
    coins: number;
    levelTitle: string;
    newStickers: Sticker[];
  }>({
    stars: 0,
    coins: 0,
    levelTitle: '',
    newStickers: []
  });

  const [showStickersModal, setShowStickersModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showCharacterModal, setShowCharacterModal] = useState<boolean>(false);
  const [showSpeedModal, setShowSpeedModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Sync sound engine enabled state
  useEffect(() => {
    sounds.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Current selected companion
  const selectedCharacter =
    CHARACTERS.find((c) => c.id === progress.selectedCharacterId) || CHARACTERS[0];

  // Levels filtered by active grade
  const gradeLevels = LEVELS.filter((lvl) => lvl.grade === progress.activeGrade);
  const totalPossibleStars = gradeLevels.length * 3;

  // Grade change handler
  const handleGradeChange = (grade: GradeLevel) => {
    setProgress((prev) => ({ ...prev, activeGrade: grade }));
    if (activeScreen === 'game') {
      setActiveScreen('map');
      setCurrentLevel(null);
    }
  };

  // Level Selection
  const handleSelectLevel = (level: LevelInfo) => {
    setCurrentLevel(level);
    setActiveScreen('game');
  };

  // Level Completion & Reward Calculation
  const handleLevelComplete = (levelId: number, starsEarned: number, coinsEarned: number) => {
    const currentScore = progress.levelScores[levelId] || 0;
    const additionalStars = Math.max(0, starsEarned - currentScore);

    const updatedScores = {
      ...progress.levelScores,
      [levelId]: Math.max(currentScore, starsEarned)
    };

    const newTotalStars = Object.values(updatedScores).reduce((a, b) => a + b, 0);

    // Check newly unlocked stickers
    const newlyUnlocked: Sticker[] = [];
    STICKERS.forEach((stk) => {
      if (
        newTotalStars >= stk.unlockedAtStars &&
        !progress.unlockedStickers.includes(stk.id)
      ) {
        newlyUnlocked.push(stk);
      }
    });

    const updatedStickerIds = Array.from(
      new Set([...progress.unlockedStickers, ...newlyUnlocked.map((s) => s.id)])
    );

    setProgress((prev) => ({
      ...prev,
      starsCount: newTotalStars,
      coinsCount: prev.coinsCount + coinsEarned,
      levelScores: updatedScores,
      unlockedStickers: updatedStickerIds,
      lastPlayedTimestamp: Date.now()
    }));

    setRewardData({
      stars: starsEarned,
      coins: coinsEarned,
      levelTitle: currentLevel?.title || 'مرحلة الرياضيات',
      newStickers: newlyUnlocked
    });

    setShowRewardModal(true);
  };

  // Replay from Reward Modal
  const handlePlayAgain = () => {
    setShowRewardModal(false);
    // GameScreen will reset based on currentLevel
  };

  // Return to Map from Reward Modal
  const handleBackToMap = () => {
    setShowRewardModal(false);
    setActiveScreen('map');
    setCurrentLevel(null);
  };

  // Character Switch
  const handleSelectCharacter = (char: Character) => {
    setProgress((prev) => ({ ...prev, selectedCharacterId: char.id }));
    setShowCharacterModal(false);
  };

  // Speed Challenge Reward
  const handleSpeedReward = (stars: number, coins: number) => {
    if (stars > 0 || coins > 0) {
      setProgress((prev) => {
        const newTotalStars = prev.starsCount + stars;
        // check stickers
        const newlyUnlocked = STICKERS.filter(
          (s) => newTotalStars >= s.unlockedAtStars && !prev.unlockedStickers.includes(s.id)
        );
        return {
          ...prev,
          starsCount: newTotalStars,
          coinsCount: prev.coinsCount + coins,
          unlockedStickers: Array.from(
            new Set([...prev.unlockedStickers, ...newlyUnlocked.map((s) => s.id)])
          )
        };
      });
    }
  };

  // Reset Progress
  const handleResetProgress = () => {
    setProgress({
      ...defaultProgress,
      playerName: progress.playerName,
      soundEnabled: progress.soundEnabled,
      voiceEnabled: progress.voiceEnabled
    });
    setActiveScreen('map');
    setCurrentLevel(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-yellow-50 text-slate-800 flex flex-col font-['Tajawal',sans-serif] relative overflow-x-hidden selection:bg-amber-200">
      {/* Playful Floating Background Shapes */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden select-none z-0">
        <span className="absolute top-12 left-10 text-6xl animate-pulse">☁️</span>
        <span className="absolute top-32 right-16 text-5xl">⭐</span>
        <span className="absolute top-2/3 left-1/4 text-5xl opacity-40">➕</span>
        <span className="absolute top-1/2 right-12 text-6xl opacity-40">🎈</span>
        <span className="absolute bottom-16 right-1/3 text-6xl opacity-30">🍎</span>
        <span className="absolute bottom-24 left-16 text-5xl opacity-40">➖</span>
        <span className="absolute top-1/3 left-1/2 text-4xl opacity-30">✖️</span>
      </div>

      {/* Main Top Header Bar */}
      <TopBar
        playerName={progress.playerName}
        starsCount={progress.starsCount}
        totalPossibleStars={totalPossibleStars}
        activeGrade={progress.activeGrade}
        onGradeChange={handleGradeChange}
        selectedCharacter={selectedCharacter}
        onCharacterSwitchClick={() => setShowCharacterModal(true)}
        onOpenStickers={() => setShowStickersModal(true)}
        onOpenCertificate={() => setShowCertificateModal(true)}
        onOpenSpeedChallenge={() => setShowSpeedModal(true)}
        onOpenShare={() => setShowShareModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        soundEnabled={progress.soundEnabled}
        onToggleSound={() =>
          setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full pb-12">
        <AnimatePresence mode="wait">
          {activeScreen === 'map' ? (
            <motion.div
              key="map-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdventureMap
                levels={gradeLevels}
                levelScores={progress.levelScores}
                totalStars={progress.starsCount}
                selectedCharacter={selectedCharacter}
                onSelectLevel={handleSelectLevel}
                activeGrade={progress.activeGrade}
              />
            </motion.div>
          ) : (
            currentLevel && (
              <motion.div
                key={`game-screen-${currentLevel.id}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <GameScreen
                  level={currentLevel}
                  character={selectedCharacter}
                  voiceEnabled={progress.voiceEnabled}
                  onExit={() => {
                    setActiveScreen('map');
                    setCurrentLevel(null);
                  }}
                  onLevelComplete={handleLevelComplete}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>

      {/* Footer Encouragement Note */}
      <footer className="relative z-10 py-4 text-center text-xs font-semibold text-amber-900/70 border-t border-amber-200/80 bg-amber-100/50">
        <p>🌟 مغامرات أبطال الرياضيات الصغار • مخصص لطلاب الصف الأول والثاني الابتدائي • باللغة العربية الفصحى</p>
      </footer>

      {/* Modals & Dialogs */}
      <RewardModal
        isOpen={showRewardModal}
        starsEarned={rewardData.stars}
        coinsEarned={rewardData.coins}
        levelTitle={rewardData.levelTitle}
        character={selectedCharacter}
        newStickersUnlocked={rewardData.newStickers}
        onPlayAgain={handlePlayAgain}
        onBackToMap={handleBackToMap}
        onOpenStickers={() => {
          setShowRewardModal(false);
          setShowStickersModal(true);
        }}
      />

      <StickerAlbum
        isOpen={showStickersModal}
        totalStars={progress.starsCount}
        unlockedStickerIds={progress.unlockedStickers}
        onClose={() => setShowStickersModal(false)}
      />

      <CertificateModal
        isOpen={showCertificateModal}
        playerName={progress.playerName}
        onUpdatePlayerName={(name) =>
          setProgress((prev) => ({ ...prev, playerName: name }))
        }
        grade={progress.activeGrade}
        starsCount={progress.starsCount}
        character={selectedCharacter}
        onClose={() => setShowCertificateModal(false)}
      />

      <CharacterSelectModal
        isOpen={showCharacterModal}
        selectedCharacterId={progress.selectedCharacterId}
        onSelectCharacter={handleSelectCharacter}
        onClose={() => setShowCharacterModal(false)}
      />

      <SpeedChallenge
        isOpen={showSpeedModal}
        grade={progress.activeGrade}
        character={selectedCharacter}
        onClose={() => setShowSpeedModal(false)}
        onReward={handleSpeedReward}
      />

      <ParentTeacherPanel
        isOpen={showSettingsModal}
        progress={progress}
        onUpdateName={(name) =>
          setProgress((prev) => ({ ...prev, playerName: name }))
        }
        onToggleSound={() =>
          setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
        }
        onToggleVoice={() =>
          setProgress((prev) => ({ ...prev, voiceEnabled: !prev.voiceEnabled }))
        }
        onResetProgress={handleResetProgress}
        onClose={() => setShowSettingsModal(false)}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}
