import React, { useState } from "react";
import { tahlilData, wiridData } from "@/data/worshipData";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TahlilWirid: React.FC = () => {
  useDocumentTitle("Tahlil & Wirid | QuranApp");
  const [activeTab, setActiveTab] = useState<"tahlil" | "wirid">("tahlil");

  const data = activeTab === "tahlil" ? tahlilData : wiridData;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Tahlil & Wirid
        </h1>
        <p className="text-gray-600">Bacaan Tahlil dan Wirid sesudah sholat</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-emerald-50 p-1 rounded-xl flex gap-2">
          <button
            onClick={() => setActiveTab("tahlil")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "tahlil"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            Tahlil
          </button>
          <button
            onClick={() => setActiveTab("wirid")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "wirid"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            Wirid
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="text-right mb-4">
              <p className="font-amiri text-2xl leading-loose text-gray-800">
                {item.arabic}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-emerald-600 font-medium italic text-sm">
                {item.latin}
              </p>
              <p className="text-gray-600">{item.translation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TahlilWirid;
