import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Gift, Smartphone, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getRewardById,
  redeemReward,
  type RewardItem,
} from "@/lib/rewardsStore";
import BackButton from "@/components/navigation/BackButton";

const RedeemReward = () => {
  const { rewardId } = useParams<{ rewardId: string }>();
  const navigate = useNavigate();
  const [reward, setReward] = useState<RewardItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!rewardId) return;
    const r = getRewardById(rewardId);
    if (!r) return;

    if (r.status === "active") {
      const redeemed = redeemReward(rewardId);
      if (redeemed) setReward(redeemed);
    } else {
      setReward(r);
    }
  }, [rewardId]);

  const handleCopy = async () => {
    if (!reward?.redemptionCode) return;
    await navigator.clipboard.writeText(reward.redemptionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!reward) {
    return (
      <main className="flex flex-1 flex-col bg-background px-4 py-6">
        <BackButton fallback="/customer/wallet" />
        <div className="mx-auto w-full max-w-screen-sm">
          <section className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              Reward not found
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This reward may have already been used or doesn't exist.
            </p>
            <Button
              variant="landing"
              className="mt-6"
              onClick={() => navigate("/customer/wallet")}
            >
              Back to Wallet
            </Button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback="/customer/wallet" />
      <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center">
        {/* Success icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Reward Ready!
        </h1>
        <p className="mt-2 text-center text-base text-muted-foreground">
          Show this code to the trader to redeem your reward.
        </p>

        {/* Redemption Code */}
        <Card className="mt-6 w-full border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-3 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Redemption Code
            </p>
            <p className="font-mono text-4xl font-extrabold tracking-widest text-foreground">
              {reward.redemptionCode}
            </p>
            <div className="mt-2 rounded-xl bg-white p-3">
              <QRCodeSVG value={reward.redemptionCode!} size={160} level="M" />
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Screenshot this QR code to show the trader
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy Code"}
            </Button>
          </CardContent>
        </Card>

        {/* Reward Details */}
        <Card className="mt-4 w-full">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
              {reward.type === "airtime" ? (
                <Smartphone className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Gift className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {reward.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {reward.source}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end">
              <span className="text-sm font-bold text-foreground">
                {reward.amount}
              </span>
              <Badge className="mt-1 bg-muted px-1.5 py-0 text-[10px] text-muted-foreground">
                redeemed
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Done */}
        <Button
          variant="landing"
          size="xl"
          className="mt-8 w-full"
          onClick={() => navigate("/customer/wallet")}
        >
          Done
        </Button>
      </div>
    </main>
  );
};

export default RedeemReward;
