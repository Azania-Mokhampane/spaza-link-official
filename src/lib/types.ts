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
