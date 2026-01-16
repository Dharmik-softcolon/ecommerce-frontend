// frontend/app/cart/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import toast from 'react-hot-toast';

export default function CartPage() {
    const { cart, updateQuantity, removeItem, isLoading } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Shopping Cart', href: '/cart' },
    ];

    const handleQuantityChange = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            await updateQuantity(itemId, newQuantity);
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            await removeItem(itemId);
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const handleApplyPromo = () => {
        if (!promoCode.trim()) {
            toast.error('Please enter a promo code');
            return;
        }
        // Simulate promo code validation
        if (promoCode.toUpperCase() === 'WELCOME10') {
            toast.success('Promo code applied! 10% discount');
        } else if (promoCode.toUpperCase() === 'SALE50') {
            toast.success('Promo code applied! Extra 10% off sale items');
        } else {
            toast.error('Invalid promo code');
        }
    };

    if (!mounted) {
        return (
            <main className="container-custom py-8 lg:py-12">
                <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-muted rounded animate-pulse" />
                        ))}
                    </div>
                    <div className="h-64 bg-muted rounded animate-pulse" />
                </div>
            </main>
        );
    }

    return (
        <main className="container-custom py-8 lg:py-12">
            <Breadcrumbs items={breadcrumbs} />

            <h1 className="text-3xl font-bold mt-6 mb-8">Shopping Cart</h1>

            {!cart || cart.items.length === 0 ? (
                <div className="text-center py-16">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
                    </p>
                    <Button asChild size="lg">
                        <Link href="/collections">
                            Continue Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 p-4 bg-muted/30 rounded-lg border"
                            >
                                {/* Image */}
                                <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                                    <div className="relative w-24 h-28 md:w-32 md:h-40 bg-muted rounded overflow-hidden">
                                        <Image
                                            src={item.product.images[0]?.url || '/images/placeholder.svg'}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 96px, 128px"
                                        />
                                    </div>
                                </Link>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <Link
                                        href={`/products/${item.product.slug}`}
                                        className="font-medium hover:text-primary transition-colors line-clamp-2"
                                    >
                                        {item.product.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {item.variant.size && `Size: ${item.variant.size}`}
                                        {item.variant.size && item.variant.color && ' | '}
                                        {item.variant.color && `Color: ${item.variant.color}`}
                                    </p>
                                    <p className="font-semibold mt-2">
                                        {formatPrice(item.price)}
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-border rounded">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                disabled={isLoading || item.quantity <= 1}
                                                className="p-2 hover:bg-accent transition-colors disabled:opacity-50"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-10 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                disabled={isLoading}
                                                className="p-2 hover:bg-accent transition-colors disabled:opacity-50"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                disabled={isLoading}
                                                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Continue Shopping Link */}
                        <Link
                            href="/collections"
                            className="inline-flex items-center text-sm text-primary hover:underline mt-4"
                        >
                            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                            Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-muted/30 rounded-lg border p-6 sticky top-24">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="flex gap-2 mb-6">
                                <div className="relative flex-1">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Button variant="outline" onClick={handleApplyPromo}>
                                    Apply
                                </Button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal ({cart.itemCount} items)</span>
                                    <span>{formatPrice(cart.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</span>
                                </div>
                                {cart.discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount</span>
                                        <span>-{formatPrice(cart.discount)}</span>
                                    </div>
                                )}
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>{formatPrice(cart.total)}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Including GST where applicable
                                    </p>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Button asChild className="w-full mt-6" size="lg">
                                <Link href="/checkout">
                                    Proceed to Checkout
                                </Link>
                            </Button>

                            {/* Free Shipping Notice */}
                            {cart.subtotal < 2999 && (
                                <p className="text-sm text-center text-muted-foreground mt-4">
                                    Add {formatPrice(2999 - cart.subtotal)} more for free shipping!
                                </p>
                            )}

                            {/* Trust Badges */}
                            <div className="border-t mt-6 pt-6">
                                <div className="grid grid-cols-2 gap-4 text-center text-xs text-muted-foreground">
                                    <div>
                                        <div className="text-lg mb-1">🔒</div>
                                        Secure Checkout
                                    </div>
                                    <div>
                                        <div className="text-lg mb-1">🚚</div>
                                        Free Shipping
                                    </div>
                                    <div>
                                        <div className="text-lg mb-1">↩️</div>
                                        Easy Returns
                                    </div>
                                    <div>
                                        <div className="text-lg mb-1">💳</div>
                                        Secure Payment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
