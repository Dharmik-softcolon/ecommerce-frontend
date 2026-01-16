// frontend/components/product/product-gallery.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductImage } from '@/types';

interface ProductGalleryProps {
    images: ProductImage[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current || !isZoomed) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({ x, y });
    };

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] no-scrollbar">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            'relative flex-shrink-0 w-20 h-24 lg:w-24 lg:h-28 overflow-hidden border-2 transition-all',
                            selectedIndex === index
                                ? 'border-primary'
                                : 'border-transparent hover:border-primary/50'
                        )}
                    >
                        <Image
                            src={image.url}
                            alt={image.alt || `${productName} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
                <div
                    ref={imageRef}
                    className="relative aspect-[3/4] overflow-hidden bg-muted cursor-zoom-in"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={images[selectedIndex]?.url || '/images/placeholder.svg'}
                                alt={images[selectedIndex]?.alt || productName}
                                fill
                                className={cn(
                                    'object-cover transition-transform duration-200',
                                    isZoomed && 'scale-150'
                                )}
                                style={
                                    isZoomed
                                        ? {
                                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                        }
                                        : undefined
                                }
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Zoom Indicator */}
                    <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full">
                        <ZoomIn className="h-5 w-5 text-foreground" />
                    </div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </>
                    )}
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                    {selectedIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
}