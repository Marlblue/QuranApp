import { useQuery } from "@tanstack/react-query";
import { getSurahList, getSurahDetail } from "@/services/api";
import type { SurahSummary, SurahDetail } from "@/types/quran.types";
import { useSettingsStore } from "@/store/useSettingsStore";

export const useSurahList = () => {
  return useQuery<SurahSummary[], Error>({
    queryKey: ["surahList"],
    queryFn: getSurahList,
  });
};

export const useSurahDetail = (number: number) => {
  const reciterId = useSettingsStore((state) => state.reciterId);

  return useQuery<SurahDetail, Error>({
    queryKey: ["surahDetail", number, reciterId],
    queryFn: () => getSurahDetail(number, reciterId),
    enabled: !!number,
  });
};
