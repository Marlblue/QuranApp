import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSurahDetail } from "@/hooks/useSurah";
import AyahItem from "@/components/quran/AyahItem";
import { useAudioStore } from "@/store/useAudioStore";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { ArrowLeft, ArrowRight, ArrowUp, PlayCircle } from "lucide-react";
import { useLastReadStore } from "@/store/useLastReadStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const SurahDetail = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const surahNumber = parseInt(number || "1");
  const { data: surah, isLoading, error } = useSurahDetail(surahNumber);

  useDocumentTitle(surah ? `Surah ${surah.name_latin} | QuranApp` : "Memuat...");
  const { isPlaying, currentSurah, currentAyah, setAudio, pause } = useAudioStore();
  const { lastRead, setLastRead } = useLastReadStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (surah && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [surah, location.hash]);

  useEffect(() => {
    if (surah && lastRead?.surahNumber !== surah.number) {
      setLastRead({ surahNumber: surah.number, surahName: surah.name_latin, ayahNumber: 1 });
    }
  }, [surah, setLastRead, lastRead?.surahNumber]);

  const handlePlay = (ayahNumber: number, url: string) => {
    if (surah) {
      setAudio(surahNumber, ayahNumber, url, surah.verses);
      setLastRead({ surahNumber: surah.number, surahName: surah.name_latin, ayahNumber });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
        <div className="skeleton h-10 w-32 mb-6 rounded-xl" />
        <div className="skeleton h-48 rounded-2xl mb-8" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl mb-4" />
        ))}
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-red-400">
        Gagal memuat surah: {error?.message || "Surah tidak ditemukan"}
      </div>
    );
  }

  const nextSurahNum = surahNumber < 114 ? surahNumber + 1 : null;
  const prevSurahNum = surahNumber > 1 ? surahNumber - 1 : null;
  const isBismillahShown = surahNumber !== 1 && surahNumber !== 9;

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Sticky Header */}
      <div className="sticky top-14 z-30 glass border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <Link to="/" className="p-2 text-text-muted hover:text-accent rounded-xl transition-colors active:scale-95">
            <ArrowLeft size={20} />
          </Link>
          <div className="text-center">
            <h1 className="font-bold text-sm text-text">{surah.name_latin}</h1>
            <p className="text-[11px] text-text-muted">{surah.translation} • {surah.number_of_ayahs} Ayat</p>
          </div>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Surah Info */}
        <div className="bg-forest-100 rounded-2xl p-8 text-center mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-arabic text-4xl leading-relaxed mb-3 text-text-heading">{surah.name_arabic}</p>
            <h2 className="font-display text-2xl font-bold mb-1 text-text-heading">{surah.name_latin}</h2>
            <p className="text-text-secondary mb-4 text-sm">{surah.translation}</p>
            <div className="inline-flex items-center gap-3 text-xs font-semibold bg-surface-hover px-5 py-2 rounded-full border border-border">
              <span className="uppercase tracking-widest text-text-muted">{surah.place}</span>
              <span className="text-text-subtle">•</span>
              <span className="text-text-muted">{surah.number_of_ayahs} Ayat</span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-[0.04]">
            <PlayCircle size={200} strokeWidth={1} />
          </div>
        </div>

        {/* Bismillah */}
        {isBismillahShown && (
          <div className="text-center mb-8 py-4">
            <p className="font-arabic text-2xl text-text leading-loose">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          </div>
        )}

        {/* Ayah List */}
        <div className="space-y-4">
          {surah.verses.map((ayah) => (
            <AyahItem
              key={ayah.number_in_surah}
              surahNumber={surah.number}
              surahName={surah.name_latin}
              ayah={ayah}
              isPlaying={isPlaying && currentSurah === surah.number && currentAyah === ayah.number_in_surah}
              onPlay={handlePlay}
              onPause={pause}
              isBookmarked={isBookmarked(surah.number, ayah.number_in_surah)}
              onToggleBookmark={() =>
                isBookmarked(surah.number, ayah.number_in_surah)
                  ? removeBookmark(surah.number, ayah.number_in_surah)
                  : addBookmark({ surahNumber: surah.number, surahName: surah.name_latin, ayahNumber: ayah.number_in_surah, via: "manual" })
              }
              tafsir={surah.tafsir?.find((t) => t.ayah === ayah.number_in_surah)?.teks}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="flex gap-3 mt-10 mb-4">
          {prevSurahNum ? (
            <Link to={`/surah/${prevSurahNum}`} className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-surface-card border border-border hover:border-border-hover transition-all active:scale-[0.98] text-sm font-medium text-text-secondary">
              <ArrowLeft size={16} /> Sebelumnya
            </Link>
          ) : <div className="flex-1" />}
          {nextSurahNum ? (
            <Link to={`/surah/${nextSurahNum}`} className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-surface-card border border-border hover:border-border-hover transition-all active:scale-[0.98] text-sm font-medium text-text-secondary">
              Selanjutnya <ArrowRight size={16} />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-20 lg:bottom-8 right-4 lg:right-8 p-3 bg-accent text-surface rounded-full shadow-lg shadow-accent/20 transition-all z-40 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        aria-label="Kembali ke atas"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default SurahDetail;
