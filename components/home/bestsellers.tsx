// frontend/components/home/bestsellers.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { Product } from '@/types';

interface BestsellersProps {
    products: Product[];
}

export function Bestsellers({ products }: BestsellersProps) {
    return (
        <section className="py-10 lg:py-16 bg-background">
            <div className="container-custom">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-5 w-5 text-rose-500" />
                            <span className="text-rose-600 text-xs font-semibold uppercase tracking-widest">
                                Most Popular
                            </span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold">
                            Bestsellers
                        </h2>
                    </div>
                    <Link href="/collections/bestsellers" className="self-start sm:self-auto">
                        <Button variant="outline" size="sm" className="group border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Products Grid */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
                >
                    {products.slice(0, 8).map((product, index) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            priority={index < 4}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
