import {
  MapPin,
  Eye,
  Users,
  TrendingUp,
  CheckCircle2,
  Store,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/lib/types";
import { useAuthContext } from "@/app/auth/useAuthContext";
import TraderInsights from "./TraderInsights";
import RewardsProgram from "./RewardsProgram";
import RecentActivity from "./RecentActivity";

/** Mock data representing a verified, active business */
const business = {
  name: "Mama Thandi's Spaza",
  category: "Spaza Shop",
  location: "Soweto, Gauteng",
  cipcStatus: "registered" as const,
};

const stats = {
  views: 124,
  customers: 18,
};

// Set to [] to preview empty state
const recentTransactions: Transaction[] = [
  { id: "1", customerName: "Sipho M.", amount: "R45.00", date: "Today" },
  { id: "2", customerName: "Naledi K.", amount: "R120.00", date: "Yesterday" },
  { id: "3", customerName: "Bongani D.", amount: "R32.50", date: "Yesterday" },
];

const insights = {
  customersThisWeek: 18,
  bulkBuyers: 4,
  rewardsIssued: 7,
};

const TraderDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}.
        </p>
      </section>

      {/* Business Profile Card */}
      <section className="rounded-xl border border-border bg-card p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {business.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {business.category}
              </p>
            </div>
          </div>
          <Badge className="shrink-0 gap-1 border-primary/30 bg-primary/10 text-primary">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </Badge>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {business.location}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            Views this week
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {stats.views}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Customers
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {stats.customers}
          </p>
        </div>
      </section>

      {/* Visibility Status */}
      <section className="rounded-xl border border-border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4" />
          Visibility
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Platform listing</span>
            <Badge className="border-primary/30 bg-primary/10 text-primary text-xs">
              Live
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">CIPC registration</span>
            <Badge className="border-primary/30 bg-primary/10 text-primary text-xs">
              Registered
            </Badge>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <RecentActivity recentTransactions={recentTransactions} />

      <RewardsProgram />

      <TraderInsights insights={insights} />

      {/* <QuickActions /> */}
    </div>
  );
};

export default TraderDashboard;
