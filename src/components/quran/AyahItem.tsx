import React, { useState } from "react";
import { Play, Pause, Bookmark, Copy, Share2, BookOpen } from "lucide-react";
import type { Ayah } from "@/types/quran.types";
import { useSettingsStore } from "@/store/useSettingsStore";

interface AyahItemProps {
  surahNumber: number;
  surahName: string;
  ayah: Ayah;
  isPlaying: boolean;
  onPlay: (ayahNumber: number, url: string) => void;
  onPause: () => void;
  isLastRead?: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  tafsir?: string;
}

const AyahItem: React.FC<AyahItemProps> = ({
  surahName, ayah, isPlaying, onPlay, isBookmarked, onToggleBookmark, tafsir,
}) => {
  const { arabicFontSize, translationFontSize, showLatin, showTranslation } = useSettingsStore();
  const [showTafsir, setShowTafsir] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${ayah.text_arabic}\n\n${ayah.text_latin}\n\n${ayah.translation_id} (QS. ${surahName}: ${ayah.number_in_surah})`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `QS. ${surahName}: ${ayah.number_in_surah}`, text: `${ayah.text_arabic}\n\n${ayah.translation_id}`, url: window.location.href });
    } else {
      handleCopy();
    }
  };

  return (
    <div
      id={`ayah-${ayah.number_in_surah}`}
      className={`p-5 rounded-2xl border transition-all scroll-mt-32 ${
        isPlaying
          ? "bg-accent-muted border-accent/30"
          : "bg-surface-card border-border hover:border-border-hover"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gold-400">{ayah.number_in_surah}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onPlay(ayah.number_in_surah, ayah.audio_url)} className={`p-2 rounded-xl transition-all active:scale-90 ${isPlaying ? "text-accent bg-accent-muted" : "text-text-subtle hover:text-accent hover:bg-accent-muted"}`}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button onClick={onToggleBookmark} className={`p-2 rounded-xl transition-all active:scale-90 ${isBookmarked ? "text-gold-400 bg-gold-50" : "text-text-subtle hover:text-gold-400 hover:bg-gold-50"}`}>
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <button onClick={handleCopy} className="p-2 rounded-xl text-text-subtle hover:text-accent hover:bg-accent-muted transition-all active:scale-90">
            {copied ? <span className="text-gold-400 text-xs font-bold">✓</span> : <Copy size={18} />}
          </button>
          <button onClick={handleShare} className="p-2 rounded-xl text-text-subtle hover:text-accent hover:bg-accent-muted transition-all active:scale-90">
            <Share2 size={18} />
          </button>
          {tafsir && (
            <button onClick={() => setShowTafsir(!showTafsir)} className={`p-2 rounded-xl transition-all active:scale-90 ${showTafsir ? "text-accent bg-accent-muted" : "text-text-subtle hover:text-accent hover:bg-accent-muted"}`}>
              <BookOpen size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Arabic */}
      <div className="text-right w-full py-3" dir="rtl">
        <p className="font-arabic leading-[2.4] text-text-heading" style={{ fontSize: `${arabicFontSize}px` }}>
          {ayah.text_arabic}
        </p>
      </div>

      {/* Latin & Translation */}
      <div className="space-y-3 mt-4">
        {showLatin && <p className="text-accent/70 text-base leading-relaxed italic">{ayah.text_latin}</p>}
        {showTranslation && <p className="text-text-secondary leading-relaxed" style={{ fontSize: `${translationFontSize}px` }}>{ayah.translation_id}</p>}
      </div>

      {/* Tafsir */}
      {showTafsir && tafsir && (
        <div className="mt-5 bg-forest-800 rounded-xl p-5 border border-border animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-gold-400" />
            <h4 className="text-sm font-bold text-accent">Tafsir Ringkas</h4>
          </div>
          <p className="text-text-secondary leading-relaxed text-justify" style={{ fontSize: `${translationFontSize}px` }}>{tafsir}</p>
        </div>
      )}
    </div>
  );
};

export default AyahItem;
