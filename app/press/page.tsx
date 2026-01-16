// frontend/app/press/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { images } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Press | LUXE',
    description: 'LUXE press releases, media coverage, and brand assets.',
};

const pressReleases = [
    {
        id: 1,
        title: 'LUXE Launches Sustainable Fashion Initiative',
        date: '2026-01-10',
        excerpt: 'LUXE announces commitment to 100% sustainable sourcing by 2028.',
    },
    {
        id: 2,
        title: 'Q4 2025 Results: Record Growth in Digital Sales',
        date: '2025-12-15',
        excerpt: 'Online sales grow 150% year-over-year as LUXE expands digital presence.',
    },
    {
        id: 3,
        title: 'LUXE Opens Flagship Store in Dubai',
        date: '2025-11-20',
        excerpt: 'Expanding global footprint with first Middle East location.',
    },
    {
        id: 4,
        title: 'Partnership with Leading Fashion Designer Announced',
        date: '2025-10-05',
        excerpt: 'Exclusive collaboration bringing haute couture to everyday wear.',
    },
];

const mediaCoverage = [
    { outlet: 'Vogue India', title: 'The Rise of LUXE: A Fashion Success Story' },
    { outlet: 'Economic Times', title: 'LUXE Valued at $500M in Latest Funding Round' },
    { outlet: 'Elle Magazine', title: 'Top 10 Indian Fashion Brands to Watch' },
    { outlet: 'Fashion Week Daily', title: 'LUXE Collection Steals the Show at Mumbai Fashion Week' },
];

export default function PressPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Press', href: '/press' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-24">
                <div className="container-custom text-center">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Press Room
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                        Latest news, press releases, and media resources
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Press Releases */}
                <section className="py-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                        Press Releases
                    </h2>
                    <div className="space-y-6">
                        {pressReleases.map((release) => (
                            <div
                                key={release.id}
                                className="border-b pb-6 last:border-b-0"
                            >
                                <p className="text-sm text-muted-foreground mb-2">
                                    {new Date(release.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer">
                                    {release.title}
                                </h3>
                                <p className="text-muted-foreground mb-3">
                                    {release.excerpt}
                                </p>
                                <Button variant="link" className="p-0 h-auto">
                                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Media Coverage */}
                <section className="py-12 bg-muted/30 -mx-4 md:-mx-8 px-4 md:px-8 rounded-xl">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                        In The News
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {mediaCoverage.map((item, index) => (
                            <div
                                key={index}
                                className="bg-background p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <p className="text-sm text-primary font-medium mb-2">
                                    {item.outlet}
                                </p>
                                <h3 className="font-semibold">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Brand Assets */}
                <section className="py-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                        Brand Assets
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border rounded-lg p-6 text-center">
                            <div className="w-24 h-24 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 rounded-lg">
                                <span className="font-display text-2xl font-bold">LUXE</span>
                            </div>
                            <h3 className="font-semibold mb-2">Logo Package</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Primary logo in various formats
                            </p>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                        <div className="border rounded-lg p-6 text-center">
                            <div className="w-24 h-24 bg-muted flex items-center justify-center mx-auto mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src={images.about.hero}
                                    alt="Brand imagery"
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-semibold mb-2">Product Images</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                High-resolution product photos
                            </p>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                        <div className="border rounded-lg p-6 text-center">
                            <div className="w-24 h-24 bg-muted flex items-center justify-center mx-auto mb-4 rounded-lg">
                                <span className="text-3xl">📋</span>
                            </div>
                            <h3 className="font-semibold mb-2">Brand Guidelines</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Visual identity guidelines
                            </p>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className="py-12 text-center">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                        Media Inquiries
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        For press inquiries, interview requests, or media resources, please contact our communications team.
                    </p>
                    <Button asChild size="lg">
                        <Link href="mailto:press@luxe.com">
                            press@luxe.com
                        </Link>
                    </Button>
                </section>
            </div>
        </main>
    );
}
