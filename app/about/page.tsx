// frontend/app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { images } from '@/lib/images';

export const metadata: Metadata = {
    title: 'About Us | LUXE',
    description: 'Discover the story behind LUXE - Premium clothing crafted with care, designed for life.',
};

export default function AboutPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div
                className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${images.about.hero})` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative text-center text-white px-4">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Our Story
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Crafting timeless elegance since 2010
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Mission Section */}
                <section className="py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                                Our Mission
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                                Redefining Premium Fashion
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                At LUXE, we believe that exceptional clothing should be accessible to everyone who appreciates quality. Our mission is to create timeless pieces that combine superior craftsmanship with contemporary design.
                            </p>
                            <p className="text-muted-foreground mb-6">
                                Every garment we create tells a story of dedication, passion, and an unwavering commitment to excellence. From the selection of premium fabrics to the final stitch, we ensure that each piece meets our exacting standards.
                            </p>
                            <div className="grid grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="font-display text-3xl font-bold text-primary">15+</div>
                                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                                </div>
                                <div>
                                    <div className="font-display text-3xl font-bold text-primary">50K+</div>
                                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                                </div>
                                <div>
                                    <div className="font-display text-3xl font-bold text-primary">100+</div>
                                    <div className="text-sm text-muted-foreground">Store Locations</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                            <Image
                                src={images.about.story[0]}
                                alt="LUXE Craftsmanship"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-muted/30 -mx-4 md:-mx-8 lg:-mx-16 px-4 md:px-8 lg:px-16 rounded-xl">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                            Our Values
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                            What We Stand For
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Quality First</h3>
                            <p className="text-muted-foreground text-sm">
                                We never compromise on the quality of our materials or craftsmanship. Every piece is made to last.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                            <p className="text-muted-foreground text-sm">
                                We're committed to ethical practices and sustainable sourcing to protect our planet.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💝</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Customer Love</h3>
                            <p className="text-muted-foreground text-sm">
                                Your satisfaction is our priority. We go above and beyond to ensure you love every purchase.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 lg:py-24">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                            Leadership Team
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                            The People Behind LUXE
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Arjun Sharma', role: 'Founder & CEO', image: images.testimonials[1].avatar },
                            { name: 'Priya Patel', role: 'Creative Director', image: images.testimonials[0].avatar },
                            { name: 'Rahul Mehta', role: 'Head of Operations', image: images.testimonials[2].avatar },
                        ].map((member) => (
                            <div key={member.name} className="text-center">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <p className="text-muted-foreground text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        Join Our Journey
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Experience the LUXE difference. Discover our collections and become part of our story.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/collections">Shop Now</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/careers">Join Our Team</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
}
