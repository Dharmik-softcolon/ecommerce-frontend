import slide1 from '../public/images/slider/slide1.jpg'
import slide2 from '../public/images/slider/slide2.jpg'
import slide3 from '../public/images/slider/slide3.jpg'
import pch_img1 from '../public/images/placeholder/image1.jpg'
import story1 from '../public/images/about/story1.jpg'
import story2 from '../public/images/about/story2.jpg'
import insta_img1 from '../public/images/instagarm/image1.jpg'
import insta_img2 from '../public/images/instagarm/image2.jpg'
import insta_img3 from '../public/images/instagarm/image3.jpg'
import insta_img4 from '../public/images/instagarm/image4.jpg'
import insta_img5 from '../public/images/instagarm/image5.jpg'
import insta_img6 from '../public/images/instagarm/image6.jpg'
import man1 from '../public/images/catagories/man.jpg'



export const images = {
    hero: {
        main: [
            {
                id: 1,
                src: slide1,
                alt: 'Luxury Fashion Collection',
                title: 'New Season Arrivals',
                subtitle: 'Discover the latest trends',
                description:
                    'Explore our newest collection with premium fabrics and refined silhouettes.',
                cta: 'Shop Now',
                link: '/collections/new-arrivals',
                align: 'left' as const,
            },
            {
                id: 2,
                src: slide2,
                alt: 'Summer Collection',
                title: 'Summer Collection 2024',
                subtitle: 'Light fabrics, bold styles',
                description: 'Refresh your wardrobe with breathable essentials for the season.',
                cta: 'Explore',
                link: '/collections/summer',
                align: 'center' as const,
            },
            {
                id: 3,
                src: slide3,
                alt: 'Exclusive Deals',
                title: 'Up to 50% Off',
                subtitle: 'Limited time offer',
                description: 'Exclusive savings across our most loved styles and staples.',
                cta: 'Shop Sale',
                link: '/sale',
                align: 'right' as const,
            },
        ],
    },
    categories: [
        {
            id: 'men',
            name: 'Men',
            slug: 'men',
            image: `https://images.pexels.com/photos/5264953/pexels-photo-5264953.jpeg`,
            description: 'Premium menswear collection',
        },
        {
            id: 'women',
            name: 'Women',
            slug: 'women',
            image: 'https://images.pexels.com/photos/8387810/pexels-photo-8387810.jpeg',
            description: "Elegant women's fashion",
        },
        {
            id: 'accessories',
            name: 'Accessories',
            slug: 'accessories',
            image: 'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg',
            description: 'Complete your look',
        },
        {
            id: 'footwear',
            name: 'Footwear',
            slug: 'footwear',
            image: 'https://images.pexels.com/photos/12252411/pexels-photo-12252411.jpeg',
            description: 'Step into style',
        },
    ],
    collections: {
        summer2024: 'https://images.pexels.com/photos/29146340/pexels-photo-29146340.jpeg',
        winter2024: 'https://images.pexels.com/photos/6816022/pexels-photo-6816022.jpeg',
        spring2024: 'https://images.pexels.com/photos/14863850/pexels-photo-14863850.jpeg',
        autumn2024: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg',
        limitedEdition: 'https://images.pexels.com/photos/29920855/pexels-photo-29920855.jpeg',
        newArrivals: 'https://images.pexels.com/photos/7671163/pexels-photo-7671163.jpeg',
        bestsellers: 'https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg',
        trending: 'https://images.pexels.com/photos/8386641/pexels-photo-8386641.jpeg',
        casual: 'https://images.pexels.com/photos/8387145/pexels-photo-8387145.jpeg',
        formal: 'https://images.pexels.com/photos/7679742/pexels-photo-7679742.jpeg',
        streetwear: 'https://images.pexels.com/photos/6069977/pexels-photo-6069977.jpeg',
        minimalist: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
        vintage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        athleisure: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
    },
    featuredProducts: [
        {
            id: '1',
            name: 'Premium Cotton T-Shirt',
            price: 2499,
            compareAtPrice: 3499,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
            category: 'T-Shirts',
            isNew: true,
            isBestseller: false,
        },
        {
            id: '2',
            name: 'Silk Blend Formal Shirt',
            price: 5999,
            compareAtPrice: 7999,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
            category: 'Shirts',
            isNew: false,
            isBestseller: true,
        },
        {
            id: '3',
            name: 'Cashmere Wool Sweater',
            price: 12999,
            compareAtPrice: 15999,
            image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
            category: 'Sweaters',
            isNew: true,
            isBestseller: true,
        },
        {
            id: '4',
            name: 'Italian Leather Belt',
            price: 4499,
            compareAtPrice: 5499,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
            category: 'Belts',
            isNew: false,
            isBestseller: false,
        },
        {
            id: '5',
            name: 'Slim Fit Chinos',
            price: 3999,
            compareAtPrice: 4999,
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
            category: 'Pants',
            isNew: true,
            isBestseller: true,
        },
        {
            id: '6',
            name: 'Classic Leather Sneakers',
            price: 8999,
            compareAtPrice: 10999,
            image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
            category: 'Sneakers',
            isNew: false,
            isBestseller: true,
        },
        {
            id: '7',
            name: 'Linen Summer Blazer',
            price: 8999,
            compareAtPrice: 11999,
            image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
            category: 'Blazers',
            isNew: true,
            isBestseller: false,
        },
        {
            id: '8',
            name: 'Classic Watch',
            price: 15999,
            compareAtPrice: 19999,
            image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
            hoverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
            category: 'Watches',
            isNew: false,
            isBestseller: true,
        },
    ],
    testimonials: [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Fashion Blogger',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
            content:
                "The quality of LUXE products is exceptional. I've been a loyal customer for years and they never disappoint.",
            rating: 5,
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Entrepreneur',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
            content:
                'Perfect fit, premium materials, and excellent customer service. LUXE is my go-to for professional attire.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Designer',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
            content:
                'I appreciate the attention to detail in every piece. The craftsmanship is truly remarkable.',
            rating: 5,
        },
    ],
    instagram: [
        insta_img1,
        insta_img2,
        insta_img3,
        insta_img4,
        insta_img5,
        insta_img6,
    ],
    about: {
        hero: 'https://images.pexels.com/photos/6127577/pexels-photo-6127577.jpeg',
        story: [
            story1,
            story2,
        ],
    },
    placeholder: {
        product: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&q=80',
        category: pch_img1,
        generic: '/images/placeholder.svg',
    },
};

export default images;
