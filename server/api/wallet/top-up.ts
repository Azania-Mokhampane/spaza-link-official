import type { VercelRequest, VercelResponse } from "@vercel/node";
import { topUpWallet } from "../../src/state";
import { handleCors } from "../_cors";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) {
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { amount } = req.body as { amount: number };

  try {
    const wallet = topUpWallet(amount);
    res.status(200).json(wallet);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid amount" });
  }
}


