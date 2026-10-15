import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Share2, Send, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = 'مغامرات أبطال الرياضيات الصغار 🌟 - لعبة تعليمية تفاعلية للأطفال';
  const shareText = 'العب وتعلّم الرياضيات الممتعة مع شخصيات كرتونية ومكافآت بصرية مشجعة لطلاب الصف الأول والثاني الابتدائي! 🎮🔢';

  const handleCopyLink = async () => {
    sounds.playPop();
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    sounds.playPop();
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl
        });
      } catch {
        // user dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsappShare = () => {
    sounds.playPop();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareTitle}\n${shareText}\n${currentUrl}`
    )}`;
    window.open(url, '_blank');
  };

  const handleTelegramShare = () => {
    sounds.playPop();
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
      `${shareTitle}\n${shareText}`
    )}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 border-4 border-amber-400 shadow-2xl relative text-center"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
          aria-label="إغلاق نافذة المشاركة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg border-2 border-white text-white">
          <Share2 className="w-8 h-8" />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
          مشاركة اللعبة مع الأصدقاء
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-semibold mb-6">
          شارك رابط اللعبة مع زملائك في الصف، المعلمين، أو أولياء الأمور للعب والتعلم معاً!
        </p>

        {/* Copy Link Input Bar */}
        <div className="bg-slate-50 p-2 rounded-2xl border-2 border-slate-200 flex items-center gap-2 mb-6">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs md:text-sm font-bold text-slate-700 select-all outline-none text-left"
            dir="ltr"
          />
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs transition-all shadow-sm ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleWhatsappShare}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300 rounded-2xl font-bold text-sm transition-transform active:scale-95"
          >
            <span className="text-xl">💬</span>
            <span>إرسال عبر واتساب</span>
          </button>

          <button
            onClick={handleTelegramShare}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-sky-50 hover:bg-sky-100 text-sky-800 border-2 border-sky-300 rounded-2xl font-bold text-sm transition-transform active:scale-95"
          >
            <Send className="w-4 h-4 text-sky-600" />
            <span>إرسال عبر تيليجرام</span>
          </button>
        </div>

        {/* Native Mobile Share Button */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md transition-transform active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>مشاركة سريعة عبر الهاتف / الجهاز</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
