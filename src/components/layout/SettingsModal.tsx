import { X, Settings, RotateCcw, User } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { RECITERS } from "@/data/reciters";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <Settings size={20} className="text-emerald-600" />
            <h2 className="font-bold text-lg">Pengaturan Tampilan</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Reciter Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <User size={18} />
              <label className="font-medium">Pilih Qari (Reciter)</label>
            </div>
            <select
              value={reciterId}
              onChange={(e) => setReciterId(e.target.value)}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-gray-200"
            >
              {RECITERS.map((reciter) => (
                <option key={reciter.id} value={reciter.id}>
                  {reciter.name}
                </option>
              ))}
            </select>
          </div>

          <hr className="border-gray-100 dark:border-gray-700" />

          {/* Arabic Font Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700 dark:text-gray-300">
                Ukuran Arab
              </label>
              <span className="text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded">
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
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <p
              className="font-amiri text-right text-gray-800 dark:text-gray-100"
              style={{ fontSize: `${arabicFontSize}px` }}
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>

          <hr className="border-gray-100 dark:border-gray-700" />

          {/* Translation Font Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700 dark:text-gray-300">
                Ukuran Terjemahan
              </label>
              <span className="text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded">
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
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <p
              className="text-gray-600"
              style={{ fontSize: `${translationFontSize}px` }}
            >
              Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">
                Tampilkan Latin
              </label>
              <button
                onClick={toggleLatin}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  showLatin ? "bg-emerald-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    showLatin ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">
                Tampilkan Terjemahan
              </label>
              <button
                onClick={toggleTranslation}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  showTranslation ? "bg-emerald-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    showTranslation ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <RotateCcw size={16} />
            Reset Default
          </button>
          <button
            onClick={onClose}
            className="ml-auto bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
