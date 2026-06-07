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
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-[34px] font-semibold text-ink tracking-tight mb-2">
          Asmaul Husna
        </h1>
        <p className="text-[17px] text-ink-muted">
          99 Nama Allah yang Indah
        </p>
      </div>

      {/* Search */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-faint w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 rounded-full bg-canvas text-ink border border-hairline focus:outline-none focus:border-primary-focus focus:ring-1 focus:ring-primary-focus transition-all text-[17px] shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((item) => (
          <div
            key={item.index}
            className="bg-canvas border border-hairline rounded-[24px] p-6 text-center group hover:border-primary-focus hover:shadow-sm transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-canvas-parchment flex items-center justify-center text-[14px] font-semibold text-ink-faint mx-auto mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              {item.index}
            </div>
            <p className="font-arabic text-[28px] text-ink mb-3 group-hover:text-primary transition-colors leading-relaxed">
              {item.arabic}
            </p>
            <p className="font-semibold text-[15px] text-ink mb-1">
              {item.latin}
            </p>
            <p className="text-[13px] text-ink-muted">
              {item.translation_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
