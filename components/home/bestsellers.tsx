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
                        <div className="flex items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 rounded-full shadow-lg shadow-amber-500/25">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="text-[11px] font-bold uppercase tracking-widest">Most Popular</span>
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
