import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth/useAuthContext";
import { useEffect } from "react";
import { ROUTES } from "@/routes";
import BackButton from "@/components/navigation/BackButton";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

const Business = () => {
  document.title = "Your Business · Spaza Link";
  const navigate = useNavigate();
  const { isSignedIn } = useAuthContext();

  // Auth Moment 3: Returning trader goes straight to dashboard
  useEffect(() => {
    if (isSignedIn) {
      navigate(ROUTES.BUSINESS_DASHBOARD, { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.HOME} />
      <div className="mx-auto w-full max-w-screen-sm">
        <section className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Your Business on Spaza Link
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Manage your business profile, rewards, and visibility in your
            community.
          </p>
        </section>

        <section className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-16 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Briefcase className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Get your business listed and visible to your community.
          </h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Registration is free and takes less than 2 minutes.
          </p>
          {isSignedIn ? (
            <Button
              variant="landing"
              size="xl"
              className="mt-6 w-full max-w-xs"
              onClick={() => navigate(ROUTES.BUSINESS_REGISTRATION)}
            >
              Register your business
            </Button>
          ) : (
            <SignInButton
              mode="modal"
              forceRedirectUrl={ROUTES.BUSINESS_REGISTRATION}
              signUpForceRedirectUrl={ROUTES.BUSINESS_REGISTRATION}
            >
              <Button
                variant="landing"
                size="xl"
                className="mt-6 w-full max-w-xs"
              >
                Sign In to Register your business
              </Button>
            </SignInButton>
          )}
        </section>
      </div>
    </main>
  );
};

export default Business;
