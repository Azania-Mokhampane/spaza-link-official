import { Button } from "@/components/ui/button";
import { LayoutDashboard, MapPin, ShoppingBag, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useAuthContext } from "../auth/useAuthContext";
import { ROUTES } from "@/routes";

const Home = () => {
  document.title = "Spaza Link";
  const navigate = useNavigate();

  const { isSignedIn, user } = useAuthContext();
  const role = user?.role;
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

        {isSignedIn ? (
          <>
            {/* Personal Greeting */}
            <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-foreground">
              Welcome back 👋
            </h1>

            <p className="mb-10 text-base leading-relaxed text-muted-foreground">
              {role === "trader"
                ? "Manage your business and connect with your community."
                : "Discover trusted local businesses near you and earn rewards."}
            </p>

            {/* Role-aware CTAs */}
            <div className="flex w-full flex-col gap-3">
              {role === "trader" ? (
                <>
                  <Button
                    variant="landing"
                    size="xl"
                    className="w-full"
                    onClick={() => navigate(ROUTES.BUSINESS_DASHBOARD)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Go to your dashboard
                  </Button>
                  <Button
                    variant="landingOutline"
                    size="xl"
                    className="w-full"
                    onClick={() => navigate(ROUTES.CUSTOMER)}
                  >
                    <MapPin className="h-5 w-5" />
                    Explore local businesses
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="landing"
                    size="xl"
                    className="w-full"
                    onClick={() => navigate(ROUTES.CUSTOMER)}
                  >
                    <MapPin className="h-5 w-5" />
                    Explore nearby businesses
                  </Button>
                  <Button
                    variant="landingOutline"
                    size="xl"
                    className="w-full"
                    onClick={() => navigate(ROUTES.BUSINESS)}
                  >
                    <Store className="h-5 w-5" />I run a business
                  </Button>
                </>
              )}
            </div>

            {/* Role hint */}
            <p className="mt-6 text-xs text-muted-foreground/70">
              {role === "trader"
                ? "You're signed in as a business owner."
                : "You're signed in as a customer."}
            </p>
          </>
        ) : (
          <>
            {/* Logged-out state (unchanged) */}
            <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-foreground">
              Buy Local. Get Rewarded.
            </h1>
            <p className="mb-2 text-base leading-relaxed text-muted-foreground">
              Discover trusted local spaza shops and businesses near you and
              earn rewards for supporting your community.
            </p>
            <p className="mb-10 text-sm text-muted-foreground/70">
              Helping informal businesses become visible and formal.
            </p>

            <div className="flex w-full flex-col gap-3">
              <Button
                variant="landing"
                size="xl"
                className="w-full"
                onClick={() => navigate(ROUTES.CUSTOMER)}
              >
                <ShoppingBag className="h-5 w-5" />
                Continue as Customer
              </Button>
              <Button
                variant="landingOutline"
                size="xl"
                className="w-full"
                onClick={() => navigate(ROUTES.BUSINESS)}
              >
                <Store className="h-5 w-5" />
                Continue as Business
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
