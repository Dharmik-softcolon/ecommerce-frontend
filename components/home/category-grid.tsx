// frontend/components/home/category-grid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
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
        <section className="py-16 lg:py-24">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our carefully curated collections designed for every occasion
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {mainCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            className={index === 0 || index === 3 ? 'lg:row-span-2' : ''}
                        >
                            <Link
                                href={`/collections/${category.slug}`}
                                className="group block relative overflow-hidden bg-muted aspect-[3/4]"
                            >
                                <Image
                                    src={category.image || categoryImageMap[category.slug] || images.placeholder.category}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <h3 className="text-white font-display text-xl md:text-2xl font-semibold mb-2">
                                        {category.name}
                                    </h3>
                                    <span className="text-white/80 text-sm font-medium tracking-wide uppercase group-hover:underline">
                    Shop Now
                  </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}