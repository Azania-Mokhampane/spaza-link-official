export type BusinessType = {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  isVerified?: boolean;
  hasRewards?: boolean;
  rewardDescription?: string;
};

export type RewardTemplate = {
  id: string;
  label: string;
  description: string;
  isCustom?: boolean;
};

export type Transaction = {
  id: string;
  customerName: string;
  amount: string;
  date: string;
};
