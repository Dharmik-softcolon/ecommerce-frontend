// frontend/components/home/brand-story.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/images';

const features = [
    {
        title: 'Premium Quality',
        description: 'Every piece is crafted from the finest fabrics sourced globally.',
    },
    {
        title: 'Timeless Design',
        description: 'Classic styles that transcend seasonal trends.',
    },
    {
        title: 'Sustainable Practice',
        description: 'Committed to ethical manufacturing and eco-friendly materials.',
    },
];

export function BrandStory() {
    return (
        <section className="py-16 lg:py-24">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] relative overflow-hidden">
                            <Image
                                src={images.about.story[0]}
                                alt="Our Story"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-8 hidden md:block"
                        >
                            <div className="text-4xl font-display font-bold mb-2">15+</div>
                            <div className="text-sm uppercase tracking-wider">Years of Excellence</div>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
            <span className="text-gold-600 font-medium tracking-wider uppercase text-sm mb-4 block">
              Our Story
            </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Crafting Excellence Since 2009
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6">
                            Founded with a vision to redefine premium fashion, LUXE has grown from
                            a boutique atelier to a celebrated brand known for its commitment to
                            quality, craftsmanship, and timeless elegance.
                        </p>
                        <p className="text-muted-foreground mb-8">
                            Every garment tells a story of meticulous attention to detail, from
                            the selection of the finest fabrics to the precision of every stitch.
                            We believe that true luxury lies in the perfect balance of comfort,
                            style, and sustainability.
                        </p>

                        {/* Features */}
                        <div className="space-y-6 mb-10">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-gold-100 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-gold-600 rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Button asChild size="lg">
                            <Link href="/about">Learn More About Us</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}