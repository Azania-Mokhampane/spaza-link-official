import { SystemBanners } from "./app/SystemBanners";
import logo from "@/assets/logo.svg";

export function AppShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
          <a href="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Spaza Link"
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="text-base font-bold tracking-tight text-foreground">
              Spaza Link
            </span>
          </a>
        </div>
      </header>

      <SystemBanners />

      <main className=" px-4 py-6">{children}</main>
    </div>
  );
}
