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
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  tafsir?: string;
  isLast?: boolean;
}

const AyahItem: React.FC<AyahItemProps> = ({
  surahName, ayah, isPlaying, onPlay, isBookmarked, onToggleBookmark, tafsir, isLast = false,
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
      className={`py-10 transition-colors scroll-mt-24 ${isLast ? "" : "border-b border-hairline"} ${
        isPlaying ? "bg-primary/5 rounded-[18px] px-6 my-2 border-transparent" : "px-2"
      }`}
    >
      {/* Arabic Text */}
      <div className="text-right w-full mb-8" dir="rtl">
        <p className="font-arabic leading-[2.2] text-ink" style={{ fontSize: `${arabicFontSize}px` }}>
          {ayah.text_arabic}
        </p>
      </div>

      {/* Latin & Translation */}
      <div className="space-y-3 mb-8">
        {showLatin && (
          <p className="text-primary text-[17px] leading-relaxed italic font-medium">
            {ayah.text_latin}
          </p>
        )}
        {showTranslation && (
          <p className="text-ink leading-relaxed" style={{ fontSize: `${translationFontSize}px` }}>
            {ayah.translation_id}
          </p>
        )}
      </div>

      {/* Actions & Ayah Number */}
      <div className="flex items-center justify-between mt-6">
        <div className="w-8 h-8 rounded-full bg-canvas-parchment flex items-center justify-center border border-hairline shrink-0">
          <span className="text-[13px] font-semibold text-ink-faint">{ayah.number_in_surah}</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => onPlay(ayah.number_in_surah, ayah.audio_url)} 
            className={`p-2 rounded-full transition-colors active:scale-90 ${isPlaying ? "text-primary bg-primary/10" : "text-ink-faint hover:text-ink hover:bg-canvas-parchment"}`}
            title="Putar Audio"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            onClick={onToggleBookmark} 
            className={`p-2 rounded-full transition-colors active:scale-90 ${isBookmarked ? "text-primary bg-primary/10" : "text-ink-faint hover:text-ink hover:bg-canvas-parchment"}`}
            title="Simpan Ayat"
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleCopy} 
            className="p-2 rounded-full text-ink-faint hover:text-ink hover:bg-canvas-parchment transition-colors active:scale-90"
            title="Salin Teks"
          >
            {copied ? <span className="text-primary text-xs font-bold px-1">✓</span> : <Copy size={18} />}
          </button>
          <button 
            onClick={handleShare} 
            className="p-2 rounded-full text-ink-faint hover:text-ink hover:bg-canvas-parchment transition-colors active:scale-90"
            title="Bagikan"
          >
            <Share2 size={18} />
          </button>
          {tafsir && (
            <button 
              onClick={() => setShowTafsir(!showTafsir)} 
              className={`p-2 rounded-full transition-colors active:scale-90 ${showTafsir ? "text-primary bg-primary/10" : "text-ink-faint hover:text-ink hover:bg-canvas-parchment"}`}
              title="Tafsir Ringkas"
            >
              <BookOpen size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Tafsir */}
      {showTafsir && tafsir && (
        <div className="mt-6 bg-canvas-parchment rounded-[18px] p-6 border border-hairline animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-primary" />
            <h4 className="text-[15px] font-semibold text-ink">Tafsir Ringkas</h4>
          </div>
          <p className="text-ink-muted leading-relaxed text-justify" style={{ fontSize: `${translationFontSize}px` }}>
            {tafsir}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(AyahItem);
