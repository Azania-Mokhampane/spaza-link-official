import type { BusinessType } from "@/lib/types";
import { useAuthContext } from "../auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { getActiveRewardsForBusiness } from "@/lib/rewardsStore";
import BackButton from "@/components/navigation/BackButton";
import { Gift, LogIn, Receipt, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/routes";

const mockBusinesses: BusinessType[] = [
  {
    id: "1",
    name: "Mama Thandi's Spaza",
    category: "Groceries & Essentials",
    latitude: -26.2041,
    longitude: 28.0473,
    isVerified: true,
    hasRewards: true,
    rewardDescription: "Spend R500 in-store and get R50 airtime.",
  },
  {
    id: "2",
    name: "Bongani Fresh Produce",
    category: "Fresh Fruit & Vegetables",
    latitude: -26.1952,
    longitude: 28.0345,
    isVerified: true,
    hasRewards: false,
  },
  {
    id: "3",
    name: "Siya's Corner Shop",
    category: "Snacks & Beverages",
    latitude: -26.2123,
    longitude: 28.0612,
    isVerified: false,
    hasRewards: true,
    rewardDescription: "Buy 10 loaves, get 1 free.",
  },
  {
    id: "4",
    name: "Nkosi Hardware",
    category: "Hardware & Tools",
    latitude: -26.1879,
    longitude: 28.0789,
    isVerified: true,
    hasRewards: false,
  },
  {
    id: "5",
    name: "Zandi's Braai Spot",
    category: "Prepared Food",
    latitude: -26.22,
    longitude: 28.1001,
    isVerified: false,
    hasRewards: false,
  },
];
const SpendConfirmation = () => {
  const { isSignedIn } = useAuthContext();
  const navigate = useNavigate();

  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [amount, setAmount] = useState("");
  const [isBulk, setIsBulk] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState("");

  const applicableRewards = useMemo(
    () =>
      selectedBusiness ? getActiveRewardsForBusiness(selectedBusiness) : [],
    [selectedBusiness]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setReceiptFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedBusiness || !amount) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);

    if (selectedRewardId) {
      navigate(`/customer/redeem/${selectedRewardId}`);
    } else {
      navigate(ROUTES.REWARD_EARNED);
    }
  };

  // Gate: must be logged in
  if (!isSignedIn) {
    return (
      <main className="flex flex-1 flex-col bg-background px-4 py-6">
        <BackButton fallback={ROUTES.CUSTOMER} />
        <div className="mx-auto w-full max-w-screen-sm">
          <section className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-16 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <LogIn className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Sign in to confirm purchases
            </h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              You need to be signed in to submit your in-store spend and earn
              rewards.
            </p>
            <div className="flex flex-row items-center justify-center gap-2 mt-6">
              <SignInButton
                mode="modal"
                forceRedirectUrl={ROUTES.SPEND_CONFIRMATION}
                signUpForceRedirectUrl={ROUTES.SPEND_CONFIRMATION}
              >
                <Button variant="landing">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </SignInButton>
              <p>or</p>
              <SignUpButton
                mode="modal"
                forceRedirectUrl={ROUTES.SPEND_CONFIRMATION}
                signInForceRedirectUrl={ROUTES.SPEND_CONFIRMATION}
                unsafeMetadata={{ role: "customer" }}
              >
                <Button variant="landing">
                  <LogIn className="h-4 w-4" />
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const parsedAmount = parseFloat(amount);
  const isValid =
    selectedBusiness && amount && !isNaN(parsedAmount) && parsedAmount > 0;

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.CUSTOMER} />
      <div className="mx-auto w-full max-w-screen-sm">
        {/* Header */}
        <section className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Confirm In-Store Spend
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Record your purchase at a local business to track rewards.
          </p>
        </section>

        <Card>
          <CardContent className="flex flex-col gap-5 p-5">
            {/* Select Business */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="business-select">Select Business</Label>
              <Select
                value={selectedBusiness}
                onValueChange={setSelectedBusiness}
              >
                <SelectTrigger id="business-select" className="w-full">
                  <SelectValue placeholder="Choose a business" />
                </SelectTrigger>
                <SelectContent>
                  {mockBusinesses.map((biz) => (
                    <SelectItem key={biz.id} value={biz.id}>
                      {biz.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Spend Amount */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="spend-amount">Spend Amount (R)</Label>
              <Input
                id="spend-amount"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="e.g. 150.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Apply Reward */}
            {applicableRewards.length > 0 && (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="reward-select"
                  className="flex items-center gap-1.5"
                >
                  <Gift className="h-4 w-4 text-primary" />
                  Apply a Reward (optional)
                </Label>
                <Select
                  value={selectedRewardId}
                  onValueChange={setSelectedRewardId}
                >
                  <SelectTrigger id="reward-select">
                    <SelectValue placeholder="No reward selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No reward</SelectItem>
                    {applicableRewards.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.title} ({r.amount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Bulk Purchase */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="bulk-purchase"
                checked={isBulk}
                onCheckedChange={(checked) => setIsBulk(checked === true)}
              />
              <Label
                htmlFor="bulk-purchase"
                className="cursor-pointer text-sm font-normal"
              >
                Bulk purchase (if applicable)
              </Label>
            </div>

            <Separator />

            {/* Receipt Upload */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="receipt-upload">Upload Receipt (optional)</Label>
              <label
                htmlFor="receipt-upload"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <Upload className="h-4 w-4 shrink-0" />
                {receiptFile ? (
                  <span className="truncate text-foreground">
                    {receiptFile.name}
                  </span>
                ) : (
                  <span>Tap to attach a receipt photo</span>
                )}
              </label>
              <input
                id="receipt-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </div>

            <Separator />

            {/* Submit */}
            <Button
              variant="landing"
              size="xl"
              className="w-full gap-2"
              disabled={!isValid || isSubmitting}
              onClick={handleSubmit}
            >
              <Receipt className="h-5 w-5" />
              {isSubmitting ? "Submitting…" : "Submit Purchase"}
            </Button>
          </CardContent>
        </Card>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Your spend will be verified by the business to unlock rewards.
        </p>
      </div>
    </main>
  );
};

export default SpendConfirmation;
