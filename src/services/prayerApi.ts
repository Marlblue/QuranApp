import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      hijri: {
        date: string;
        month: {
          en: string;
          ar: string;
        };
        year: string;
      };
    };
  };
}

const getPrayerTimes = async (city: string = 'Jakarta', country: string = 'Indonesia') => {
  // Using aladhan.com API
  const response = await axios.get<PrayerResponse>(
    `https://api.aladhan.com/v1/timingsByCity`,
    {
      params: {
        city,
        country,
        method: 20, // Kemenag RI mostly aligns with method 20 or similar standard
      },
    }
  );
  return response.data.data;
};

export const usePrayerTimes = (city: string) => {
  return useQuery({
    queryKey: ['prayer-times', city],
    queryFn: () => getPrayerTimes(city),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
