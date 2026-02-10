import type { LucideIcon } from "lucide-react";

interface IEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

const EmptyState = ({ icon, title, description }: IEmptyStateProps) => {
  const Icon = icon ?? null;
  return (
    <section className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-16 text-center">
      {Icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Icon className="h-7 w-7 text-muted-foreground" />
        </div>
      )}
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </section>
  );
};

export default EmptyState;
