import { Skeleton } from "../ui/skeleton";

interface IBusinessCardLoadingProps {
  items?: number;
}

const BusinessCardLoading = ({ items = 4 }: IBusinessCardLoadingProps) => {
  const skeletonItems = Array.from({ length: items });
  return (
    <section className="flex flex-col gap-3">
      {skeletonItems.map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-lg border bg-card p-4"
        >
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default BusinessCardLoading;
