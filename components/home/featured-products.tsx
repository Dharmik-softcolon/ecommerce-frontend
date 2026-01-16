// frontend/components/home/featured-products.tsx
'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
    products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
    return (
        <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
                >
                    <div>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Featured Products
                        </h2>
                        <p className="text-muted-foreground max-w-2xl">
                            Handpicked favorites that define our commitment to quality and style
                        </p>
                    </div>
                    <Button asChild variant="ghost" className="self-start md:self-auto">
                        <Link href="/collections/featured" className="group">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.slice(0, 8).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}