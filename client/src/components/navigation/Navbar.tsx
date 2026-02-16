import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Receipt,
  Store,
  UserCircle,
  Wallet,
  WifiOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import NavLink from "./NavLink";
import { useAuthContext } from "@/app/auth/useAuthContext";
import { ClerkLoaded, useAuth } from "@clerk/clerk-react";
import { ROUTES } from "@/routes";

const Navbar = () => {
  const { isSignedIn, user } = useAuthContext();
  const { signOut } = useAuth();
  const location = useLocation();

  const isCustomerPath = location.pathname.startsWith(ROUTES.CUSTOMER);
  const isTraderPath = location.pathname.startsWith(ROUTES.BUSINESS);

  const isCustomer = user?.role === "customer";
  const isTrader = user?.role === "trader";

  const showCustomerLinks =
    isSignedIn && (isCustomerPath || (!isTraderPath && isCustomer));
  const showTraderLinks =
    isSignedIn && (isTraderPath || (!isCustomerPath && isTrader));

  const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : "U";

  const displayName = user?.email?.split("@")[0] || "User";
  const roleLabel = user?.role === "trader" ? "Business Owner" : "Customer";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <img
            src={logo}
            alt="Spaza Link"
            className="h-8 w-8 rounded-lg object-contain"
          />
          <span className="text-base font-bold tracking-tight text-foreground">
            Spaza Link
          </span>
        </Link>

        {showCustomerLinks && (
          <nav
            className="ml-8 hidden items-center gap-1 sm:flex"
            aria-label="Customer navigation"
          >
            <NavLink
              to={ROUTES.CUSTOMER}
              icon={Store}
              label="Discover"
              currentPath={location.pathname}
              exact
            />
            <NavLink
              to={ROUTES.SPEND_CONFIRMATION}
              icon={Receipt}
              label="Spend"
              currentPath={location.pathname}
            />
            <NavLink
              to={ROUTES.WALLET}
              icon={Wallet}
              label="Wallet"
              currentPath={location.pathname}
            />
          </nav>
        )}

        {showTraderLinks && (
          <nav
            className="ml-8 hidden items-center gap-1 sm:flex"
            aria-label="Trader navigation"
          >
            <NavLink
              to={ROUTES.BUSINESS_DASHBOARD}
              icon={LayoutDashboard}
              label="Dashboard"
              currentPath={location.pathname}
            />
            <NavLink
              to={ROUTES.BUSINESS_REGISTRATION}
              icon={ClipboardList}
              label="Register"
              currentPath={location.pathname}
            />
            <NavLink
              to={ROUTES.BUSINESS_STATUS}
              icon={UserCircle}
              label="Status"
              currentPath={location.pathname}
            />
          </nav>
        )}

        {isSignedIn && (
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 z-50 bg-card border border-border shadow-lg"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-foreground">
                      {displayName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                    {user?.phoneNumber && (
                      <p className="text-xs text-muted-foreground">
                        {user.phoneNumber}
                      </p>
                    )}
                    <p className="text-[11px] text-muted-foreground/70">
                      {roleLabel}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ClerkLoaded>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </ClerkLoaded>
                {!navigator.onLine && isSignedIn && (
                  <DropdownMenuItem disabled className="gap-2 ">
                    <WifiOff className="h-4 w-4" />
                    Offline
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
