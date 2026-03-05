import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBudgetInsight } from "../../src/state";
import { handleCors } from "../_cors";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) {
    return;
  }

  const insight = getBudgetInsight();
  res.status(200).json({ insight });
}


