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

  return (
    <div className="min-h-screen bg-surface text-text">
      {/* Top Header */}
      <header className="glass sticky top-0 z-40 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
              <BookOpen size={18} className="text-surface" />
            </div>
            <span className="text-xl font-display font-bold text-text-heading tracking-tight">
              QuranApp
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {bottomNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-accent text-surface shadow-md shadow-accent/20"
                    : "text-text-muted hover:bg-surface-hover hover:text-text"
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
            
            {/* Desktop Dropdown for More */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-surface-hover hover:text-text transition-all">
                <Grip size={18} />
                Lainnya
              </button>
              <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-2xl shadow-xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right z-50">
                <div className="p-2 space-y-1">
                  {menuLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.path)
                          ? "bg-accent-muted text-accent"
                          : "text-text-muted hover:bg-surface-hover hover:text-text"
                      }`}
                    >
                      <link.icon size={16} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-px h-6 bg-border mx-2" />
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 text-text-muted hover:bg-surface-hover hover:text-text rounded-xl transition-all"
              title="Pengaturan"
            >
              <Settings size={20} />
            </button>
          </nav>

          {/* Mobile: Menu + Settings */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 text-text-muted rounded-xl active:scale-95 transition-transform"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 text-text-muted rounded-xl active:scale-95 transition-transform"
            >
              <Grip size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="pb-24 lg:pb-8">{children}</main>

      {/* Audio Player */}
      <AudioPlayer />

      {/* Bottom Nav - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all active:scale-90 ${
                isActive(link.path)
                  ? "text-gold-400"
                  : "text-text-subtle"
              }`}
            >
              <link.icon
                size={22}
                strokeWidth={isActive(link.path) ? 2.5 : 1.8}
                fill={link.label === "Simpan" && isActive(link.path) ? "currentColor" : "none"}
              />
              <span className="text-[10px] font-semibold">{link.label}</span>
              {isActive(link.path) && (
                <div className="w-1 h-1 bg-gold-400 rounded-full" />
              )}
            </Link>
          ))}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-text-subtle active:scale-90 transition-transform"
          >
            <Grip size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-semibold">Lainnya</span>
          </button>
        </div>
      </nav>

      {/* Menu Bottom Sheet */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl animate-slide-up-sheet pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-forest-200 rounded-full" />
            </div>
            <div className="px-5 pb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-heading">Menu Lainnya</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-text-muted rounded-xl hover:bg-surface-hover"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-4 pb-8 stagger-children">
              {menuLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-[0.98] ${
                    isActive(link.path)
                      ? "bg-accent-muted text-accent"
                      : "text-text hover:bg-surface-hover"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive(link.path)
                        ? "bg-accent text-surface"
                        : "bg-forest-800 text-text-muted"
                    }`}
                  >
                    <link.icon size={20} />
                  </div>
                  <span className="font-semibold flex-1">{link.label}</span>
                  <ChevronRight size={16} className="text-text-subtle" />
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

/* ===== Settings Sheet ===== */
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
      className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-w-md lg:rounded-2xl bg-surface rounded-t-3xl animate-slide-up-sheet lg:animate-scale-in pb-safe max-h-[85vh] flex flex-col border-t border-border lg:border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="lg:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-forest-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-gold-400" />
            <h2 className="font-bold text-lg text-text-heading">Pengaturan</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted rounded-xl hover:bg-surface-hover"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* Reciter */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User size={18} className="text-text-muted" />
              <span className="font-medium">Qari</span>
            </div>
            <select
              value={reciterId}
              onChange={(e) => setReciterId(e.target.value)}
              className="w-full p-3 bg-surface-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 text-text"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <hr className="border-border" />

          {/* Arabic Font Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Ukuran Arab</span>
              <span className="text-xs font-bold bg-accent-muted text-accent px-2.5 py-1 rounded-lg">
                {arabicFontSize}px
              </span>
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
              className="font-arabic text-right leading-[2.2] text-text"
              style={{ fontSize: `${arabicFontSize}px` }}
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>

          <hr className="border-border" />

          {/* Translation Font Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Ukuran Terjemahan</span>
              <span className="text-xs font-bold bg-accent-muted text-accent px-2.5 py-1 rounded-lg">
                {translationFontSize}px
              </span>
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
              className="text-text-secondary"
              style={{ fontSize: `${translationFontSize}px` }}
            >
              Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.
            </p>
          </div>

          <hr className="border-border" />

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Tampilkan Latin</span>
              <button
                onClick={toggleLatin}
                className={`toggle-switch ${showLatin ? "active" : ""}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Tampilkan Terjemahan</span>
              <button
                onClick={toggleTranslation}
                className={`toggle-switch ${showTranslation ? "active" : ""}`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border flex justify-between">
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-red-400 px-3 py-2 rounded-xl hover:bg-red-900/20 transition-all"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={onClose}
            className="bg-accent text-surface px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-accent-hover transition-all active:scale-95"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
