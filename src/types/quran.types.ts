export interface SurahSummary {
  number: number;
  name_latin: string;
  name_arabic: string;
  translation: string;
  number_of_ayahs: number;
}

export interface Ayah {
  number_in_surah: number;
  text_arabic: string;
  text_latin: string;
  translation_id: string;
  audio_url: string;
}

export interface Tafsir {
  ayah: number;
  teks: string;
}

export interface SurahDetail extends SurahSummary {
  verses: Ayah[];
  place: string; // Mekah/Madinah
  audio_full?: string; // URL for full surah audio
  tafsir?: Tafsir[];
}
