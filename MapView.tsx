import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Store } from '../types';
import { Gift, MapPin, Clock, Tag, Navigation } from 'lucide-react';

// Fix for default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  stores: Store[];
}

const districtCoords: { [key: string]: [number, number] } = {
  "中西區": [22.9926, 120.1989],
  "安南區": [23.0478, 120.1837],
  "東區": [22.9839, 120.2227],
  "南區": [22.9698, 120.1947],
  "北區": [23.0076, 120.2114],
  "永康區": [23.0232, 120.2526],
  "安平區": [22.9926, 120.1600],
  "新營區": [23.3056, 120.3164],
  "佳里區": [23.1610, 120.1764],
  "新化區": [23.0361, 120.3340],
  "善化區": [23.1319, 120.2917],
  "新市區": [23.0789, 120.2974],
  "麻豆區": [23.1819, 120.2458],
  "學甲區": [23.2319, 120.1814],
  "仁德區": [22.9620, 120.2505],
  "歸仁區": [22.9669, 120.2831],
  "安定區": [23.1221, 120.2366],
  "西港區": [23.1235, 120.2014],
  "七股區": [23.1491, 120.1137],
  "柳營區": [23.2750, 120.3114],
  "鹽水區": [23.3211, 120.2664],
  "白河區": [23.3514, 120.4164],
  "六甲區": [23.2321, 120.3477],
  "後壁區": [23.3653, 120.3626],
  "下營區": [23.2321, 120.2637],
  "官田區": [23.1932, 120.3204],
  "大內區": [23.1189, 120.3558],
  "玉井區": [23.1242, 120.4611],
  "山上區": [23.1026, 120.3541],
  "南化區": [23.0435, 120.4764],
  "左鎮區": [23.0583, 120.4074],
  "關廟區": [22.9625, 120.3283],
  "龍崎區": [22.9644, 120.3605],
  "楠西區": [23.1741, 120.4853],
  "將軍區": [23.2035, 120.1264],
  "北門區": [23.2678, 120.1258],
  "東山區": [23.3235, 120.4042],
};

// Component to handle map centering when stores change
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export const MapView: React.FC<MapViewProps> = ({ stores }) => {
  const tainanCenter: [number, number] = [22.9926, 120.1989];

  // Helper function to generate stable coordinates for stores within a district
  const storesWithCoords = useMemo(() => {
    return stores.map(store => {
      const base = districtCoords[store.district] || tainanCenter;
      
      // Use the store ID (name hashing) to create a deterministic offset so seeds are consistent
      const hash = store.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const latOffset = ((hash % 100) - 50) / 3000; // Small offset around 0.01 degrees
      const lngOffset = (((hash * 13) % 100) - 50) / 3000;
      
      return {
        ...store,
        lat: base[0] + latOffset,
        lng: base[1] + lngOffset
      };
    });
  }, [stores]);

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative z-0">
      <MapContainer 
        center={tainanCenter} 
        zoom={12} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {storesWithCoords.map((store) => (
          <Marker 
            key={store.id} 
            position={[store.lat, store.lng]}
          >
            <Popup className="custom-popup">
              <div className="p-1 min-w-[200px]">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-[10px] font-bold text-lions-orange uppercase tracking-wider">
                    {store.district} • {store.category}
                  </div>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lions-orange hover:text-lions-deep transition-colors"
                    title="導航"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
                <h3 className="text-sm font-bold text-lions-deep mb-2 pr-5">
                  {store.name}
                </h3>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-start text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 mr-1.5 mt-0.5 text-lions-orange/60 shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-start text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 mr-1.5 mt-0.5 text-lions-orange/60 shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <div className="p-2 bg-lions-orange/5 rounded-lg border border-lions-orange/10 mb-2">
                  <div className="flex items-start">
                    <Gift className="w-3 h-3 mr-1.5 mt-0.5 text-lions-orange shrink-0" />
                    <div className="text-[11px] text-lions-deep font-bold">
                      {store.promotion}
                    </div>
                  </div>
                </div>

                {store.playerModel !== '-' && (
                  <div className="flex items-center text-[10px] bg-lions-deep text-white px-2 py-1 rounded-full w-fit">
                    <Tag className="w-2.5 h-2.5 mr-1" />
                    <span>兌換：{store.playerModel}</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
