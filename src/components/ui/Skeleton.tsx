import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded bg-gray-200", className)}
      {...props}
    />
  );
}

export function ArtworkCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="p-6 md:p-8">
        <Skeleton className="h-7 w-3/4" />
      </div>
    </div>
  );
}

export function ArtworkGridSkeleton({ columns = 3 }: { columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-6 md:gap-8 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {Array.from({ length: columns === 3 ? 6 : 4 }).map((_, i) => (
        <ArtworkCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PortfolioCardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full aspect-square rounded-none" />
      <div className="mt-4">
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export function PortfolioGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <PortfolioCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section
      className="relative w-full overflow-hidden bg-gray-100"
      style={{ height: "calc(100vh - 81px)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-none bg-gray-200" />
      </div>
    </section>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-col justify-center space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-20 mt-2" />
      </div>
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="space-y-16">
      {Array.from({ length: 3 }).map((_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArtworkDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 md:pt-12 pb-20 md:pb-28">
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <Skeleton className="aspect-[4/5] w-full rounded-none" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-px w-full bg-gray-200 my-6" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-px w-full bg-gray-200 my-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-12 w-48 mt-6 rounded-none" />
        </div>
      </div>
    </div>
  );
}
