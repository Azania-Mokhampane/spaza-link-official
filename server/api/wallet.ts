import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getWallet } from "../src/state";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json(getWallet());
}

