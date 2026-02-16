import { useNavigate, useParams } from "react-router-dom";
import BackButton from "@/components/navigation/BackButton";
import { BadgeCheck, Gift, MapPin, ShoppingBag, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockBusinesses } from "@/data";
import { ROUTES } from "@/routes";

const areaFromCoords = (lat: number) => {
  if (lat < -26.21) return "Soweto South";
  if (lat < -26.2) return "Soweto Central";
  return "Soweto North";
};

const BusinessProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const business = mockBusinesses.find((b) => b.id === id);

  if (!business) {
    return (
      <main className="flex flex-1 flex-col bg-background px-4 py-6">
        <BackButton fallback={ROUTES.CUSTOMER} />
        <div className="mx-auto w-full max-w-screen-sm">
          <section className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-16 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Store className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Business not found
            </h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              This business may no longer be listed.
            </p>
          </section>
        </div>
      </main>
    );
  }
  // use latitude later depending on how we are going we are going to setup locations
  const area = areaFromCoords(business.latitude);

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.CUSTOMER} />
      <div className="mx-auto w-full max-w-screen-sm">
        {/* Header */}
        <section className="mb-6 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted">
            <Store className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                {business.name}
              </h1>
              {business.isVerified && (
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              )}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {business.category}
            </p>
          </div>
        </section>

        {/* Details Card */}
        <Card className="mb-4">
          <CardContent className="flex flex-col gap-3 p-4">
            {/* Location */}
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm text-foreground">{area}</span>
            </div>

            {/* Verified status */}
            {business.isVerified && (
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  Verified business
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rewards Section */}
        {business.hasRewards && (
          <Card className="mb-4 border-primary/20 bg-primary/5">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-foreground">
                    Reward Available
                  </h3>
                  <Badge
                    variant="secondary"
                    className="px-1.5 py-0 text-[10px]"
                  >
                    In-store
                  </Badge>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {business.rewardDescription ||
                    "Visit in-store for exclusive rewards."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Separator className="my-4" />

        {/* CTA */}
        <Button
          variant="landing"
          size="xl"
          className="w-full gap-2"
          onClick={() => navigate(ROUTES.SPEND_CONFIRMATION)}
        >
          <ShoppingBag className="h-5 w-5" />
          Shop Here (In-Store)
        </Button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Visit this business in person to shop and earn rewards.
        </p>
      </div>
    </main>
  );
};

export default BusinessProfile;
