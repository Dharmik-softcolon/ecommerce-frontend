// frontend/app/collections/[slug]/page.tsx
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

interface CollectionPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Fallback collection data for when API doesn't have the collection
const fallbackCollections: Record<string, { name: string; description: string; image: string }> = {
    'new-arrivals': {
        name: 'New Arrivals',
        description: 'Discover the latest trends and fresh styles from our newest collection',
        image: images.collections.newArrivals,
    },
    'men': {
        name: 'Men',
        description: 'Premium menswear collection crafted with exceptional quality',
        image: images.categories[0].image,
    },
    'women': {
        name: 'Women',
        description: "Elegant women's fashion designed for the modern woman",
        image: images.categories[1].image,
    },
    'accessories': {
        name: 'Accessories',
        description: 'Complete your look with our curated accessories collection',
        image: images.categories[2].image,
    },
    'summer': {
        name: 'Summer Collection',
        description: 'Light fabrics and bold styles for the sunny season',
        image: images.collections.summer2024,
    },
    'winter': {
        name: 'Winter Collection',
        description: 'Stay warm in style with our winter essentials',
        image: images.collections.winter2024,
    },
    'festive': {
        name: 'Festive Edit',
        description: 'Celebrate in elegance with our festive collection',
        image: images.collections.trending,
    },
    'wedding': {
        name: 'Wedding Collection',
        description: 'For your special day - exquisite attire for every celebration',
        image: images.collections.formal,
    },
    'bestsellers': {
        name: 'Bestsellers',
        description: 'Our most loved styles that customers keep coming back for',
        image: images.collections.bestsellers,
    },
    'trending': {
        name: 'Trending Now',
        description: "What's hot right now - stay ahead of the fashion curve",
        image: images.collections.trending,
    },
    'casual': {
        name: 'Casual Wear',
        description: 'Relaxed styles for everyday comfort and effortless fashion',
        image: images.collections.casual,
    },
    'formal': {
        name: 'Formal Wear',
        description: 'Sophisticated attire for professional and formal occasions',
        image: images.collections.formal,
    },
    'footwear': {
        name: 'Footwear',
        description: 'Step into style with our premium footwear collection',
        image: images.categories[3].image,
    },
    'featured': {
        name: 'Featured Products',
        description: 'Handpicked favorites that define our commitment to quality and style',
        image: images.collections.limitedEdition,
    },
    'premium': {
        name: 'Premium Collection',
        description: 'Discover our exclusive collection of premium clothing, crafted with the finest materials',
        image: images.collections.formal,
    },
    'sale': {
        name: 'Sale',
        description: 'Exclusive savings across our most loved styles and staples',
        image: images.collections.trending,
    },
};

function getCollectionData(slug: string) {
    const fallback = fallbackCollections[slug];
    if (fallback) {
        return {
            id: slug,
            name: fallback.name,
            slug: slug,
            description: fallback.description,
            image: fallback.image,
        };
    }
    // For unknown slugs, create a formatted name from the slug
    const formattedName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    return {
        id: slug,
        name: formattedName,
        slug: slug,
        description: `Explore our ${formattedName.toLowerCase()} collection`,
        image: images.collections.newArrivals,
    };
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
    try {
        const collection = await api.getCollection(params.slug);
        return {
            title: `${collection.name} | LUXE`,
            description: collection.description,
        };
    } catch {
        const fallback = getCollectionData(params.slug);
        return {
            title: `${fallback.name} | LUXE`,
            description: fallback.description,
        };
    }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
    let collection;

    try {
        collection = await api.getCollection(params.slug);
    } catch {
        // Use fallback collection data instead of 404
        collection = getCollectionData(params.slug);
    }

    const filters = {
        collection: params.slug,
        category: ['men', 'women', 'accessories', 'footwear'].includes(params.slug) ? params.slug : undefined,
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
    } catch {
        // Continue with empty products if API fails
        products = [];
    }

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: collection.name, href: `/collections/${collection.slug}` },
    ];

    return (
        <main className="pb-16 bg-background">
            {/* Hero Banner */}
            <section
                className="relative h-[35vh] sm:h-[40vh] lg:h-[45vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${collection.image})` }}
            >
                {/* Simple Dark Overlay */}
                <div className="absolute inset-0 bg-black/45" />
                
                {/* Content */}
                <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
                    <span className="inline-block text-amber-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4">
                        Collection
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                        {collection.name}
                    </h1>
                    {collection.description && (
                        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                            {collection.description}
                        </p>
                    )}
                </div>
            </section>

            <div className="container-custom py-6 sm:py-8">
                <Breadcrumbs items={breadcrumbs} />

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-6 sm:mt-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                            <ProductFilters />
                        </div>
                    </aside>

                    {/* Products */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                            <p className="text-sm text-muted-foreground">
                                {products.length > 0 
                                    ? <>Showing <span className="font-medium text-foreground">{products.length}</span> of <span className="font-medium text-foreground">{pagination.total}</span> products</>
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
                                    <div className="mt-12">
                                        <Pagination pagination={pagination} />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20 px-4">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    We're adding new products to this collection soon. Check back later or explore our other collections.
                                </p>
                                <a 
                                    href="/collections"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                                >
                                    Browse All Collections
                                </a>
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