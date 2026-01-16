// frontend/store/cart-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Cart, CartItem, Product, ProductVariant } from '@/types';
import { api } from '@/lib/api';

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
    fetchCart: () => Promise<void>;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
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
                    const cart = await api.addToCart(product.id, variant.id, quantity);
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
                    const cart = await api.updateCartItem(itemId, quantity);
                    set({ cart });
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
                    const cart = await api.removeFromCart(itemId);
                    set({ cart });
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
                    await api.clearCart();
                    set({ cart: null });
                } catch (error) {
                    console.error('Failed to clear cart:', error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchCart: async () => {
                set({ isLoading: true });
                try {
                    const cart = await api.getCart();
                    set({ cart });
                } catch (error) {
                    console.error('Failed to fetch cart:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cart: state.cart }),
        }
    )
);