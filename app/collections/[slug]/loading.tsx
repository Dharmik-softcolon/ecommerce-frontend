// frontend/app/collections/[slug]/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionLoading() {
    return (
        <main className="pb-16">
            {/* Hero Skeleton */}
            <div className="h-[40vh] bg-muted animate-pulse" />

            <div className="container-custom py-8">
                {/* Breadcrumb Skeleton */}
                <div className="flex gap-2 mb-8">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Skeleton */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="space-y-6">
                            <div>
                                <Skeleton className="h-6 w-24 mb-4" />
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Skeleton className="h-6 w-20 mb-4" />
                                <div className="space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Skeleton className="h-6 w-16 mb-4" />
                                <div className="flex gap-2">
                                    {[...Array(6)].map((_, i) => (
                                        <Skeleton key={i} className="h-8 w-8 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid Skeleton */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-10 w-40" />
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="aspect-[3/4] rounded-lg" />
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
