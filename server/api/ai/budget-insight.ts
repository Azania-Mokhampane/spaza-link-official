import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBudgetInsight } from "../../src/state";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const insight = getBudgetInsight();
  res.status(200).json({ insight });
}

