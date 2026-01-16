// frontend/app/cart/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CartPage() {
    const { cart, updateQuantity, removeItem, isLoading } = useCartStore();
    const [couponCode, setCouponCode] = useState('');
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

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

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsApplyingCoupon(true);
        // API call to apply coupon
        setTimeout(() => {
            toast.error('Invalid coupon code');
            setIsApplyingCoupon(false);
        }, 1000);
    };

    if (!cart || cart.items.length === 0) {
        return (
            <main className="container-custom py-16">
                <div className="max-w-md mx-auto text-center">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">
                        Looks like you haven't added anything to your cart yet.
                        Start exploring our collections!
                    </p>
                    <Button asChild size="lg">
                        <Link href="/collections">Continue Shopping</Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="container-custom py-8 lg:py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>

                    {/* Items */}
                    {cart.items.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-12 gap-4 py-4 border-b border-border items-center"
                        >
                            {/* Product */}
                            <div className="col-span-12 md:col-span-6 flex gap-4">
                                <div className="relative w-24 h-32 flex-shrink-0 bg-muted rounded overflow-hidden">
                                    <Image
                                        src={item.product.images[0]?.url || '/images/placeholder.svg'}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>
                                <div>
                                    <Link
                                        href={`/products/${item.product.slug}`}
                                        className="font-medium hover:text-primary transition-colors"
                                    >
                                        {item.product.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {item.variant.size && `Size: ${item.variant.size}`}
                                        {item.variant.size && item.variant.color && ' | '}
                                        {item.variant.color && `Color: ${item.variant.color}`}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        SKU: {item.variant.sku}
                                    </p>
                                    {/* Mobile Price */}
                                    <p className="font-semibold mt-2 md:hidden">
                                        {formatPrice(item.price)}
                                    </p>
                                </div>
                            </div>

                            {/* Price (Desktop) */}
                            <div className="hidden md:block col-span-2 text-center">
                                {formatPrice(item.price)}
                            </div>

                            {/* Quantity */}
                            <div className="col-span-6 md:col-span-2">
                                <div className="flex items-center justify-center border border-border rounded w-fit mx-auto">
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
                            </div>

                            {/* Total & Remove */}
                            <div className="col-span-6 md:col-span-2 flex items-center justify-end gap-4">
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
                    ))}

                    {/* Continue Shopping */}
                    <div className="pt-4">
                        <Button variant="ghost" asChild>
                            <Link href="/collections">
                                ← Continue Shopping
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
                        <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                        {/* Coupon Code */}
                        <div className="mb-6">
                            <label className="text-sm font-medium mb-2 block">Promo Code</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <Button
                                    variant="outline"
                                    onClick={handleApplyCoupon}
                                    isLoading={isApplyingCoupon}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>{formatPrice(cart.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax (GST 18%)</span>
                                <span>{formatPrice(cart.tax)}</span>
                            </div>
                            {cart.subtotal < 2999 && (
                                <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
                                    <Tag className="h-4 w-4 inline mr-1" />
                                    Add {formatPrice(2999 - cart.subtotal)} more for free shipping!
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between font-semibold text-lg py-4 border-t border-border">
                            <span>Total</span>
                            <span>{formatPrice(cart.total)}</span>
                        </div>

                        <Button asChild className="w-full" size="lg">
                            <Link href="/checkout">
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        {/* Trust Badges */}
                        <div className="mt-6 pt-6 border-t border-border">
                            <p className="text-xs text-muted-foreground text-center mb-4">
                                Secure Checkout
                            </p>
                            <div className="flex justify-center gap-2">
                                <img src="/images/payments/visa.svg" alt="Visa" className="h-6" />
                                <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-6" />
                                <img src="/images/payments/upi.svg" alt="UPI" className="h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}