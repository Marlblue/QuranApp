import React from "react";
import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const NotFound: React.FC = () => {
  useDocumentTitle("Halaman Tidak Ditemukan | QuranApp");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center animate-fade-in">
      <div className="w-24 h-24 bg-canvas-parchment rounded-full flex items-center justify-center mb-8">
        <Compass size={40} className="text-ink-faint" />
      </div>
      <h1 className="text-apple-hero text-ink mb-2">404</h1>
      <h2 className="text-[21px] font-semibold text-ink mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-[17px] text-ink-muted mb-10 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium text-[17px] hover:bg-primary-focus transition-colors active:scale-95"
      >
        <Home size={18} />
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
