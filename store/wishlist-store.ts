// frontend/store/wishlist-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types';
import { api } from '@/lib/api';

interface WishlistState {
    items: Product[];
    isLoading: boolean;

    addItem: (product: Product) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
    fetchWishlist: () => Promise<void>;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,

            addItem: async (product) => {
                set({ isLoading: true });
                try {
                    await api.addToWishlist(product.id);
                    set((state) => ({
                        items: [...state.items, product],
                    }));
                } catch (error) {
                    console.error('Failed to add to wishlist:', error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            removeItem: async (productId) => {
                set({ isLoading: true });
                try {
                    await api.removeFromWishlist(productId);
                    set((state) => ({
                        items: state.items.filter((item) => item.id !== productId),
                    }));
                } catch (error) {
                    console.error('Failed to remove from wishlist:', error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            isInWishlist: (productId) => {
                return get().items.some((item) => item.id === productId);
            },

            fetchWishlist: async () => {
                set({ isLoading: true });
                try {
                    const items = await api.getWishlist();
                    set({ items });
                } catch (error) {
                    console.error('Failed to fetch wishlist:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);