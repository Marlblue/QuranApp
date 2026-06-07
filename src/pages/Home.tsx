import { useState } from "react";
import { useSurahList } from "@/hooks/useSurah";
import SurahCard from "@/components/quran/SurahCard";
import { Search, ChevronRight, ArrowRight } from "lucide-react";
import { useLastReadStore } from "@/store/useLastReadStore";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("QuranApp - Baca Al-Quran Digital");
  const { data: surahs, isLoading, error } = useSurahList();
  const [searchQuery, setSearchQuery] = useState("");
  const { lastRead } = useLastReadStore();

  const filteredSurahs = surahs?.filter(
    (surah) =>
      surah.name_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery),
  );

  return (
    <div className="animate-fade-in flex flex-col min-h-screen px-4 md:px-8 py-8">
      {/* Apple Style Dark Hero Tile */}
      <div className="bg-surface-tile rounded-[32px] p-8 sm:p-12 text-white mb-10 overflow-hidden relative shadow-product">
        <div className="relative z-10 sm:w-2/3">
          <h1 className="text-[56px] font-semibold tracking-tight leading-[1.05] mb-4">
            The Holy<br />Quran
          </h1>
          <p className="text-[17px] text-white/70 max-w-sm mb-8">
            Read, listen, and study the Quran with a beautifully crafted reading experience.
          </p>

          <Link
            to={lastRead ? `/surah/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}` : "/surah/1"}
            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-semibold text-[17px] hover:bg-surface-pearl transition-colors active:scale-95 shadow-sm relative z-20"
          >
            {lastRead ? "Lanjutkan Membaca" : "Mulai Membaca"} <ArrowRight size={18} />
          </Link>
        </div>
        
        {/* Decorative 3D Image */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[70%] h-[150%] hidden sm:block pointer-events-none">
           <img src="/images/quran_hero.png" alt="Quran 3D" className="w-full h-full object-contain opacity-90 drop-shadow-2xl" />
        </div>
        <div className="absolute right-[-40%] top-0 w-[140%] h-[140%] sm:hidden opacity-40 pointer-events-none">
           <img src="/images/quran_hero.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Surah List Tile - Parchment */}
      <section className="bg-canvas-parchment py-16 px-4 md:px-8 flex-1 rounded-[32px]">
        <div className="max-w-5xl mx-auto">
          {/* Search Input Apple Style */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-faint w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 rounded-full bg-canvas text-ink border border-hairline focus:outline-none focus:border-primary-focus focus:ring-1 focus:ring-primary-focus transition-all text-apple-body shadow-sm"
              />
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton h-[114px] rounded-[18px]" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500 font-medium text-apple-body">
              Gagal memuat surah: {error.message}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSurahs?.map((surah) => (
                <SurahCard key={surah.number} surah={surah} />
              ))}
            </div>
          )}

          {filteredSurahs?.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[21px] font-semibold text-ink mb-1">Tidak ditemukan</p>
              <p className="text-ink-muted text-apple-body">Coba kata kunci lain.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
