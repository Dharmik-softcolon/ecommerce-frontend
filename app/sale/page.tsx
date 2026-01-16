// frontend/app/sale/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductFilters } from '@/components/product/product-filters';
import { ProductSort } from '@/components/product/product-sort';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Pagination } from '@/components/common/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { images } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Sale | LUXE',
    description: 'Shop exclusive discounts on premium clothing. Limited time offers on your favorite styles.',
};

interface SalePageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SalePage({ searchParams }: SalePageProps) {
    const filters = {
        onSale: true,
        sizes: searchParams.sizes ? (Array.isArray(searchParams.sizes) ? searchParams.sizes : [searchParams.sizes]) : undefined,
        colors: searchParams.colors ? (Array.isArray(searchParams.colors) ? searchParams.colors : [searchParams.colors]) : undefined,
        priceMin: searchParams.priceMin ? Number(searchParams.priceMin) : undefined,
        priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
        sort: searchParams.sort as any,
        page: searchParams.page ? Number(searchParams.page) : 1,
        limit: 12,
    };

    let products: any[] = [];
    let pagination = { page: 1, limit: 12, total: 0, totalPages: 1 };

    try {
        const result = await api.getProducts(filters);
        products = result.data;
        pagination = result.pagination;
    } catch (error) {
        // Use featured products as fallback
        products = images.featuredProducts.filter(p => p.compareAtPrice > p.price).map((p, index) => ({
            id: p.id,
            name: p.name,
            slug: `product-${p.id}`,
            price: p.price,
            compareAtPrice: p.compareAtPrice,
            images: [{ url: p.image }],
            category: { name: p.category },
        }));
    }

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Sale', href: '/sale' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Banner */}
            <div
                className="relative h-[35vh] md:h-[45vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${images.collections.bestsellers})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-black/60" />
                <div className="relative text-center text-white">
                    <span className="inline-block bg-red-600 text-white px-4 py-1 text-sm font-semibold uppercase tracking-wider rounded-full mb-4">
                        Limited Time
                    </span>
                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                        SALE
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto px-4">
                        Up to 50% off on selected items
                    </p>
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
                                {products.length > 0
                                    ? `Showing ${products.length} of ${pagination.total} sale items`
                                    : 'No sale items available'}
                            </p>
                            <ProductSort />
                        </div>

                        {/* Sale Banner */}
                        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-6">
                            <p className="text-red-700 dark:text-red-400 text-sm">
                                🔥 <strong>Flash Sale!</strong> Use code <span className="font-mono bg-red-100 dark:bg-red-900/50 px-2 py-0.5 rounded">SALE50</span> for an extra 10% off on all sale items.
                            </p>
                        </div>

                        {/* Grid */}
                        {products.length > 0 ? (
                            <>
                                <Suspense fallback={<ProductGridSkeleton />}>
                                    <ProductGrid products={products} />
                                </Suspense>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <Pagination pagination={pagination} />
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-semibold mb-2">No Sale Items</h3>
                                <p className="text-muted-foreground mb-6">
                                    Check back soon for exclusive deals and discounts!
                                </p>
                            </div>
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
