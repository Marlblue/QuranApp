import React, { useState, useEffect } from "react";
import { RotateCcw, Volume2, VolumeX, Smartphone, SmartphoneNfc } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Tasbih: React.FC = () => {
  useDocumentTitle("Tasbih Digital | QuranApp");
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("tasbih-count");
    return savedCount ? Number(savedCount) : 0;
  });
  const [target, setTarget] = useState(33);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem("tasbih-count", count.toString());
  }, [count]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(40);
    }
    
    // Bergetar lebih panjang saat mencapai kelipatan target
    if (newCount > 0 && newCount % target === 0) {
      if (vibrationEnabled && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset hitungan?")) {
      setCount(0);
    }
  };

  // Logic: Biar pas angka = target (misal 33), progress barnya penuh 100% dulu, 
  // dan baru reset saat ditekan lagi (angka 34).
  const progress = target > 0 
    ? (count === 0 ? 0 : ((count - 1) % target + 1) / target) 
    : 0;

  return (
    <div className="max-w-md mx-auto px-4 py-8 lg:py-12 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl font-bold text-text-heading">
          Tasbih Digital
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Hitung dzikir harianmu
        </p>
      </div>

      <div className="w-full bg-surface-card p-8 rounded-3xl border border-border flex flex-col items-center relative overflow-hidden shadow-xl shadow-black/20">
        {/* Progress ring background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-accent rounded-full" />
        </div>

        {/* Controls */}
        <div className="w-full flex justify-between items-center z-10 mb-8">
          <div className="flex gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl text-text-subtle hover:text-text-heading hover:bg-surface-hover transition-colors active:scale-90"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={() => setVibrationEnabled(!vibrationEnabled)}
              className="p-2.5 rounded-xl text-text-subtle hover:text-text-heading hover:bg-surface-hover transition-colors active:scale-90"
            >
              {vibrationEnabled ? <SmartphoneNfc size={18} /> : <Smartphone size={18} />}
            </button>
          </div>
          <div className="flex gap-1.5 bg-surface-input p-1 rounded-xl">
            {[33, 99, 100].map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-90 ${
                  target === t
                    ? "bg-accent text-surface shadow-sm"
                    : "text-text-muted hover:text-text-heading"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="flex flex-col items-center justify-center z-10 my-8">
          <div className="text-8xl font-bold text-text-heading font-mono tracking-tighter">
            {count}
          </div>
          <div className="text-sm text-text-muted mt-2">
            Target: {target}
          </div>
          {/* Progress bar */}
          <div className="w-32 h-1.5 bg-forest-800 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gold-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Tap Button */}
        <div className="flex flex-col items-center gap-6 z-10 mt-6">
          <button
            onClick={handleIncrement}
            className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-accent shadow-lg shadow-accent/20 active:scale-95 active:bg-accent-hover transition-all flex items-center justify-center cursor-pointer"
            aria-label="Tambah hitungan"
          >
            <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-surface/20" />
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-text-subtle hover:text-red-400 transition-colors text-sm font-medium active:scale-90 px-4 py-2 rounded-xl hover:bg-red-900/10"
          >
            <RotateCcw size={16} />
            Reset Hitungan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasbih;
