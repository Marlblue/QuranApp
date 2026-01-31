export interface DailyPrayer {
  id: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  source: string;
}

export const dailyPrayers: DailyPrayer[] = [
  {
    id: 1,
    title: "Doa Sebelum Tidur",
    arabic: "بِسْمِكَ اللّهُمَّ اَحْيَا وَ بِسْمِكَ اَمُوْتُ",
    latin: "Bismika Allahumma ahyaa wa bismika amuutu",
    translation: "Dengan nama-Mu Ya Allah aku hidup, dan dengan nama-Mu aku mati",
    source: "HR. Bukhari & Muslim"
  },
  {
    id: 2,
    title: "Doa Bangun Tidur",
    arabic: "اَلْحَمْدُ ِللهِ الَّذِىْ اَحْيَانَا بَعْدَمَآ اَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ",
    latin: "Alhamdulillahil ladzi ahyana ba'da ma amatana wailaihin nusyur",
    translation: "Segala puji bagi Allah yang menghidupkan kami sesudah mati kami, dan kepada-Nya kami kembali",
    source: "HR. Bukhari & Muslim"
  },
  {
    id: 3,
    title: "Doa Sebelum Makan",
    arabic: "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Allahumma baarik lana fiima razaqtana waqina 'adzaaban naar",
    translation: "Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami, dan peliharalah kami dari siksa api neraka",
    source: "HR. Ibnu Sunni"
  },
  {
    id: 4,
    title: "Doa Sesudah Makan",
    arabic: "اَلْحَمْدُ ِللهِ الَّذِىْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ",
    latin: "Alhamdulillahil ladzi ath-amanaa wa saqaana wa ja'alanaa muslimiin",
    translation: "Segala puji bagi Allah yang memberi kami makan dan minum serta menjadikan kami memeluk agama islam",
    source: "HR. Abu Daud"
  },
  {
    id: 5,
    title: "Doa Masuk Masjid",
    arabic: "اَللّٰهُمَّ افْتَحْ لِيْ اَبْوَابَ رَحْمَتِكَ",
    latin: "Allahummaf tahlii abwaaba rahmatik",
    translation: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu",
    source: "HR. Muslim"
  },
  {
    id: 6,
    title: "Doa Keluar Masjid",
    arabic: "اَللّٰهُمَّ اِنِّى اَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma innii as-aluka min fadhlika",
    translation: "Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu",
    source: "HR. Muslim"
  },
  {
    id: 7,
    title: "Doa Kedua Orang Tua",
    arabic: "رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا",
    latin: "Rabbighfir lii waliwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa",
    translation: "Ya Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah keduanya sebagaimana mereka menyayangiku di waktu kecil",
    source: "QS. Al-Isra: 24"
  },
  {
    id: 8,
    title: "Doa Kebaikan Dunia Akhirat",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbana aatina fid dunya hasanah wa fil akhirati hasanah wa qina 'adzaban naar",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka",
    source: "QS. Al-Baqarah: 201"
  },
  {
    id: 9,
    title: "Doa Masuk Kamar Mandi",
    arabic: "اَللّٰهُمَّ اِنِّيْ اَعُوْذُبِكَ مِنَ الْخُبُثِ وَالْخَبَآئِثِ",
    latin: "Allahumma innii a'uudzubika minal khubutsi wal khabaa-its",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan",
    source: "HR. Bukhari & Muslim"
  },
  {
    id: 10,
    title: "Doa Keluar Kamar Mandi",
    arabic: "غُفْرَانَكَ الْحَمْدُ ِللهِ الَّذِىْ اَذْهَبَ عَنِّى الْاَذَى وَعَافَانِىْ",
    latin: "Ghufraanaka alhamdulillahil ladzi adzhaba 'annil adzaa wa 'aafaanii",
    translation: "Dengan mengharap ampunan-Mu, segala puji milik Allah yang telah menghilangkan kotoran dari badanku dan yang telah menyejahterakan",
    source: "HR. Bukhari"
  }
];
