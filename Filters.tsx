/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Map, Filter, RefreshCcw } from "lucide-react";
import { FilterOptions, StoreCategory } from "../types";

interface FiltersProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  districts: string[];
  categories: StoreCategory[];
  players: string[];
}

export function Filters({ filters, setFilters, districts, categories, players }: FiltersProps) {
  const resetFilters = () => {
    setFilters({
      district: "全部地區",
      category: "全部類別",
      player: "全部款式",
      searchQuery: ""
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋店家或活動內容..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-lions-orange/20 focus:border-lions-orange focus:bg-white transition-all text-sm font-medium"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
              <Map className="w-3 h-3 mr-2 text-lions-orange" />
              地區範圍
            </label>
            <select
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lions-orange/20 transition-all appearance-none cursor-pointer"
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
            >
              <option value="全部地區">所有區域</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
              <Filter className="w-3 h-3 mr-2 text-lions-orange" />
              產業分類
            </label>
            <select
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lions-orange/20 transition-all appearance-none cursor-pointer"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="全部類別">不限類別</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
              <RefreshCcw className="w-3 h-3 mr-2 text-lions-orange" />
              應援款式
            </label>
            <select
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lions-orange/20 transition-all appearance-none cursor-pointer"
              value={filters.player}
              onChange={(e) => setFilters({ ...filters, player: e.target.value })}
            >
              <option value="全部款式">全部款式</option>
              {players.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {(filters.district !== "全部地區" || filters.category !== "全部類別" || filters.player !== "全部款式" || filters.searchQuery !== "") && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 text-xs font-bold text-lions-orange bg-lions-orange/5 hover:bg-lions-orange/10 rounded-xl transition-all flex items-center justify-center border border-lions-orange/10"
        >
          清除篩選
        </button>
      )}
    </div>
  );
}
