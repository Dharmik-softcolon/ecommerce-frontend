// frontend/components/home/new-arrivals.tsx
import Link from 'next/link';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

interface NewArrivalsProps {
    products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
    return (
        <section className="py-16 bg-background">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                            New Arrivals
                        </h2>
                        <p className="text-muted-foreground">
                            Discover our latest collection
                        </p>
                    </div>
                    <Link href="/collections/new-arrivals">
                        <Button variant="outline" className="hidden sm:flex">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/collections/new-arrivals">
                        <Button variant="outline" className="w-full sm:w-auto">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
