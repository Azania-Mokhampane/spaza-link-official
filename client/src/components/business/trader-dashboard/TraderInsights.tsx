import { BarChart3, Users, Package, Gift } from "lucide-react";

interface ITraderInsightsProps {
  insights: {
    customersThisWeek: number;
    bulkBuyers: number;
    rewardsIssued: number;
  };
}

const TraderInsights = ({ insights }: ITraderInsightsProps) => {
  return (
    <section className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
        <BarChart3 className="h-4 w-4" />
        Insights
      </h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Customers
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {insights.customersThisWeek}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            Bulk buyers
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {insights.bulkBuyers}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Gift className="h-3.5 w-3.5" />
            Rewards
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {insights.rewardsIssued}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TraderInsights;
