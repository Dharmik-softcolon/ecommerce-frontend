// frontend/app/products/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductTabs } from '@/components/product/product-tabs';
import { RelatedProducts } from '@/components/product/related-products';
import { RecentlyViewed } from '@/components/product/recently-viewed';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';

interface ProductPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    try {
        const product = await api.getProduct(params.slug);
        return {
            title: `${product.name} | LUXE`,
            description: product.shortDescription,
            openGraph: {
                title: product.name,
                description: product.shortDescription,
                images: [product.images[0]?.url || '/images/og-default.jpg'],
            },
        };
    } catch {
        return {
            title: 'Product Not Found | LUXE',
        };
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    let product;

    try {
        product = await api.getProduct(params.slug);
    } catch {
        notFound();
    }

    const categoryId = product.categoryId || product.category?.id || '';
    const categorySlug = product.category?.slug;
    const currentProductId = product.id || product._id || '';

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: product.category?.name || 'Products', href: `/collections/${categorySlug || 'all'}` },
        { label: product.name, href: `/products/${product.slug}` },
    ];

    return (
        <main className="pb-16">
            <div className="container-custom py-4">
                <Breadcrumbs items={breadcrumbs} />
            </div>

            {/* Product Section */}
            <section className="container-custom">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Gallery */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Info */}
                    <ProductInfo product={product} />
                </div>
            </section>

            {/* Product Details Tabs */}
            <section className="container-custom mt-16">
                <ProductTabs product={product} />
            </section>

            {/* Related Products */}
            <section className="container-custom mt-16">
                <Suspense fallback={<RelatedProductsSkeleton />}>
                    <RelatedProducts
                        categoryId={categoryId}
                        categorySlug={categorySlug}
                        currentProductId={currentProductId}
                    />
                </Suspense>
            </section>

            {/* Recently Viewed */}
            <section className="container-custom mt-16">
                <RecentlyViewed currentProductId={currentProductId} />
            </section>
        </main>
    );
}

function RelatedProductsSkeleton() {
    return (
        <div>
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-[3/4]" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
