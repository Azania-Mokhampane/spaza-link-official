import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBudgets, updateBudgetLimit } from "../src/state";
import { handleCors } from "./_cors";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) {
    return;
  }

  if (req.method === "GET") {
    res.status(200).json({ budgets: getBudgets() });
    return;
  }

  if (req.method === "PUT") {
    const { id, limit } = req.body as { id: string; limit: number };

    try {
      const updated = updateBudgetLimit(id, limit);
      res.status(200).json({ budgets: updated });
    } catch (error) {
      if (error instanceof Error && error.message === "Budget not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(400).json({ error: "Invalid limit value" });
    }
    return;
  }

  res.setHeader("Allow", "GET, PUT, OPTIONS");
  res.status(405).end("Method Not Allowed");
}


