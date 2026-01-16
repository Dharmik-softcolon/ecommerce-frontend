// frontend/components/home/collection-banner.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Collection } from '@/types';
import { images } from '@/lib/images';

interface CollectionBannerProps {
    collection: Collection;
}

export function CollectionBanner({ collection }: CollectionBannerProps) {
    const normalizeKey = (value?: string) =>
        (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const collectionFallback = Object.entries(images.collections).find(
        ([key]) => normalizeKey(key) === normalizeKey(collection?.slug)
    )?.[1];
    const collectionImage =
        collection?.image || collectionFallback || images.placeholder.category;

    return (
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <Image
                src={collectionImage}
                alt={collection?.name || 'Collection'}
                fill
                className="object-cover"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative h-full container-custom flex items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl text-white"
                >
          <span className="inline-block text-sm md:text-base font-medium tracking-widest uppercase mb-4 text-gold-400">
            Limited Edition
          </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        {collection?.name || 'The Premium Collection'}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                        {collection?.description || 'Discover our exclusive collection of premium clothing, crafted with the finest materials and attention to detail.'}
                    </p>
                    <Button
                        asChild
                        size="xl"
                        className="bg-white text-black hover:bg-white/90"
                    >
                        <Link href={`/collections/${collection?.slug || 'premium'}`}>
                            Explore Collection
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}