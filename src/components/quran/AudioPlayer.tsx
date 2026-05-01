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
    <div className="fixed bottom-[64px] lg:bottom-0 left-0 right-0 z-50 glass border-t border-border animate-slide-up">
      {/* Progress bar (thin line at top) */}
      <div className="h-0.5 bg-forest-800">
        <div
          className="h-full bg-gold-400 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-3">
        {/* Error */}
        {error && (
          <div className="text-xs text-red-400 mb-2 font-medium">{error}</div>
        )}

        <div className="flex items-center gap-3">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text-heading truncate">
              Surah {currentSurah}
            </p>
            <p className="text-xs text-gold-400 font-medium">
              {currentAyah && currentAyah > 0 ? `Ayat ${currentAyah}` : "Full"}
            </p>
          </div>

          {/* Time */}
          <span className="text-[10px] text-text-subtle font-mono hidden sm:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={playPrevious}
              className="p-2 text-text-subtle hover:text-text-heading rounded-xl transition-colors active:scale-90"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={isPlaying ? pause : play}
              className="w-10 h-10 bg-accent text-surface rounded-full flex items-center justify-center active:scale-90 transition-transform"
            >
              {isPlaying ? (
                <Pause size={18} className="fill-current" />
              ) : (
                <Play size={18} className="fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={playNext}
              className="p-2 text-text-subtle hover:text-text-heading rounded-xl transition-colors active:scale-90"
            >
              <SkipForward size={16} />
            </button>
            <button
              onClick={cycleSpeed}
              className="text-[11px] font-bold text-gold-400 bg-forest-800 px-2 py-1 rounded-lg active:scale-90 transition-transform ml-1"
            >
              {playbackRate}x
            </button>
            <button
              onClick={stop}
              className="p-2 text-text-subtle hover:text-red-400 rounded-xl transition-colors active:scale-90 ml-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Seek bar - hidden on mobile, visible on larger */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full mt-2 hidden sm:block"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
