// frontend/app/account/orders/[id]/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { formatPrice, cn } from '@/lib/utils';
import { images } from '@/lib/images';

interface OrderDetailPageProps {
    params: { id: string };
}

// Mock order data
const getMockOrder = (orderId: string) => ({
    id: orderId,
    status: 'shipped',
    createdAt: '2026-01-12T10:00:00Z',
    estimatedDelivery: '2026-01-18',
    items: [
        {
            id: '1',
            name: 'Premium Cotton T-Shirt',
            image: images.featuredProducts[0].image,
            size: 'M',
            color: 'White',
            quantity: 2,
            price: 2499,
        },
        {
            id: '2',
            name: 'Silk Blend Formal Shirt',
            image: images.featuredProducts[1].image,
            size: 'L',
            color: 'Blue',
            quantity: 1,
            price: 5999,
        },
    ],
    shippingAddress: {
        name: 'John Doe',
        phone: '+91 98765 43210',
        address: '123, Park Street, Near Central Mall',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
    },
    paymentMethod: 'Credit Card ending in 4242',
    subtotal: 10997,
    shipping: 0,
    discount: 500,
    total: 10497,
    trackingId: 'AWB123456789',
});

const orderStatuses = [
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: MapPin },
];

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
    const { data: session, status } = useSession();

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/account' },
        { label: 'Orders', href: '/account/orders' },
        { label: params.id, href: `/account/orders/${params.id}` },
    ];

    if (status === 'loading') {
        return <OrderDetailSkeleton />;
    }

    if (!session) {
        redirect(`/auth/login?callbackUrl=/account/orders/${params.id}`);
    }

    const order = getMockOrder(params.id);
    
    const getStatusIndex = (orderStatus: string) => {
        return orderStatuses.findIndex(s => s.key === orderStatus);
    };

    const currentStatusIndex = getStatusIndex(order.status);

    return (
        <main className="container-custom py-8 lg:py-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex items-center justify-between mt-6 mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/account/orders"
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                        <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Invoice
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">Need Help?</Link>
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Status */}
                    <div className="border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-6">Order Status</h2>
                        
                        {/* Progress Bar */}
                        <div className="relative">
                            <div className="flex justify-between mb-2">
                                {orderStatuses.map((s, index) => {
                                    const isCompleted = index <= currentStatusIndex;
                                    const isCurrent = index === currentStatusIndex;
                                    
                                    return (
                                        <div key={s.key} className="flex flex-col items-center z-10">
                                            <div
                                                className={cn(
                                                    'w-10 h-10 rounded-full flex items-center justify-center',
                                                    isCompleted 
                                                        ? 'bg-primary text-primary-foreground' 
                                                        : 'bg-muted text-muted-foreground',
                                                    isCurrent && 'ring-4 ring-primary/20'
                                                )}
                                            >
                                                <s.icon className="h-5 w-5" />
                                            </div>
                                            <span className={cn(
                                                'text-xs mt-2 text-center',
                                                isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
                                            )}>
                                                {s.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {/* Progress Line */}
                            <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted -z-0">
                                <div 
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${(currentStatusIndex / (orderStatuses.length - 1)) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Tracking Info */}
                        {order.trackingId && (
                            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tracking ID</p>
                                        <p className="font-mono font-medium">{order.trackingId}</p>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/track-order?orderId=${order.id}`}>
                                            Track Package
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Estimated Delivery */}
                        <div className="flex items-center gap-2 mt-4 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Estimated delivery: <strong>{new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                            })}</strong></span>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Order Items ({order.items.length})</h2>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-20 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Size: {item.size} | Color: {item.color}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                                        {item.quantity > 1 && (
                                            <p className="text-sm text-muted-foreground">
                                                {formatPrice(item.price)} each
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="border rounded-lg p-6">
                        <h2 className="font-semibold mb-4">Shipping Address</h2>
                        <div className="text-sm space-y-1">
                            <p className="font-medium">{order.shippingAddress.name}</p>
                            <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
                            <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                            <p className="text-muted-foreground">
                                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            </p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="border rounded-lg p-6">
                        <h2 className="font-semibold mb-4">Payment Method</h2>
                        <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="border rounded-lg p-6">
                        <h2 className="font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>-{formatPrice(order.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                <span>Total</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <Button className="w-full" variant="outline">
                            Return Items
                        </Button>
                        <Button className="w-full" variant="outline" asChild>
                            <Link href="/collections">Buy Again</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function OrderDetailSkeleton() {
    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="h-8 w-64 bg-muted rounded animate-pulse mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="h-48 bg-muted rounded animate-pulse" />
                    <div className="h-64 bg-muted rounded animate-pulse" />
                </div>
                <div className="space-y-6">
                    <div className="h-32 bg-muted rounded animate-pulse" />
                    <div className="h-24 bg-muted rounded animate-pulse" />
                    <div className="h-40 bg-muted rounded animate-pulse" />
                </div>
            </div>
        </main>
    );
}
