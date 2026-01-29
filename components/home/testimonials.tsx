// frontend/components/home/testimonials.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { images } from '@/lib/images';

const testimonials = images.testimonials;

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    return (
        <section 
            className="py-16 lg:py-24 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20 relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Background decorations */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="container-custom relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3 block">
                        Testimonials
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have made LUXE their trusted fashion destination
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="bg-card border border-border/50 p-8 md:p-12 rounded-2xl shadow-lg relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-5 left-10">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Quote className="h-6 w-6 text-white fill-white" />
                                </div>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex items-center gap-1 mb-6 mt-4">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed italic">
                                "{testimonials[currentIndex].content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/30 shadow-md">
                                    <Image
                                        src={testimonials[currentIndex].avatar}
                                        alt={testimonials[currentIndex].name}
                                        fill
                                        className="object-cover"
                                        sizes="56px"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{testimonials[currentIndex].name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="p-3 border border-border rounded-full hover:bg-muted hover:border-primary/50 transition-all duration-200"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`transition-all duration-300 rounded-full ${
                                        index === currentIndex 
                                            ? 'w-8 h-2 bg-primary' 
                                            : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-3 border border-border rounded-full hover:bg-muted hover:border-primary/50 transition-all duration-200"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
