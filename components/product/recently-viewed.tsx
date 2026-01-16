// frontend/components/product/recently-viewed.tsx
'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types';

const RECENTLY_VIEWED_KEY = 'luxe_recently_viewed';

interface RecentlyViewedProps {
    currentProductId?: string;
}

export function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
            if (stored) {
                const viewedIds: string[] = JSON.parse(stored);
                // Filter out current product
                const filteredIds = currentProductId
                    ? viewedIds.filter(id => id !== currentProductId)
                    : viewedIds;
                
                // For now, we'll just show the IDs - in a real app, you'd fetch products by IDs
                // This is a placeholder implementation
                setProducts([]);
            }
        } catch (error) {
            console.error('Error loading recently viewed:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentProductId]);

    if (isLoading) {
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

    if (products.length === 0) return null;

    return (
        <section className="py-12 border-t">
            <div className="container-custom">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                    Recently Viewed
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
