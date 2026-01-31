import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSurahDetail } from "@/hooks/useSurah";
import AyahItem from "@/components/quran/AyahItem";
import { useAudioStore } from "@/store/useAudioStore";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { ArrowLeft, ArrowRight, PlayCircle, ArrowUp } from "lucide-react";
import { useLastReadStore } from "@/store/useLastReadStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const SurahDetail = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const surahNumber = parseInt(number || "1");
  const { data: surah, isLoading, error } = useSurahDetail(surahNumber);

  useDocumentTitle(
    surah ? `Surah ${surah.name_latin} | QuranApp` : "Membaca Surah...",
  );
  const { isPlaying, currentSurah, currentAyah, setAudio, pause } =
    useAudioStore();
  const { lastRead, setLastRead } = useLastReadStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to ayah if hash is present
  useEffect(() => {
    if (surah && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Optional: Add a highlight effect
          element.classList.add("bg-yellow-50");
          setTimeout(() => element.classList.remove("bg-yellow-50"), 2000);
        }, 100);
      }
    }
  }, [surah, location.hash]);

  useEffect(() => {
    if (surah) {
      // Only set last read if it's not already set for this surah to avoid overwriting specific ayah
      // Or simply update it to the surah level when entering
      if (lastRead?.surahNumber !== surah.number) {
        setLastRead({
          surahNumber: surah.number,
          surahName: surah.name_latin,
          ayahNumber: 1,
        });
      }
    }
  }, [surah, setLastRead, lastRead?.surahNumber]);

  const handlePlay = (ayahNumber: number, url: string) => {
    if (surah) {
      setAudio(surahNumber, ayahNumber, url, surah.verses);
      // Update last read when playing an ayah
      setLastRead({
        surahNumber: surah.number,
        surahName: surah.name_latin,
        ayahNumber: ayahNumber,
      });
    }
  };

  const handlePause = () => {
    pause();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Error loading surah: {error?.message || "Surah not found"}
      </div>
    );
  }

  const nextSurahNum = surahNumber < 114 ? surahNumber + 1 : null;
  const prevSurahNum = surahNumber > 1 ? surahNumber - 1 : null;

  const isBismillahShown = surahNumber !== 1 && surahNumber !== 9;

  return (
    <div className="bg-white min-h-screen pb-24 animate-in fade-in duration-500">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-4xl">
          <Link
            to="/"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 active:scale-95"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="text-center">
            <h1 className="font-bold text-lg text-gray-900 font-amiri">
              {surah.name_latin}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {surah.translation} • {surah.number_of_ayahs} Ayat
            </p>
          </div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Surah Info Card */}
        <div className="bg-linear-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-10 text-white text-center mb-12 shadow-2xl shadow-emerald-900/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-4 font-amiri leading-relaxed">
              {surah.name_arabic}
            </h2>
            <h3 className="text-3xl font-bold mb-3 tracking-tight">{surah.name_latin}</h3>
            <p className="text-emerald-100 mb-8 text-lg">{surah.translation}</p>
            <div className="justify-center gap-6 text-sm font-semibold bg-white/10 inline-flex px-8 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-inner">
              <span className="uppercase tracking-widest">{surah.place}</span>
              <span className="text-emerald-300">•</span>
              <span>{surah.number_of_ayahs} Ayat</span>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -left-16 -bottom-32 opacity-10 transform -rotate-12 group-hover:rotate-0 transition-transform duration-1000 ease-out">
            <PlayCircle size={400} />
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        </div>

        {isBismillahShown && (
          <div className="text-center mb-12 py-6">
            <img
              src="/bismillah.png"
              alt="Bismillah"
              className="h-16 mx-auto opacity-80"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <p className="hidden font-amiri text-3xl text-gray-800 leading-loose">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>
        )}

        <div className="space-y-6">
          {surah.verses.map((ayah) => (
            <AyahItem
              key={ayah.number_in_surah}
              surahNumber={surah.number}
              surahName={surah.name_latin}
              ayah={ayah}
              isPlaying={
                isPlaying &&
                currentSurah === surah.number &&
                currentAyah === ayah.number_in_surah
              }
              onPlay={handlePlay}
              onPause={handlePause}
              isBookmarked={isBookmarked(surah.number, ayah.number_in_surah)}
              onToggleBookmark={() =>
                isBookmarked(surah.number, ayah.number_in_surah)
                  ? removeBookmark(surah.number, ayah.number_in_surah)
                  : addBookmark({
                      surahNumber: surah.number,
                      surahName: surah.name_latin,
                      ayahNumber: ayah.number_in_surah,
                      via: "manual",
                    })
              }
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-12">
          {prevSurahNum ? (
            <Link
              to={`/surah/${prevSurahNum}`}
              className="flex-1 bg-white border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 p-4 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-sm hover:shadow-md"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Surat Sebelumnya</span>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}

          {nextSurahNum ? (
            <Link
              to={`/surah/${nextSurahNum}`}
              className="flex-1 bg-white border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 p-4 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-sm hover:shadow-md"
            >
              <span className="font-medium">Surat Selanjutnya</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-24 right-6 p-3 bg-emerald-600 text-white rounded-full shadow-lg transition-all duration-300 z-40 hover:bg-emerald-700 active:scale-95 ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Kembali ke atas"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </div>
  );
};

export default SurahDetail;
