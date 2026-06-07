import React, { useState } from "react";
import { Calculator, Coins, AlertCircle } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const ZakatCalculator: React.FC = () => {
  useDocumentTitle("Kalkulator Zakat | QuranApp");
  const [activeTab, setActiveTab] = useState<"fitrah" | "maal">("fitrah");

  const [goldPrice, setGoldPrice] = useState<number>(1000000);
  const [wealthAmount, setWealthAmount] = useState<number>(0);
  const [ricePrice, setRicePrice] = useState<number>(15000);
  const [familyMembers, setFamilyMembers] = useState<number>(1);

  const GOLD_NISAB = 85;
  const ZAKAT_RATE = 0.025;
  const RICE_PER_PERSON = 3.5;

  const zakatMaalResult = wealthAmount * ZAKAT_RATE;
  const isMaalEligible = wealthAmount >= goldPrice * GOLD_NISAB;
  const zakatFitrahResult = familyMembers * ricePrice * RICE_PER_PERSON;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const inputClass =
    "w-full pl-12 pr-4 py-3.5 rounded-[14px] bg-canvas-parchment border border-hairline text-ink focus:outline-none focus:border-primary-focus focus:ring-1 focus:ring-primary-focus transition-all text-[17px]";

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-8 py-10 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-[34px] font-semibold text-ink tracking-tight mb-2">
          Kalkulator Zakat
        </h1>
        <p className="text-[17px] text-ink-muted">
          Hitung kewajiban Zakat Maal dan Zakat Fitrah
        </p>
      </div>

      {/* Apple Segmented Control */}
      <div className="flex gap-1 mb-10 bg-canvas-parchment p-1 rounded-full border border-hairline max-w-xs mx-auto">
        <button
          onClick={() => setActiveTab("fitrah")}
          className={`flex-1 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
            activeTab === "fitrah"
              ? "bg-canvas text-ink shadow-sm"
              : "text-ink-faint hover:text-ink"
          }`}
        >
          Zakat Fitrah
        </button>
        <button
          onClick={() => setActiveTab("maal")}
          className={`flex-1 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
            activeTab === "maal"
              ? "bg-canvas text-ink shadow-sm"
              : "text-ink-faint hover:text-ink"
          }`}
        >
          Zakat Maal
        </button>
      </div>

      {activeTab === "fitrah" ? (
        <div className="bg-canvas border border-hairline rounded-[24px] p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-canvas-parchment rounded-full flex items-center justify-center">
              <Coins size={22} className="text-ink" />
            </div>
            <div>
              <h3 className="font-semibold text-[17px] text-ink">Zakat Fitrah</h3>
              <p className="text-[14px] text-ink-muted">
                Wajib ditunaikan di bulan Ramadhan
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-medium text-ink-muted mb-2">
                Harga Beras (per liter/kg)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-ink-faint text-[15px]">Rp</span>
                <input
                  type="number"
                  value={ricePrice}
                  onChange={(e) => setRicePrice(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ink-muted mb-2">
                Jumlah Anggota Keluarga
              </label>
              <input
                type="number"
                min="1"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full px-4 py-3.5 rounded-[14px] bg-canvas-parchment border border-hairline text-ink focus:outline-none focus:border-primary-focus focus:ring-1 focus:ring-primary-focus transition-all text-[17px]"
              />
            </div>
          </div>

          <div className="bg-surface-tile rounded-[18px] p-6 text-center text-white">
            <p className="text-[14px] text-white/70 mb-1">
              Total Zakat yang harus dibayar
            </p>
            <p className="text-[28px] font-semibold tracking-tight">
              {formatCurrency(zakatFitrahResult)}
            </p>
            <p className="text-[12px] text-white/50 mt-1">
              ({familyMembers} orang × {RICE_PER_PERSON} liter × {formatCurrency(ricePrice)})
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-canvas border border-hairline rounded-[24px] p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-canvas-parchment rounded-full flex items-center justify-center">
              <Calculator size={22} className="text-ink" />
            </div>
            <div>
              <h3 className="font-semibold text-[17px] text-ink">Zakat Maal</h3>
              <p className="text-[14px] text-ink-muted">
                Zakat harta simpanan
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-[14px] border border-primary/10 flex gap-3">
            <AlertCircle className="text-primary shrink-0 mt-0.5" size={16} />
            <div className="text-[14px] text-ink">
              <p className="font-semibold mb-0.5">Syarat Nishab</p>
              <p className="text-ink-muted">
                Harta wajib dizakati jika mencapai nilai setara 85 gram emas dan
                telah tersimpan selama 1 tahun (haul).
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-medium text-ink-muted mb-2">
                Harga Emas (per gram)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-ink-faint text-[15px]">Rp</span>
                <input
                  type="number"
                  value={goldPrice}
                  onChange={(e) => setGoldPrice(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ink-muted mb-2">
                Total Harta Simpanan
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-ink-faint text-[15px]">Rp</span>
                <input
                  type="number"
                  value={wealthAmount}
                  onChange={(e) => setWealthAmount(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-[18px] text-center ${isMaalEligible ? "bg-surface-tile text-white" : "bg-canvas-parchment"}`}>
            {isMaalEligible ? (
              <>
                <p className="text-[14px] text-white/70 mb-1">
                  Total Zakat (2.5%)
                </p>
                <p className="text-[28px] font-semibold tracking-tight">
                  {formatCurrency(zakatMaalResult)}
                </p>
              </>
            ) : (
              <div>
                <p className="font-semibold text-[17px] text-ink mb-1">Belum Wajib Zakat</p>
                <p className="text-[14px] text-ink-muted">
                  Harta belum mencapai nishab ({formatCurrency(goldPrice * GOLD_NISAB)})
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZakatCalculator;
