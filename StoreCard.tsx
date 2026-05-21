/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Clock, Gift, User, Tag, Navigation } from "lucide-react";
import { Store } from "../types";

interface StoreCardProps {
  store: Store;
  key?: string | number;
}

export function StoreCard({ store }: StoreCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 p-6 flex flex-col h-full overflow-hidden relative"
      id={`card-${store.id}`}
    >
      {/* Decorative Gradient Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lions-orange via-lions-gold to-lions-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-lions-orange uppercase tracking-widest mb-1 opacity-80">
            {store.district} • {store.category}
          </div>
          <h3 className="text-xl font-display font-bold text-lions-deep leading-tight group-hover:text-lions-orange transition-colors">
            {store.name}
          </h3>
        </div>
        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-10 h-10 rounded-2xl bg-lions-orange/10 flex items-center justify-center text-lions-orange hover:bg-lions-orange hover:text-white transition-all shadow-sm"
          title="開啟導航"
        >
          <Navigation className="w-5 h-5" />
        </a>
      </div>

      <div className="space-y-4 flex-grow">
        <div className="space-y-2.5">
          <div className="flex items-start text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 mr-2.5 mt-0.5 text-lions-orange/60 shrink-0" />
            <span className="leading-relaxed">{store.address}</span>
          </div>
          
          <div className="flex items-start text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 mr-2.5 mt-0.5 text-lions-orange/60 shrink-0" />
            <span>{store.hours}</span>
          </div>
        </div>

        <div className="relative mt-2">
          <div className="absolute inset-0 bg-lions-orange/[0.03] rounded-2xl -m-2 border border-lions-orange/5" />
          <div className="relative p-3 space-y-2">
            <div className="flex items-start">
              <Gift className="w-4 h-4 mr-2.5 mt-0.5 text-lions-orange shrink-0" />
              <div className="text-sm text-lions-deep font-bold leading-snug">
                {store.promotion}
              </div>
            </div>
            <div className="inline-flex items-center text-[10px] font-bold text-lions-gold bg-lions-gold/10 px-2 py-0.5 rounded-full">
              優惠時間 • {store.promoPeriod}
            </div>
          </div>
        </div>
      </div>

      {store.playerModel !== "-" && (
        <div className="mt-6 pt-5 border-t border-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-lions-deep flex items-center justify-center text-white mr-2.5">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">應援選手</span>
                <span className="text-xs font-bold text-lions-deep">{store.playerModel}</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-lions-orange group-hover:text-white transition-all">
              <Tag className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
