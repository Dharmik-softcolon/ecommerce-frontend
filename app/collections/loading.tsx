// frontend/app/collections/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionsLoading() {
    return (
        <main className="pb-16">
            {/* Hero Skeleton */}
            <div className="h-[35vh] bg-muted animate-pulse" />

            <div className="container-custom py-8">
                {/* Breadcrumb Skeleton */}
                <div className="flex gap-2 mb-8">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                </div>

                {/* Collections Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[4/5] rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
