import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AudioPlayer from "./components/quran/AudioPlayer";

// Lazy load pages for better performance (Code Splitting)
const Home = lazy(() => import("./pages/Home"));
const SurahDetail = lazy(() => import("./pages/SurahDetail"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const PrayerTimes = lazy(() => import("./pages/PrayerTimes"));
const AsmaulHusnaPage = lazy(() => import("./pages/AsmaulHusna"));
const DailyPrayers = lazy(() => import("./pages/DailyPrayers"));
const Tasbih = lazy(() => import("./pages/Tasbih"));
const TahlilWirid = lazy(() => import("./pages/TahlilWirid"));
const ZakatCalculator = lazy(() => import("./pages/ZakatCalculator"));

// Loading Spinner Component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]">
      <Navbar />
      <main className="pb-24 pt-4">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/surah/:number" element={<SurahDetail />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/prayer-times" element={<PrayerTimes />} />
            <Route path="/asmaul-husna" element={<AsmaulHusnaPage />} />
            <Route path="/doa-harian" element={<DailyPrayers />} />
            <Route path="/tasbih" element={<Tasbih />} />
            <Route path="/tahlil-wirid" element={<TahlilWirid />} />
            <Route path="/zakat" element={<ZakatCalculator />} />
          </Routes>
        </Suspense>
      </main>
      <AudioPlayer />
    </div>
  );
}

export default App;
