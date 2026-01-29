// frontend/components/home/instagram-feed.tsx
'use client';

import { Instagram, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

function hashStringToUint32(input: string) {
    // Small deterministic hash (FNV-1a-ish) for stable SSR/CSR values
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function stableNumber(seed: string, min: number, max: number) {
    const range = Math.max(0, max - min + 1);
    if (range === 0) return min;
    const n = hashStringToUint32(seed) % range;
    return min + n;
}

export function InstagramFeed() {
    const instagramPosts = images.instagram.map((image, index) => ({
        id: index + 1,
        image,
        url: 'https://instagram.com/luxe_clothing',
        likes: stableNumber(`likes:${index}:${image}`, 100, 599),
        comments: stableNumber(`comments:${index}:${image}`, 5, 54),
    }));

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-b from-muted/20 to-background">
            <div className="container-custom">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-sm font-medium mb-4">
                        <Instagram className="h-4 w-4" />
                        @luxe_clothing
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Join our community and get inspired by the latest styles, behind-the-scenes content, and exclusive updates.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3"
                >
                    {instagramPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Link
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-square block overflow-hidden rounded-lg bg-muted"
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-3">
                                    <div className="flex items-center gap-4 text-white text-sm font-medium">
                                        <span className="flex items-center gap-1">
                                            <Heart className="h-4 w-4 fill-white" />
                                            {post.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="h-4 w-4" />
                                            {post.comments}
                                        </span>
                                    </div>
                                    <Instagram className="h-6 w-6 text-white" />
                                </div>
                                
                                {/* Image */}
                                <Image
                                    src={post.image}
                                    alt="Instagram post"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-center mt-8"
                >
                    <Link
                        href="https://instagram.com/luxe_clothing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-foreground/10 hover:border-foreground/30 text-sm font-medium transition-all duration-300 hover:shadow-md group"
                    >
                        <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Follow @luxe_clothing
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
