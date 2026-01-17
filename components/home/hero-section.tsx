// frontend/components/home/hero-section.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { images } from '@/lib/images';

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const slides = images.hero.main;

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <section
            className="relative h-[70vh] sm:h-[80vh] lg:h-screen overflow-hidden bg-muted"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Slides */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                    }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slides[currentSlide].src}
                            alt={slides[currentSlide].alt}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full container-custom flex items-center">
                        <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            className={cn(
                                'max-w-xl lg:max-w-2xl text-white',
                                slides[currentSlide].align === 'center' && 'mx-auto text-center',
                                slides[currentSlide].align === 'right' && 'ml-auto text-right'
                            )}
                        >
                            {/* Subtitle */}
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4 text-amber-400"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.span>
                            
                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.7 }}
                                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-[1.1] text-shadow-lg"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>
                            
                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-base sm:text-lg md:text-xl text-white/85 mb-6 sm:mb-8 max-w-lg leading-relaxed"
                            >
                                {slides[currentSlide].description}
                            </motion.p>
                            
                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                            >
                                <Button
                                    asChild
                                    size="xl"
                                    className="bg-white text-foreground hover:bg-white/90 shadow-elegant group font-semibold"
                                >
                                    <Link href={slides[currentSlide].link}>
                                        {slides[currentSlide].cta}
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 transition-all duration-300 rounded-full border border-white/20 hover:scale-105 group"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 transition-all duration-300 rounded-full border border-white/20 hover:scale-105 group"
                aria-label="Next slide"
            >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                            'relative h-1 rounded-full transition-all duration-500 ease-out',
                            index === currentSlide
                                ? 'w-12 bg-white'
                                : 'w-6 bg-white/40 hover:bg-white/60'
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {/* Progress indicator for active slide */}
                        {index === currentSlide && isAutoPlaying && (
                            <motion.span
                                className="absolute inset-0 bg-amber-400 rounded-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 6, ease: "linear" }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
            >
                <span className="text-white/60 text-xs uppercase tracking-widest rotate-90 origin-center mb-8">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
