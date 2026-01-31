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
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Asmaul Husna
        </h1>
        <p className="text-gray-600">99 Nama Allah yang Indah</p>
      </div>

      <div className="max-w-md mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Cari Asmaul Husna..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((item) => (
          <div
            key={item.index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-4">
              {item.index}
            </div>
            <h3 className="font-amiri text-3xl mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
              {item.arabic}
            </h3>
            <p className="font-bold text-gray-800 mb-1">{item.latin}</p>
            <p className="text-sm text-gray-500">{item.translation_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
