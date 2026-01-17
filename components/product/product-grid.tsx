// frontend/components/product/product-grid.tsx
'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './product-card';
import type { Product } from '@/types';

interface ProductGridProps {
    products: Product[];
    columns?: 2 | 3 | 4;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
};

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found</p>
                <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or search terms
                </p>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-4 md:gap-6 ${
                columns === 2
                    ? 'grid-cols-2'
                    : columns === 3
                        ? 'grid-cols-2 md:grid-cols-3'
                        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
        >
            {products.map((product, index) => (
                <motion.div key={product.id || product._id || `product-${index}`} variants={itemVariants}>
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    );
}