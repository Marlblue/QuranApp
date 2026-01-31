import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Heart,
  Home,
  Settings,
  Clock,
  Menu,
  X,
  Grip,
  ScrollText,
  Hash,
  Calculator,
  Book,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import SettingsModal from "./SettingsModal";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mainLinks = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/prayer-times", label: "Jadwal Sholat", icon: Clock },
    { path: "/doa-harian", label: "Doa Harian", icon: ScrollText },
    { path: "/bookmarks", label: "Bookmarks", icon: Heart },
  ];

  const secondaryLinks = [
    { path: "/asmaul-husna", label: "Asmaul Husna", icon: Grip },
    { path: "/tahlil-wirid", label: "Tahlil & Wirid", icon: Book },
    { path: "/tasbih", label: "Tasbih", icon: Hash },
    { path: "/zakat", label: "Kalkulator Zakat", icon: Calculator },
  ];

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100/50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-emerald-50 p-2.5 rounded-xl group-hover:bg-emerald-100 transition-colors shadow-inner">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent tracking-tight">
                QuranApp
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                  }`}
                >
                  <link.icon
                    size={18}
                    fill={
                      link.label === "Bookmarks" && isActive(link.path)
                        ? "currentColor"
                        : "none"
                    }
                  />
                  {link.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isMoreOpen || secondaryLinks.some((l) => isActive(l.path))
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                  }`}
                >
                  Lainnya
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMoreOpen && (
                  <div className="absolute top-full right-0 mt-3 w-60 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black/5">
                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMoreOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                          isActive(link.path)
                            ? "bg-emerald-50 text-emerald-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg ${isActive(link.path) ? "bg-white" : "bg-gray-50 group-hover:bg-white"}`}
                        >
                          <link.icon size={16} />
                        </div>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-gray-200 mx-2" />

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all active:scale-95 hover:shadow-sm"
                title="Pengaturan"
              >
                <Settings size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl absolute w-full left-0 shadow-lg h-[calc(100vh-64px)] overflow-y-auto animate-in slide-in-from-top-5 fade-in duration-300">
            <div className="p-4 flex flex-col gap-6">
              {/* Main Links */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
                  Menu Utama
                </h3>
                {mainLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all active:scale-[0.98] ${
                      isActive(link.path)
                        ? "bg-emerald-50 text-emerald-700 font-medium shadow-sm ring-1 ring-emerald-100"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <link.icon
                      size={20}
                      fill={
                        link.label === "Bookmarks" && isActive(link.path)
                          ? "currentColor"
                          : "none"
                      }
                    />
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight className="ml-auto w-4 h-4 text-gray-300" />
                  </Link>
                ))}
              </div>

              {/* Secondary Links */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
                  Lainnya
                </h3>
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all active:scale-[0.98] ${
                      isActive(link.path)
                        ? "bg-emerald-50 text-emerald-700 font-medium shadow-sm ring-1 ring-emerald-100"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <link.icon size={20} />
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight className="ml-auto w-4 h-4 text-gray-300" />
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mt-2 pb-8">
                <button
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 p-3.5 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors active:scale-[0.98]"
                >
                  <Settings size={20} />
                  <span className="font-medium">Pengaturan</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Navbar;
