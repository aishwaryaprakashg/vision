export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function AnalysisSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <div className="space-y-3 pt-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
