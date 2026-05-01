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
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header Card */}
      <div className="bg-forest-800 rounded-2xl p-6 text-text mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
          <div>
            <h1 className="font-display text-2xl font-bold mb-2">Jadwal Sholat</h1>
            <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
              <MapPin size={14} />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-b border-border focus:outline-none focus:border-text-heading pb-0.5 cursor-pointer text-sm"
              >
                {["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Makassar"].map(
                  (c) => (
                    <option key={c} value={c} className="bg-surface text-text">
                      {c}
                    </option>
                  ),
                )}
              </select>
            </div>
            {data && (
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <Calendar size={12} />
                <span>
                  {data.date.readable} / {data.date.hijri.date}{" "}
                  {data.date.hijri.month.en}
                </span>
              </div>
            )}
          </div>

          {isLoading ? (
            <Loader2 className="animate-spin text-text-muted" size={32} />
          ) : error ? (
            <p className="text-red-400 text-sm">Gagal memuat</p>
          ) : (
            nextPrayer && (
              <div className="bg-surface-card rounded-xl p-4 text-center min-w-[120px] border border-border">
                <p className="text-text-muted text-xs mb-0.5">
                  Menuju {nextPrayer.name}
                </p>
                <p className="text-2xl font-bold font-mono tracking-wider text-text-heading">
                  {nextPrayer.timeLeft}
                </p>
                <p className="text-text-muted text-[11px]">
                  Pukul {nextPrayer.time}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-children">
        {prayers.map((prayer) => {
          const isNext = nextPrayer?.name === prayer.name;
          return (
            <div
              key={prayer.name}
              className={`p-4 rounded-2xl text-center transition-all ${
                isNext
                  ? "bg-forest-800 border-2 border-gold-400 shadow-md"
                  : "bg-surface-card border border-border"
              }`}
            >
              <Clock
                size={20}
                className={`mx-auto mb-2 ${
                  isNext
                    ? "text-gold-400"
                    : "text-text-subtle"
                }`}
              />
              <h3
                className={`text-sm font-semibold mb-1 ${
                  isNext
                    ? "text-text-heading"
                    : "text-text-muted"
                }`}
              >
                {prayer.name}
              </h3>
              <p
                className={`text-xl font-bold font-mono ${
                  isNext
                    ? "text-gold-400"
                    : "text-text-heading"
                }`}
              >
                {prayer.time || "--:--"}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-text-subtle">
        Jadwal sholat oleh Aladhan.com
      </p>
    </div>
  );
};

export default PrayerTimes;
