// frontend/app/collections/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductFilters } from '@/components/product/product-filters';
import { ProductSort } from '@/components/product/product-sort';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Pagination } from '@/components/common/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';

interface CollectionPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
    try {
        const collection = await api.getCollection(params.slug);
        return {
            title: `${collection.name} | LUXE`,
            description: collection.description,
        };
    } catch {
        return {
            title: 'Collection | LUXE',
        };
    }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
    let collection;

    try {
        collection = await api.getCollection(params.slug);
    } catch {
        notFound();
    }

    const filters = {
        collection: params.slug,
        sizes: searchParams.sizes ? (Array.isArray(searchParams.sizes) ? searchParams.sizes : [searchParams.sizes]) : undefined,
        colors: searchParams.colors ? (Array.isArray(searchParams.colors) ? searchParams.colors : [searchParams.colors]) : undefined,
        priceMin: searchParams.priceMin ? Number(searchParams.priceMin) : undefined,
        priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
        sort: searchParams.sort as any,
        page: searchParams.page ? Number(searchParams.page) : 1,
        limit: 12,
    };

    const { data: products, pagination } = await api.getProducts(filters);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: collection.name, href: `/collections/${collection.slug}` },
    ];

    return (
        <main className="pb-16">
            {/* Hero Banner */}
            <div
                className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${collection.image})` }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative text-center text-white">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        {collection.name}
                    </h1>
                    {collection.description && (
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            {collection.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <ProductFilters />
                    </aside>

                    {/* Products */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-muted-foreground">
                                Showing {products.length} of {pagination.total} products
                            </p>
                            <ProductSort />
                        </div>

                        {/* Grid */}
                        <Suspense fallback={<ProductGridSkeleton />}>
                            <ProductGrid products={products} />
                        </Suspense>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <Pagination pagination={pagination} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4]" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );
}