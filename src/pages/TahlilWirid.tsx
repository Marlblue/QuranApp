import React, { useState } from "react";
import { tahlilData, wiridData } from "@/data/worshipData";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TahlilWirid: React.FC = () => {
  useDocumentTitle("Tahlil & Wirid | QuranApp");
  const [activeTab, setActiveTab] = useState<"tahlil" | "wirid">("tahlil");
  const data = activeTab === "tahlil" ? tahlilData : wiridData;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text-heading">
          Tahlil & Wirid
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Bacaan Tahlil dan Wirid sesudah sholat
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-surface-input p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab("tahlil")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "tahlil"
              ? "bg-accent text-surface shadow-sm"
              : "text-text-muted"
          }`}
        >
          Tahlil
        </button>
        <button
          onClick={() => setActiveTab("wirid")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "wirid"
              ? "bg-accent text-surface shadow-sm"
              : "text-text-muted"
          }`}
        >
          Wirid
        </button>
      </div>

      <div className="space-y-4 stagger-children">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-surface-card border border-border"
          >
            <div className="text-right mb-4" dir="rtl">
              <p className="font-arabic text-xl leading-loose text-text-heading">
                {item.arabic}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-accent/80 text-sm italic">
                {item.latin}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.translation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TahlilWirid;
