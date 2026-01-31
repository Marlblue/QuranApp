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

        // If no prayer left today, show Fajr tomorrow
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

  const activePrayerIndex = prayers.findIndex(
    (p) => p.name === nextPrayer?.name,
  );
  console.log(activePrayerIndex); // Used for debugging or future UI logic

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      <div className="bg-linear-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Jadwal Sholat</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-100">
              <MapPin size={18} />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-b border-emerald-400 focus:outline-none focus:border-white pb-1 cursor-pointer"
              >
                <option value="Jakarta" className="text-gray-800">
                  Jakarta
                </option>
                <option value="Bandung" className="text-gray-800">
                  Bandung
                </option>
                <option value="Surabaya" className="text-gray-800">
                  Surabaya
                </option>
                <option value="Yogyakarta" className="text-gray-800">
                  Yogyakarta
                </option>
                <option value="Medan" className="text-gray-800">
                  Medan
                </option>
                <option value="Makassar" className="text-gray-800">
                  Makassar
                </option>
              </select>
            </div>
            {data && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-100 mt-2 text-sm">
                <Calendar size={16} />
                <span>
                  {data.date.readable} / {data.date.hijri.date}{" "}
                  {data.date.hijri.month.en}
                </span>
              </div>
            )}
          </div>

          {isLoading ? (
            <Loader2 className="animate-spin" size={40} />
          ) : error ? (
            <p className="text-red-200">Gagal memuat jadwal</p>
          ) : (
            nextPrayer && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center min-w-50 border border-white/20">
                <p className="text-emerald-100 text-sm mb-1">
                  Menuju {nextPrayer.name}
                </p>
                <p className="text-4xl font-bold font-mono tracking-wider">
                  {nextPrayer.timeLeft}
                </p>
                <p className="text-emerald-100 text-xs mt-1">
                  Pukul {nextPrayer.time}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className={`
                relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300
                ${
                  nextPrayer?.name === prayer.name
                    ? "bg-emerald-50 border-2 border-emerald-500 shadow-md transform -translate-y-1"
                    : "bg-white border border-gray-100 hover:shadow-lg hover:border-emerald-200"
                }
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <Clock
                size={24}
                className={
                  nextPrayer?.name === prayer.name
                    ? "text-emerald-600"
                    : "text-gray-400"
                }
              />
              <div>
                <h3
                  className={`font-semibold ${nextPrayer?.name === prayer.name ? "text-gray-800" : "text-gray-500"}`}
                >
                  {prayer.name}
                </h3>
                <p
                  className={`text-xl font-bold font-mono ${nextPrayer?.name === prayer.name ? "text-emerald-600" : "text-gray-800"}`}
                >
                  {prayer.time || "--:--"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Jadwal sholat disediakan oleh Aladhan.com</p>
      </div>
    </div>
  );
};

export default PrayerTimes;
