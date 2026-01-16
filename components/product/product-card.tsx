// frontend/components/product/product-card.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
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
}

export function ProductCard({ product, className }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { addItem: addToCart } = useCartStore();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

    const isWishlisted = isInWishlist(product.id);
    const discount = product.compareAtPrice
        ? getDiscountPercentage(product.price, product.compareAtPrice)
        : 0;

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
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
        if (product.variants.length > 0) {
            const defaultVariant = product.variants[0];
            try {
                await addToCart(product, defaultVariant, 1);
                toast.success('Added to cart');
            } catch (error) {
                toast.error('Failed to add to cart');
            }
        }
    };

    return (
        <motion.div
            className={cn('group relative', className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/products/${product.slug}`}>
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                    {/* Main Image */}
                    <Image
                        src={product.images[currentImageIndex]?.url || '/images/placeholder.svg'}
                        alt={product.images[currentImageIndex]?.alt || product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Secondary Image on Hover */}
                    {product.images.length > 1 && isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={product.images[1].url}
                                alt={product.images[1].alt || product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                        </motion.div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                            <Badge variant="default">New</Badge>
                        )}
                        {discount > 0 && (
                            <Badge variant="destructive">-{discount}%</Badge>
                        )}
                        {product.isBestseller && (
                            <Badge variant="gold">Bestseller</Badge>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart
                            className={cn(
                                'h-5 w-5 transition-colors',
                                isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'
                            )}
                        />
                    </button>

                    {/* Quick Actions */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex-1"
                                onClick={handleQuickAdd}
                            >
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Quick Add
                            </Button>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="flex-shrink-0"
                                asChild
                            >
                                <Link href={`/products/${product.slug}`}>
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Color Swatches (show on hover) */}
                    {product.variants.some(v => v.colorHex) && isHovered && (
                        <div className="absolute bottom-16 left-4 right-4 flex justify-center gap-2">
                            {product.variants
                                .filter(v => v.colorHex)
                                .slice(0, 5)
                                .map((variant) => (
                                    <button
                                        key={variant.id}
                                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                        style={{ backgroundColor: variant.colorHex }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Could be used to change product image
                                        }}
                                        aria-label={`Color: ${variant.color}`}
                                    />
                                ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.category.name}
                    </p>

                    {/* Name */}
                    <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
            <span className="font-semibold">
              {formatPrice(product.price)}
            </span>
                        {product.compareAtPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
                        )}
                    </div>

                    {/* Available Sizes (Optional) */}
                    {product.variants.some(v => v.size) && (
                        <div className="flex gap-1 pt-1">
                            {product.variants
                                .filter(v => v.size && v.stock > 0)
                                .slice(0, 5)
                                .map((variant) => (
                                    <span
                                        key={variant.id}
                                        className="text-xs text-muted-foreground"
                                    >
                    {variant.size}
                  </span>
                                ))}
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
