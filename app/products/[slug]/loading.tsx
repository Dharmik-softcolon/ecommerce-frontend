// frontend/app/products/[slug]/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductLoading() {
    return (
        <main className="pb-16">
            <div className="container-custom py-4">
                {/* Breadcrumb Skeleton */}
                <div className="flex gap-2 mb-6">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            <section className="container-custom">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Gallery Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="aspect-square rounded-xl" />
                        <div className="flex gap-3">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                            ))}
                        </div>
                    </div>

                    {/* Info Skeleton */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-3/4" />
                        </div>

                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-6 w-16" />
                        </div>

                        <Skeleton className="h-4 w-32" />

                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-5 w-16" />
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-10 w-14 rounded" />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-5 w-16" />
                            <div className="flex gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-10 w-10 rounded-full" />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Skeleton className="h-12 flex-1" />
                            <Skeleton className="h-12 w-12" />
                        </div>

                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </section>

            {/* Related Products Skeleton */}
            <section className="container-custom mt-16">
                <Skeleton className="h-8 w-48 mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[3/4] rounded-lg" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
