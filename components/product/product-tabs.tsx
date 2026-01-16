// frontend/components/product/product-tabs.tsx (continued)
'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

interface ProductTabsProps {
    product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
    return (
        <>
            {/* Desktop Tabs */}
            <div className="hidden md:block">
                <Tabs.Root defaultValue="description" className="w-full">
                    <Tabs.List className="flex border-b border-border">
                        <Tabs.Trigger
                            value="description"
                            className="px-6 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-colors"
                        >
                            Description
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="details"
                            className="px-6 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-colors"
                        >
                            Details & Care
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="shipping"
                            className="px-6 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-colors"
                        >
                            Shipping & Returns
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="reviews"
                            className="px-6 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-colors"
                        >
                            Reviews
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="description" className="py-8">
                        <div className="prose max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="details" className="py-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold mb-4">Product Details</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex justify-between">
                                        <span>SKU:</span>
                                        <span className="font-medium text-foreground">{product.sku}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Category:</span>
                                        <span className="font-medium text-foreground">{product.category.name}</span>
                                    </li>
                                    {product.tags.length > 0 && (
                                        <li className="flex justify-between">
                                            <span>Tags:</span>
                                            <span className="font-medium text-foreground">{product.tags.join(', ')}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Care Instructions</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• Machine wash cold with similar colors</li>
                                    <li>• Do not bleach</li>
                                    <li>• Tumble dry low</li>
                                    <li>• Iron on low heat if needed</li>
                                    <li>• Do not dry clean</li>
                                </ul>
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="shipping" className="py-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold mb-4">Shipping Information</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li>
                                        <strong className="text-foreground">Standard Delivery:</strong> 5-7 business days - ₹99
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Express Delivery:</strong> 2-3 business days - ₹199
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Free Shipping:</strong> On orders over ₹2,999
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Return Policy</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• 30-day return policy</li>
                                    <li>• Items must be unworn with tags attached</li>
                                    <li>• Free returns on all orders</li>
                                    <li>• Refunds processed within 5-7 business days</li>
                                </ul>
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="reviews" className="py-8">
                        <ProductReviews productId={product.id} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden">
                <Accordion.Root type="single" collapsible className="w-full">
                    <Accordion.Item value="description" className="border-b border-border">
                        <Accordion.Header>
                            <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                                Description
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="pb-4 text-muted-foreground">
                                {product.description}
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="details" className="border-b border-border">
                        <Accordion.Header>
                            <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                                Details & Care
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="pb-4 space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Product Details</h4>
                                    <p className="text-muted-foreground">SKU: {product.sku}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Care Instructions</h4>
                                    <ul className="text-muted-foreground space-y-1">
                                        <li>• Machine wash cold</li>
                                        <li>• Do not bleach</li>
                                        <li>• Tumble dry low</li>
                                    </ul>
                                </div>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="shipping" className="border-b border-border">
                        <Accordion.Header>
                            <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                                Shipping & Returns
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="pb-4 text-muted-foreground space-y-2">
                                <p>Free shipping on orders over ₹2,999</p>
                                <p>30-day return policy</p>
                                <p>Free returns on all orders</p>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="reviews" className="border-b border-border">
                        <Accordion.Header>
                            <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                                Reviews
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="pb-4">
                                <ProductReviews productId={product.id} />
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
        </>
    );
}

// Product Reviews Component
function ProductReviews({ productId }: { productId: string }) {
    const [reviews, setReviews] = useState([
        {
            id: '1',
            rating: 5,
            title: 'Excellent Quality!',
            content: 'The fabric quality is amazing and the fit is perfect. Highly recommend!',
            author: 'Rahul M.',
            date: '2024-01-15',
            verified: true,
        },
        {
            id: '2',
            rating: 4,
            title: 'Great product',
            content: 'Very comfortable and stylish. Shipping was fast too.',
            author: 'Priya S.',
            date: '2024-01-10',
            verified: true,
        },
    ]);

    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    return (
        <div>
            {/* Rating Summary */}
            <div className="flex items-center gap-8 mb-8 pb-8 border-b border-border">
                <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    'h-5 w-5',
                                    i < Math.round(averageRating)
                                        ? 'fill-gold-400 text-gold-400'
                                        : 'fill-muted text-muted'
                                )}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
                </div>

                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter((r) => r.rating === rating).length;
                        const percentage = (count / reviews.length) * 100;
                        return (
                            <div key={rating} className="flex items-center gap-2">
                                <span className="text-sm w-3">{rating}</span>
                                <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gold-400 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground w-8">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        'h-4 w-4',
                                        i < review.rating
                                            ? 'fill-gold-400 text-gold-400'
                                            : 'fill-muted text-muted'
                                    )}
                                />
                            ))}
                            {review.verified && (
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  Verified Purchase
                </span>
                            )}
                        </div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground mb-3">{review.content}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{review.author}</span>
                            <span>•</span>
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Write Review Button */}
            <div className="mt-8">
                <Button variant="outline">Write a Review</Button>
            </div>
        </div>
    );
}