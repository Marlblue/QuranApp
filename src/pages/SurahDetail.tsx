import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSurahDetail } from "@/hooks/useSurah";
import AyahItem from "@/components/quran/AyahItem";
import { useAudioStore } from "@/store/useAudioStore";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useLastReadStore } from "@/store/useLastReadStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const SurahDetail = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const surahNumber = parseInt(number || "1");
  const { data: surah, isLoading, error } = useSurahDetail(surahNumber);

  useDocumentTitle(surah ? `Surah ${surah.name_latin} | QuranApp` : "Memuat...");
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const currentSurah = useAudioStore((state) => state.currentSurah);
  const currentAyah = useAudioStore((state) => state.currentAyah);
  const setAudio = useAudioStore((state) => state.setAudio);
  const { lastRead, setLastRead } = useLastReadStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [surahNumber]);

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
      <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
        <div className="skeleton h-10 w-32 mb-6 rounded-xl mx-auto" />
        <div className="skeleton h-32 rounded-2xl mb-16 mx-auto w-full max-w-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl mb-8" />
        ))}
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-red-500 font-medium">
        Gagal memuat surah: {error?.message || "Surah tidak ditemukan"}
      </div>
    );
  }

  const nextSurahNum = surahNumber < 114 ? surahNumber + 1 : null;
  const prevSurahNum = surahNumber > 1 ? surahNumber - 1 : null;
  const isBismillahShown = surahNumber !== 1 && surahNumber !== 9;

  return (
    <div className="min-h-screen bg-canvas animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Back button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-medium text-[14px]">
            <ArrowLeft size={16} /> Kembali
          </Link>
        </div>

        {/* Surah Hero Info */}
        <div className="py-12 text-center mb-8">
          <p className="font-arabic text-[56px] leading-relaxed mb-4 text-primary">
            {surah.name_arabic}
          </p>
          <h1 className="text-apple-display text-ink mb-1">
            {surah.name_latin}
          </h1>
          <p className="text-apple-body text-ink-muted mb-6">
            {surah.translation}
          </p>
          <div className="inline-flex items-center gap-3 text-[12px] font-medium bg-canvas-parchment px-4 py-1.5 rounded-full border border-hairline">
            <span className="uppercase tracking-widest text-ink-faint">{surah.place}</span>
            <span className="text-ink-faint">•</span>
            <span className="text-ink-faint">{surah.number_of_ayahs} Ayat</span>
          </div>
        </div>

        {/* Bismillah */}
        {isBismillahShown && (
          <div className="text-center mb-16 py-4">
            <p className="font-arabic text-[28px] text-ink leading-loose">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>
        )}

        {/* Ayah List (Clean, Hairline separation) */}
        <div className="flex flex-col">
          {surah.verses.map((ayah, index) => (
            <AyahItem
              key={ayah.number_in_surah}
              surahNumber={surah.number}
              surahName={surah.name_latin}
              ayah={ayah}
              isPlaying={isPlaying && currentSurah === surah.number && currentAyah === ayah.number_in_surah}
              onPlay={handlePlay}
              isBookmarked={isBookmarked(surah.number, ayah.number_in_surah)}
              onToggleBookmark={() =>
                isBookmarked(surah.number, ayah.number_in_surah)
                  ? removeBookmark(surah.number, ayah.number_in_surah)
                  : addBookmark({ surahNumber: surah.number, surahName: surah.name_latin, ayahNumber: ayah.number_in_surah, via: "manual" })
              }
              tafsir={surah.tafsir?.find((t) => t.ayah === ayah.number_in_surah)?.teks}
              isLast={index === surah.verses.length - 1}
            />
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="flex gap-4 mt-16 mb-8">
          {prevSurahNum ? (
            <Link to={`/surah/${prevSurahNum}`} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-[18px] bg-canvas-parchment hover:bg-hairline transition-colors active:scale-[0.98] text-[14px] font-semibold text-ink">
              <ArrowLeft size={16} /> Sebelumnya
            </Link>
          ) : <div className="flex-1" />}
          {nextSurahNum ? (
            <Link to={`/surah/${nextSurahNum}`} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-[18px] bg-canvas-parchment hover:bg-hairline transition-colors active:scale-[0.98] text-[14px] font-semibold text-ink">
              Selanjutnya <ArrowRight size={16} />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>

      {/* Floating Scroll Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-[100px] lg:bottom-10 right-6 p-3 bg-canvas-parchment text-ink rounded-full border border-hairline shadow-sm transition-all z-40 hover:bg-hairline active:scale-95 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Kembali ke atas"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default SurahDetail;
