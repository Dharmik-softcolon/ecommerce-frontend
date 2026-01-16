// frontend/app/wishlist/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import toast from 'react-hot-toast';

export default function WishlistPage() {
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const { addItem } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Wishlist', href: '/wishlist' },
    ];

    const handleAddToCart = async (item: any) => {
        try {
            await addItem(item.id, 1);
            removeItem(item.id);
            toast.success('Added to cart!');
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const handleRemoveItem = (itemId: string) => {
        removeItem(itemId);
        toast.success('Removed from wishlist');
    };

    if (!mounted) {
        return (
            <main className="container-custom py-8 lg:py-12">
                <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <div className="aspect-[3/4] bg-muted rounded animate-pulse" />
                            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                            <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main className="container-custom py-8 lg:py-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex items-center justify-between mt-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                    <p className="text-muted-foreground">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                    </p>
                </div>
                {items.length > 0 && (
                    <Button
                        variant="outline"
                        onClick={() => {
                            clearWishlist();
                            toast.success('Wishlist cleared');
                        }}
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {items.length === 0 ? (
                <div className="text-center py-16">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Save your favorite items here by clicking the heart icon on any product.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/collections">
                            Start Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-background border rounded-lg overflow-hidden"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:bg-red-50 transition-colors"
                            >
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </button>

                            {/* Image */}
                            <Link href={`/products/${item.slug}`}>
                                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                                    <Image
                                        src={item.image || '/images/placeholder.svg'}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    />
                                </div>
                            </Link>

                            {/* Details */}
                            <div className="p-4">
                                <Link href={`/products/${item.slug}`}>
                                    <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="font-semibold">{formatPrice(item.price)}</span>
                                    {item.compareAtPrice && item.compareAtPrice > item.price && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            {formatPrice(item.compareAtPrice)}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    className="w-full mt-4"
                                    size="sm"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
