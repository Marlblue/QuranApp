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
      className="block bg-white hover:bg-emerald-50/30 border border-gray-100 hover:border-emerald-200 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <span className="font-amiri text-6xl text-emerald-600 leading-none">
          {surah.number}
        </span>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 bg-gray-50 group-hover:bg-emerald-100 rounded-full transition-colors duration-300">
            <span className="font-bold text-gray-400 group-hover:text-emerald-600 text-sm">
              {surah.number}
            </span>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">
              {surah.name_latin}
            </h3>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide group-hover:text-emerald-600/70 transition-colors">
              {surah.translation}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-amiri text-2xl text-gray-800 group-hover:text-emerald-800 transition-colors">
            {surah.name_arabic}
          </p>
          <p className="text-xs text-gray-400 font-medium mt-1">
            {surah.number_of_ayahs} Ayat
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SurahCard;
