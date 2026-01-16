// frontend/lib/api.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import type { ApiResponse, PaginatedResponse, Product, Category, Collection, Cart, Order, User, Filters, Address, Review } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        });

        this.client.interceptors.request.use(
            async (config) => {
                if (typeof window !== 'undefined') {
                    const session = await getSession();
                    if (session?.accessToken) {
                        config.headers = config.headers ?? {};
                        config.headers.Authorization = `Bearer ${session.accessToken}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<ApiResponse<unknown>>) => {
                const message = error.response?.data?.error || error.message;
                console.error('API Error:', message);
                return Promise.reject(new Error(message));
            }
        );
    }

    // Products
    async getProducts(filters?: Filters): Promise<PaginatedResponse<Product>> {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(v => params.append(key, v));
                    } else {
                        params.append(key, String(value));
                    }
                }
            });
        }
        const { data } = await this.client.get(`/products?${params.toString()}`);
        return data;
    }

    async getProduct(slug: string): Promise<Product> {
        const { data } = await this.client.get(`/products/${slug}`);
        return data.data;
    }

    async getFeaturedProducts(): Promise<Product[]> {
        const { data } = await this.client.get('/products/featured');
        return data.data;
    }

    async getNewArrivals(): Promise<Product[]> {
        const { data } = await this.client.get('/products/new-arrivals');
        return data.data;
    }

    async getBestsellers(): Promise<Product[]> {
        const { data } = await this.client.get('/products/bestsellers');
        return data.data;
    }

    async searchProducts(query: string): Promise<Product[]> {
        const { data } = await this.client.get(`/products/search?q=${encodeURIComponent(query)}`);
        return data.data;
    }

    // Categories
    async getCategories(): Promise<Category[]> {
        const { data } = await this.client.get('/categories');
        return data.data;
    }

    async getCategory(slug: string): Promise<Category> {
        const { data } = await this.client.get(`/categories/${slug}`);
        return data.data;
    }

    // Collections
    async getCollections(): Promise<Collection[]> {
        const { data } = await this.client.get('/collections');
        return data.data;
    }

    async getCollection(slug: string): Promise<Collection> {
        const { data } = await this.client.get(`/collections/${slug}`);
        return data.data;
    }

    // Cart
    async getCart(): Promise<Cart> {
        const { data } = await this.client.get('/cart');
        return data.data;
    }

    async addToCart(productId: string, variantId: string, quantity: number): Promise<Cart> {
        const { data } = await this.client.post('/cart/items', { productId, variantId, quantity });
        return data.data;
    }

    async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
        const { data } = await this.client.patch(`/cart/items/${itemId}`, { quantity });
        return data.data;
    }

    async removeFromCart(itemId: string): Promise<Cart> {
        const { data } = await this.client.delete(`/cart/items/${itemId}`);
        return data.data;
    }

    async clearCart(): Promise<void> {
        await this.client.delete('/cart');
    }

    // Orders
    async createOrder(orderData: {
        shippingAddressId: string;
        billingAddressId: string;
        paymentMethodId: string;
        notes?: string;
    }): Promise<Order> {
        const { data } = await this.client.post('/orders', orderData);
        return data.data;
    }

    async getOrders(): Promise<Order[]> {
        const { data } = await this.client.get('/orders');
        return data.data;
    }

    async getOrder(id: string): Promise<Order> {
        const { data } = await this.client.get(`/orders/${id}`);
        return data.data;
    }

    // User
    async getProfile(): Promise<User> {
        const { data } = await this.client.get('/users/profile');
        return data.data;
    }

    async updateProfile(profileData: Partial<User>): Promise<User> {
        const { data } = await this.client.patch('/users/profile', profileData);
        return data.data;
    }

    async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
        const { data } = await this.client.post('/users/addresses', address);
        return data.data;
    }

    async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
        const { data } = await this.client.patch(`/users/addresses/${id}`, address);
        return data.data;
    }

    async deleteAddress(id: string): Promise<void> {
        await this.client.delete(`/users/addresses/${id}`);
    }

    // Wishlist
    async getWishlist(): Promise<Product[]> {
        const { data } = await this.client.get('/users/wishlist');
        return data.data;
    }

    async addToWishlist(productId: string): Promise<void> {
        await this.client.post(`/users/wishlist/${productId}`);
    }

    async removeFromWishlist(productId: string): Promise<void> {
        await this.client.delete(`/users/wishlist/${productId}`);
    }

    // Payments
    async createPaymentIntent(orderId: string): Promise<{ clientSecret: string }> {
        const { data } = await this.client.post('/payments/create-intent', { orderId });
        return data.data;
    }

    // Reviews
    async getProductReviews(productId: string): Promise<Review[]> {
        const { data } = await this.client.get(`/products/${productId}/reviews`);
        return data.data;
    }

    async createReview(productId: string, review: {
        rating: number;
        title: string;
        content: string;
    }): Promise<Review> {
        const { data } = await this.client.post(`/products/${productId}/reviews`, review);
        return data.data;
    }

    // Newsletter
    async subscribeNewsletter(email: string): Promise<void> {
        await this.client.post('/newsletter/subscribe', { email });
    }

    // Contact
    async sendContactForm(formData: {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
    }): Promise<void> {
        await this.client.post('/contact', formData);
    }

    // Auth
    async register(userData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
    }): Promise<void> {
        await this.client.post('/auth/register', userData);
    }
}

export const api = new ApiClient();