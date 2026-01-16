// frontend/components/home/hero-section.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { images } from '@/lib/images';

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const slides = images.hero.main;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section
            className="relative h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Slides */}
            <AnimatePresence mode="wait">
                {slides.map((slide, index) => (
                    index === currentSlide && (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full container-custom flex items-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                    className={cn(
                                        'max-w-2xl text-white',
                                        slide.align === 'center' && 'mx-auto text-center',
                                        slide.align === 'right' && 'ml-auto text-right'
                                    )}
                                >
                                    <span className="inline-block text-sm md:text-base font-medium tracking-widest uppercase mb-4 text-gold-400">
                                        {slide.subtitle}
                                    </span>
                                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                                        {slide.description}
                                    </p>
                                    <Button
                                        asChild
                                        size="xl"
                                        className="bg-white text-black hover:bg-white/90"
                                    >
                                        <Link href={slide.link}>
                                            {slide.cta}
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors rounded-full"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors rounded-full"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                            'h-2 rounded-full transition-all duration-300',
                            index === currentSlide
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/50 hover:bg-white/70'
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}