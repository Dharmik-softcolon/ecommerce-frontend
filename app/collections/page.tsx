// frontend/app/collections/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { api } from '@/lib/api';
import { images } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Collections | LUXE',
    description: 'Explore our curated collections of premium clothing and accessories.',
};

export const revalidate = 3600;

export default async function CollectionsPage() {
    let collections = [];
    
    try {
        collections = await api.getCollections();
    } catch (error) {
        // Use fallback collections if API fails
        collections = [
            { id: '1', name: 'New Arrivals', slug: 'new-arrivals', description: 'Discover the latest trends', image: images.collections.newArrivals },
            { id: '2', name: 'Men', slug: 'men', description: 'Premium menswear collection', image: images.categories[0].image },
            { id: '3', name: 'Women', slug: 'women', description: "Elegant women's fashion", image: images.categories[1].image },
            { id: '4', name: 'Summer Collection', slug: 'summer', description: 'Light fabrics for sunny days', image: images.collections.summer2024 },
            { id: '5', name: 'Winter Collection', slug: 'winter', description: 'Stay warm in style', image: images.collections.winter2024 },
            { id: '6', name: 'Festive Edit', slug: 'festive', description: 'Celebrate in elegance', image: images.collections.trending },
            { id: '7', name: 'Wedding Collection', slug: 'wedding', description: 'For your special day', image: images.collections.formal },
            { id: '8', name: 'Accessories', slug: 'accessories', description: 'Complete your look', image: images.categories[2].image },
        ];
    }

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div
                className="relative h-[30vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${images.collections.newArrivals})` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative text-center text-white">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Our Collections
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto px-4">
                        Explore our carefully curated collections designed for every occasion
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {collections.map((collection: any) => (
                        <Link
                            key={collection.id}
                            href={`/collections/${collection.slug}`}
                            className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-muted"
                        >
                            <Image
                                src={collection.image || images.placeholder.category}
                                alt={collection.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <h3 className="text-white font-display text-2xl font-semibold mb-2">
                                    {collection.name}
                                </h3>
                                {collection.description && (
                                    <p className="text-white/70 text-sm mb-3">
                                        {collection.description}
                                    </p>
                                )}
                                <span className="text-white/90 text-sm font-medium tracking-wide uppercase group-hover:underline">
                                    Explore Collection →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
