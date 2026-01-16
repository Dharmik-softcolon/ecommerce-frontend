// frontend/app/account/wishlist/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function AccountWishlistPage() {
    const { data: session, status } = useSession();
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const { addItem } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/account' },
        { label: 'Wishlist', href: '/account/wishlist' },
    ];

    if (status === 'loading' || !mounted) {
        return <WishlistSkeleton />;
    }

    if (!session) {
        redirect('/auth/login?callbackUrl=/account/wishlist');
    }

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

    return (
        <main className="container-custom py-8 lg:py-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex items-center gap-4 mt-6 mb-8">
                <Link
                    href="/account"
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">My Wishlist</h1>
                    <p className="text-muted-foreground">{items.length} items saved</p>
                </div>
                {items.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
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
                    <Button asChild>
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

function WishlistSkeleton() {
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
