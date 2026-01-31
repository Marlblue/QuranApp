import axios from "axios";
import type { SurahSummary, SurahDetail } from "@/types/quran.types";

// Direct API URL to support production build (proxy only works in dev)
const BASE_URL = "https://equran.id/api/v2";

const api = axios.create({
  baseURL: BASE_URL,
});

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    // You could trigger a global error state here if needed
    return Promise.reject(error);
  },
);

// Response Types from API
interface ApiSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
}

interface ApiAyah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

interface ApiSurahDetail extends ApiSurah {
  ayat: ApiAyah[];
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const getSurahList = async (): Promise<SurahSummary[]> => {
  try {
    const response = await api.get<ApiResponse<ApiSurah[]>>("/surat");
    return response.data.data.map((item) => ({
      number: item.nomor,
      name_latin: item.namaLatin,
      name_arabic: item.nama,
      translation: item.arti,
      number_of_ayahs: item.jumlahAyat,
    }));
  } catch (error) {
    console.error("Failed to fetch surah list:", error);
    throw error;
  }
};

interface ApiTafsir {
  ayat: number;
  teks: string;
}

interface ApiTafsirResponse {
  nomor: number;
  nama: string;
  namaLatin: string;
  tafsir: ApiTafsir[];
}

export const getSurahDetail = async (
  number: number,
  reciterId: string = "05",
): Promise<SurahDetail> => {
  try {
    const [surahResponse, tafsirResponse] = await Promise.all([
      api.get<ApiResponse<ApiSurahDetail>>(`/surat/${number}`),
      api.get<ApiResponse<ApiTafsirResponse>>(`/tafsir/${number}`),
    ]);

    const data = surahResponse.data.data;
    const tafsirData = tafsirResponse.data.data.tafsir;

    return {
      number: data.nomor,
      name_latin: data.namaLatin,
      name_arabic: data.nama,
      translation: data.arti,
      number_of_ayahs: data.jumlahAyat,
      place: data.tempatTurun,
      audio_full: data.audioFull[reciterId] || data.audioFull["05"], // Fallback to 05
      tafsir: tafsirData.map((t) => ({
        ayah: t.ayat,
        teks: t.teks,
      })),
      verses: data.ayat.map((ayah) => ({
        number_in_surah: ayah.nomorAyat,
        text_arabic: ayah.teksArab,
        text_latin: ayah.teksLatin,
        translation_id: ayah.teksIndonesia,
        audio_url: ayah.audio[reciterId] || ayah.audio["05"], // Fallback to 05
      })),
    };
  } catch (error) {
    console.error(`Failed to fetch surah detail for number ${number}:`, error);
    throw error;
  }
};
