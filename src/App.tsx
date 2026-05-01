import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const Home = lazy(() => import("./pages/Home"));
const SurahDetail = lazy(() => import("./pages/SurahDetail"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const PrayerTimes = lazy(() => import("./pages/PrayerTimes"));
const AsmaulHusnaPage = lazy(() => import("./pages/AsmaulHusna"));
const DailyPrayers = lazy(() => import("./pages/DailyPrayers"));
const Tasbih = lazy(() => import("./pages/Tasbih"));
const TahlilWirid = lazy(() => import("./pages/TahlilWirid"));
const ZakatCalculator = lazy(() => import("./pages/ZakatCalculator"));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-forest-200 border-t-accent rounded-full animate-spin" />
      <p className="text-sm text-text-muted font-medium">Memuat...</p>
    </div>
  </div>
);

function App() {
  return (
    <MainLayout>
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
    </MainLayout>
  );
}

export default App;
