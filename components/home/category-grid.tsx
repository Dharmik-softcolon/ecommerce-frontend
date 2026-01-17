// frontend/components/home/category-grid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';
import { images } from '@/lib/images';

interface CategoryGridProps {
    categories: Category[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export function CategoryGrid({ categories }: CategoryGridProps) {
    // Take only main categories (first 4)
    const mainCategories = categories.filter(cat => !cat.parentId).slice(0, 4);
    const categoryImageMap = Object.fromEntries(
        images.categories.map((item) => [item.slug, item.image])
    );

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3 block">
                        Explore
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
                        Explore our carefully curated collections designed for every occasion
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                >
                    {mainCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            className={index === 0 || index === 3 ? 'lg:row-span-2' : ''}
                        >
                            <Link
                                href={`/collections/${category.slug}`}
                                className="group block relative overflow-hidden bg-muted rounded-xl sm:rounded-2xl aspect-[3/4] shadow-soft hover:shadow-elegant transition-all duration-500"
                            >
                                <Image
                                    src={category.image || categoryImageMap[category.slug] || images.placeholder.category}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                        <h3 className="text-white font-display text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center text-white/80 text-xs sm:text-sm font-medium tracking-wide uppercase">
                                            <span className="group-hover:text-amber-400 transition-colors">
                                                Shop Now
                                            </span>
                                            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl sm:rounded-2xl transition-all duration-300" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
