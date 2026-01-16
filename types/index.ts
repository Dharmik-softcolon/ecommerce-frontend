// frontend/types/index.ts
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    compareAtPrice?: number;
    images: ProductImage[];
    category: Category;
    categoryId: string;
    collection?: Collection;
    collectionId?: string;
    variants: ProductVariant[];
    tags: string[];
    isNew: boolean;
    isFeatured: boolean;
    isBestseller: boolean;
    stock: number;
    sku: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    position: number;
}

export interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    size?: string;
    color?: string;
    colorHex?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: string;
    parent?: Category;
    children?: Category[];
}

export interface Collection {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image: string;
    products?: Product[];
}

export interface CartItem {
    id: string;
    productId: string;
    product: Product;
    variantId: string;
    variant: ProductVariant;
    quantity: number;
    price: number;
}

export interface Cart {
    id: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    itemCount: number;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    addresses: Address[];
    orders: Order[];
    wishlist: Product[];
    createdAt: string;
}

export interface Address {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    items: OrderItem[];
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    product: Product;
    variantId: string;
    variant: ProductVariant;
    quantity: number;
    price: number;
}

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export type PaymentStatus =
    | 'pending'
    | 'paid'
    | 'failed'
    | 'refunded';

export interface Review {
    id: string;
    productId: string;
    userId: string;
    user: User;
    rating: number;
    title: string;
    content: string;
    images?: string[];
    isVerified: boolean;
    createdAt: string;
}

export interface FilterOptions {
    categories: string[];
    collections: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
    priceRange: { min: number; max: number };
    tags: string[];
}

export interface Filters {
    category?: string;
    collection?: string;
    sizes?: string[];
    colors?: string[];
    priceMin?: number;
    priceMax?: number;
    sort?: SortOption;
    search?: string;
    page?: number;
    limit?: number;
}

export type SortOption =
    | 'newest'
    | 'price-asc'
    | 'price-desc'
    | 'name-asc'
    | 'name-desc'
    | 'bestselling';

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}