// frontend/components/home/instagram-feed.tsx
'use client';

import { Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { images } from '@/lib/images';

export function InstagramFeed() {
    const instagramPosts = images.instagram.map((image, index) => ({
        id: index + 1,
        image,
        url: '#',
    }));

    return (
        <section className="py-16 bg-background">
            <div className="container-custom">
                <div className="text-center mb-8">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        @luxe_clothing
                    </p>
                    <Link
                        href="https://instagram.com/luxe_clothing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                        <Instagram className="h-5 w-5" />
                        Follow Us
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {instagramPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <Image
                                src={post.image}
                                alt="Instagram post"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 16vw"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
