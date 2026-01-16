// frontend/components/product/product-info.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Truck, RotateCcw, Shield, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Product, ProductVariant } from '@/types';
import toast from 'react-hot-toast';

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
        product.variants[0] || null
    );
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const { addItem: addToCart, isLoading: isAddingToCart } = useCartStore();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

    const isWishlisted = isInWishlist(product.id);
    const discount = product.compareAtPrice
        ? getDiscountPercentage(product.price, product.compareAtPrice)
        : 0;

    // Get unique sizes and colors
    const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
    const colors = product.variants
        .filter(v => v.color && v.colorHex)
        .reduce((acc, v) => {
            if (!acc.find(c => c.name === v.color)) {
                acc.push({ name: v.color!, hex: v.colorHex! });
            }
            return acc;
        }, [] as { name: string; hex: string }[]);

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        // Find variant with this size and selected color
        const variant = product.variants.find(
            v => v.size === size && (!selectedColor || v.color === selectedColor)
        );
        if (variant) setSelectedVariant(variant);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        // Find variant with this color and selected size
        const variant = product.variants.find(
            v => v.color === color && (!selectedSize || v.size === selectedSize)
        );
        if (variant) setSelectedVariant(variant);
    };

    const handleAddToCart = async () => {
        if (!selectedVariant) {
            toast.error('Please select size and color');
            return;
        }

        if (selectedVariant.stock < quantity) {
            toast.error('Not enough stock available');
            return;
        }

        try {
            await addToCart(product, selectedVariant, quantity);
            toast.success('Added to cart');
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const handleWishlistToggle = async () => {
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

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.shortDescription,
                    url: window.location.href,
                });
            } catch (error) {
                // User cancelled or error
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard');
        }
    };

    return (
        <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
                {product.isNew && <Badge>New Arrival</Badge>}
                {product.isBestseller && <Badge variant="gold">Bestseller</Badge>}
                {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
            </div>

            {/* Category */}
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.category.name}
            </p>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold">
                {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
        <span className="text-2xl md:text-3xl font-bold">
          {formatPrice(selectedVariant?.price || product.price)}
        </span>
                {product.compareAtPrice && (
                    <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
                        <Badge variant="destructive" className="text-sm">
                            Save {formatPrice(product.compareAtPrice - product.price)}
                        </Badge>
                    </>
                )}
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground">
                {product.shortDescription}
            </p>

            {/* Color Selection */}
            {colors.length > 0 && (
                <div>
                    <label className="block text-sm font-medium mb-3">
                        Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => handleColorSelect(color.name)}
                                className={cn(
                                    'w-10 h-10 rounded-full border-2 transition-all',
                                    selectedColor === color.name
                                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                                        : 'border-transparent hover:border-primary/50'
                                )}
                                style={{ backgroundColor: color.hex }}
                                aria-label={`Select color: ${color.name}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium">
                            Size: <span className="font-normal text-muted-foreground">{selectedSize}</span>
                        </label>
                        <button className="text-sm text-primary hover:underline">
                            Size Guide
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => {
                            const variant = product.variants.find(
                                v => v.size === size && (!selectedColor || v.color === selectedColor)
                            );
                            const isOutOfStock = !variant || variant.stock === 0;

                            return (
                                <button
                                    key={size}
                                    onClick={() => !isOutOfStock && handleSizeSelect(size!)}
                                    disabled={isOutOfStock}
                                    className={cn(
                                        'min-w-[48px] h-12 px-4 border text-sm font-medium transition-all',
                                        selectedSize === size
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-border hover:border-primary',
                                        isOutOfStock && 'opacity-50 cursor-not-allowed line-through'
                                    )}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Quantity */}
            <div>
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 hover:bg-accent transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <button
                            onClick={() => setQuantity(Math.min(selectedVariant?.stock || 10, quantity + 1))}
                            className="p-3 hover:bg-accent transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    {selectedVariant && selectedVariant.stock < 10 && selectedVariant.stock > 0 && (
                        <span className="text-sm text-orange-600">
              Only {selectedVariant.stock} left
            </span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    size="xl"
                    className="flex-1"
                    onClick={handleAddToCart}
                    isLoading={isAddingToCart}
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                >
                    {selectedVariant?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button
                    size="xl"
                    variant="outline"
                    onClick={handleWishlistToggle}
                    className="sm:w-auto"
                >
                    <Heart
                        className={cn(
                            'h-5 w-5 mr-2',
                            isWishlisted && 'fill-red-500 text-red-500'
                        )}
                    />
                    {isWishlisted ? 'Saved' : 'Save'}
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={handleShare}
                    className="hidden sm:flex"
                >
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex flex-col items-center text-center gap-2">
                    <Truck className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground">Free Shipping over ₹2,999</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <RotateCcw className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground">Secure Checkout</span>
                </div>
            </div>
        </div>
    );
}