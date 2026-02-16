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

export type CustomerTransaction = {
  id: string;
  businessId: string;
  businessName: string;
  amount: string;
  date: string;
  rewardChange?: string;
};

export type RewardInsight = {
  title: string;
  summary: string;
  suggestion: string;
};

export type Budget = {
  id: string;
  label: string;
  limit: number;
};

export type BudgetInsight = {
  title: string;
  summary: string;
  warning?: string;
};

const REWARDS_STORAGE_KEY = "spaza_rewards";
const TRANSACTIONS_STORAGE_KEY = "spaza_customer_transactions";
const BUDGETS_STORAGE_KEY = "spaza_budgets";
const SPAZA_BALANCE_STORAGE_KEY = "spaza_wallet_balance";

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

const SEED_TRANSACTIONS: CustomerTransaction[] = [
  {
    id: "t1",
    businessId: "1",
    businessName: "Mama Thandi's Spaza",
    amount: "R220.00",
    date: "Today",
    rewardChange: "+R20 airtime",
  },
  {
    id: "t2",
    businessId: "3",
    businessName: "Siya's Corner Shop",
    amount: "R75.00",
    date: "This week",
    rewardChange: "+1 free loaf",
  },
  {
    id: "t3",
    businessId: "2",
    businessName: "Bongani Fresh Produce",
    amount: "R140.00",
    date: "Last week",
  },
];

const DEFAULT_BUDGETS: Budget[] = [
  { id: "b1", label: "Groceries", limit: 500 },
  { id: "b2", label: "Airtime & data", limit: 100 },
  { id: "b3", label: "Other essentials", limit: 200 },
];

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SPZ-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function getRewards(): RewardItem[] {
  const raw = localStorage.getItem(REWARDS_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(SEED_REWARDS));
    return SEED_REWARDS;
  }
  return JSON.parse(raw) as RewardItem[];
}

export function getRewardById(id: string): RewardItem | undefined {
  return getRewards().find((r) => r.id === id);
}

export function getActiveRewardsForBusiness(sourceId: string): RewardItem[] {
  return getRewards().filter(
    (r) => r.sourceId === sourceId && r.status === "active"
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
  localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(rewards));
  return rewards[idx];
}

export function addReward(
  reward: Omit<RewardItem, "id" | "status">
): RewardItem {
  const rewards = getRewards();
  const newReward: RewardItem = {
    ...reward,
    id: `r${Date.now()}`,
    status: "active",
  };
  rewards.push(newReward);
  localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(rewards));
  return newReward;
}

export function getCustomerTransactions(): CustomerTransaction[] {
  const raw = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(SEED_TRANSACTIONS)
    );
    return SEED_TRANSACTIONS;
  }
  return JSON.parse(raw) as CustomerTransaction[];
}

export function getBudgets(): Budget[] {
  const raw = localStorage.getItem(BUDGETS_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify(DEFAULT_BUDGETS));
    return DEFAULT_BUDGETS;
  }
  return JSON.parse(raw) as Budget[];
}

export function updateBudgetLimit(id: string, limit: number): Budget[] {
  const budgets = getBudgets();
  const updated = budgets.map((b) =>
    b.id === id ? { ...b, limit: Math.max(0, limit) } : b
  );
  localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function getSpazaBalance(): number {
  const raw = localStorage.getItem(SPAZA_BALANCE_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(SPAZA_BALANCE_STORAGE_KEY, "0");
    return 0;
  }
  const value = Number(raw);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

export function adjustSpazaBalance(delta: number): number {
  const current = getSpazaBalance();
  const next = Math.max(0, current + delta);
  localStorage.setItem(SPAZA_BALANCE_STORAGE_KEY, String(next));
  return next;
}

export function getBudgetInsight(
  budgets: Budget[],
  transactions: CustomerTransaction[]
): BudgetInsight {
  const totalPlanned = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = transactions.reduce((sum, t) => {
    const numeric = parseInt(t.amount.replace("R", "").split(".")[0], 10);
    if (Number.isNaN(numeric)) {
      return sum;
    }
    return sum + numeric;
  }, 0);

  const title = "Smart budget insight";

  const summary =
    totalPlanned > 0
      ? `You planned R${totalPlanned} for this period and have already spent about R${totalSpent}.`
      : "Set a simple budget so we can help you track your monthly spend.";

  let warning: string | undefined;

  if (totalPlanned > 0 && totalSpent > totalPlanned) {
    warning =
      "You have passed your planned budget. Try using your wallet balance more carefully for the rest of the month.";
  } else if (totalPlanned > 0 && totalSpent > totalPlanned * 0.7) {
    warning =
      "You have used more than 70% of your planned budget. Consider slowing down your non‑essential purchases.";
  }

  return {
    title,
    summary,
    warning,
  };
}

export function getRewardInsights(
  rewards: RewardItem[],
  transactions: CustomerTransaction[]
): RewardInsight {
  const activeRewards = rewards.filter((r) => r.status === "active");
  const totalAirtime = activeRewards
    .filter((r) => r.type === "airtime")
    .reduce((sum, r) => sum + parseInt(r.amount.replace("R", ""), 10), 0);

  const byBusiness: Record<string, { name: string; count: number }> = {};
  transactions.forEach((t) => {
    const current = byBusiness[t.businessId] || {
      name: t.businessName,
      count: 0,
    };
    byBusiness[t.businessId] = {
      name: current.name,
      count: current.count + 1,
    };
  });

  const topBusiness = Object.values(byBusiness).sort(
    (a, b) => b.count - a.count
  )[0];

  const title = "Smart reward insight";

  const summaryParts = [];
  if (transactions.length > 0) {
    summaryParts.push(
      `You have made ${transactions.length} recent purchases across your favourite spaza shops.`
    );
  }
  if (totalAirtime > 0) {
    summaryParts.push(
      `You have R${totalAirtime} airtime waiting in your wallet.`
    );
  }

  const summary = summaryParts.join(" ");

  let suggestion =
    "Keep shopping at verified businesses to unlock more airtime and vouchers.";

  if (topBusiness) {
    suggestion = `You visit ${topBusiness.name} most often. Consider building a stronger relationship there to unlock bigger rewards, and try one new verified shop this week for more variety.`;
  }

  return {
    title,
    summary,
    suggestion,
  };
}
