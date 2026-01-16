// frontend/app/track-order/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Package, Search, CheckCircle2, Truck, MapPin, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface TrackingInfo {
    orderId: string;
    status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
    estimatedDelivery: string;
    events: {
        date: string;
        time: string;
        status: string;
        location: string;
    }[];
}

const mockTrackingData: TrackingInfo = {
    orderId: 'ORD-2026-12345',
    status: 'shipped',
    estimatedDelivery: 'Jan 18, 2026',
    events: [
        {
            date: 'Jan 16, 2026',
            time: '2:30 PM',
            status: 'In Transit',
            location: 'Mumbai Sorting Facility',
        },
        {
            date: 'Jan 16, 2026',
            time: '8:00 AM',
            status: 'Shipped',
            location: 'Mumbai Warehouse',
        },
        {
            date: 'Jan 15, 2026',
            time: '4:00 PM',
            status: 'Order Packed',
            location: 'Mumbai Warehouse',
        },
        {
            date: 'Jan 15, 2026',
            time: '10:00 AM',
            status: 'Order Confirmed',
            location: 'Online',
        },
    ],
};

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Track Order', href: '/track-order' },
    ];

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) {
            toast.error('Please enter an order ID');
            return;
        }
        
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, show mock data for any input
        setTrackingInfo({ ...mockTrackingData, orderId: orderId.toUpperCase() });
        setIsLoading(false);
    };

    const getStatusStep = (status: string) => {
        switch (status) {
            case 'processing': return 1;
            case 'shipped': return 2;
            case 'out_for_delivery': return 3;
            case 'delivered': return 4;
            default: return 1;
        }
    };

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-24">
                <div className="container-custom text-center">
                    <Package className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Track Your Order
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                        Enter your order ID to see real-time delivery updates
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Search Form */}
                <div className="max-w-xl mx-auto mt-12">
                    <form onSubmit={handleTrack} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Enter Order ID (e.g., ORD-2026-12345)"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Tracking...' : 'Track'}
                        </Button>
                    </form>
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                        Find your order ID in your confirmation email or <Link href="/account/orders" className="text-primary hover:underline">order history</Link>
                    </p>
                </div>

                {/* Tracking Results */}
                {trackingInfo && (
                    <div className="max-w-3xl mx-auto mt-12">
                        {/* Order Summary */}
                        <div className="bg-muted/30 rounded-lg p-6 mb-8">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Order ID</p>
                                    <p className="font-semibold text-lg">{trackingInfo.orderId}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                                    <p className="font-semibold text-lg text-primary">{trackingInfo.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Progress */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-8">
                                {[
                                    { step: 1, label: 'Confirmed', icon: CheckCircle2 },
                                    { step: 2, label: 'Shipped', icon: Package },
                                    { step: 3, label: 'Out for Delivery', icon: Truck },
                                    { step: 4, label: 'Delivered', icon: MapPin },
                                ].map((item, index) => {
                                    const currentStep = getStatusStep(trackingInfo.status);
                                    const isCompleted = item.step <= currentStep;
                                    const isCurrent = item.step === currentStep;
                                    
                                    return (
                                        <div key={item.step} className="flex flex-col items-center relative">
                                            {index > 0 && (
                                                <div
                                                    className={cn(
                                                        'absolute right-1/2 top-5 h-0.5 w-[calc(100%-2.5rem)]',
                                                        '-translate-x-[calc(50%+0.5rem)]',
                                                        isCompleted ? 'bg-primary' : 'bg-muted'
                                                    )}
                                                    style={{ width: '80px', right: 'auto', left: '-70px' }}
                                                />
                                            )}
                                            <div
                                                className={cn(
                                                    'w-10 h-10 rounded-full flex items-center justify-center z-10',
                                                    isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                                                    isCurrent && 'ring-4 ring-primary/20'
                                                )}
                                            >
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <span className={cn(
                                                'text-xs mt-2 text-center',
                                                isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
                                            )}>
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Tracking History</h3>
                            <div className="space-y-4">
                                {trackingInfo.events.map((event, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            'flex gap-4 p-4 rounded-lg border',
                                            index === 0 && 'bg-primary/5 border-primary'
                                        )}
                                    >
                                        <div className="flex-shrink-0">
                                            <Clock className={cn(
                                                'h-5 w-5',
                                                index === 0 ? 'text-primary' : 'text-muted-foreground'
                                            )} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn(
                                                'font-medium',
                                                index === 0 && 'text-primary'
                                            )}>
                                                {event.status}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {event.location}
                                            </p>
                                        </div>
                                        <div className="text-right text-sm text-muted-foreground">
                                            <p>{event.date}</p>
                                            <p>{event.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Section */}
                <section className="max-w-xl mx-auto mt-16 text-center">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="text-muted-foreground mb-4">
                        Have questions about your delivery? Contact our support team.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/contact">Contact Support</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/faqs">View FAQs</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
}
