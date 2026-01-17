// frontend/components/home/offers-section.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Check, Clock, Percent, Gift, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface Coupon {
    id: string;
    code: string;
    discount: string;
    description: string;
    minOrder?: string;
    validTill: string;
    bgColor: string;
    textColor: string;
    icon: React.ElementType;
}

const coupons: Coupon[] = [
    {
        id: '1',
        code: 'WELCOME10',
        discount: '10% OFF',
        description: 'On your first order',
        minOrder: '₹999',
        validTill: 'New Users Only',
        bgColor: 'from-emerald-500 to-teal-600',
        textColor: 'text-white',
        icon: Gift,
    },
    {
        id: '2',
        code: 'FLAT500',
        discount: '₹500 OFF',
        description: 'On orders above ₹2,999',
        minOrder: '₹2,999',
        validTill: 'Limited Time',
        bgColor: 'from-violet-500 to-purple-600',
        textColor: 'text-white',
        icon: Tag,
    },
    {
        id: '3',
        code: 'LUXE25',
        discount: '25% OFF',
        description: 'On premium collection',
        validTill: 'This Weekend Only',
        bgColor: 'from-amber-500 to-orange-500',
        textColor: 'text-white',
        icon: Percent,
    },
];


function CouponCard({ coupon }: { coupon: Coupon }) {
    const [copied, setCopied] = useState(false);
    const IconComponent = coupon.icon;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(coupon.code);
            setCopied(true);
            toast.success(`Code "${coupon.code}" copied!`);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy code');
        }
    };

    return (
        <div
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${coupon.bgColor} p-4 ${coupon.textColor} shadow-md hover:shadow-lg transition-shadow duration-300`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full border-[12px] border-current" />
            </div>

            {/* Content */}
            <div className="relative">
                {/* Top Row */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/20 rounded-md">
                            <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-medium opacity-90 uppercase tracking-wider">
                            {coupon.validTill}
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold tracking-tight">
                        {coupon.discount}
                    </div>
                </div>

                {/* Description & Code */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <p className="text-xs opacity-90 truncate">
                            {coupon.description}
                        </p>
                        {coupon.minOrder && (
                            <p className="text-[10px] opacity-75">
                                Min: {coupon.minOrder}
                            </p>
                        )}
                    </div>

                    {/* Code & Copy */}
                    <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-md px-2.5 py-1.5 flex items-center gap-2">
                        <span className="font-mono font-bold text-xs tracking-wider">
                            {coupon.code}
                        </span>
                        <button
                            onClick={handleCopy}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? (
                                <Check className="h-3.5 w-3.5" />
                            ) : (
                                <Copy className="h-3.5 w-3.5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background rounded-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-background rounded-full" />
        </div>
    );
}

export function OffersSection() {
    return (
        <section className="py-8 lg:py-12 bg-gradient-to-b from-muted/30 to-background">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6 lg:mb-8"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="text-amber-600 text-xs font-semibold uppercase tracking-widest">
                            Exclusive Deals
                        </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Coupons & Offers
                    </h2>
                </motion.div>

                {/* Coupons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
                    {coupons.map((coupon, index) => (
                        <motion.div
                            key={coupon.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <CouponCard coupon={coupon} />
                        </motion.div>
                    ))}
                </div>

                {/* Special Offer Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary to-primary/90 p-4 sm:p-6 text-primary-foreground"
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400 rounded-full blur-3xl" />
                    </div>

                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                <Clock className="h-3.5 w-3.5 text-amber-400" />
                                <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                                    Limited Time
                                </span>
                            </div>
                            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold">
                                Season End Sale - Up to 50% OFF
                            </h3>
                        </div>
                        <Button
                            asChild
                            size="default"
                            className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold group whitespace-nowrap"
                        >
                            <Link href="/sale">
                                Shop Sale
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
