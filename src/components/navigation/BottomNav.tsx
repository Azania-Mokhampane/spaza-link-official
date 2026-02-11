import { useAuthContext } from "@/app/auth/useAuthContext";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes";
import {
  Store,
  Receipt,
  Wallet,
  LayoutDashboard,
  ClipboardList,
  UserCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
};

const customerNav: NavItem[] = [
  { label: "Discover", icon: Store, path: ROUTES.CUSTOMER },
  { label: "Spend", icon: Receipt, path: ROUTES.SPEND_CONFIRMATION },
  { label: "Wallet", icon: Wallet, path: ROUTES.WALLET },
];

const traderNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: ROUTES.BUSINESS_DASHBOARD,
  },
  {
    label: "Register",
    icon: ClipboardList,
    path: ROUTES.BUSINESS_REGISTRATION,
  },
  { label: "Status", icon: UserCircle, path: ROUTES.BUSINESS_STATUS },
];
const BottomNav = () => {
  const { isSignedIn, user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isSignedIn) return null;

  const isCustomerPath = location.pathname.startsWith(ROUTES.CUSTOMER);
  const isTraderPath = location.pathname.startsWith(ROUTES.BUSINESS);
  const isHome = location.pathname === ROUTES.HOME;

  // Determine which nav to show based on current path or role
  let items: NavItem[] = [];
  if (isCustomerPath || (isHome && user?.role === "customer")) {
    items = customerNav;
  } else if (isTraderPath || (isHome && user?.role === "trader")) {
    items = traderNav;
  }

  if (items.length === 0) return null;
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 sm:hidden"
    >
      <div
        className="mx-auto flex h-16 max-w-screen-sm items-stretch"
        role="tablist"
      >
        {items.map((item) => {
          const isActive =
            item.path === ROUTES.CUSTOMER
              ? location.pathname === ROUTES.CUSTOMER
              : location.pathname.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              aria-label={isActive ? `${item.label}, current page` : item.label}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon
                className={cn("h-5 w-5", isActive && "text-primary")}
                aria-hidden="true"
              />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
