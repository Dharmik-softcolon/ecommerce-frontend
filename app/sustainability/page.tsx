// frontend/app/sustainability/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Leaf, Recycle, Heart, Globe } from 'lucide-react';
import { images } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Sustainability | LUXE',
    description: 'Our commitment to sustainable fashion and ethical practices at LUXE.',
};

const initiatives = [
    {
        icon: Leaf,
        title: 'Sustainable Materials',
        description: '80% of our fabrics come from sustainable sources including organic cotton, recycled polyester, and TENCEL™.',
        progress: 80,
    },
    {
        icon: Recycle,
        title: 'Zero Waste Goal',
        description: 'Working towards zero waste production by 2028 through innovative recycling and upcycling programs.',
        progress: 65,
    },
    {
        icon: Heart,
        title: 'Fair Labor',
        description: '100% of our partner factories are certified for fair labor practices and safe working conditions.',
        progress: 100,
    },
    {
        icon: Globe,
        title: 'Carbon Neutral',
        description: 'On track to achieve carbon neutrality across all operations by 2027.',
        progress: 45,
    },
];

export default function SustainabilityPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Sustainability', href: '/sustainability' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div
                className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${images.collections.minimalist})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-black/60" />
                <div className="relative text-center text-white px-4">
                    <Leaf className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Fashion for the Future
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Our commitment to sustainable and ethical fashion
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Mission Statement */}
                <section className="py-16 text-center">
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        "At LUXE, we believe that premium fashion and environmental responsibility go hand in hand. 
                        We're committed to minimizing our footprint while maximizing our positive impact on people and the planet."
                    </p>
                </section>

                {/* Initiatives */}
                <section className="py-12">
                    <div className="text-center mb-12">
                        <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">
                            Our Initiatives
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                            Making a Difference
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {initiatives.map((initiative) => (
                            <div
                                key={initiative.title}
                                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                            >
                                <initiative.icon className="h-10 w-10 text-green-600 mb-4" />
                                <h3 className="font-semibold text-xl mb-2">{initiative.title}</h3>
                                <p className="text-muted-foreground mb-4">{initiative.description}</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress</span>
                                        <span className="font-medium">{initiative.progress}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${initiative.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact Numbers */}
                <section className="py-16 bg-green-50 dark:bg-green-950/20 -mx-4 md:-mx-8 px-4 md:px-8 rounded-xl">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold">
                            Our Impact in 2025
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="font-display text-4xl md:text-5xl font-bold text-green-600">50K</div>
                            <div className="text-muted-foreground mt-2">Plastic Bottles Recycled</div>
                        </div>
                        <div>
                            <div className="font-display text-4xl md:text-5xl font-bold text-green-600">2M</div>
                            <div className="text-muted-foreground mt-2">Liters of Water Saved</div>
                        </div>
                        <div>
                            <div className="font-display text-4xl md:text-5xl font-bold text-green-600">30%</div>
                            <div className="text-muted-foreground mt-2">Carbon Reduction</div>
                        </div>
                        <div>
                            <div className="font-display text-4xl md:text-5xl font-bold text-green-600">5K</div>
                            <div className="text-muted-foreground mt-2">Trees Planted</div>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">
                            Our Certifications
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['GOTS Certified', 'OEKO-TEX Standard', 'B Corp Pending', 'Fair Trade'].map((cert) => (
                            <div
                                key={cert}
                                className="px-6 py-4 border-2 rounded-lg text-center"
                            >
                                <span className="font-semibold">{cert}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 text-center">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                        Shop Sustainably
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Every purchase supports our mission to create a more sustainable fashion industry.
                    </p>
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                        <Link href="/collections">
                            Shop Sustainable Collection
                        </Link>
                    </Button>
                </section>
            </div>
        </main>
    );
}
