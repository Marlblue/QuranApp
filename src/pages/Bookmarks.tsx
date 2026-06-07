import { Link } from "react-router-dom";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { Bookmark, Trash2, ChevronRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Bookmarks = () => {
  useDocumentTitle("Tersimpan | QuranApp");
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 animate-fade-in min-h-[calc(100vh-96px)]">
      <div className="mb-10 text-center">
        <h1 className="text-[34px] font-semibold text-ink tracking-tight mb-2">
          Tersimpan
        </h1>
        <p className="text-[17px] text-ink-muted">
          {bookmarks.length} ayat yang kamu simpan.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-canvas-parchment rounded-full flex items-center justify-center mb-6">
            <Bookmark size={32} className="text-ink-faint" />
          </div>
          <h2 className="text-[21px] font-semibold text-ink mb-2">
            Belum ada ayat tersimpan
          </h2>
          <p className="text-[17px] text-ink-muted mb-8 max-w-sm">
            Tandai ayat favorit untuk membacanya kembali di sini kapan saja.
          </p>
          <Link
            to="/"
            className="bg-primary text-white px-8 py-3 rounded-full font-medium text-[17px] hover:bg-primary-focus transition-colors active:scale-95 shadow-sm"
          >
            Mulai Membaca
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <div
              key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
              className="flex items-center gap-4 p-5 rounded-[24px] bg-canvas border border-hairline transition-all hover:shadow-sm group"
            >
              <div className="w-12 h-12 bg-canvas-parchment rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <Bookmark size={20} className="text-ink-faint group-hover:text-primary transition-colors" />
              </div>
              
              <Link
                to={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[12px] text-primary font-semibold uppercase tracking-wider">
                    Surah {bookmark.surahNumber}
                  </span>
                  <span className="text-ink-faint">•</span>
                  <span className="text-[12px] text-ink-muted font-medium">
                    Ayat {bookmark.ayahNumber}
                  </span>
                </div>
                <h3 className="font-semibold text-[17px] text-ink truncate mb-0.5">
                  {bookmark.surahName}
                </h3>
                <span className="text-[12px] text-ink-faint">
                  Disimpan {new Date(bookmark.addedAt).toLocaleDateString("id-ID")}
                </span>
              </Link>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() =>
                    removeBookmark(bookmark.surahNumber, bookmark.ayahNumber)
                  }
                  className="p-3 text-ink-faint hover:text-red-500 bg-transparent hover:bg-red-50 rounded-full transition-colors active:scale-90"
                  title="Hapus dari tersimpan"
                >
                  <Trash2 size={18} />
                </button>
                <Link
                  to={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                  className="p-3 text-ink-faint hover:text-ink bg-canvas-parchment rounded-full transition-colors active:scale-90"
                  title="Lihat Ayat"
                >
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
