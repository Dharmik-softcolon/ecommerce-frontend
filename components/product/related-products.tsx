// frontend/components/product/related-products.tsx
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import type { Product } from '@/types';

interface RelatedProductsProps {
    categoryId: string;
    categorySlug?: string;
    currentProductId: string;
}

export async function RelatedProducts({ categoryId, categorySlug, currentProductId }: RelatedProductsProps) {
    try {
        const { data: products } = await api.getProducts({
            category: categorySlug || categoryId,
            limit: 5,
        });
        
        // Filter out current product
        const relatedProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);
        
        if (relatedProducts.length === 0) return null;

        return (
            <section className="py-12 border-t">
                <div className="container-custom">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {relatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Error fetching related products:', error);
        return null;
    }
}

export function RelatedProductsSkeleton() {
    return (
        <section className="py-12 border-t">
            <div className="container-custom">
                <Skeleton className="h-8 w-64 mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[3/4]" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
