import React, { useState, useEffect } from "react";
import { RotateCcw, Smartphone, SmartphoneNfc } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Tasbih: React.FC = () => {
  useDocumentTitle("Tasbih Digital | QuranApp");
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("tasbih-count");
    return savedCount ? Number(savedCount) : 0;
  });
  const [target, setTarget] = useState(33);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasbih-count", count.toString());
  }, [count]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(40);
    }
    
    if (newCount > 0 && newCount % target === 0) {
      if (vibrationEnabled && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    setShowConfirmReset(false);
  };

  const progress = target > 0 
    ? (count === 0 ? 0 : ((count - 1) % target + 1) / target) 
    : 0;

  return (
    <div className="max-w-md mx-auto px-4 py-12 lg:py-16 animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-[34px] font-semibold text-ink tracking-tight mb-2">
          Tasbih Digital
        </h1>
        <p className="text-[17px] text-ink-muted">
          Hitung dzikir harianmu
        </p>
      </div>

      <div className="bg-canvas border border-hairline rounded-[32px] p-8 flex flex-col items-center relative overflow-hidden shadow-sm">
        {/* Controls */}
        <div className="w-full flex justify-between items-center z-10 mb-10">
          <button
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
            className="p-2.5 rounded-full text-ink-faint hover:text-ink hover:bg-canvas-parchment transition-colors active:scale-90"
          >
            {vibrationEnabled ? <SmartphoneNfc size={20} /> : <Smartphone size={20} />}
          </button>

          {/* Apple Segmented Control */}
          <div className="flex gap-1 bg-canvas-parchment p-1 rounded-full border border-hairline">
            {[33, 99, 100].map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all active:scale-90 ${
                  target === t
                    ? "bg-canvas text-ink shadow-sm"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="flex flex-col items-center justify-center z-10 my-8">
          <div className="text-[80px] font-semibold text-ink tracking-tighter leading-none">
            {count}
          </div>
          <div className="text-[14px] text-ink-muted mt-3">
            Target: {target}
          </div>
          {/* Progress bar */}
          <div className="w-32 h-1.5 bg-canvas-parchment rounded-full mt-5 overflow-hidden border border-hairline">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Tap Button */}
        <div className="flex flex-col items-center gap-8 z-10 mt-8">
          <button
            onClick={handleIncrement}
            className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-primary shadow-sm active:scale-95 active:bg-primary-focus transition-all flex items-center justify-center cursor-pointer"
            aria-label="Tambah hitungan"
          >
            <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-[3px] border-white/20" />
          </button>
          
          {showConfirmReset ? (
            <div className="flex flex-col items-center gap-3 animate-fade-in p-5 rounded-[20px] bg-canvas-parchment border border-hairline mt-2 w-full">
              <p className="text-[15px] font-semibold text-ink">Yakin ingin reset hitungan?</p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full text-[14px] font-semibold transition-colors active:scale-95"
                >
                  Ya, Reset
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 px-4 py-2.5 bg-canvas border border-hairline text-ink-muted hover:text-ink rounded-full text-[14px] font-semibold transition-colors active:scale-95"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="flex items-center gap-2 text-ink-faint hover:text-red-500 transition-colors text-[14px] font-medium active:scale-90 px-4 py-2 rounded-full hover:bg-red-50"
            >
              <RotateCcw size={16} />
              Reset Hitungan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasbih;
