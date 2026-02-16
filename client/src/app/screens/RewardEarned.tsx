import { useNavigate } from "react-router-dom";
import { Gift, Wallet, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/navigation/BackButton";
import { ROUTES } from "@/routes";

const RewardEarned = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.CUSTOMER} />
      <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col items-center justify-center">
        {/* Celebration Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <PartyPopper className="h-10 w-10 text-primary" />
        </div>

        {/* Confirmation Message */}
        <h1 className="text-center text-2xl font-extrabold tracking-tight text-foreground">
          Reward Earned! 🎉
        </h1>
        <p className="mt-3 max-w-xs text-center text-base leading-relaxed text-muted-foreground">
          Your purchase has been verified and a reward has been added to your
          wallet.
        </p>

        {/* Reward Detail Card */}
        <Card className="mt-6 w-full border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-foreground">
                R50 Airtime Voucher
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                From Mama Thandi's Spaza
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col gap-3">
          <Button
            variant="landing"
            size="xl"
            className="w-full gap-2"
            onClick={() => navigate(ROUTES.WALLET)}
          >
            <Wallet className="h-5 w-5" />
            View My Wallet
          </Button>
          <Button
            variant="landingOutline"
            size="xl"
            className="w-full"
            onClick={() => navigate(ROUTES.CUSTOMER)}
          >
            Continue Browsing
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RewardEarned;
