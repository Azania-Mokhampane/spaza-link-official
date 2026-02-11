import { BadgeCheck, Gift, Store } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import type { BusinessType } from "@/lib/types";

type BusinessCardProps = {
  business: BusinessType;
};

const BusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();
  const { id, category, name, hasRewards, isVerified, rewardDescription } =
    business;
  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => navigate(`/customer/business/${id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/customer/business/${id}`)
      }
    >
      <CardContent className="flex flex-col gap-2 p-3 sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted sm:h-12 sm:w-12">
            <Store className="h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
                {name}
              </h3>
              {isVerified && (
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">
              {category}
            </p>
          </div>
          {hasRewards && (
            <Badge
              variant="secondary"
              className="shrink-0 gap-1 px-2 py-0.5 text-xs"
            >
              <Gift className="h-3 w-3" />
              Rewards
            </Badge>
          )}
        </div>
        {hasRewards && rewardDescription && (
          <p className="ml-13 text-xs leading-relaxed text-muted-foreground sm:ml-16">
            {rewardDescription}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
