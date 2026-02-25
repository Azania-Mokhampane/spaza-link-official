import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet as WalletIcon,
  Smartphone,
  Gift,
  Clock,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  getRewards,
  type RewardItem,
  getCustomerTransactions,
  getRewardInsights,
  type CustomerTransaction,
  getBudgets,
  getBudgetInsight,
  getSpazaBalance,
  updateBudgetLimit,
} from "@/lib/rewardsStore";
import { useAuthContext } from "../auth/useAuthContext";
import BackButton from "@/components/navigation/BackButton";

const statusStyles: Record<RewardItem["status"], string> = {
  active: "bg-primary/10 text-primary",
  redeemed: "bg-muted text-muted-foreground",
  expired: "bg-destructive/10 text-destructive",
};

const Wallet = () => {
  const { isSignedIn } = useAuthContext();
  const navigate = useNavigate();
  const [budgetList, setBudgetList] = useState(getBudgets);

  if (!isSignedIn) {
    return (
      <main className="flex flex-1 flex-col bg-background px-4 py-6">
        <BackButton fallback="/customer" />
        <div className="mx-auto w-full max-w-screen-sm">
          <section className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-16 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <LogIn className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Sign in to view your wallet
            </h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your earned rewards, airtime, and vouchers will appear here.
            </p>
            <Button
              variant="landing"
              size="lg"
              className="mt-6 gap-2"
              onClick={() => navigate("/sign-in")}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </section>
        </div>
      </main>
    );
  }

  const rewards = getRewards();
  const transactions = getCustomerTransactions();
  const budgets = budgetList;
  const spazaBalance = getSpazaBalance();
  const activeRewards = rewards.filter((r) => r.status === "active");
  const pastRewards = rewards.filter((r) => r.status !== "active");
  const totalAirtime = rewards
    .filter((r) => r.type === "airtime" && r.status === "active")
    .reduce((sum, r) => sum + parseInt(r.amount.replace("R", ""), 10), 0);

  const insight = getRewardInsights(rewards, transactions);
  const budgetInsight = getBudgetInsight(budgets, transactions);

  const handleBudgetChange = (id: string, value: string) => {
    const numeric = Number(value);
    const safeValue =
      Number.isNaN(numeric) || numeric < 0 ? 0 : Math.floor(numeric);
    const updated = updateBudgetLimit(id, safeValue);
    setBudgetList(updated);
  };

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback="/customer" />
      <div className="mx-auto w-full max-w-screen-sm">
        {/* Header */}
        <section className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            My Wallet
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Your earned rewards and vouchers.
          </p>
        </section>

        {/* Balance Card */}
        <Card className="mb-5 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <WalletIcon className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Airtime balance</p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  R{totalAirtime}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-primary/30 bg-background px-3 py-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Spaza savings balance
                </p>
                <p className="text-lg font-semibold text-foreground">
                  R{spazaBalance}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => navigate("/customer/pay")}
              >
                Pay at store
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight */}
        {transactions.length > 0 && (
          <section className="mb-5">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  AI insight
                </p>
                <h2 className="mt-1 text-sm font-bold text-foreground">
                  {insight.title}
                </h2>
                {insight.summary && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {insight.summary}
                  </p>
                )}
                <p className="mt-2 text-sm font-medium text-foreground">
                  {insight.suggestion}
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Budget Insight */}
        <section className="mb-5">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Budget coach
              </p>
              <h2 className="mt-1 text-sm font-bold text-foreground">
                {budgetInsight.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {budgetInsight.summary}
              </p>
              {budgetInsight.warning && (
                <p className="mt-2 text-sm font-medium text-destructive">
                  {budgetInsight.warning}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mb-5">
          <Card>
            <CardContent className="space-y-3 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Budget plan
              </p>
              <p className="text-xs text-muted-foreground">
                Adjust how much you want to set aside for each category this
                month.
              </p>
              <div className="space-y-3">
                {budgetList.map((budget) => (
                  <div key={budget.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {budget.label}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">R</span>
                      <Input
                        type="number"
                        min={0}
                        className="h-8 w-24 text-right text-sm"
                        value={budget.limit}
                        onChange={(e) =>
                          handleBudgetChange(budget.id, e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Active Rewards */}
        {activeRewards.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Active Rewards
            </h2>
            <div className="flex flex-col gap-3">
              {activeRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  onUse={() => navigate(`/customer/redeem/${reward.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past Rewards */}
        {pastRewards.length > 0 && (
          <section>
            <Separator className="mb-4" />
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Reward history
            </h2>
            <div className="flex flex-col gap-3">
              {pastRewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
            </div>
          </section>
        )}

        {/* Spend History */}
        {transactions.length > 0 && (
          <section className="mt-6">
            <Separator className="mb-4" />
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Spend history
            </h2>
            <div className="flex flex-col gap-3">
              {transactions.map((tx) => (
                <TransactionCard key={tx.id} transaction={tx} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {rewards.length === 0 && (
          <section className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-16 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Gift className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              No rewards yet
            </h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Shop at local businesses and earn rewards that appear here.
            </p>
            <Button
              variant="landing"
              size="lg"
              className="mt-6"
              onClick={() => navigate("/customer")}
            >
              Explore Businesses
            </Button>
          </section>
        )}
      </div>
    </main>
  );
};

const RewardCard = ({
  reward,
  onUse,
}: {
  reward: RewardItem;
  onUse?: () => void;
}) => (
  <Card>
    <CardContent className="flex items-center gap-3 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
        {reward.type === "airtime" ? (
          <Smartphone className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Gift className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {reward.title}
          </h3>
          <Badge
            className={`shrink-0 px-1.5 py-0 text-[10px] ${statusStyles[reward.status]}`}
          >
            {reward.status}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{reward.source}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-sm font-bold text-foreground">
          {reward.amount}
        </span>
        {reward.status === "active" && onUse ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2.5 text-xs"
            onClick={onUse}
          >
            Use Reward
          </Button>
        ) : (
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {reward.date}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

const TransactionCard = ({
  transaction,
}: {
  transaction: CustomerTransaction;
}) => (
  <Card>
    <CardContent className="flex items-center justify-between gap-3 p-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {transaction.businessName}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {transaction.date}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-bold text-foreground">
          {transaction.amount}
        </span>
        {transaction.rewardChange && (
          <span className="text-[10px] font-medium text-primary">
            {transaction.rewardChange}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

export default Wallet;
