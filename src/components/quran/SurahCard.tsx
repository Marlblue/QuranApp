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
      className="block bg-canvas border border-hairline rounded-[18px] p-5 hover:border-primary-focus hover:shadow-sm transition-all active:scale-[0.98] group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-full bg-canvas-parchment flex items-center justify-center flex-shrink-0">
          <span className="text-[14px] font-semibold text-ink-faint group-hover:text-primary transition-colors">
            {surah.number}
          </span>
        </div>
        <span className="font-arabic text-2xl text-ink group-hover:text-primary transition-colors">
          {surah.name_arabic}
        </span>
      </div>
      
      <div>
        <h3 className="font-semibold text-[17px] text-ink truncate">
          {surah.name_latin}
        </h3>
        <p className="text-[14px] text-ink-muted mt-0.5 truncate">
          {surah.translation} • {surah.number_of_ayahs} Ayat
        </p>
      </div>
    </Link>
  );
};

export default SurahCard;
