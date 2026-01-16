// frontend/app/stores/page.tsx
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { images } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Store Locator | LUXE',
    description: 'Find a LUXE store near you. Visit us for an exceptional shopping experience.',
};

const stores = [
    {
        id: 1,
        name: 'LUXE Mumbai Flagship',
        address: 'Linking Road, Bandra West, Mumbai 400050',
        phone: '+91 22 2600 1234',
        hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
        image: images.collections.formal,
        isFlagship: true,
    },
    {
        id: 2,
        name: 'LUXE Delhi',
        address: 'Khan Market, New Delhi 110003',
        phone: '+91 11 4100 5678',
        hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
        image: images.collections.casual,
        isFlagship: false,
    },
    {
        id: 3,
        name: 'LUXE Bangalore',
        address: 'UB City Mall, Vittal Mallya Road, Bangalore 560001',
        phone: '+91 80 4000 9012',
        hours: 'Mon-Sun: 11:00 AM - 9:00 PM',
        image: images.collections.streetwear,
        isFlagship: false,
    },
    {
        id: 4,
        name: 'LUXE Hyderabad',
        address: 'Jubilee Hills, Road No. 36, Hyderabad 500033',
        phone: '+91 40 2300 3456',
        hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
        image: images.collections.minimalist,
        isFlagship: false,
    },
    {
        id: 5,
        name: 'LUXE Chennai',
        address: 'Phoenix Marketcity, Velachery, Chennai 600042',
        phone: '+91 44 4200 7890',
        hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
        image: images.collections.trending,
        isFlagship: false,
    },
    {
        id: 6,
        name: 'LUXE Pune',
        address: 'Koregaon Park, Pune 411001',
        phone: '+91 20 2600 2345',
        hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
        image: images.collections.bestsellers,
        isFlagship: false,
    },
];

export default function StoresPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Store Locator', href: '/stores' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-24">
                <div className="container-custom text-center">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Find a Store
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                        Visit us in person for an exceptional shopping experience
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <Input
                            placeholder="Enter city or pincode"
                            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        />
                        <Button variant="secondary">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Stores Grid */}
                <section className="py-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display text-2xl font-bold">
                            Our Stores ({stores.length})
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stores.map((store) => (
                            <div
                                key={store.id}
                                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div
                                    className="h-48 bg-cover bg-center relative"
                                    style={{ backgroundImage: `url(${store.image})` }}
                                >
                                    {store.isFlagship && (
                                        <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                            Flagship Store
                                        </span>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-semibold text-lg mb-3">{store.name}</h3>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            {store.address}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 flex-shrink-0" />
                                            {store.phone}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 flex-shrink-0" />
                                            {store.hours}
                                        </p>
                                    </div>
                                    <Button variant="outline" className="w-full mt-4" size="sm">
                                        <Navigation className="h-4 w-4 mr-2" />
                                        Get Directions
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 bg-muted/30 -mx-4 md:-mx-8 px-4 md:px-8 rounded-xl mt-8">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                            In-Store Services
                        </h2>
                        <p className="text-muted-foreground">
                            Experience premium services at any LUXE store
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '👔', title: 'Personal Styling', description: 'Free styling consultations' },
                            { icon: '📐', title: 'Custom Tailoring', description: 'Perfect fit alterations' },
                            { icon: '🎁', title: 'Gift Wrapping', description: 'Complimentary gift services' },
                            { icon: '☕', title: 'Lounge Area', description: 'Relax while you shop' },
                        ].map((service) => (
                            <div key={service.title} className="text-center">
                                <div className="text-3xl mb-3">{service.icon}</div>
                                <h3 className="font-semibold mb-1">{service.title}</h3>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
