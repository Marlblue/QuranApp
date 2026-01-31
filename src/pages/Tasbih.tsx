import React, { useState, useEffect } from "react";
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Smartphone,
  SmartphoneNfc,
} from "lucide-react";
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

  // Save state to local storage
  useEffect(() => {
    localStorage.setItem("tasbih-count", count.toString());
  }, [count]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);

    // Haptic feedback
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Sound effect (simple click)
    if (soundEnabled) {
      // Ideally play a short click sound here
    }

    // Target reached feedback
    if (newCount % target === 0) {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-md h-[calc(100vh-80px)] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Tasbih Digital
        </h1>
        <p className="text-gray-600">Hitung dzikir harianmu</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full aspect-3/4 flex flex-col items-center justify-between border border-gray-100 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-50 rounded-full opacity-50 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-50 rounded-full opacity-50 pointer-events-none" />

        {/* Controls */}
        <div className="w-full flex justify-between items-center z-10">
          <div className="flex gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              title={soundEnabled ? "Matikan Suara" : "Hidupkan Suara"}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => setVibrationEnabled(!vibrationEnabled)}
              className="p-3 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              title={vibrationEnabled ? "Matikan Getar" : "Hidupkan Getar"}
            >
              {vibrationEnabled ? (
                <SmartphoneNfc size={20} />
              ) : (
                <Smartphone size={20} />
              )}
            </button>
          </div>

          <div className="flex gap-2">
            {[33, 99, 100].map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  target === t
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Display */}
        <div className="flex-1 flex flex-col items-center justify-center z-10">
          <div className="text-8xl font-bold text-gray-800 font-mono tracking-tighter">
            {count}
          </div>
          <div className="text-gray-400 text-sm mt-2">Target: {target}</div>
        </div>

        {/* Main Button */}
        <div className="w-full pb-8 z-10 flex flex-col items-center gap-6">
          <button
            onClick={handleIncrement}
            className="w-24 h-24 rounded-full bg-emerald-600 shadow-lg shadow-emerald-200 active:scale-95 active:bg-emerald-700 transition-all flex items-center justify-center group"
          >
            <div className="w-20 h-20 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-colors" />
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasbih;
