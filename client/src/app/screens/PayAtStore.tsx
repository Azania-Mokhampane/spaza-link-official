import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/navigation/BackButton";
import { ROUTES } from "@/routes";
import { adjustSpazaBalance, getSpazaBalance } from "@/lib/rewardsStore";

const PayAtStore = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState("");
  const [balance, setBalance] = useState(getSpazaBalance());

  const handleGenerate = () => {
    const numeric = Number(amount);
    if (!amount || Number.isNaN(numeric) || numeric <= 0) {
      return;
    }
    if (numeric > balance) {
      return;
    }
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(`${generated}:${numeric}`);
  };

  const handleTopUpDemo = (delta: number) => {
    const next = adjustSpazaBalance(delta);
    setBalance(next);
  };

  const displayCode = code ? code.split(":")[0] : "";

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.WALLET} />
      <div className="mx-auto w-full max-w-screen-sm space-y-6">
        <section>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Pay at store
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Show this code at a registered spaza so they can receive payment
            from your Spaza balance.
          </p>
        </section>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">Spaza balance</p>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                R{balance}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => handleTopUpDemo(50)}
              >
                +R50 demo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => handleTopUpDemo(100)}
              >
                +R100 demo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Enter amount to pay
              </p>
              <Input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 50"
              />
            </div>
            <Button type="button" className="w-full" onClick={handleGenerate}>
              Generate payment code
            </Button>
          </CardContent>
        </Card>

        {code && (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 p-4">
              <p className="text-sm text-muted-foreground">
                Show this QR code or share the number with the trader.
              </p>
              <QRCodeCanvas
                value={code}
                size={180}
                className="rounded-md border border-border bg-card p-3"
              />
              <p className="text-lg font-mono font-semibold tracking-[0.3em] text-foreground">
                {displayCode}
              </p>
              <p className="text-xs text-muted-foreground">
                Amount: R{Number(code.split(":")[1])}
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate(ROUTES.WALLET)}
              >
                Back to wallet
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default PayAtStore;
