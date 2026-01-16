// frontend/components/cart/cart-drawer.tsx
'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, updateQuantity, removeItem, isLoading } = useCartStore();

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

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Shopping Cart
                                {cart && cart.itemCount > 0 && (
                                    <span className="text-sm text-muted-foreground">
                    ({cart.itemCount} items)
                  </span>
                                )}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-accent rounded-full transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {!cart || cart.items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Looks like you haven't added anything to your cart yet.
                                    </p>
                                    <Button onClick={onClose} asChild>
                                        <Link href="/collections">Start Shopping</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                                        >
                                            {/* Image */}
                                            <div className="relative w-24 h-28 flex-shrink-0 bg-muted rounded overflow-hidden">
                                                <Image
                                                    src={item.product.images[0]?.url || '/images/placeholder.svg'}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="96px"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/products/${item.product.slug}`}
                                                    onClick={onClose}
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
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center border border-border rounded">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            disabled={isLoading || item.quantity <= 1}
                                                            className="p-1.5 hover:bg-accent transition-colors disabled:opacity-50"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            disabled={isLoading}
                                                            className="p-1.5 hover:bg-accent transition-colors disabled:opacity-50"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        disabled={isLoading}
                                                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart && cart.items.length > 0 && (
                            <div className="border-t border-border p-4 space-y-4">
                                {/* Subtotal */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatPrice(cart.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                                        <span>Total</span>
                                        <span>{formatPrice(cart.total)}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2">
                                    <Button asChild className="w-full" size="lg">
                                        <Link href="/checkout" onClick={onClose}>
                                            Proceed to Checkout
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={onClose}
                                        asChild
                                    >
                                        <Link href="/cart">View Cart</Link>
                                    </Button>
                                </div>

                                {/* Free Shipping Notice */}
                                {cart.subtotal < 2999 && (
                                    <p className="text-sm text-center text-muted-foreground">
                                        Add {formatPrice(2999 - cart.subtotal)} more for free shipping!
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}