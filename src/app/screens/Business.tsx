import EmptyState from "@/components/feedback/EmptyState";
import { Briefcase } from "lucide-react";

const Business = () => {
  document.title = "Your Business · Spaza Link";

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <div className="mx-auto w-full max-w-screen-sm">
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Your Business on Spaza Link
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Manage your business profile, rewards, and visibility in your
            community.
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            Registration and business tools will appear here.
          </p>
        </section>

        {/* Empty State */}
        <EmptyState
          icon={Briefcase}
          title="Business tools will be available once you register your business."
          description="Spaza Link helps local businesses become visible and trusted."
        />
      </div>
    </main>
  );
};

export default Business;
