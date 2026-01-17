// frontend/app/wishlist/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn, getDiscountPercentage } from '@/lib/utils';
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

    const handleAddToCart = async (item: typeof items[0]) => {
        try {
            // Create a product-like object for the cart
            const product = {
                id: item.id,
                name: item.name,
                slug: item.slug,
                price: item.price,
                compareAtPrice: item.compareAtPrice,
                images: [{ id: '1', url: item.image, alt: item.name, position: 0 }],
                description: '',
                shortDescription: '',
                category: { id: '1', name: 'Collection', slug: 'collection' },
                categoryId: '1',
                variants: [],
                tags: [],
                isNew: false,
                isFeatured: false,
                isBestseller: false,
                stock: 10,
                sku: `SKU-${item.id}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            
            const defaultVariant = {
                id: `default-${item.id}`,
                name: 'Default',
                sku: `SKU-${item.id}`,
                price: item.price,
                stock: 10,
                size: 'M',
                color: 'Default',
            };
            
            await addItem(product as any, defaultVariant, 1);
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
                            <div className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1 flex items-center gap-3">
                        <Heart className="h-7 w-7 text-rose-500 fill-rose-500" />
                        My Wishlist
                    </h1>
                    <p className="text-muted-foreground">
                        {items.length} {items.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>
                {items.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            clearWishlist();
                            toast.success('Wishlist cleared');
                        }}
                        className="self-start sm:self-auto"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                    </Button>
                )}
            </div>

            {items.length === 0 ? (
                <div className="text-center py-20 px-4">
                    {/* Empty State */}
                    <div className="relative mb-8">
                        <div className="w-28 h-28 mx-auto bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/20 rounded-full flex items-center justify-center shadow-lg border border-rose-200/50 dark:border-rose-700/30">
                            <Heart className="h-12 w-12 text-rose-400" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-muted rounded-full">
                            <span className="text-xs text-muted-foreground">Empty</span>
                        </div>
                    </div>
                    
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Your wishlist is empty</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                        Save your favorite items here by clicking the heart icon on any product. 
                        They'll be waiting for you when you're ready to shop!
                    </p>
                    
                    <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all">
                        <Link href="/collections">
                            Start Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    {/* Suggestions */}
                    <div className="mt-12 pt-8 border-t">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium text-muted-foreground">Popular Collections</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { label: 'New Arrivals', href: '/collections/new-arrivals' },
                                { label: 'Bestsellers', href: '/collections/bestsellers' },
                                { label: 'Sale', href: '/sale' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 rounded-full text-sm font-medium bg-muted/80 hover:bg-muted text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item) => {
                        const discount = item.compareAtPrice 
                            ? getDiscountPercentage(item.price, item.compareAtPrice) 
                            : 0;
                        
                        return (
                            <div
                                key={item.id}
                                className="group relative bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-lg hover:border-border transition-all duration-300"
                            >
                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="absolute top-3 right-3 z-10 p-2.5 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 hover:scale-110"
                                    aria-label="Remove from wishlist"
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </button>

                                {/* Sale Badge */}
                                {discount > 0 && (
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-sm shadow-lg">
                                            {discount}% Off
                                        </span>
                                    </div>
                                )}

                                {/* Image */}
                                <Link href={`/products/${item.slug}`}>
                                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                                        <Image
                                            src={item.image || '/images/placeholder.svg'}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        />
                                    </div>
                                </Link>

                                {/* Details */}
                                <div className="p-4">
                                    <Link href={`/products/${item.slug}`}>
                                        <h3 className="font-medium line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-2">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={cn(
                                            "font-semibold",
                                            discount > 0 && "text-rose-600"
                                        )}>
                                            {formatPrice(item.price)}
                                        </span>
                                        {item.compareAtPrice && item.compareAtPrice > item.price && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                {formatPrice(item.compareAtPrice)}
                                            </span>
                                        )}
                                    </div>

                                    <Button
                                        className="w-full"
                                        size="sm"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        <ShoppingBag className="h-4 w-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
