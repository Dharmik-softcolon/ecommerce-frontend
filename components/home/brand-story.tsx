// frontend/components/home/brand-story.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/images';
import { ArrowRight, Award, Leaf, Gem } from 'lucide-react';

const features = [
    {
        icon: Gem,
        title: 'Premium Quality',
        description: 'Every piece is crafted from the finest fabrics sourced globally.',
    },
    {
        icon: Award,
        title: 'Timeless Design',
        description: 'Classic styles that transcend seasonal trends.',
    },
    {
        icon: Leaf,
        title: 'Sustainable Practice',
        description: 'Committed to ethical manufacturing and eco-friendly materials.',
    },
];

export function BrandStory() {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-elegant">
                            <Image
                                src={images.about.story[0]}
                                alt="Our Story"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        
                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="absolute -bottom-6 -right-4 lg:-right-8 bg-primary text-primary-foreground p-6 lg:p-8 rounded-xl shadow-elegant hidden md:block"
                        >
                            <div className="text-4xl lg:text-5xl font-display font-bold mb-1">15+</div>
                            <div className="text-sm uppercase tracking-wider opacity-80">Years of Excellence</div>
                        </motion.div>
                        
                        {/* Decorative Element */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-amber-400/30 rounded-xl -z-10 hidden lg:block" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:pl-4"
                    >
                        <span className="inline-flex items-center gap-2 text-amber-600 font-semibold tracking-widest uppercase text-sm mb-4">
                            <span className="w-8 h-px bg-amber-500" />
                            Our Story
                        </span>
                        
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Crafting Excellence<br className="hidden sm:block" /> Since 2009
                        </h2>
                        
                        <p className="text-muted-foreground text-base sm:text-lg mb-5 leading-relaxed">
                            Founded with a vision to redefine premium fashion, LUXE has grown from
                            a boutique atelier to a celebrated brand known for its commitment to
                            quality, craftsmanship, and timeless elegance.
                        </p>
                        
                        <p className="text-muted-foreground mb-10 leading-relaxed">
                            Every garment tells a story of meticulous attention to detail, from
                            the selection of the finest fabrics to the precision of every stitch.
                            We believe that true luxury lies in the perfect balance of comfort,
                            style, and sustainability.
                        </p>

                        {/* Features */}
                        <div className="space-y-5 mb-10">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center">
                                        <feature.icon className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Button asChild size="lg" className="group shadow-soft">
                            <Link href="/about">
                                Learn More About Us
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
