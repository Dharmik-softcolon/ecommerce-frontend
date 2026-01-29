// frontend/lib/api.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import type { ApiResponse, PaginatedResponse, Product, Category, Collection, Cart, Order, User, Filters, Address, Review } from '@/types';
import { images } from './images';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Check if we should use mock data (when backend is not available)
// In production with a real backend, set NEXT_PUBLIC_USE_MOCK_DATA to "false"
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Product images organized by category
const productImages = {
    men: [
        { main: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80', hover: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80', hover: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', hover: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', hover: 'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', hover: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80', hover: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80' },
    ],
    women: [
        { main: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80', hover: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', hover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80', hover: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80', hover: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80', hover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80', hover: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80' },
    ],
    accessories: [
        { main: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', hover: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', hover: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', hover: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', hover: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80', hover: 'https://images.unsplash.com/photo-1587467512961-120760940315?w=800&q=80' },
    ],
    footwear: [
        { main: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', hover: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', hover: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', hover: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80', hover: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80' },
        { main: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80', hover: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80' },
    ],
};

// Product data organized by category
const productData = {
    men: [
        { name: 'Premium Cotton T-Shirt', price: 2499, compareAtPrice: 3499, isNew: true, isBestseller: false, category: 'T-Shirts' },
        { name: 'Silk Blend Formal Shirt', price: 5999, compareAtPrice: 7999, isNew: false, isBestseller: true, category: 'Shirts' },
        { name: 'Slim Fit Chinos', price: 3999, compareAtPrice: 4999, isNew: true, isBestseller: true, category: 'Pants' },
        { name: 'Linen Summer Blazer', price: 8999, compareAtPrice: 11999, isNew: true, isBestseller: false, category: 'Blazers' },
        { name: 'Classic Polo Shirt', price: 2999, compareAtPrice: 3999, isNew: false, isBestseller: true, category: 'Polos' },
        { name: 'Tailored Wool Suit', price: 24999, compareAtPrice: 29999, isNew: true, isBestseller: false, category: 'Suits' },
    ],
    women: [
        { name: 'Elegant Silk Dress', price: 8999, compareAtPrice: 11999, isNew: true, isBestseller: true, category: 'Dresses' },
        { name: 'Cashmere Wool Sweater', price: 12999, compareAtPrice: 15999, isNew: true, isBestseller: true, category: 'Sweaters' },
        { name: 'Floral Summer Blouse', price: 3999, compareAtPrice: 4999, isNew: true, isBestseller: false, category: 'Blouses' },
        { name: 'High-Waist Trousers', price: 5999, compareAtPrice: 7499, isNew: false, isBestseller: true, category: 'Pants' },
        { name: 'Designer Maxi Skirt', price: 4499, compareAtPrice: 5999, isNew: false, isBestseller: false, category: 'Skirts' },
        { name: 'Tailored Blazer', price: 9999, compareAtPrice: 12999, isNew: true, isBestseller: true, category: 'Blazers' },
    ],
    accessories: [
        { name: 'Italian Leather Belt', price: 4499, compareAtPrice: 5499, isNew: false, isBestseller: true, category: 'Belts' },
        { name: 'Classic Luxury Watch', price: 15999, compareAtPrice: 19999, isNew: false, isBestseller: true, category: 'Watches' },
        { name: 'Premium Leather Wallet', price: 3499, compareAtPrice: 4499, isNew: true, isBestseller: false, category: 'Wallets' },
        { name: 'Designer Sunglasses', price: 7999, compareAtPrice: 9999, isNew: true, isBestseller: true, category: 'Sunglasses' },
        { name: 'Silk Pocket Square', price: 1499, compareAtPrice: 1999, isNew: false, isBestseller: false, category: 'Pocket Squares' },
    ],
    footwear: [
        { name: 'Classic Leather Sneakers', price: 8999, compareAtPrice: 10999, isNew: false, isBestseller: true, category: 'Sneakers' },
        { name: 'Oxford Dress Shoes', price: 12999, compareAtPrice: 15999, isNew: true, isBestseller: true, category: 'Formal Shoes' },
        { name: 'Suede Loafers', price: 7999, compareAtPrice: 9999, isNew: true, isBestseller: false, category: 'Loafers' },
        { name: 'Premium Running Shoes', price: 9999, compareAtPrice: 12999, isNew: true, isBestseller: true, category: 'Running Shoes' },
        { name: 'Chelsea Boots', price: 11999, compareAtPrice: 14999, isNew: false, isBestseller: false, category: 'Boots' },
    ],
};

// Generate products for a specific category
function generateCategoryProducts(categorySlug: string): Product[] {
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    const categoryImages = productImages[categorySlug as keyof typeof productImages] || productImages.men;
    const categoryData = productData[categorySlug as keyof typeof productData] || productData.men;
    
    return categoryData.map((product, index) => {
        const img = categoryImages[index % categoryImages.length];
        const id = `${categorySlug}-${index + 1}`;
        
        return {
            id,
            name: product.name,
            slug: `${categorySlug}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
            description: `Premium quality ${product.category.toLowerCase()} crafted with exceptional attention to detail. Made from high-quality materials for ultimate comfort and style.`,
            shortDescription: `Premium ${product.category.toLowerCase()} with exceptional quality`,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            images: [
                { id: '1', url: img.main, alt: product.name, position: 0 },
                { id: '2', url: img.hover, alt: product.name, position: 1 },
            ],
            category: { 
                id: categorySlug, 
                name: categoryName, 
                slug: categorySlug,
            },
            categoryId: categorySlug,
            collection: { id: categorySlug, name: categoryName, slug: categorySlug, image: '' },
            collectionId: categorySlug,
            variants: [
                { id: `${id}-s`, _id: `${id}-s`, name: 'Small', sku: `SKU-${id}-S`, price: product.price, stock: 10, size: 'S', color: 'Black', colorHex: '#000000' },
                { id: `${id}-m`, _id: `${id}-m`, name: 'Medium', sku: `SKU-${id}-M`, price: product.price, stock: 15, size: 'M', color: 'Black', colorHex: '#000000' },
                { id: `${id}-l`, _id: `${id}-l`, name: 'Large', sku: `SKU-${id}-L`, price: product.price, stock: 12, size: 'L', color: 'Navy', colorHex: '#1e3a5f' },
                { id: `${id}-xl`, _id: `${id}-xl`, name: 'XL', sku: `SKU-${id}-XL`, price: product.price, stock: 8, size: 'XL', color: 'White', colorHex: '#ffffff' },
            ],
            tags: [product.category, categorySlug, product.isNew ? 'new' : '', product.isBestseller ? 'bestseller' : ''].filter(Boolean),
            isNew: product.isNew,
            isFeatured: product.isBestseller,
            isBestseller: product.isBestseller,
            stock: 45,
            sku: `LUXE-${categorySlug.toUpperCase()}-${(index + 1).toString().padStart(3, '0')}`,
            rating: 4 + Math.random(),
            reviewCount: Math.floor(Math.random() * 100) + 10,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        };
    });
}

// Generate all mock products
function generateAllMockProducts(): Product[] {
    const categories = ['men', 'women', 'accessories', 'footwear'];
    const allProducts: Product[] = [];
    
    categories.forEach(category => {
        allProducts.push(...generateCategoryProducts(category));
    });
    
    return allProducts;
}

// Summer collection products
function generateSummerProducts(): Product[] {
    const summerData = [
        { name: 'Linen Summer Shirt', price: 3999, compareAtPrice: 4999, category: 'men', subcat: 'Shirts' },
        { name: 'Cotton Beach Shorts', price: 2499, compareAtPrice: 2999, category: 'men', subcat: 'Shorts' },
        { name: 'Light Maxi Dress', price: 5999, compareAtPrice: 7499, category: 'women', subcat: 'Dresses' },
        { name: 'Straw Beach Hat', price: 1999, compareAtPrice: 2499, category: 'accessories', subcat: 'Hats' },
        { name: 'Canvas Espadrilles', price: 3499, compareAtPrice: 4499, category: 'footwear', subcat: 'Sandals' },
        { name: 'Floral Wrap Dress', price: 4999, compareAtPrice: 6499, category: 'women', subcat: 'Dresses' },
    ];
    
    const summerImages = [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
        'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
        'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=800&q=80',
        'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
    ];
    
    return summerData.map((item, index) => ({
        id: `summer-${index + 1}`,
        name: item.name,
        slug: `summer-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
        description: `Perfect for summer days. ${item.name} designed for comfort and style in warm weather.`,
        shortDescription: `Summer essential - ${item.subcat}`,
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        images: [
            { id: '1', url: summerImages[index], alt: item.name, position: 0 },
            { id: '2', url: summerImages[(index + 1) % summerImages.length], alt: item.name, position: 1 },
        ],
        category: { id: item.category, name: item.category.charAt(0).toUpperCase() + item.category.slice(1), slug: item.category },
        categoryId: item.category,
        collection: { id: 'summer', name: 'Summer Collection', slug: 'summer', image: images.collections.summer2024 },
        collectionId: 'summer',
        variants: [
            { id: `summer-${index}-m`, _id: `summer-${index}-m`, name: 'Medium', sku: `SKU-SUM-${index}-M`, price: item.price, stock: 15, size: 'M', color: 'White', colorHex: '#ffffff' },
            { id: `summer-${index}-l`, _id: `summer-${index}-l`, name: 'Large', sku: `SKU-SUM-${index}-L`, price: item.price, stock: 12, size: 'L', color: 'Beige', colorHex: '#f5f5dc' },
        ],
        tags: ['summer', 'seasonal', item.category],
        isNew: true,
        isFeatured: true,
        isBestseller: index < 3,
        stock: 30,
        sku: `LUXE-SUM-${(index + 1).toString().padStart(3, '0')}`,
        rating: 4.5,
        reviewCount: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }));
}

// Formal collection products
function generateFormalProducts(): Product[] {
    const formalData = [
        { name: 'Tailored Business Suit', price: 29999, compareAtPrice: 35999, category: 'men', subcat: 'Suits' },
        { name: 'Classic White Dress Shirt', price: 4999, compareAtPrice: 5999, category: 'men', subcat: 'Shirts' },
        { name: 'Silk Tie Collection', price: 2999, compareAtPrice: 3499, category: 'accessories', subcat: 'Ties' },
        { name: 'Elegant Pencil Dress', price: 7999, compareAtPrice: 9999, category: 'women', subcat: 'Dresses' },
        { name: 'Patent Leather Oxfords', price: 14999, compareAtPrice: 17999, category: 'footwear', subcat: 'Formal Shoes' },
        { name: 'Wool Blend Trousers', price: 6999, compareAtPrice: 8499, category: 'men', subcat: 'Pants' },
    ];
    
    const formalImages = [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
        'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80',
        'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80',
        'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ];
    
    return formalData.map((item, index) => ({
        id: `formal-${index + 1}`,
        name: item.name,
        slug: `formal-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
        description: `Professional attire for the modern workplace. ${item.name} crafted with premium materials.`,
        shortDescription: `Formal wear - ${item.subcat}`,
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        images: [
            { id: '1', url: formalImages[index], alt: item.name, position: 0 },
            { id: '2', url: formalImages[(index + 1) % formalImages.length], alt: item.name, position: 1 },
        ],
        category: { id: item.category, name: item.category.charAt(0).toUpperCase() + item.category.slice(1), slug: item.category },
        categoryId: item.category,
        collection: { id: 'formal', name: 'Formal Wear', slug: 'formal', image: images.collections.formal },
        collectionId: 'formal',
        variants: [
            { id: `formal-${index}-m`, _id: `formal-${index}-m`, name: 'Medium', sku: `SKU-FRM-${index}-M`, price: item.price, stock: 10, size: 'M', color: 'Black', colorHex: '#000000' },
            { id: `formal-${index}-l`, _id: `formal-${index}-l`, name: 'Large', sku: `SKU-FRM-${index}-L`, price: item.price, stock: 8, size: 'L', color: 'Navy', colorHex: '#1e3a5f' },
        ],
        tags: ['formal', 'professional', 'business', item.category],
        isNew: index < 2,
        isFeatured: true,
        isBestseller: index % 2 === 0,
        stock: 20,
        sku: `LUXE-FRM-${(index + 1).toString().padStart(3, '0')}`,
        rating: 4.7,
        reviewCount: 40,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }));
}

// Casual collection products
function generateCasualProducts(): Product[] {
    const casualData = [
        { name: 'Relaxed Fit Hoodie', price: 3999, compareAtPrice: 4999, category: 'men', subcat: 'Hoodies' },
        { name: 'Vintage Wash Jeans', price: 4999, compareAtPrice: 5999, category: 'men', subcat: 'Jeans' },
        { name: 'Cozy Knit Sweater', price: 4499, compareAtPrice: 5499, category: 'women', subcat: 'Sweaters' },
        { name: 'Canvas Sneakers', price: 3499, compareAtPrice: 4499, category: 'footwear', subcat: 'Sneakers' },
        { name: 'Graphic Print T-Shirt', price: 1999, compareAtPrice: 2499, category: 'men', subcat: 'T-Shirts' },
        { name: 'Jogger Pants', price: 2999, compareAtPrice: 3999, category: 'women', subcat: 'Pants' },
    ];
    
    const casualImages = [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
    ];
    
    return casualData.map((item, index) => ({
        id: `casual-${index + 1}`,
        name: item.name,
        slug: `casual-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
        description: `Everyday comfort meets style. ${item.name} for your casual wardrobe.`,
        shortDescription: `Casual wear - ${item.subcat}`,
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        images: [
            { id: '1', url: casualImages[index], alt: item.name, position: 0 },
            { id: '2', url: casualImages[(index + 1) % casualImages.length], alt: item.name, position: 1 },
        ],
        category: { id: item.category, name: item.category.charAt(0).toUpperCase() + item.category.slice(1), slug: item.category },
        categoryId: item.category,
        collection: { id: 'casual', name: 'Casual Wear', slug: 'casual', image: images.collections.casual },
        collectionId: 'casual',
        variants: [
            { id: `casual-${index}-m`, _id: `casual-${index}-m`, name: 'Medium', sku: `SKU-CAS-${index}-M`, price: item.price, stock: 20, size: 'M', color: 'Gray', colorHex: '#808080' },
            { id: `casual-${index}-l`, _id: `casual-${index}-l`, name: 'Large', sku: `SKU-CAS-${index}-L`, price: item.price, stock: 18, size: 'L', color: 'Black', colorHex: '#000000' },
        ],
        tags: ['casual', 'everyday', 'comfortable', item.category],
        isNew: index < 3,
        isFeatured: true,
        isBestseller: index % 2 === 1,
        stock: 40,
        sku: `LUXE-CAS-${(index + 1).toString().padStart(3, '0')}`,
        rating: 4.4,
        reviewCount: 55,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }));
}

// Get all products including collection-specific ones
function getAllMockProducts(): Product[] {
    return [
        ...generateAllMockProducts(),
        ...generateSummerProducts(),
        ...generateFormalProducts(),
        ...generateCasualProducts(),
    ];
}

// Mock collections
function getMockCollections(): Collection[] {
    return [
        { id: 'new-arrivals', name: 'New Arrivals', slug: 'new-arrivals', description: 'Latest styles just in', image: images.collections.newArrivals },
        { id: 'bestsellers', name: 'Bestsellers', slug: 'bestsellers', description: 'Our most popular items', image: images.collections.bestsellers },
        { id: 'men', name: 'Men', slug: 'men', description: 'Premium menswear', image: images.categories[0].image },
        { id: 'women', name: 'Women', slug: 'women', description: 'Elegant womenswear', image: images.categories[1].image },
        { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Complete your look', image: images.categories[2].image },
        { id: 'footwear', name: 'Footwear', slug: 'footwear', description: 'Step into style', image: images.categories[3].image },
        { id: 'summer', name: 'Summer Collection', slug: 'summer', description: 'Summer essentials', image: images.collections.summer2024 },
        { id: 'formal', name: 'Formal Wear', slug: 'formal', description: 'Professional attire', image: images.collections.formal },
        { id: 'casual', name: 'Casual Wear', slug: 'casual', description: 'Everyday comfort', image: images.collections.casual },
        { id: 'trending', name: 'Trending Now', slug: 'trending', description: 'What\'s hot right now', image: images.collections.trending },
    ];
}

// Mock categories
function getMockCategories(): Category[] {
    return images.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
    }));
}

class ApiClient {
    private mockProducts: Product[] = getAllMockProducts();
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000,
        });

        this.client.interceptors.request.use(
            async (config) => {
                if (typeof window !== 'undefined') {
                    try {
                        const session = await getSession();
                        if (session?.accessToken) {
                            config.headers = config.headers ?? {};
                            config.headers.Authorization = `Bearer ${session.accessToken}`;
                        }
                    } catch { /* ignore */ }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<ApiResponse<unknown>>) => {
                // Silent fail for network/404 errors
                return Promise.reject(error);
            }
        );
    }

    // Products
    async getProducts(filters?: Filters): Promise<PaginatedResponse<Product>> {
        if (USE_MOCK_DATA) {
            return this.getMockProducts(filters);
        }
        
        try {
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
        } catch {
            return this.getMockProducts(filters);
        }
    }

    private getMockProducts(filters?: Filters): PaginatedResponse<Product> {
        let products = [...this.mockProducts];
        
        // Filter by collection
        if (filters?.collection) {
            const collection = filters.collection.toLowerCase();
            
            switch (collection) {
                case 'new-arrivals':
                    products = products.filter(p => p.isNew);
                    break;
                case 'bestsellers':
                    products = products.filter(p => p.isBestseller);
                    break;
                case 'sale':
                    products = products.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
                    break;
                case 'trending':
                    products = products.filter(p => p.isBestseller || p.isNew).slice(0, 12);
                    break;
                case 'men':
                case 'women':
                case 'accessories':
                case 'footwear':
                    // Filter by category
                    products = products.filter(p => p.categoryId === collection || p.category.slug === collection);
                    break;
                case 'summer':
                case 'formal':
                case 'casual':
                    // Filter by collection ID
                    products = products.filter(p => p.collectionId === collection);
                    break;
                default:
                    // For unknown collections, show featured products
                    products = products.filter(p => p.isFeatured);
            }
        }
        
        // Filter by category (if different from collection)
        if (filters?.category && filters.category !== filters?.collection) {
            products = products.filter(p => 
                p.categoryId === filters.category || 
                p.category.slug === filters.category
            );
        }
        
        // Filter by price
        if (filters?.priceMin !== undefined) {
            products = products.filter(p => p.price >= filters.priceMin!);
        }
        if (filters?.priceMax !== undefined) {
            products = products.filter(p => p.price <= filters.priceMax!);
        }
        
        // Filter by sizes
        if (filters?.sizes && filters.sizes.length > 0) {
            products = products.filter(p => 
                p.variants.some(v => filters.sizes!.includes(v.size || ''))
            );
        }
        
        // Sort
        if (filters?.sort) {
            switch (filters.sort) {
                case 'price-asc':
                    products.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    products.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    break;
                case 'name-asc':
                    products.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    products.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'bestselling':
                    products.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
                    break;
            }
        }
        
        // Pagination
        const page = filters?.page || 1;
        const limit = filters?.limit || 12;
        const total = products.length;
        const start = (page - 1) * limit;
        const paginatedProducts = products.slice(start, start + limit);
        
        return {
            data: paginatedProducts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        };
    }

    async getProduct(slug: string): Promise<Product> {
        const product = this.mockProducts.find(p => p.slug === slug);
        if (product) return product;
        return this.mockProducts[0];
    }

    async getFeaturedProducts(): Promise<Product[]> {
        return this.mockProducts.filter(p => p.isFeatured).slice(0, 8);
    }

    async getNewArrivals(): Promise<Product[]> {
        return this.mockProducts.filter(p => p.isNew).slice(0, 8);
    }

    async getBestsellers(): Promise<Product[]> {
        return this.mockProducts.filter(p => p.isBestseller).slice(0, 8);
    }

    async searchProducts(query: string): Promise<Product[]> {
        const q = query.toLowerCase();
        return this.mockProducts.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.category.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    // Categories
    async getCategories(): Promise<Category[]> {
        return getMockCategories();
    }

    async getCategory(slug: string): Promise<Category> {
        const categories = getMockCategories();
        return categories.find(c => c.slug === slug) || categories[0];
    }

    // Collections
    async getCollections(): Promise<Collection[]> {
        return getMockCollections();
    }

    async getCollection(slug: string): Promise<Collection> {
        const collections = getMockCollections();
        const collection = collections.find(c => c.slug === slug);
        if (collection) return collection;
        
        // Create dynamic collection for unknown slugs
        const formattedName = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return {
            id: slug,
            name: formattedName,
            slug: slug,
            description: `Explore our ${formattedName.toLowerCase()} collection`,
            image: images.collections.newArrivals,
        };
    }

    // Cart - Managed locally
    async getCart(): Promise<Cart> { throw new Error('Cart is managed locally'); }
    async addToCart(): Promise<Cart> { throw new Error('Cart is managed locally'); }
    async updateCartItem(): Promise<Cart> { throw new Error('Cart is managed locally'); }
    async removeFromCart(): Promise<Cart> { throw new Error('Cart is managed locally'); }
    async clearCart(): Promise<void> { throw new Error('Cart is managed locally'); }

    // Orders
    async createOrder(orderData: any): Promise<Order> {
        return {
            id: `ORD-${Date.now()}`,
            orderNumber: `LUXE-${Date.now().toString().slice(-8)}`,
            status: 'pending',
            items: [],
            shippingAddress: {} as Address,
            billingAddress: {} as Address,
            paymentMethod: 'card',
            paymentStatus: 'pending',
            subtotal: 0, tax: 0, shipping: 0, discount: 0, total: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }

    async getOrders(): Promise<Order[]> { return []; }
    async getOrder(id: string): Promise<Order> { throw new Error('Order not found'); }

    // User
    async getProfile(): Promise<User> { throw new Error('Not authenticated'); }
    async updateProfile(data: Partial<User>): Promise<User> { throw new Error('Not authenticated'); }
    async addAddress(address: Omit<Address, 'id'>): Promise<Address> { return { ...address, id: `addr-${Date.now()}` }; }
    async updateAddress(id: string, address: Partial<Address>): Promise<Address> { return { id, ...address } as Address; }
    async deleteAddress(id: string): Promise<void> {}

    // Wishlist - Managed locally
    async getWishlist(): Promise<Product[]> { return []; }
    async addToWishlist(productId: string): Promise<void> {}
    async removeFromWishlist(productId: string): Promise<void> {}

    // Payments
    async createPaymentIntent(orderId: string): Promise<{ clientSecret: string }> {
        return { clientSecret: 'mock_client_secret' };
    }

    // Reviews
    async getProductReviews(productId: string): Promise<Review[]> {
        return images.testimonials.map((t, i) => ({
            id: `review-${i}`,
            productId,
            userId: `user-${i}`,
            user: { id: `user-${i}`, email: '', firstName: t.name.split(' ')[0], lastName: t.name.split(' ')[1] || '', addresses: [], orders: [], wishlist: [], createdAt: '' },
            rating: t.rating,
            title: 'Great product!',
            content: t.content,
            isVerified: true,
            createdAt: new Date().toISOString(),
        }));
    }

    async createReview(productId: string, review: { rating: number; title: string; content: string }): Promise<Review> {
        return {
            id: `review-${Date.now()}`,
            productId,
            userId: 'user-1',
            user: { id: 'user-1', email: '', firstName: 'You', lastName: '', addresses: [], orders: [], wishlist: [], createdAt: '' },
            ...review,
            isVerified: true,
            createdAt: new Date().toISOString(),
        };
    }

    // Newsletter & Contact
    async subscribeNewsletter(email: string): Promise<void> { console.log('Newsletter:', email); }
    async sendContactForm(formData: any): Promise<void> { console.log('Contact:', formData); }
    async register(userData: any): Promise<void> { console.log('Register:', userData.email); }
}

export const api = new ApiClient();
