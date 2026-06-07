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
    stop,
    playNext,
    playPrevious,
    currentTime,
    duration,
    seek,
    error,
    cycleSpeed,
    playbackRate,
  } = useAudioStore();

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

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-[calc(60px+env(safe-area-inset-bottom))] lg:bottom-0 left-0 right-0 z-50 glass border-t border-hairline animate-slide-up">
      {/* Progress bar (thin line at top) */}
      <div className="h-[2px] bg-hairline w-full">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Error */}
        {error && (
          <div className="text-[12px] text-red-500 mb-2 font-medium">{error}</div>
        )}

        <div className="flex items-center gap-4">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-ink truncate">
              Surah {currentSurah}
            </p>
            <p className="text-[12px] text-ink-muted font-medium mt-0.5">
              {currentAyah && currentAyah > 0 ? `Ayat ${currentAyah}` : "Full"}
            </p>
          </div>

          {/* Time */}
          <span className="text-[11px] text-ink-faint font-mono hidden sm:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={playPrevious}
              className="p-2 text-ink-muted hover:text-ink hover:bg-canvas-parchment rounded-full transition-colors active:scale-90"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={isPlaying ? pause : play}
              className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-focus active:scale-95 transition-all shadow-sm"
            >
              {isPlaying ? (
                <Pause size={18} className="fill-current" />
              ) : (
                <Play size={18} className="fill-current ml-1" />
              )}
            </button>
            <button
              onClick={playNext}
              className="p-2 text-ink-muted hover:text-ink hover:bg-canvas-parchment rounded-full transition-colors active:scale-90"
            >
              <SkipForward size={18} />
            </button>
            <button
              onClick={cycleSpeed}
              className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1.5 rounded-full hover:bg-primary/20 active:scale-90 transition-all ml-1"
            >
              {playbackRate}x
            </button>
            <button
              onClick={stop}
              className="p-2 text-ink-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-colors active:scale-90 ml-1 sm:ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Seek bar - hidden on mobile, visible on larger */}
        <div className="hidden sm:block mt-3">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
