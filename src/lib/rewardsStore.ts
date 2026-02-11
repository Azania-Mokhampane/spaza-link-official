export type RewardItem = {
  id: string;
  type: "airtime" | "voucher";
  title: string;
  source: string;
  sourceId: string;
  amount: string;
  date: string;
  status: "active" | "redeemed" | "expired";
  redemptionCode?: string;
  redeemedAt?: string;
};

const STORAGE_KEY = "spaza_rewards";

const SEED_REWARDS: RewardItem[] = [
  {
    id: "r1",
    type: "airtime",
    title: "R50 Airtime Voucher",
    source: "Mama Thandi's Spaza",
    sourceId: "1",
    amount: "R50",
    date: "8 Feb 2026",
    status: "active",
  },
  {
    id: "r2",
    type: "voucher",
    title: "Free Loaf of Bread",
    source: "Siya's Corner Shop",
    sourceId: "3",
    amount: "1x",
    date: "5 Feb 2026",
    status: "active",
  },
  {
    id: "r3",
    type: "airtime",
    title: "R20 Airtime Voucher",
    source: "Bongani Fresh Produce",
    sourceId: "2",
    amount: "R20",
    date: "28 Jan 2026",
    status: "redeemed",
    redemptionCode: "SPZ-K3M9X2",
    redeemedAt: "2026-01-30T10:00:00Z",
  },
];

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SPZ-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
// using local host for now
export function getRewards(): RewardItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REWARDS));
    return SEED_REWARDS;
  }
  return JSON.parse(raw) as RewardItem[];
}

export function getRewardById(id: string): RewardItem | undefined {
  return getRewards().find((r) => r.id === id);
}

export function getActiveRewardsForBusiness(sourceId: string): RewardItem[] {
  return getRewards().filter(
    (r) => r.sourceId === sourceId && r.status === "active",
  );
}

export function redeemReward(id: string): RewardItem | undefined {
  const rewards = getRewards();
  const idx = rewards.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;

  rewards[idx] = {
    ...rewards[idx],
    status: "redeemed",
    redemptionCode: generateCode(),
    redeemedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rewards));
  return rewards[idx];
}

export function addReward(
  reward: Omit<RewardItem, "id" | "status">,
): RewardItem {
  const rewards = getRewards();
  const newReward: RewardItem = {
    ...reward,
    id: `r${Date.now()}`,
    status: "active",
  };
  rewards.push(newReward);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rewards));
  return newReward;
}
