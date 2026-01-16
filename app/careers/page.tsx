// frontend/app/careers/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { images } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Careers | LUXE',
    description: 'Join the LUXE team. Explore exciting career opportunities in fashion retail.',
};

const jobOpenings = [
    {
        id: 1,
        title: 'Senior Fashion Designer',
        department: 'Design',
        location: 'Mumbai, India',
        type: 'Full-time',
        description: 'Lead our design team in creating innovative and timeless fashion pieces.',
    },
    {
        id: 2,
        title: 'E-commerce Manager',
        department: 'Digital',
        location: 'Remote',
        type: 'Full-time',
        description: 'Drive our online presence and optimize the digital shopping experience.',
    },
    {
        id: 3,
        title: 'Store Manager',
        department: 'Retail',
        location: 'Delhi, India',
        type: 'Full-time',
        description: 'Lead a team of sales associates and deliver exceptional customer experiences.',
    },
    {
        id: 4,
        title: 'Marketing Specialist',
        department: 'Marketing',
        location: 'Mumbai, India',
        type: 'Full-time',
        description: 'Create compelling campaigns that resonate with our target audience.',
    },
    {
        id: 5,
        title: 'Visual Merchandiser',
        department: 'Retail',
        location: 'Bangalore, India',
        type: 'Full-time',
        description: 'Create stunning visual displays that showcase our collections.',
    },
    {
        id: 6,
        title: 'Customer Service Representative',
        department: 'Support',
        location: 'Remote',
        type: 'Part-time',
        description: 'Provide excellent support to our valued customers.',
    },
];

export default function CareersPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Careers', href: '/careers' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div
                className="relative h-[40vh] md:h-[50vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${images.collections.formal})` }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative text-center text-white px-4">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Build your career with a brand that values innovation, creativity, and excellence
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Why LUXE Section */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                            Why Join Us
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                            Why Work at LUXE?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We're more than just a fashion brand. We're a family of passionate individuals committed to excellence.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '🚀', title: 'Growth', description: 'Clear career paths and learning opportunities' },
                            { icon: '💡', title: 'Innovation', description: 'Freedom to bring new ideas to life' },
                            { icon: '🤝', title: 'Culture', description: 'Inclusive and collaborative environment' },
                            { icon: '🎁', title: 'Benefits', description: 'Competitive pay and perks package' },
                        ].map((benefit) => (
                            <div key={benefit.title} className="text-center p-6 bg-muted/30 rounded-lg">
                                <div className="text-3xl mb-3">{benefit.icon}</div>
                                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Job Openings */}
                <section className="py-8">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                            Open Positions
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                            Current Opportunities
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {jobOpenings.map((job) => (
                            <div
                                key={job.id}
                                className="border rounded-lg p-6 hover:border-primary transition-colors group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                {job.department}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="md:flex-shrink-0">
                                        Apply Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 text-center bg-muted/30 rounded-xl mt-8">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                        Don't See a Perfect Fit?
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
                    </p>
                    <Button variant="outline" size="lg">
                        Submit Your Resume
                    </Button>
                </section>
            </div>
        </main>
    );
}
