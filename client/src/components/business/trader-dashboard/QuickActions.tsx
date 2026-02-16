import { MessageSquare, Eye, ChevronRight } from "lucide-react";

const QuickActions = () => {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
      {[
        {
          icon: MessageSquare,
          label: "Customer messages",
          desc: "No new messages",
        },
        {
          icon: Eye,
          label: "Edit business profile",
          desc: "Update your info",
        },
      ].map((action) => (
        <button
          key={action.label}
          className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
            <action.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {action.label}
            </p>
            <p className="text-xs text-muted-foreground">{action.desc}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      ))}
    </section>
  );
};

export default QuickActions;
