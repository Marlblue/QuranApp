import { useState } from "react";
import { useSurahList } from "@/hooks/useSurah";
import SurahCard from "@/components/quran/SurahCard";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { useLastReadStore } from "@/store/useLastReadStore";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("QuranApp - Baca Al-Quran Digital");
  const { data: surahs, isLoading, error } = useSurahList();
  const [searchQuery, setSearchQuery] = useState("");
  const { lastRead } = useLastReadStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const getHijriDate = () => {
    try {
      return new Intl.DateTimeFormat("id-ID-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());
    } catch {
      return "";
    }
  };

  const filteredSurahs = surahs?.filter(
    (surah) =>
      surah.name_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      {/* Hero */}
      <div className="mb-8">
        <p className="text-gold-400 font-semibold text-sm tracking-wide mb-1">
          {getGreeting()} 👋
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-heading tracking-tight mb-2">
          QuranApp
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <span>
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-text-subtle">•</span>
          <span className="text-gold-400 font-medium">
            {getHijriDate()} H
          </span>
        </div>
      </div>

      {/* Last Read */}
      {lastRead && (
        <Link
          to={`/surah/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}
          className="block mb-8 group"
        >
          <div className="bg-forest-100 rounded-2xl p-5 relative overflow-hidden transition-transform active:scale-[0.98]">
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 text-accent">
                  <BookOpen size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Terakhir Dibaca
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-text-heading truncate mb-0.5">
                  {lastRead.surahName}
                </h2>
                <p className="text-text-secondary text-sm">
                  Ayat {lastRead.ayahNumber}
                </p>
              </div>
              <div className="w-10 h-10 bg-surface-hover rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <ChevronRight size={20} className="text-text-muted" />
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-[0.05]">
              <BookOpen size={120} strokeWidth={1} />
            </div>
          </div>
        </Link>
      )}

      {/* Search */}
      <div className="mb-6 sticky top-14 z-30 -mx-4 px-4 py-3 glass">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface-input border border-border text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all text-[15px]"
          />
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-10 text-red-400">
          Gagal memuat surah: {error.message}
        </div>
      )}

      {/* Surah List */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
          {filteredSurahs?.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      )}

      {filteredSurahs?.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <p className="text-lg font-medium mb-1">Tidak ditemukan</p>
          <p className="text-sm">Coba kata kunci lain.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
