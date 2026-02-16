import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface INavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  currentPath: string;
  exact?: boolean;
}

const NavLink = ({
  to,
  icon: Icon,
  label,
  currentPath,
  exact,
}: INavLinkProps) => {
  const isActive = exact ? currentPath === to : currentPath.startsWith(to);

  return (
    <Link
      to={to}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
};

export default NavLink;
