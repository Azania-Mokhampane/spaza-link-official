import type { BusinessType, RewardTemplate } from "./lib/types";

export const mockBusinesses: BusinessType[] = [
  {
    id: "1",
    name: "Mama Thandi's Spaza",
    category: "Groceries & Essentials",
    latitude: -26.2041,
    longitude: 28.0473,
    isVerified: true,
    hasRewards: true,
    rewardDescription: "Spend R500 in-store and get R50 airtime.",
  },
  {
    id: "2",
    name: "Bongani Fresh Produce",
    category: "Fresh Fruit & Vegetables",
    latitude: -26.1952,
    longitude: 28.0345,
    isVerified: true,
    hasRewards: false,
  },
  {
    id: "3",
    name: "Siya's Corner Shop",
    category: "Snacks & Beverages",
    latitude: -26.2123,
    longitude: 28.0612,
    isVerified: false,
    hasRewards: true,
    rewardDescription: "Buy 10 loaves, get 1 free.",
  },
  {
    id: "4",
    name: "Nkosi Hardware",
    category: "Hardware & Tools",
    latitude: -26.1879,
    longitude: 28.0789,
    isVerified: true,
    hasRewards: false,
  },
  {
    id: "5",
    name: "Zandi's Braai Spot",
    category: "Prepared Food",
    latitude: -26.22,
    longitude: 28.1001,
    isVerified: false,
    hasRewards: false,
  },
];

export const CATEGORIES = [
  "Spaza Shop",
  "Fresh Produce",
  "Hair & Beauty",
  "Services",
];

export const defaultTemplates: RewardTemplate[] = [
  {
    id: "r1",
    label: "Spend R300 → R20 airtime",
    description: "Customers who spend R300 in-store earn R20 airtime.",
  },
  {
    id: "r2",
    label: "Spend R500 → R50 voucher",
    description: "Customers who spend R500 in-store get a R50 voucher.",
  },
  {
    id: "r3",
    label: "Bulk purchase reward",
    description:
      "Reward customers who buy in bulk with a discount on their next visit.",
  },
];
