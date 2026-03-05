import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getWallet } from "../src/state";
import { handleCors } from "./_cors";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) {
    return;
  }

  res.status(200).json(getWallet());
}


