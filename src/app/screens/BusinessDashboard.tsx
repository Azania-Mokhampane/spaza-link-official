import TraderDashboard from "@/components/business/trader-dashboard/TraderDashboard";
import DashboardSkeleton from "@/components/feedback/DashboardSkeleton";
import BackButton from "@/components/navigation/BackButton";
import { ROUTES } from "@/routes";

const BusinessDashboard = () => {
  // we can set this to true to test loading
  const loading = false;
  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.HOME} />
      <div className="mx-auto w-full max-w-screen-sm">
        {loading ? <DashboardSkeleton /> : <TraderDashboard />}
      </div>
    </main>
  );
};

export default BusinessDashboard;
