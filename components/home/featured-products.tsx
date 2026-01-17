// frontend/components/home/featured-products.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import type { Product } from '@/types';

interface FeaturedProductsProps {
    products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="container-custom relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14"
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                            <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">
                                Curated Selection
                            </span>
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                            Featured Products
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            Handpicked favorites that define our commitment to quality and style
                        </p>
                    </div>
                    <Button 
                        asChild 
                        variant="ghost" 
                        className="self-start md:self-auto group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                        <Link href="/collections/featured">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.slice(0, 8).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 text-center md:hidden"
                >
                    <Link href="/collections/featured">
                        <Button className="w-full sm:w-auto group">
                            View All Featured Products
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
