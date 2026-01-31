import { useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import { useAudioStore } from "@/store/useAudioStore";

export const useAudio = () => {
  const {
    isPlaying,
    audioUrl,
    play,
    pause,
    playNext,
    setDuration,
    setCurrentTime,
    playbackRate,
    setError,
  } = useAudioStore();
  const soundRef = useRef<Howl | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (soundRef.current && soundRef.current.playing()) {
        const seek = soundRef.current.seek();
        if (typeof seek === "number") {
          setCurrentTime(seek);
        }
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, setCurrentTime]);

  useEffect(() => {
    if (audioUrl) {
      if (soundRef.current) {
        soundRef.current.unload();
      }

      soundRef.current = new Howl({
        src: [audioUrl],
        html5: true, // Use HTML5 Audio for streaming
        onend: () => {
          playNext();
        },
        onpause: () => {
          pause();
        },
        onplay: () => {
          play();
        },
        onload: () => {
          setDuration(soundRef.current?.duration() || 0);
          if (soundRef.current) {
            soundRef.current.rate(playbackRate);
          }
        },
        onloaderror: (_id, error) => {
          console.error("Audio load error:", error);
          setError("Gagal memuat audio. Periksa koneksi internet Anda.");
        },
        onplayerror: (_id, error) => {
          console.error("Audio play error:", error);
          setError(
            "Gagal memutar audio. Format tidak didukung atau gangguan jaringan.",
          );
          soundRef.current?.once("unlock", function () {
            soundRef.current?.play();
          });
        },
        onseek: () => {
          // Handle seek event if needed
        },
      });

      if (isPlaying) {
        soundRef.current.play();
      }
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  useEffect(() => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.play();
      } else {
        soundRef.current.pause();
      }
    }
  }, [isPlaying]);

  const seek = useCallback(
    (time: number) => {
      if (soundRef.current) {
        soundRef.current.seek(time);
        setCurrentTime(time);
      }
    },
    [setCurrentTime],
  );

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.rate(playbackRate);
    }
  }, [playbackRate]);

  // Bind seek function from store to actual implementation
  useEffect(() => {
    useAudioStore.setState({ seek });
  }, [seek]);

  return {};
};
