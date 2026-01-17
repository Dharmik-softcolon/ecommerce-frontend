// frontend/store/cart-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Cart, CartItem, Product, ProductVariant } from '@/types';

interface CartState {
    cart: Cart | null;
    isLoading: boolean;
    isOpen: boolean;

    // Actions
    setCart: (cart: Cart) => void;
    addItem: (product: Product, variant: ProductVariant, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
}

// Helper to calculate cart totals
function calculateCartTotals(items: CartItem[]): Omit<Cart, 'id' | 'items'> {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal >= 2999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + tax;
    
    return { subtotal, tax, shipping, total, itemCount };
}

// Generate a unique ID
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: null,
            isLoading: false,
            isOpen: false,

            setCart: (cart) => set({ cart }),

            addItem: async (product, variant, quantity = 1) => {
                set({ isLoading: true });
                
                try {
                    // Simulate a small delay for UX
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    const currentCart = get().cart;
                    let items: CartItem[] = currentCart?.items || [];
                    
                    // Check if item already exists in cart
                    const existingItemIndex = items.findIndex(
                        item => item.productId === product.id && item.variantId === variant.id
                    );
                    
                    if (existingItemIndex >= 0) {
                        // Update quantity if item exists
                        items = items.map((item, index) => 
                            index === existingItemIndex 
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        );
                    } else {
                        // Add new item
                        const newItem: CartItem = {
                            id: generateId(),
                            productId: product.id,
                            product: product,
                            variantId: variant.id,
                            variant: variant,
                            quantity: quantity,
                            price: product.price,
                        };
                        items = [...items, newItem];
                    }
                    
                    const totals = calculateCartTotals(items);
                    const cart: Cart = {
                        id: currentCart?.id || generateId(),
                        items,
                        ...totals,
                    };
                    
                    set({ cart, isOpen: true });
                } catch (error) {
                    console.error('Failed to add item to cart:', error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            updateQuantity: async (itemId, quantity) => {
                set({ isLoading: true });
                
                try {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                    const currentCart = get().cart;
                    if (!currentCart) return;
                    
                    let items = currentCart.items;
                    
                    if (quantity <= 0) {
                        // Remove item if quantity is 0 or less
                        items = items.filter(item => item.id !== itemId);
                    } else {
                        // Update quantity
                        items = items.map(item =>
                            item.id === itemId ? { ...item, quantity } : item
                        );
                    }
                    
                    if (items.length === 0) {
                        set({ cart: null });
                    } else {
                        const totals = calculateCartTotals(items);
                        const cart: Cart = {
                            id: currentCart.id,
                            items,
                            ...totals,
                        };
                        set({ cart });
                    }
                } catch (error) {
                    console.error('Failed to update quantity:', error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            removeItem: async (itemId) => {
                set({ isLoading: true });
                
                try {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                    const currentCart = get().cart;
                    if (!currentCart) return;
                    
                    const items = currentCart.items.filter(item => item.id !== itemId);
                    
                    if (items.length === 0) {
                        set({ cart: null });
                    } else {
                        const totals = calculateCartTotals(items);
                        const cart: Cart = {
                            id: currentCart.id,
                            items,
                            ...totals,
                        };
                        set({ cart });
                    }
                } catch (error) {
                    console.error('Failed to remove item:', error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            clearCart: async () => {
                set({ isLoading: true });
                try {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    set({ cart: null });
                } catch (error) {
                    console.error('Failed to clear cart:', error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: 'luxe-cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cart: state.cart }),
        }
    )
);
