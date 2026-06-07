import React, { useState } from "react";
import { tahlilData, wiridData } from "@/data/worshipData";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TahlilWirid: React.FC = () => {
  useDocumentTitle("Tahlil & Wirid | QuranApp");
  const [activeTab, setActiveTab] = useState<"tahlil" | "wirid">("tahlil");
  const data = activeTab === "tahlil" ? tahlilData : wiridData;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-[34px] font-semibold text-ink tracking-tight mb-2">
          Tahlil & Wirid
        </h1>
        <p className="text-[17px] text-ink-muted">
          Bacaan Tahlil dan Wirid sesudah sholat
        </p>
      </div>

      {/* Apple Segmented Control */}
      <div className="flex gap-1 mb-10 bg-canvas-parchment p-1 rounded-full border border-hairline max-w-xs mx-auto">
        <button
          onClick={() => setActiveTab("tahlil")}
          className={`flex-1 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
            activeTab === "tahlil"
              ? "bg-canvas text-ink shadow-sm"
              : "text-ink-faint hover:text-ink"
          }`}
        >
          Tahlil
        </button>
        <button
          onClick={() => setActiveTab("wirid")}
          className={`flex-1 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
            activeTab === "wirid"
              ? "bg-canvas text-ink shadow-sm"
              : "text-ink-faint hover:text-ink"
          }`}
        >
          Wirid
        </button>
      </div>

      <div className="space-y-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-canvas border border-hairline rounded-[24px] p-6 sm:p-8"
          >
            <div className="text-right mb-6" dir="rtl">
              <p className="font-arabic text-[24px] leading-[2] text-ink">
                {item.arabic}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-primary text-[15px] italic font-medium">
                {item.latin}
              </p>
              <p className="text-[15px] text-ink-muted leading-relaxed">
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
