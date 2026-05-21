/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Store {
  id: string;
  name: string;
  address: string;
  district: string;
  hours: string;
  promotion: string;
  promoPeriod: string;
  playerModel: string;
  category: StoreCategory;
}

export type StoreCategory = 
  | "餐飲服務" 
  | "生活零售" 
  | "專業服務" 
  | "教育休閒" 
  | "商業組織"
  | "身體美髮"
  | "藥局"
  | "其他";

export interface FilterOptions {
  district: string;
  category: string;
  player: string;
  searchQuery: string;
}
