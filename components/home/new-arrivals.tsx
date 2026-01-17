// frontend/components/home/new-arrivals.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '@/types';

interface NewArrivalsProps {
    products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
    return (
        <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>
            
            <div className="container-custom relative">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full shadow-lg shadow-emerald-500/25">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-widest">Just Dropped</span>
                            </span>
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                            New Arrivals
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            Discover our latest collection of premium styles
                        </p>
                    </div>
                    <Link href="/collections/new-arrivals" className="self-start sm:self-auto">
                        <Button variant="outline" className="group border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
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
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {products.slice(0, 8).map((product, index) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            priority={index < 4}
                        />
                    ))}
                </motion.div>

                {/* Mobile CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 text-center sm:hidden"
                >
                    <Link href="/collections/new-arrivals">
                        <Button className="w-full sm:w-auto group">
                            View All New Arrivals
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
