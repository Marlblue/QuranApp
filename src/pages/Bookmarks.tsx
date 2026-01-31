import { Link } from "react-router-dom";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { Bookmark, Trash2, ArrowRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Bookmarks = () => {
  useDocumentTitle("Bookmarks | QuranApp");
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in duration-500">
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Bookmark className="text-emerald-600" />
          <h1 className="text-xl font-bold text-gray-800">Bookmarks</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <Bookmark size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Belum ada bookmark
            </h2>
            <p className="text-gray-500 mb-6">
              Tandai ayat favorit Anda untuk membacanya kembali nanti.
            </p>
            <Link
              to="/"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Mulai Membaca
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookmarks.map((bookmark) => (
              <div
                key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow"
              >
                <Link
                  to={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                  className="flex-1"
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">
                      Surah ke-{bookmark.surahNumber}
                    </span>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {bookmark.surahName}
                    </h3>
                    <p className="text-gray-500">Ayat {bookmark.ayahNumber}</p>
                    <span className="text-xs text-gray-400 mt-2">
                      Ditambahkan pada{" "}
                      {new Date(bookmark.addedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                    title="Buka Ayat"
                  >
                    <ArrowRight size={20} />
                  </Link>
                  <button
                    onClick={() =>
                      removeBookmark(bookmark.surahNumber, bookmark.ayahNumber)
                    }
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Hapus Bookmark"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
