import type { Business } from "@/app/screens/Customer";
import { BadgeCheck, MapPin } from "lucide-react";

interface IMockHuaweiMapProps {
  businesses: Business[];
}
const MockHuaweiMap = ({ businesses }: IMockHuaweiMapProps) => {
  // Map boundaries for placing pins (mock viewport roughly around Johannesburg)
  const mapBounds = {
    latMin: -26.25,
    latMax: -26.15,
    lngMin: 28.0,
    lngMax: 28.12,
  };

  const toPercent = (lat: number, lng: number) => ({
    x: ((lng - mapBounds.lngMin) / (mapBounds.lngMax - mapBounds.lngMin)) * 100,
    y: ((lat - mapBounds.latMin) / (mapBounds.latMax - mapBounds.latMin)) * 100,
  });

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-muted/30">
      {/* Mock map background */}
      <div className="relative h-100 w-full bg-[hsl(var(--muted))]">
        {/* Grid lines to simulate map */}
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal grid lines */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={`h-${y}`}
              x1="0"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
          {/* Vertical grid lines */}
          {[20, 40, 60, 80].map((x) => (
            <line
              key={`v-${x}`}
              x1={`${x}%`}
              y1="0"
              x2={`${x}%`}
              y2="100%"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
          {/* Mock roads */}
          <line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="hsl(var(--foreground) / 0.15)"
            strokeWidth="3"
          />
          <line
            x1="50%"
            y1="10%"
            x2="50%"
            y2="90%"
            stroke="hsl(var(--foreground) / 0.15)"
            strokeWidth="3"
          />
          <line
            x1="20%"
            y1="20%"
            x2="80%"
            y2="80%"
            stroke="hsl(var(--foreground) / 0.08)"
            strokeWidth="2"
          />
        </svg>

        {/* Business pins */}
        {businesses.map((biz) => {
          const pos = toPercent(biz.latitude, biz.longitude);
          // Clamp within visible area
          const cx = Math.max(8, Math.min(92, pos.x));
          const cy = Math.max(8, Math.min(92, pos.y));

          return (
            <div
              key={biz.id}
              className="group absolute z-10 -translate-x-1/2 -translate-y-full cursor-pointer"
              style={{ left: `${cx}%`, top: `${cy}%` }}
            >
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1">
                  {biz.name}
                  {biz.isVerified && (
                    <BadgeCheck className="h-3 w-3 text-primary" />
                  )}
                </span>
              </div>
              {/* Pin */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg ring-2 ring-background transition-transform group-hover:scale-110">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              {/* Pin tail */}
              <div className="mx-auto h-2 w-0.5 bg-primary" />
            </div>
          );
        })}

        {/* Huawei Map Kit branding mock */}
        <div className="absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
          Powered by Huawei Map Kit
        </div>

        {/* Zoom controls mock */}
        <div className="absolute right-3 top-3 flex flex-col gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-background/80 text-sm font-bold text-foreground shadow-sm backdrop-blur-sm">
            +
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-background/80 text-sm font-bold text-foreground shadow-sm backdrop-blur-sm">
            −
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockHuaweiMap;
