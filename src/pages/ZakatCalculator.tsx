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
    "w-full pl-12 pr-4 py-3 rounded-xl bg-surface-input border border-border text-text focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm";

  return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text-heading">
          Kalkulator Zakat
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Hitung kewajiban Zakat Maal dan Zakat Fitrah
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-surface-input p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab("fitrah")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "fitrah"
              ? "bg-accent text-surface shadow-sm"
              : "text-text-muted"
          }`}
        >
          Zakat Fitrah
        </button>
        <button
          onClick={() => setActiveTab("maal")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "maal"
              ? "bg-accent text-surface shadow-sm"
              : "text-text-muted"
          }`}
        >
          Zakat Maal
        </button>
      </div>

      {activeTab === "fitrah" ? (
        <div className="p-6 rounded-2xl bg-surface-card border border-border space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-forest-800 rounded-xl flex items-center justify-center">
              <Coins size={20} className="text-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-text-heading">Zakat Fitrah</h3>
              <p className="text-xs text-text-muted">
                Wajib ditunaikan di bulan Ramadhan
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Harga Beras (per liter/kg)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-text-subtle text-sm">Rp</span>
                <input
                  type="number"
                  value={ricePrice}
                  onChange={(e) => setRicePrice(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Jumlah Anggota Keluarga
              </label>
              <input
                type="number"
                min="1"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-surface-input border border-border text-text focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="bg-forest-800 p-5 rounded-xl border border-border">
            <p className="text-center text-sm text-text-muted mb-1">
              Total Zakat yang harus dibayar
            </p>
            <p className="text-center text-2xl font-bold text-gold-400">
              {formatCurrency(zakatFitrahResult)}
            </p>
            <p className="text-center text-[11px] text-text-subtle mt-1">
              ({familyMembers} orang × {RICE_PER_PERSON} liter × {formatCurrency(ricePrice)})
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-surface-card border border-border space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-forest-800 rounded-xl flex items-center justify-center">
              <Calculator size={20} className="text-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-text-heading">Zakat Maal</h3>
              <p className="text-xs text-text-muted">
                Zakat harta simpanan
              </p>
            </div>
          </div>

          <div className="bg-gold-900/20 p-4 rounded-xl border border-gold-800/40 flex gap-3">
            <AlertCircle className="text-gold-400 shrink-0 mt-0.5" size={16} />
            <div className="text-xs text-gold-300">
              <p className="font-bold mb-0.5">Syarat Nishab</p>
              <p>
                Harta wajib dizakati jika mencapai nilai setara 85 gram emas dan
                telah tersimpan selama 1 tahun (haul).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Harga Emas (per gram)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-text-subtle text-sm">Rp</span>
                <input
                  type="number"
                  value={goldPrice}
                  onChange={(e) => setGoldPrice(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Total Harta Simpanan
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-text-subtle text-sm">Rp</span>
                <input
                  type="number"
                  value={wealthAmount}
                  onChange={(e) => setWealthAmount(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-xl border border-border ${isMaalEligible ? "bg-forest-800" : "bg-surface-input"}`}>
            {isMaalEligible ? (
              <>
                <p className="text-center text-sm text-text-muted mb-1">
                  Total Zakat (2.5%)
                </p>
                <p className="text-center text-2xl font-bold text-gold-400">
                  {formatCurrency(zakatMaalResult)}
                </p>
              </>
            ) : (
              <div className="text-center">
                <p className="font-bold text-text-heading mb-1">Belum Wajib Zakat</p>
                <p className="text-xs text-text-muted">
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
