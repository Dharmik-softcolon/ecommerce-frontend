// frontend/components/product/product-card.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { cn, formatPrice, getDiscountPercentage } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Product } from '@/types';
import toast from 'react-hot-toast';

interface ProductCardProps {
    product: Product;
    className?: string;
    priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const { addItem: addToCart } = useCartStore();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

    const isWishlisted = isInWishlist(product.id);
    const discount = product.compareAtPrice
        ? getDiscountPercentage(product.price, product.compareAtPrice)
        : 0;

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (isWishlisted) {
                await removeFromWishlist(product.id);
                toast.success('Removed from wishlist');
            } else {
                await addToWishlist(product);
                toast.success('Added to wishlist');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const handleQuickAdd = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            // Use first variant if available, or create a default one
            const defaultVariant = product.variants?.[0] || {
                id: `default-${product.id}`,
                name: 'Default',
                sku: product.sku || `SKU-${product.id}`,
                price: product.price,
                stock: product.stock || 10,
                size: 'M',
                color: 'Default',
            };
            
            await addToCart(product, defaultVariant, 1);
            toast.success('Added to cart');
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const primaryImage = product.images?.[0]?.url || '/images/placeholder.svg';
    const secondaryImage = product.images?.[1]?.url;

    return (
        <motion.div
            className={cn('group relative', className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/products/${product.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted/50 rounded-lg mb-4">
                    {/* Skeleton loader */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/80 to-muted animate-pulse" />
                    )}
                    
                    {/* Main Image */}
                    <Image
                        src={primaryImage}
                        alt={product.images?.[0]?.alt || product.name}
                        fill
                        priority={priority}
                        className={cn(
                            "object-cover transition-all duration-700",
                            imageLoaded ? "opacity-100" : "opacity-0",
                            isHovered && secondaryImage ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-105"
                        )}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        onLoad={() => setImageLoaded(true)}
                    />

                    {/* Secondary Image on Hover */}
                    {secondaryImage && (
                        <Image
                            src={secondaryImage}
                            alt={product.images?.[1]?.alt || product.name}
                            fill
                            className={cn(
                                "object-cover transition-all duration-700 absolute inset-0",
                                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            )}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    )}

                    {/* Premium Badges */}
                    <div className="absolute top-0 left-0 right-0 z-10">
                        {/* Sale Badge - Corner Ribbon Style */}
                        {discount > 0 && (
                            <div className="absolute -left-[2px] top-4">
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white px-4 py-1.5 pr-3 shadow-lg">
                                        <span className="text-[11px] font-bold tracking-wide">
                                            -{discount}%
                                        </span>
                                    </div>
                                    {/* Ribbon fold effect */}
                                    <div className="absolute -bottom-1 left-0 w-0 h-0 border-t-[4px] border-r-[4px] border-t-rose-800 border-r-transparent" />
                                    {/* Ribbon tail */}
                                    <div className="absolute top-0 -right-2 w-0 h-0 border-t-[13px] border-b-[13px] border-l-[8px] border-t-transparent border-b-transparent border-l-rose-600" />
                                </div>
                            </div>
                        )}
                        
                        {/* New Arrival Badge - Elegant pill with shimmer */}
                        {product.isNew && (
                            <div className={cn(
                                "absolute top-4",
                                discount > 0 ? "left-20" : "left-3"
                            )}>
                                <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-3 py-1 rounded-full shadow-md">
                                    <span className="relative z-10 text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                        New
                                    </span>
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>
                        )}
                        
                        {/* Bestseller Badge - Premium gold with icon */}
                        {product.isBestseller && (
                            <div className={cn(
                                "absolute top-4",
                                discount > 0 && product.isNew ? "left-[7.5rem]" : 
                                discount > 0 || product.isNew ? "left-20" : "left-3"
                            )}>
                                <div className="relative bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 px-3 py-1 rounded-full shadow-md">
                                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                        <svg className="w-3 h-3 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        Best
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Wishlist Button - Always visible on mobile, hover on desktop */}
                    <button
                        onClick={handleWishlistToggle}
                        className={cn(
                            "absolute top-3 right-3 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-soft transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-110 z-10",
                            "sm:opacity-0 sm:translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
                            isWishlisted && "opacity-100 translate-y-0"
                        )}
                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart
                            className={cn(
                                'h-4 w-4 transition-all duration-200',
                                isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-foreground/70'
                            )}
                        />
                    </button>

                    {/* Quick Actions */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent hidden sm:block"
                            >
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1 bg-white hover:bg-white/90 text-foreground font-medium shadow-lg"
                                        onClick={handleQuickAdd}
                                    >
                                        <ShoppingBag className="h-4 w-4 mr-2" />
                                        Quick Add
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="flex-shrink-0 bg-white hover:bg-white/90 text-foreground shadow-lg"
                                        asChild
                                    >
                                        <span>
                                            <Eye className="h-4 w-4" />
                                        </span>
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Color Swatches */}
                    {product.variants?.some(v => v.colorHex) && (
                        <div className={cn(
                            "absolute bottom-3 left-3 right-3 flex justify-center gap-1.5 transition-all duration-300",
                            isHovered ? "sm:bottom-20 opacity-100" : "sm:opacity-0"
                        )}>
                            {product.variants
                                .filter(v => v.colorHex)
                                .slice(0, 5)
                                .map((variant, index) => (
                                    <span
                                        key={variant.id || `color-${index}`}
                                        className="w-5 h-5 rounded-full border-2 border-white shadow-md ring-1 ring-black/10"
                                        style={{ backgroundColor: variant.colorHex }}
                                        title={variant.color}
                                    />
                                ))}
                            {product.variants.filter(v => v.colorHex).length > 5 && (
                                <span className="w-5 h-5 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-[9px] font-bold text-foreground/70">
                                    +{product.variants.filter(v => v.colorHex).length - 5}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-1.5">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        {product.category?.name || 'Collection'}
                    </p>

                    {/* Name */}
                    <h3 className="font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
                        {product.name}
                    </h3>

                    {/* Rating (if available) */}
                    {product.rating && (
                        <div className="flex items-center gap-1">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "h-3 w-3",
                                            i < Math.floor(product.rating!) 
                                                ? "fill-amber-400 text-amber-400" 
                                                : "fill-muted text-muted"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                                ({product.reviewCount || 0})
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 pt-1">
                        <span className={cn(
                            "font-semibold text-base",
                            discount > 0 && "text-rose-600"
                        )}>
                            {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.compareAtPrice)}
                            </span>
                        )}
                    </div>

                    {/* Available Sizes */}
                    {product.variants?.some(v => v.size) && (
                        <div className="flex flex-wrap gap-1 pt-1">
                            {product.variants
                                .filter(v => v.size && v.stock > 0)
                                .slice(0, 6)
                                .map((variant, idx) => (
                                    <span
                                        key={variant.id || `size-${idx}`}
                                        className="text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded"
                                    >
                                        {variant.size}
                                    </span>
                                ))}
                            {product.variants.filter(v => v.size && v.stock > 0).length > 6 && (
                                <span className="text-xs text-muted-foreground">
                                    +{product.variants.filter(v => v.size && v.stock > 0).length - 6}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
