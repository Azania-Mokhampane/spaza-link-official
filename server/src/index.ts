import express from "express";
import cors from "cors";
import {
  getBudgets,
  updateBudgetLimit,
  getWallet,
  topUpWallet,
  payFromWallet,
  getBudgetInsight,
} from "./state";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/budgets", (_req, res) => {
  res.json({ budgets: getBudgets() });
});

app.put("/api/budgets", (req, res) => {
  const { id, limit } = req.body as { id: string; limit: number };

  try {
    const updated = updateBudgetLimit(id, limit);
    res.json({ budgets: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "Budget not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(400).json({ error: "Invalid limit value" });
  }
});

app.get("/api/wallet", (_req, res) => {
  res.json(getWallet());
});

app.post("/api/wallet/top-up", (req, res) => {
  const { amount } = req.body as { amount: number };
  try {
    const wallet = topUpWallet(amount);
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
});

app.post("/api/wallet/pay", (req, res) => {
  const { amount } = req.body as { amount: number };
  try {
    const wallet = payFromWallet(amount);
    res.json(wallet);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "Insufficient balance") {
      res.status(400).json({ error: message });
      return;
    }
    res.status(400).json({ error: message || "Invalid amount" });
  }
});

app.get("/api/ai/budget-insight", (_req, res) => {
  const insight = getBudgetInsight();
  res.json({ insight });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Spaza Link backend listening on port ${port}`);
});

