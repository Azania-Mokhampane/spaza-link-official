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

export type CustomerTransaction = {
  id: string;
  businessId: string;
  businessName: string;
  amount: string;
  date: string;
  rewardChange?: string;
};

let budgets: Budget[] = [
  { id: "b1", label: "Groceries", limit: 500 },
  { id: "b2", label: "Airtime & data", limit: 100 },
  { id: "b3", label: "Other essentials", limit: 200 },
];

const transactions: CustomerTransaction[] = [
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
];

let spazaBalance = 0;

export function getBudgets(): Budget[] {
  return budgets;
}

export function updateBudgetLimit(id: string, limit: number): Budget[] {
  if (typeof limit !== "number" || Number.isNaN(limit) || limit < 0) {
    throw new Error("Invalid limit value");
  }

  let found = false;

  budgets = budgets.map((b) => {
    if (b.id === id) {
      found = true;
      return { ...b, limit };
    }
    return b;
  });

  if (!found) {
    throw new Error("Budget not found");
  }

  return budgets;
}

export function getWallet() {
  return { spazaBalance };
}

export function topUpWallet(amount: number) {
  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    throw new Error("Invalid amount");
  }
  spazaBalance += amount;
  return { spazaBalance };
}

export function payFromWallet(amount: number) {
  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    throw new Error("Invalid amount");
  }
  if (amount > spazaBalance) {
    throw new Error("Insufficient balance");
  }
  spazaBalance -= amount;
  return { spazaBalance };
}

export function calculateBudgetInsight(
  currentBudgets: Budget[],
  history: CustomerTransaction[]
): BudgetInsight {
  const totalPlanned = currentBudgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = history.reduce((sum, t) => {
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

export function getBudgetInsight(): BudgetInsight {
  return calculateBudgetInsight(budgets, transactions);
}

