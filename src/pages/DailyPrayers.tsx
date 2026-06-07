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
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-[34px] font-semibold text-ink tracking-tight mb-2">
          Doa Harian
        </h1>
        <p className="text-[17px] text-ink-muted">
          Kumpulan doa sehari-hari dari Al-Quran dan Hadits
        </p>
      </div>

      {/* Search */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-faint w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari doa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 rounded-full bg-canvas text-ink border border-hairline focus:outline-none focus:border-primary-focus focus:ring-1 focus:ring-primary-focus transition-all text-[17px] shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className="bg-canvas border border-hairline rounded-[24px] p-6 sm:p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-[17px] font-semibold text-ink">
                {prayer.title}
              </h3>
              <button
                onClick={() =>
                  handleCopy(
                    `${prayer.title}\n\n${prayer.arabic}\n${prayer.translation}`,
                    prayer.id,
                  )
                }
                className="p-2 text-ink-faint hover:text-ink hover:bg-canvas-parchment rounded-full transition-colors active:scale-90 flex-shrink-0"
              >
                {copiedId === prayer.id ? (
                  <Check size={16} className="text-primary" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            <div className="text-right mb-6" dir="rtl">
              <p className="font-arabic text-[24px] leading-[2] text-ink">
                {prayer.arabic}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-primary text-[15px] italic font-medium">
                {prayer.latin}
              </p>
              <p className="text-[15px] text-ink-muted leading-relaxed">
                {prayer.translation}
              </p>
              <p className="text-[12px] text-ink-faint mt-3">
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
