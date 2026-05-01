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
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text-heading">
          Doa Harian
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Kumpulan doa sehari-hari dari Al-Quran dan Hadits
        </p>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle w-5 h-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari doa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface-input border border-border text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
        />
      </div>

      <div className="space-y-4 stagger-children">
        {filteredPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className="p-5 rounded-2xl bg-surface-card border border-border"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-text-heading">
                {prayer.title}
              </h3>
              <button
                onClick={() =>
                  handleCopy(
                    `${prayer.title}\n\n${prayer.arabic}\n${prayer.translation}`,
                    prayer.id,
                  )
                }
                className="p-2 text-text-subtle hover:text-accent hover:bg-surface-hover rounded-xl transition-all active:scale-90 flex-shrink-0"
              >
                {copiedId === prayer.id ? (
                  <Check size={16} className="text-gold-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            <div className="text-right mb-4" dir="rtl">
              <p className="font-arabic text-xl leading-loose text-text-heading">
                {prayer.arabic}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-accent/80 text-sm italic">
                {prayer.latin}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {prayer.translation}
              </p>
              <p className="text-[11px] text-text-subtle mt-2">
                • {prayer.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPrayers;
