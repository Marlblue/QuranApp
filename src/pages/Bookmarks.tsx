import { Link } from "react-router-dom";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { Bookmark, Trash2, ChevronRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Bookmarks = () => {
  useDocumentTitle("Bookmarks | QuranApp");
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text-heading">
          Bookmark
        </h1>
        <p className="text-sm text-text-muted mt-1">
          {bookmarks.length} ayat tersimpan
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-forest-800 rounded-2xl flex items-center justify-center mb-4">
            <Bookmark size={28} className="text-gold-400" />
          </div>
          <h2 className="text-lg font-bold text-text-heading mb-1">
            Belum ada bookmark
          </h2>
          <p className="text-sm text-text-muted mb-6 max-w-xs">
            Tandai ayat favorit untuk membacanya kembali nanti.
          </p>
          <Link
            to="/"
            className="bg-accent text-surface px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-accent-hover transition-all active:scale-95"
          >
            Mulai Membaca
          </Link>
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {bookmarks.map((bookmark) => (
            <div
              key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-surface-card border border-border transition-all hover:border-border-hover"
            >
              <Link
                to={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[11px] text-gold-400 font-semibold uppercase tracking-wider">
                    Surah {bookmark.surahNumber}
                  </span>
                  <span className="text-text-subtle">•</span>
                  <span className="text-[11px] text-text-subtle">
                    Ayat {bookmark.ayahNumber}
                  </span>
                </div>
                <h3 className="font-bold text-text-heading truncate">
                  {bookmark.surahName}
                </h3>
                <span className="text-[11px] text-text-subtle">
                  {new Date(bookmark.addedAt).toLocaleDateString("id-ID")}
                </span>
              </Link>

              <div className="flex items-center gap-1 flex-shrink-0">
                <Link
                  to={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                  className="p-2 text-text-subtle hover:text-text-heading rounded-xl transition-colors active:scale-90"
                >
                  <ChevronRight size={18} />
                </Link>
                <button
                  onClick={() =>
                    removeBookmark(bookmark.surahNumber, bookmark.ayahNumber)
                  }
                  className="p-2 text-text-subtle hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-all active:scale-90"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
