import React from "react";
import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const NotFound: React.FC = () => {
  useDocumentTitle("Halaman Tidak Ditemukan | QuranApp");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center animate-fade-in">
      <div className="w-24 h-24 bg-forest-800 rounded-full flex items-center justify-center mb-6">
        <Compass size={40} className="text-gold-400" />
      </div>
      <h1 className="font-display text-4xl font-bold text-text-heading mb-2">404</h1>
      <h2 className="text-xl font-semibold text-text mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-text-muted mb-8 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-accent text-surface px-6 py-3 rounded-xl font-semibold text-sm hover:bg-accent-hover transition-all active:scale-95 shadow-lg shadow-accent/20"
      >
        <Home size={18} />
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
