import React, { useState } from "react";
import { Calculator, Coins, AlertCircle } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const ZakatCalculator: React.FC = () => {
  useDocumentTitle("Kalkulator Zakat | QuranApp");
  const [activeTab, setActiveTab] = useState<"fitrah" | "maal">("fitrah");

  // State for Zakat Maal
  const [goldPrice, setGoldPrice] = useState<number>(1000000); // Default 1jt/gram
  const [wealthAmount, setWealthAmount] = useState<number>(0);

  // State for Zakat Fitrah
  const [ricePrice, setRicePrice] = useState<number>(15000); // Default 15k/liter
  const [familyMembers, setFamilyMembers] = useState<number>(1);

  // Constants
  const GOLD_NISAB = 85; // 85 grams
  const ZAKAT_RATE = 0.025; // 2.5%
  const RICE_PER_PERSON = 3.5; // 3.5 liters or 2.5kg (using liters as common measure)

  // Calculations
  const zakatMaalResult = wealthAmount * ZAKAT_RATE;
  const isMaalEligible = wealthAmount >= goldPrice * GOLD_NISAB;

  const zakatFitrahResult = familyMembers * ricePrice * RICE_PER_PERSON;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Kalkulator Zakat
        </h1>
        <p className="text-gray-600">
          Hitung kewajiban Zakat Maal dan Zakat Fitrah
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-emerald-50 p-1 rounded-xl flex gap-2">
          <button
            onClick={() => setActiveTab("fitrah")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "fitrah"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            Zakat Fitrah
          </button>
          <button
            onClick={() => setActiveTab("maal")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "maal"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            Zakat Maal
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        {activeTab === "fitrah" ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-4 text-emerald-800 mb-2">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Coins size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Zakat Fitrah</h3>
                <p className="text-sm text-gray-500">
                  Wajib ditunaikan di bulan Ramadhan
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Beras (per liter/kg)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={ricePrice}
                    onChange={(e) => setRicePrice(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Anggota Keluarga
                </label>
                <input
                  type="number"
                  min="1"
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="bg-emerald-50 p-6 rounded-xl mt-6">
                <p className="text-center text-gray-600 mb-2">
                  Total Zakat yang harus dibayar
                </p>
                <p className="text-center text-3xl font-bold text-emerald-700">
                  {formatCurrency(zakatFitrahResult)}
                </p>
                <p className="text-center text-xs text-gray-500 mt-2">
                  ({familyMembers} orang x {RICE_PER_PERSON} liter x{" "}
                  {formatCurrency(ricePrice)})
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-4 text-emerald-800 mb-2">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Zakat Maal</h3>
                <p className="text-sm text-gray-500">
                  Zakat harta simpanan (emas, tabungan, dll)
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex gap-3">
              <AlertCircle className="text-yellow-600 shrink-0" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-bold mb-1">Syarat Nishab</p>
                <p>
                  Harta wajib dizakati jika mencapai nilai setara 85 gram emas
                  dan telah tersimpan selama 1 tahun (haul).
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Emas (per gram saat ini)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Harta Simpanan
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={wealthAmount}
                    onChange={(e) => setWealthAmount(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div
                className={`p-6 rounded-xl mt-6 ${isMaalEligible ? "bg-emerald-50" : "bg-gray-50"}`}
              >
                {isMaalEligible ? (
                  <>
                    <p className="text-center text-gray-600 mb-2">
                      Total Zakat yang harus dibayar (2.5%)
                    </p>
                    <p className="text-center text-3xl font-bold text-emerald-700">
                      {formatCurrency(zakatMaalResult)}
                    </p>
                  </>
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="font-bold mb-1">Belum Wajib Zakat</p>
                    <p className="text-sm">
                      Harta anda belum mencapai nishab (
                      {formatCurrency(goldPrice * GOLD_NISAB)})
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZakatCalculator;
