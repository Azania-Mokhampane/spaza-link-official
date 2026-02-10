import { Button } from "@/components/ui/button";
import { ShoppingBag, Store } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const PublicEntryScreen = () => {
  document.title = "Spaza Link";

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-6 ">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* Logo / Brand */}
        <div className="">
          <img
            src={logo}
            alt="Spaza Link"
            className="mx-auto mb-3 h-30 w-30 object-contain"
          />
        </div>

        {/* Headline */}
        <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-foreground">
          Buy Local. Get Rewarded.
        </h1>

        {/* Sub-headline */}
        <p className="mb-2 text-base leading-relaxed text-muted-foreground">
          Discover trusted local spaza shops and businesses near you and earn
          rewards for supporting your community.
        </p>

        {/* Tertiary line */}
        <p className="mb-10 text-sm text-muted-foreground/70">
          Helping informal businesses become visible and formal.
        </p>

        {/* CTA Buttons */}
        <div className="flex w-full flex-col gap-3">
          <Link to="/customer">
            <Button variant="landing" size="xl" className="w-full">
              <ShoppingBag className="h-5 w-5" />
              Continue as Customer
            </Button>
          </Link>

          <Link to="/trader">
            <Button variant="landingOutline" size="xl" className="w-full">
              <Store className="h-5 w-5" />
              Continue as Business
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicEntryScreen;
