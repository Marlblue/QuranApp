import React, { useState } from "react";
import { dailyPrayers } from "@/data/dailyPrayers";
import { Search, Copy, Check } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const DailyPrayers: React.FC = () => {
  useDocumentTitle("Doa Harian | QuranApp");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredPrayers = dailyPrayers.filter(
    (prayer) =>
      prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Doa Harian</h1>
        <p className="text-gray-600">
          Kumpulan doa sehari-hari dari Al-Quran dan Hadits
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Cari Doa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      <div className="space-y-4">
        {filteredPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-emerald-800">
                {prayer.title}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleCopy(
                      `${prayer.title}\n\n${prayer.arabic}\n${prayer.translation}`,
                      prayer.id,
                    )
                  }
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Salin Doa"
                >
                  {copiedId === prayer.id ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right mb-4">
              <p className="font-amiri text-2xl leading-loose text-gray-800">
                {prayer.arabic}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-emerald-600 font-medium italic text-sm">
                {prayer.latin}
              </p>
              <p className="text-gray-600">{prayer.translation}</p>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {prayer.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPrayers;
