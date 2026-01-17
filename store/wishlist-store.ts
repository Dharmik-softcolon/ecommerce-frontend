// frontend/store/wishlist-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistItem {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    image: string;
}

interface WishlistState {
    items: WishlistItem[];
    isLoading: boolean;

    addItem: (product: Product) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
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
                    // Simulate a small delay for UX
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                    // Check if already in wishlist
                    const exists = get().items.some(item => item.id === product.id);
                    if (exists) {
                        set({ isLoading: false });
                        return;
                    }
                    
                    // Add simplified product to wishlist
                    const wishlistItem: WishlistItem = {
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        compareAtPrice: product.compareAtPrice,
                        image: product.images?.[0]?.url || '/images/placeholder.svg',
                    };
                    
                    set((state) => ({
                        items: [...state.items, wishlistItem],
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
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
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

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'luxe-wishlist-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
