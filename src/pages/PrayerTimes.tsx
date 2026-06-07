import { useState, useEffect, useMemo } from "react";
import { usePrayerTimes } from "@/services/prayerApi";
import { Clock, MapPin, Calendar, Loader2 } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const PrayerTimes = () => {
  useDocumentTitle("Jadwal Sholat | QuranApp");
  const [city, setCity] = useState("Jakarta");
  const { data, isLoading, error } = usePrayerTimes(city);
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: string;
    timeLeft: string;
  } | null>(null);

  const prayers = useMemo(
    () => [
      { name: "Subuh", time: data?.timings.Fajr, key: "Fajr" },
      { name: "Terbit", time: data?.timings.Sunrise, key: "Sunrise" },
      { name: "Dzuhur", time: data?.timings.Dhuhr, key: "Dhuhr" },
      { name: "Ashar", time: data?.timings.Asr, key: "Asr" },
      { name: "Maghrib", time: data?.timings.Maghrib, key: "Maghrib" },
      { name: "Isya", time: data?.timings.Isha, key: "Isha" },
    ],
    [data],
  );

  useEffect(() => {
    if (data?.timings) {
      const calculateNextPrayer = () => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        for (const prayer of prayers) {
          if (!prayer.time) continue;
          const [hours, minutes] = prayer.time.split(":").map(Number);
          const prayerTime = hours * 60 + minutes;

          if (prayerTime > currentTime && prayer.key !== "Sunrise") {
            const diff = prayerTime - currentTime;
            const hoursLeft = Math.floor(diff / 60);
            const minutesLeft = diff % 60;
            setNextPrayer({
              name: prayer.name,
              time: prayer.time,
              timeLeft: `${hoursLeft}j ${minutesLeft}m`,
            });
            return;
          }
        }
        setNextPrayer({
          name: "Subuh",
          time: data.timings.Fajr,
          timeLeft: "Besok",
        });
      };

      calculateNextPrayer();
      const interval = setInterval(calculateNextPrayer, 60000);
      return () => clearInterval(interval);
    }
  }, [data, prayers]);

  return (
    <div className="animate-fade-in flex flex-col min-h-[calc(100vh-96px)]">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        
        {/* Header Hero */}
        <div className="bg-surface-tile rounded-[32px] p-8 sm:p-10 text-white mb-10 overflow-hidden relative shadow-product">
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
            <div className="space-y-4">
              <div>
                <h1 className="text-[34px] font-semibold tracking-tight mb-1">Jadwal Sholat</h1>
                {data && (
                  <div className="flex items-center gap-2 text-white/70 text-[14px]">
                    <Calendar size={14} />
                    <span>
                      {data.date.readable} • {data.date.hijri.date} {data.date.hijri.month.en}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                <MapPin size={16} />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer text-[15px] font-medium appearance-none pr-4"
                >
                  {["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Makassar"].map((c) => (
                    <option key={c} value={c} className="text-ink bg-canvas">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="h-[88px] flex items-center justify-center w-[160px]">
                <Loader2 className="animate-spin text-white/50" size={32} />
              </div>
            ) : error ? (
              <div className="h-[88px] flex items-center w-[160px]">
                <p className="text-red-400 text-[14px]">Gagal memuat jadwal</p>
              </div>
            ) : nextPrayer && (
              <div className="bg-white/10 backdrop-blur rounded-[20px] p-5 text-center min-w-[160px] border border-white/20">
                <p className="text-white/70 text-[12px] font-semibold uppercase tracking-wider mb-1">
                  Menuju {nextPrayer.name}
                </p>
                <p className="text-[28px] font-bold tracking-tight mb-0.5">
                  {nextPrayer.timeLeft}
                </p>
                <p className="text-white/60 text-[12px]">
                  Pukul {nextPrayer.time}
                </p>
              </div>
            )}
          </div>
          
          {/* Decorative background icon */}
          <div className="absolute right-[-10%] top-[-20%] w-[120%] sm:w-[60%] h-[150%] opacity-50 pointer-events-none">
            <img src="/images/prayer_moon.png" alt="" className="w-full h-full object-contain object-right" />
          </div>
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {prayers.map((prayer) => {
            const isNext = nextPrayer?.name === prayer.name;
            return (
              <div
                key={prayer.name}
                className={`p-6 rounded-[24px] text-center transition-all ${
                  isNext
                    ? "bg-canvas border-2 border-primary shadow-sm scale-[1.02]"
                    : "bg-canvas border border-hairline hover:border-ink-muted"
                }`}
              >
                <Clock
                  size={24}
                  className={`mx-auto mb-3 ${isNext ? "text-primary" : "text-ink-faint"}`}
                />
                <h3 className={`text-[14px] font-medium mb-1 ${isNext ? "text-primary" : "text-ink-muted"}`}>
                  {prayer.name}
                </h3>
                <p className={`text-[24px] font-semibold tracking-tight ${isNext ? "text-ink" : "text-ink"}`}>
                  {prayer.time || "--:--"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      <footer className="bg-canvas-parchment py-8 mt-12 text-center text-[12px] text-ink-faint">
        Jadwal sholat disediakan oleh Aladhan.com
      </footer>
    </div>
  );
};

export default PrayerTimes;
