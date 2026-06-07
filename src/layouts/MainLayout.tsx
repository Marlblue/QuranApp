import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Clock,
  Heart,
  Settings,
  BookOpen,
  Grip,
  ScrollText,
  Hash,
  Calculator,
  Book,
  ChevronRight,
  X,
  RotateCcw,
  User,
} from "lucide-react";
import AudioPlayer from "../components/quran/AudioPlayer";
import { useSettingsStore } from "@/store/useSettingsStore";
import { RECITERS } from "@/data/reciters";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const bottomNavLinks = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/prayer-times", label: "Sholat", icon: Clock },
    { path: "/bookmarks", label: "Simpan", icon: Heart },
  ];

  const menuLinks = [
    { path: "/doa-harian", label: "Doa Harian", icon: ScrollText },
    { path: "/asmaul-husna", label: "Asmaul Husna", icon: Grip },
    { path: "/tahlil-wirid", label: "Tahlil & Wirid", icon: Book },
    { path: "/tasbih", label: "Tasbih Digital", icon: Hash },
    { path: "/zakat", label: "Kalkulator Zakat", icon: Calculator },
  ];

  const getPageTitle = (path: string) => {
    if (path === "/") return "Al-Quran";
    if (path === "/prayer-times") return "Jadwal Sholat";
    if (path === "/bookmarks") return "Tersimpan";
    if (path === "/doa-harian") return "Doa Harian";
    if (path === "/asmaul-husna") return "Asmaul Husna";
    if (path === "/tahlil-wirid") return "Tahlil & Wirid";
    if (path === "/tasbih") return "Tasbih Digital";
    if (path === "/zakat") return "Kalkulator Zakat";
    if (path.startsWith("/surah/")) return "Baca Surah";
    return "QuranApp";
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* Single Sticky Header */}
      <header className="sticky top-0 z-50 glass border-b border-hairline">
        <div className="h-[52px] flex items-center justify-between px-4 lg:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-[10px] flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-[17px] font-semibold text-ink tracking-tight hidden sm:inline">
              QuranApp
            </span>
          </Link>

          {/* Desktop Nav (center) */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px]">
            {bottomNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-primary font-semibold"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-ink-faint hover:text-ink transition-colors flex items-center gap-1"
            >
              Lainnya
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-ink-faint hover:text-ink rounded-full transition-colors active:scale-95"
              title="Pengaturan"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 pb-24 lg:pb-8">{children}</main>

      {/* Audio Player */}
      <AudioPlayer />

      {/* Bottom Nav - Mobile Only (Clean, Apple-like) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-hairline pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all active:scale-90 ${
                isActive(link.path)
                  ? "text-primary"
                  : "text-ink-faint"
              }`}
            >
              <link.icon
                size={22}
                strokeWidth={isActive(link.path) ? 2.5 : 1.8}
                fill={isActive(link.path) ? "currentColor" : "none"}
              />
              <span className="text-[10px] font-medium tracking-tight">{link.label}</span>
            </Link>
          ))}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-1.5 text-ink-faint active:scale-90 transition-transform"
          >
            <Grip size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium tracking-tight">Lainnya</span>
          </button>
        </div>
      </nav>

      {/* Menu Bottom Sheet (Mobile & Desktop) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-surface-black/30 backdrop-blur-sm animate-fade-in flex items-end lg:items-center lg:justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="w-full lg:w-[400px] bg-canvas rounded-t-[32px] lg:rounded-[32px] animate-slide-up-sheet lg:animate-scale-in pb-safe overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2 lg:hidden">
              <div className="w-10 h-1 bg-hairline rounded-full" />
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-b border-hairline">
              <h2 className="text-[21px] font-semibold text-ink tracking-tight">Lainnya</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-ink bg-canvas-parchment rounded-full hover:bg-hairline transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all active:scale-[0.98] ${
                    isActive(link.path)
                      ? "bg-canvas-parchment text-primary"
                      : "bg-canvas hover:bg-canvas-parchment text-ink"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive(link.path)
                        ? "bg-primary text-white"
                        : "bg-canvas-parchment text-ink"
                    }`}
                  >
                    <link.icon size={20} />
                  </div>
                  <span className="font-semibold text-[17px] flex-1">{link.label}</span>
                  <ChevronRight size={16} className="text-ink-faint" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Bottom Sheet */}
      {isSettingsOpen && (
        <SettingsSheet onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

/* ===== Settings Sheet (Apple Card Style) ===== */
const SettingsSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    arabicFontSize,
    translationFontSize,
    showLatin,
    showTranslation,
    reciterId,
    setArabicFontSize,
    setTranslationFontSize,
    toggleLatin,
    toggleTranslation,
    setReciterId,
    resetSettings,
  } = useSettingsStore();

  return (
    <div
      className="fixed inset-0 z-[70] bg-surface-black/30 backdrop-blur-sm animate-fade-in flex items-end lg:items-center lg:justify-center"
      onClick={onClose}
    >
      <div
        className="w-full lg:w-[440px] bg-canvas rounded-t-[32px] lg:rounded-[32px] animate-slide-up-sheet lg:animate-scale-in pb-safe max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 lg:hidden">
          <div className="w-10 h-1 bg-hairline rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
          <h2 className="text-[21px] font-semibold text-ink tracking-tight">Pengaturan</h2>
          <button
            onClick={onClose}
            className="p-2 text-ink bg-canvas-parchment rounded-full hover:bg-hairline transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          
          {/* Reciter Section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-semibold text-ink-faint uppercase tracking-wider">Qari</h3>
            <div className="bg-canvas-parchment rounded-xl overflow-hidden border border-hairline">
              <select
                value={reciterId}
                onChange={(e) => setReciterId(e.target.value)}
                className="w-full p-4 bg-transparent text-[17px] focus:outline-none appearance-none"
              >
                {RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Typography Section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-semibold text-ink-faint uppercase tracking-wider">Ukuran Teks</h3>
            
            <div className="bg-canvas-parchment rounded-xl border border-hairline divide-y divide-hairline">
              {/* Arabic Size */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[17px]">Huruf Arab</span>
                  <span className="text-[14px] text-ink-faint">{arabicFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="2"
                  value={arabicFontSize}
                  onChange={(e) => setArabicFontSize(Number(e.target.value))}
                  className="w-full"
                />
                <p
                  className="font-arabic text-right text-ink pt-2"
                  style={{ fontSize: `${arabicFontSize}px`, lineHeight: 1.8 }}
                >
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
              </div>

              {/* Translation Size */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[17px]">Terjemahan</span>
                  <span className="text-[14px] text-ink-faint">{translationFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="24"
                  step="1"
                  value={translationFontSize}
                  onChange={(e) => setTranslationFontSize(Number(e.target.value))}
                  className="w-full"
                />
                <p
                  className="text-ink-muted pt-2 text-apple-body"
                  style={{ fontSize: `${translationFontSize}px` }}
                >
                  Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.
                </p>
              </div>
            </div>
          </div>

          {/* Display Toggles */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-semibold text-ink-faint uppercase tracking-wider">Tampilan</h3>
            <div className="bg-canvas-parchment rounded-xl border border-hairline divide-y divide-hairline">
              <div className="flex items-center justify-between p-4">
                <span className="text-[17px]">Tampilkan Latin</span>
                <button
                  onClick={toggleLatin}
                  className={`toggle-switch ${showLatin ? "active" : ""}`}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-[17px]">Tampilkan Terjemahan</span>
                <button
                  onClick={toggleTranslation}
                  className={`toggle-switch ${showTranslation ? "active" : ""}`}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-hairline flex justify-between bg-canvas lg:rounded-b-[32px]">
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 text-[14px] text-ink-faint hover:text-red-500 transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            onClick={onClose}
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold text-[17px] hover:bg-primary-focus transition-colors active:scale-95"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
