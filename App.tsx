/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, MapPin, Search, Info, Map as MapIcon, LayoutGrid } from "lucide-react";
import { STORES } from "./data";
import { FilterOptions, StoreCategory } from "./types";
import { StoreCard } from "./components/StoreCard";
import { Filters } from "./components/Filters";
import { MapView } from "./components/MapView";

export default function App() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filters, setFilters] = useState<FilterOptions>({
    district: "全部地區",
    category: "全部類別",
    player: "全部款式",
    searchQuery: "",
  });

  // Extract unique values for filters
  const districts = useMemo(() => {
    return Array.from(new Set(STORES.map((s) => s.district))).sort();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(STORES.map((s) => s.category))).sort();
  }, []);

  const players = useMemo(() => {
    const allPlayers = STORES.flatMap((s) => s.playerModel.split("、"))
      .filter((p) => p !== "-" && p !== "")
      .map((p) => p.trim());
    return Array.from(new Set(allPlayers)).sort();
  }, []);

  const filteredStores = useMemo(() => {
    return STORES.filter((store) => {
      const matchDistrict =
        filters.district === "全部地區" || store.district === filters.district;
      const matchCategory =
        filters.category === "全部類別" || store.category === filters.category;
      const matchPlayer =
        filters.player === "全部款式" || store.playerModel.includes(filters.player);
      const matchSearch =
        filters.searchQuery === "" ||
        store.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        store.promotion.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchDistrict && matchCategory && matchPlayer && matchSearch;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-lions-deep">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lions-orange rounded-lg flex items-center justify-center text-white shadow-sm shadow-lions-orange/20">
              <MapPin className="w-5 h-5" />
            </div>
            <h1 className="text-sm md:text-lg font-display font-bold tracking-tight text-lions-deep leading-tight">
              府城獅子營<br className="md:hidden" />
              <span className="md:ml-2">在地店家歡慶2000勝</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-lions-deep">{filteredStores.length}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">應援店家</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-lions-deep text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-lions-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[300px] h-[300px] bg-lions-gold/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-lions-orange/20 text-lions-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-lions-orange/30">
              非官方網站 僅供參考
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight leading-tight">
              府城獅子營<br />
              <span className="text-lions-orange">在地店家歡慶2000勝</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              穿上球衣，帶著應援道具，探索台南巷弄內的熱情。
              <br className="hidden md:block" />
              集章兌換限量選手明信片，支持你最愛的台南英雄。
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Area - Now more integrated */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Filters
                filters={filters}
                setFilters={setFilters}
                districts={districts}
                categories={categories as StoreCategory[]}
                players={players}
              />
              
              <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-lions-orange/10 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-lions-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-lions-deep mb-1">溫馨提示</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      活動內容依店家現場公告為準，建議前往前先電話確認營業時間。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Stores List Area */}
          <section className="lg:col-span-3">
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1.5 bg-lions-orange rounded-full" />
                <h3 className="text-lg font-display font-bold text-lions-deep">
                  {filters.district === "全部地區" ? "全台南地區" : filters.district}
                  <span className="text-slate-400 font-normal text-sm ml-3">
                    ({filteredStores.length})
                  </span>
                </h3>
              </div>

              <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "grid"
                      ? "bg-lions-orange text-white"
                      : "text-slate-400 hover:text-lions-deep"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  列表模式
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "map"
                      ? "bg-lions-orange text-white"
                      : "text-slate-400 hover:text-lions-deep"
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  地圖模式
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === "map" ? (
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapView stores={filteredStores} />
                </motion.div>
              ) : (
                <div key="grid-view">
                  {filteredStores.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      <AnimatePresence mode="popLayout">
                        {filteredStores.map((store) => (
                          <StoreCard key={store.id} store={store} />
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-3xl border border-dashed border-slate-200"
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <MapPin className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">找不到相關店家</h3>
                      <p className="text-sm text-slate-400 max-w-xs">
                        請嘗試調整篩選條件或關鍵字，搜尋更多店家資訊。
                      </p>
                      <button
                        onClick={() => setFilters({
                          district: "全部地區",
                          category: "全部類別",
                          player: "全部款式",
                          searchQuery: ""
                        })}
                        className="mt-6 text-sm font-bold text-lions-orange hover:text-lions-orange/80 underline underline-offset-4"
                      >
                        清除所有條件
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8">
            <div className="h-0.5 w-12 bg-lions-orange/20" />
            <div className="h-0.5 w-12 bg-lions-gold/20" />
            <div className="h-0.5 w-12 bg-lions-orange/20" />
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-2">
            Uni-Lions × Tainan Support Network
          </p>
          <p className="text-[10px] text-slate-300 font-medium">
            © 2026 台南應援店家地圖 • 讓城市的每個角落都充滿棒球熱情
          </p>
        </div>
      </footer>
    </div>
  );
}
