import type { VercelRequest, VercelResponse } from "@vercel/node";
import { topUpWallet } from "../../src/state";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
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

