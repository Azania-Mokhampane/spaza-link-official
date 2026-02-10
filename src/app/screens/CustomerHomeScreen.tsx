import BusinessCard from "@/components/business/BusinessCard";
import BusinessCardLoading from "@/components/business/BusinessCardLoading";
import MockHuaweiMap from "@/components/business/MockHuaweiMap";
import EmptyState from "@/components/feedback/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Store, Map } from "lucide-react";

export type Business = {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  hasRewards: boolean;
};

const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Mama Thandi's Spaza",
    category: "Groceries & Essentials",
    latitude: -26.2041,
    longitude: 28.0473,
    isVerified: true,
    hasRewards: true,
  },
  {
    id: "2",
    name: "Bongani Fresh Produce",
    category: "Fresh Fruit & Vegetables",
    latitude: -26.1952,
    longitude: 28.0345,
    isVerified: true,
    hasRewards: false,
  },
  {
    id: "3",
    name: "Siya's Corner Shop",
    category: "Snacks & Beverages",
    latitude: -26.2123,
    longitude: 28.0612,
    isVerified: false,
    hasRewards: true,
  },
  {
    id: "4",
    name: "Nkosi Hardware",
    category: "Hardware & Tools",
    latitude: -26.1879,
    longitude: 28.0789,
    isVerified: true,
    hasRewards: false,
  },
  {
    id: "5",
    name: "Zandi's Braai Spot",
    category: "Prepared Food",
    latitude: -26.22,
    longitude: 28.1001,
    isVerified: false,
    hasRewards: false,
  },
];

const isLoading = false;
const businesses = mockBusinesses;

const CustomerHomeScreen = () => {
  document.title = "Discover Local Businesses · Spaza Link";

  return (
    <main className="flex flex-1 flex-col bg-background  py-6">
      <div className="mx-auto w-full max-w-screen-sm space-y-6">
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Discover Local Businesses
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Browse trusted spaza shops and services near you.
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            Verified local businesses will appear here based on your location.
          </p>
        </section>
        {/* Loading State */}
        {isLoading && <BusinessCardLoading />}

        {/* Empty State */}
        {!isLoading && businesses.length === 0 && (
          <EmptyState
            icon={Store}
            title="No businesses to show yet"
            description="Local spaza shops and services will appear here once available."
          />
        )}

        {/* Business Listings */}
        {!isLoading && businesses.length > 0 && (
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="list" className="flex-1 gap-1.5">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="map" className="flex-1 gap-1.5">
                <Map className="h-4 w-4" />
                Map
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <section className="flex flex-col gap-3">
                {businesses.map((biz) => (
                  <BusinessCard key={biz.id} {...biz} />
                ))}
              </section>
            </TabsContent>

            <TabsContent value="map">
              <MockHuaweiMap businesses={businesses} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </main>
  );
};

export default CustomerHomeScreen;
