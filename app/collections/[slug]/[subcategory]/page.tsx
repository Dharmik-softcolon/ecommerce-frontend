// frontend/app/collections/[slug]/[subcategory]/page.tsx
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
import { images } from '@/lib/images';

interface SubcategoryPageProps {
    params: { slug: string; subcategory: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const subcategoryNames: Record<string, string> = {
    // Men's subcategories
    shirts: 'Shirts',
    trousers: 'Trousers',
    suits: 'Suits',
    jackets: 'Jackets',
    // Women's subcategories
    dresses: 'Dresses',
    tops: 'Tops',
    bottoms: 'Bottoms',
    ethnic: 'Ethnic Wear',
    // Accessories subcategories
    bags: 'Bags',
    belts: 'Belts',
    watches: 'Watches',
    sunglasses: 'Sunglasses',
    wallets: 'Wallets',
    // Footwear subcategories
    sneakers: 'Sneakers',
    formal: 'Formal Shoes',
    casual: 'Casual Shoes',
    sandals: 'Sandals',
    boots: 'Boots',
    // Shared
    accessories: 'Accessories',
};

const categoryNames: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    accessories: 'Accessories',
    footwear: 'Footwear',
};

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
    const categoryName = categoryNames[params.slug] || params.slug;
    const subcategoryName = subcategoryNames[params.subcategory] || params.subcategory;
    
    return {
        title: `${subcategoryName} - ${categoryName} | LUXE`,
        description: `Shop ${categoryName}'s ${subcategoryName} collection at LUXE. Premium quality clothing with exceptional craftsmanship.`,
    };
}

export default async function SubcategoryPage({ params, searchParams }: SubcategoryPageProps) {
    const categoryName = categoryNames[params.slug] || params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
    const subcategoryName = subcategoryNames[params.subcategory] || params.subcategory.charAt(0).toUpperCase() + params.subcategory.slice(1);

    const filters = {
        category: params.slug,
        subcategory: params.subcategory,
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
        // Use empty array if API fails
        products = [];
    }

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: categoryName, href: `/collections/${params.slug}` },
        { label: subcategoryName, href: `/collections/${params.slug}/${params.subcategory}` },
    ];

    // Get a relevant image for the category
    const categoryImageMap: Record<string, string> = {
        men: images.categories[0].image,
        women: images.categories[1].image,
        accessories: images.categories[2].image,
        footwear: images.categories[3].image,
    };
    const heroImage = categoryImageMap[params.slug] || images.placeholder.category;

    return (
        <main className="pb-16 bg-background">
            {/* Hero Banner */}
            <section
                className="relative h-[30vh] sm:h-[35vh] lg:h-[40vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Simple Dark Overlay */}
                <div className="absolute inset-0 bg-black/45" />
                
                {/* Content */}
                <div className="relative text-center text-white px-4">
                    <span className="inline-block text-amber-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2 sm:mb-3">
                        {categoryName}
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        {subcategoryName}
                    </h1>
                </div>
            </section>

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
                                    ? `Showing ${products.length} of ${pagination.total} products`
                                    : 'No products found'}
                            </p>
                            <ProductSort />
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
                                <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                                <p className="text-muted-foreground mb-6">
                                    We couldn't find any products in this category. Try browsing our other collections.
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
