import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

type Budget = {
  id: string;
  label: string;
  limit: number;
};

type BudgetInsight = {
  title: string;
  summary: string;
  warning?: string;
};

type CustomerTransaction = {
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

app.get("/api/budgets", (_req, res) => {
  res.json({ budgets });
});

app.put("/api/budgets/:id", (req, res) => {
  const { id } = req.params;
  const { limit } = req.body as { limit: number };

  if (typeof limit !== "number" || Number.isNaN(limit) || limit < 0) {
    res.status(400).json({ error: "Invalid limit value" });
    return;
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
    res.status(404).json({ error: "Budget not found" });
    return;
  }

  res.json({ budgets });
});

app.get("/api/wallet", (_req, res) => {
  res.json({
    spazaBalance,
  });
});

app.post("/api/wallet/top-up", (req, res) => {
  const { amount } = req.body as { amount: number };
  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    res.status(400).json({ error: "Invalid amount" });
    return;
  }
  spazaBalance += amount;
  res.json({ spazaBalance });
});

app.post("/api/wallet/pay", (req, res) => {
  const { amount } = req.body as { amount: number };
  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    res.status(400).json({ error: "Invalid amount" });
    return;
  }
  if (amount > spazaBalance) {
    res.status(400).json({ error: "Insufficient balance" });
    return;
  }
  spazaBalance -= amount;
  res.json({ spazaBalance });
});

function calculateBudgetInsight(
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

app.get("/api/ai/budget-insight", (_req, res) => {
  const insight = calculateBudgetInsight(budgets, transactions);
  res.json({ insight });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Spaza Link backend listening on port ${port}`);
});

