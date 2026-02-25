import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/navigation/BackButton";
import { ROUTES } from "@/routes";
import { adjustSpazaBalance, getSpazaBalance } from "@/lib/rewardsStore";

const ReceivePayment = () => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [merchantBalance, setMerchantBalance] = useState(0);

  const handleReceive = () => {
    const [rawCode, rawAmount] = codeInput.split(":");
    const numeric = Number(rawAmount);
    if (!rawCode || Number.isNaN(numeric) || numeric <= 0) {
      setStatus("error");
      setMessage("Enter a valid code generated from the customer app.");
      return;
    }

    const customerBalance = getSpazaBalance();
    if (numeric > customerBalance) {
      setStatus("error");
      setMessage("Insufficient customer balance for this payment.");
      return;
    }

    adjustSpazaBalance(-numeric);
    const nextMerchantBalance = merchantBalance + numeric;
    setMerchantBalance(nextMerchantBalance);
    setStatus("success");
    setMessage(`Payment of R${numeric} received into your trader balance.`);
  };

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.BUSINESS_DASHBOARD} />
      <div className="mx-auto w-full max-w-screen-sm space-y-6">
        <section>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Receive payment
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Ask the customer to show their payment code, then enter or scan it
            to receive funds into your trader balance.
          </p>
        </section>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">
                Trader demo balance
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                R{merchantBalance}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Payment code
              </p>
              <Input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="e.g. 123456:50"
              />
            </div>
            <Button type="button" className="w-full" onClick={handleReceive}>
              Confirm payment
            </Button>
            {status === "success" && (
              <p className="text-sm font-medium text-emerald-600">{message}</p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-destructive">{message}</p>
            )}
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full"
              onClick={() => navigate(ROUTES.BUSINESS_DASHBOARD)}
            >
              Back to dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ReceivePayment;
