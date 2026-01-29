
import { HeroSection } from '@/components/home/hero-section';
import { OffersSection } from '@/components/home/offers-section';
import { Bestsellers } from '@/components/home/bestsellers';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CollectionBanner } from '@/components/home/collection-banner';
import { BrandStory } from '@/components/home/brand-story';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramFeed } from '@/components/home/instagram-feed';
import { api } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
    const [featuredProducts, bestsellers, collections] = await Promise.all([
        api.getFeaturedProducts(),
        api.getBestsellers(),
        api.getCollections(),
    ]);

    return (
        <main>
            <HeroSection />
            <OffersSection />
            <Bestsellers products={bestsellers} />
            <CollectionBanner collection={collections[0]} />
            <FeaturedProducts products={featuredProducts} />
            <BrandStory />
            <Testimonials />
            <InstagramFeed />
        </main>
    );
}