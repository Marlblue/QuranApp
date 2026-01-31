import { Play, Pause, X, SkipBack, SkipForward } from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";
import { useAudio } from "@/hooks/useAudio";

const AudioPlayer = () => {
  const {
    isPlaying,
    currentSurah,
    currentAyah,
    play,
    pause,
    playNext,
    playPrevious,
    currentTime,
    duration,
    seek,
    error,
    cycleSpeed,
    playbackRate,
  } = useAudioStore();

  // Initialize the audio logic
  useAudio();

  if (!currentSurah) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto max-w-3xl flex flex-col gap-3">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md flex items-center gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs text-gray-500 w-10 text-right font-mono">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-700 transition-all"
          />
          <span className="text-xs text-gray-500 w-10 font-mono">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 truncate max-w-37.5 sm:max-w-xs">
              Surah {currentSurah}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              {currentAyah && currentAyah > 0
                ? `Ayat ${currentAyah}`
                : "Full Surah"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={playPrevious}
              className="text-gray-400 hover:text-emerald-600 transition-colors p-2 hover:bg-gray-100 rounded-full active:scale-95"
              title="Ayat Sebelumnya"
            >
              <SkipBack size={20} className="fill-current" />
            </button>

            <button
              onClick={isPlaying ? pause : play}
              className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              {isPlaying ? (
                <Pause size={24} className="fill-current" />
              ) : (
                <Play size={24} className="fill-current ml-1" />
              )}
            </button>

            <button
              onClick={playNext}
              className="text-gray-400 hover:text-emerald-600 transition-colors p-2 hover:bg-gray-100 rounded-full active:scale-95"
              title="Ayat Selanjutnya"
            >
              <SkipForward size={20} className="fill-current" />
            </button>

            <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block"></div>

            <button
              onClick={stop}
              className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full active:scale-95"
              title="Stop"
            >
              <X size={20} />
            </button>

            {/* Speed Control - Mobile Friendly Cycle Button */}
            <button
              onClick={cycleSpeed}
              className="flex items-center justify-center w-10 h-8 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors active:scale-95 ml-2"
              title="Kecepatan Pemutaran"
            >
              {playbackRate}x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
