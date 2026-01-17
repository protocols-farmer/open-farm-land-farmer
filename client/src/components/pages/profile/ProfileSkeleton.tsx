// src/components/pages/profile/ProfileSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="overflow-hidden">
        {/* Banner Skeleton */}
        <Skeleton className="aspect-[3/1] w-full" />
        <CardContent className="p-6 pt-0">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            {/* Avatar Skeleton */}
            <Skeleton className="-mt-16 h-32 w-32 rounded-full border-4 border-background" />
            <Skeleton className="h-10 w-32 mt-4" />
          </div>
          <div className="mt-4 space-y-3">
            {/* Name and Username */}
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            {/* Bio */}
            <Skeleton className="h-4 w-full max-w-2xl mt-4" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <Skeleton className="h-60 w-full rounded-xl" />
      </div>
    </div>
  );
}
