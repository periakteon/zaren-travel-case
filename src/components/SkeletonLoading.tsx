import { Skeleton } from "./ui/skeleton";

export default function SkeletonLoading() {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-slate-950 rounded-lg shadow-lg p-4">
      <div className="flex flex-row justify-start mb-4">
        <div className="w-full">
          <Skeleton className="w-full rounded-lg h-72" />
        </div>

        <div className="flex flex-col ml-4 w-full">
          <Skeleton className="h-6 w-1/2 mb-2" />

          <div className="mb-2">
            <Skeleton className="h-4 w-12" />
          </div>

          <Skeleton className="h-4 w-3/4 mb-2" />

          <div className="flex flex-wrap">
            <Skeleton className="h-4 w-24 mr-2 mb-2" />
            <Skeleton className="h-4 w-24 mr-2 mb-2" />
            <Skeleton className="h-4 w-24 mr-2 mb-2" />
          </div>

          <div className="flex flex-wrap">
            <Skeleton className="h-4 w-24 mr-2 mb-2" />
            <Skeleton className="h-4 w-24 mr-2 mb-2" />
            <Skeleton className="h-4 w-24 mr-2 mb-2" />
          </div>
        </div>

        <div className="text-gray-700 mb-2 text-right w-full">
          <div className="text-3xl dark:text-primary">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="w-full dark:text-muted-foreground">
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      <div className="text-gray-700 dark:text-primary">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="text-end mt-4">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
