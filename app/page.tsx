// frontend/app/page.tsx
import { HeroSection } from '@/components/home/hero-section';
import { CategoryGrid } from '@/components/home/category-grid';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CollectionBanner } from '@/components/home/collection-banner';
import { NewArrivals } from '@/components/home/new-arrivals';
import { BrandStory } from '@/components/home/brand-story';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramFeed } from '@/components/home/instagram-feed';
import { api } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
    const [featuredProducts, newArrivals, collections, categories] = await Promise.all([
        api.getFeaturedProducts(),
        api.getNewArrivals(),
        api.getCollections(),
        api.getCategories(),
    ]);

    return (
        <main>
            <HeroSection />
            <CategoryGrid categories={categories} />
            <NewArrivals products={newArrivals} />
            <CollectionBanner collection={collections[0]} />
            <FeaturedProducts products={featuredProducts} />
            <BrandStory />
            <Testimonials />
            <InstagramFeed />
        </main>
    );
}