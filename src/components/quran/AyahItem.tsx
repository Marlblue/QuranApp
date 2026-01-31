import React from "react";
import { useState } from "react";
import { Play, Pause, Bookmark, Copy, Share2, BookOpen } from "lucide-react";
import type { Ayah } from "@/types/quran.types";
import clsx from "clsx";
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
  surahName,
  ayah,
  isPlaying,
  onPlay,
  isLastRead,
  isBookmarked,
  onToggleBookmark,
  tafsir,
}) => {
  const { arabicFontSize, translationFontSize, showLatin, showTranslation } =
    useSettingsStore();
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
      navigator.share({
        title: `QS. ${surahName}: ${ayah.number_in_surah}`,
        text: `${ayah.text_arabic}\n\n${ayah.translation_id}`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div
      id={`ayah-${ayah.number_in_surah}`}
      className={clsx(
        "py-8 px-2 border-b border-gray-100 scroll-mt-32 transition-colors rounded-3xl",
        isPlaying ? "bg-emerald-50/50" : "hover:bg-gray-50/50",
        isLastRead && "bg-blue-50/50",
      )}
    >
      <div className="flex flex-col gap-6">
        {/* Toolbar & Number */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-emerald-100/50 text-emerald-800 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xs backdrop-blur-sm border border-emerald-100">
            {ayah.number_in_surah}
          </div>

          <div className="flex items-center gap-2 bg-gray-50/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-100">
            <button
              onClick={() => onPlay(ayah.number_in_surah, ayah.audio_url)}
              className="p-2.5 hover:bg-white rounded-xl transition-all text-emerald-600 active:scale-95 hover:shadow-sm"
              title={isPlaying ? "Pause Audio" : "Play Audio"}
            >
              {isPlaying ? (
                <Pause size={20} className="fill-current" />
              ) : (
                <Play size={20} className="fill-current" />
              )}
            </button>
            <div className="w-px h-6 bg-gray-200" />
            <button
              onClick={onToggleBookmark}
              className={clsx(
                "p-2.5 hover:bg-white rounded-xl transition-all active:scale-95 hover:shadow-sm",
                isBookmarked
                  ? "text-emerald-600 bg-white shadow-sm"
                  : "text-gray-400 hover:text-emerald-600",
              )}
              title={isBookmarked ? "Hapus Bookmark" : "Simpan Bookmark"}
            >
              <Bookmark
                size={20}
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={handleCopy}
              className="p-2.5 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-emerald-600 active:scale-95 hover:shadow-sm"
              title="Salin Ayat"
            >
              {copied ? (
                <span className="text-emerald-600 font-bold text-xs">
                  Salin!
                </span>
              ) : (
                <Copy size={20} />
              )}
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-emerald-600 active:scale-95 hover:shadow-sm"
              title="Bagikan Ayat"
            >
              <Share2 size={20} />
            </button>
            {/* Tafsir Button */}
            {tafsir && (
              <button
                onClick={() => setShowTafsir(!showTafsir)}
                className={clsx(
                  "p-2.5 hover:bg-white rounded-xl transition-all active:scale-95 hover:shadow-sm",
                  showTafsir
                    ? "text-emerald-600 bg-white shadow-sm"
                    : "text-gray-400 hover:text-emerald-600",
                )}
                title="Baca Tafsir"
              >
                <BookOpen size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Arabic Text */}
        <div className="text-right w-full py-4" dir="rtl">
          <p
            className="font-amiri leading-[2.2] text-gray-800"
            style={{ fontSize: `${arabicFontSize}px` }}
          >
            {ayah.text_arabic}
          </p>
        </div>

        {/* Translation Section */}
        <div className="space-y-4">
          {showLatin && (
            <p className="text-emerald-600/90 font-medium font-scheherazade text-xl leading-relaxed tracking-wide">
              {ayah.text_latin}
            </p>
          )}

          {showTranslation && (
            <p
              className="text-gray-600 leading-relaxed font-sans"
              style={{ fontSize: `${translationFontSize}px` }}
            >
              {ayah.translation_id}
            </p>
          )}
        </div>

        {/* Tafsir Panel */}
        {showTafsir && tafsir && (
          <div className="mt-4 bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 mb-4 text-emerald-800 font-bold">
              <div className="p-2 bg-white rounded-lg shadow-xs">
                <BookOpen size={18} />
              </div>
              <h4 className="text-lg">Tafsir Ringkas (Kemenag)</h4>
            </div>
            <p
              className="text-gray-700 leading-loose text-justify font-serif"
              style={{ fontSize: `${translationFontSize}px` }}
            >
              {tafsir}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AyahItem;
