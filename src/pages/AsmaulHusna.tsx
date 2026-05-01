import React, { useState } from "react";
import { asmaulHusna } from "@/data/asmaulHusna";
import { Search } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const AsmaulHusnaPage: React.FC = () => {
  useDocumentTitle("Asmaul Husna | QuranApp");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = asmaulHusna.filter(
    (item) =>
      item.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translation_id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text-heading">
          Asmaul Husna
        </h1>
        <p className="text-sm text-text-muted mt-1">
          99 Nama Allah yang Indah
        </p>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle w-5 h-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari nama..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface-input border border-border text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 stagger-children">
        {filteredData.map((item) => (
          <div
            key={item.index}
            className="p-5 rounded-2xl bg-surface-card border border-border text-center group hover:border-border-hover transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-forest-800 text-gold-400 flex items-center justify-center font-bold text-xs mx-auto mb-3">
              {item.index}
            </div>
            <p className="font-arabic text-2xl text-text-heading mb-2 group-hover:text-gold-400 transition-colors">
              {item.arabic}
            </p>
            <p className="font-semibold text-sm text-text-heading mb-0.5">
              {item.latin}
            </p>
            <p className="text-xs text-text-muted">
              {item.translation_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
