import EmptyState from "@/components/feedback/EmptyState";
import type { Transaction } from "@/lib/types";
import { ShoppingBag } from "lucide-react";

interface IRecentActivityProps {
  recentTransactions: Transaction[];
}

const RecentActivity = ({ recentTransactions }: IRecentActivityProps) => {
  return (
    <section className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
        <ShoppingBag className="h-4 w-4" />
        Recent Activity
      </h3>

      {recentTransactions.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No activity yet"
          description="Transactions from your customers will appear here."
        />
      ) : (
        <ul className="divide-y divide-border">
          {recentTransactions.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {tx.customerName}
                </p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {tx.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentActivity;
