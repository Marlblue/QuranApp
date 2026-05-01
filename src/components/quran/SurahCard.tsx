import React from "react";
import { Link } from "react-router-dom";
import type { SurahSummary } from "@/types/quran.types";

interface SurahCardProps {
  surah: SurahSummary;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah }) => {
  return (
    <Link
      to={`/surah/${surah.number}`}
      className="flex items-center gap-4 p-4 rounded-2xl bg-surface-card border border-border hover:border-border-hover transition-all active:scale-[0.98] group"
    >
      <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-text-muted group-hover:text-gold-400 transition-colors">
          {surah.number}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[15px] text-text group-hover:text-accent transition-colors truncate">
          {surah.name_latin}
        </h3>
        <p className="text-xs text-text-muted truncate">
          {surah.translation} • {surah.number_of_ayahs} Ayat
        </p>
      </div>
      <p className="font-arabic text-xl text-gold-400 flex-shrink-0">
        {surah.name_arabic}
      </p>
    </Link>
  );
};

export default SurahCard;
