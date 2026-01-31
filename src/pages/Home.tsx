import { useState } from "react";
import { useSurahList } from "@/hooks/useSurah";
import SurahCard from "@/components/quran/SurahCard";
import { Search, BookOpen } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Error loading surahs: {error.message}
      </div>
    );
  }

  const filteredSurahs = surahs?.filter(
    (surah) =>
      surah.name_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery),
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between">
        <div>
          <p className="text-emerald-600 font-semibold mb-2 tracking-wide uppercase text-sm">
            {getGreeting()}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            QuranApp
          </h1>
          <p className="text-gray-500 text-lg max-w-md">
            Baca Al-Quran dengan nyaman, dimana saja dan kapan saja.
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-2">
            <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              {new Date().toLocaleDateString("id-ID", { weekday: "long" })}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <p className="text-sm font-bold text-emerald-700 bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100">
            {getHijriDate()} H
          </p>
        </div>
      </div>

      {/* Last Read Section */}
      {lastRead && (
        <div className="mb-12 bg-linear-to-br from-emerald-600 to-teal-800 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden group transition-transform hover:scale-[1.01] duration-500">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-100/90">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                  <BookOpen size={16} />
                </div>
                <span className="font-semibold tracking-wider text-xs uppercase">
                  Terakhir Dibaca
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 font-amiri tracking-wide leading-relaxed">
                {lastRead.surahName}
              </h2>
              <p className="text-emerald-100 text-xl font-medium">
                Ayat {lastRead.ayahNumber}
              </p>
            </div>
            <Link
              to={`/surah/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}
              className="inline-flex items-center justify-center bg-white text-emerald-800 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl active:scale-95 w-full md:w-auto gap-2 group/btn"
            >
              Lanjut Baca
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover/btn:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-12 -bottom-24 opacity-10 transform rotate-12 transition-transform group-hover:scale-110 duration-700 ease-out">
            <BookOpen size={350} />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
      )}

      {/* Search Section */}
      <div className="mb-10 sticky top-4 z-30 -mx-4 px-4 md:static md:mx-0 md:p-0">
        <div className="relative max-w-2xl mx-auto md:mx-0 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari Surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500 shadow-lg shadow-gray-100/50 focus:shadow-xl focus:shadow-emerald-500/10 outline-none transition-all duration-300 bg-white/90 backdrop-blur-xl text-lg placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSurahs?.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>

      {filteredSurahs?.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Tidak ada surah yang ditemukan.
        </div>
      )}
    </div>
  );
};

export default Home;
