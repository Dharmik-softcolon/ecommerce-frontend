// frontend/app/account/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    User,
    Package,
    Heart,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { cn } from '../../lib/utils';

const menuItems = [
    { icon: User, label: 'Profile', href: '/account/profile' },
    { icon: Package, label: 'Orders', href: '/account/orders' },
    { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
    { icon: CreditCard, label: 'Payment Methods', href: '/account/payments' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
];

export default function AccountPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <AccountSkeleton />;
    }

    if (!session) {
        redirect('/login?callbackUrl=/account');
    }

    return (
        <main className="container-custom py-8 lg:py-12">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="bg-muted/30 rounded-lg p-6 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-semibold overflow-hidden">
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || ''}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    session.user?.name?.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div>
                                <h2 className="font-semibold">{session.user?.name}</h2>
                                <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                            >
                                <item.icon className="h-5 w-5 text-muted-foreground" />
                                <span>{item.label}</span>
                                <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                            </Link>
                        ))}
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors w-full text-left text-destructive"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <QuickStatCard
                            icon={Package}
                            label="Total Orders"
                            value="12"
                        />
                        <QuickStatCard
                            icon={Heart}
                            label="Wishlist Items"
                            value="8"
                        />
                        <QuickStatCard
                            icon={MapPin}
                            label="Saved Addresses"
                            value="3"
                        />
                        <QuickStatCard
                            icon={CreditCard}
                            label="Payment Methods"
                            value="2"
                        />
                    </div>

                    {/* Recent Orders */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Recent Orders</h2>
                            <Link href="/account/orders" className="text-sm text-primary hover:underline">
                                View All
                            </Link>
                        </div>
                        <RecentOrdersList />
                    </section>
                </div>
            </div>
        </main>
    );
}

function QuickStatCard({ icon: Icon, label, value }: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-muted/30 rounded-lg p-4">
            <Icon className="h-6 w-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}

function RecentOrdersList() {
    const orders = [
        {
            id: 'ORD-2024-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 4999,
            items: 3,
        },
        {
            id: 'ORD-2024-002',
            date: '2024-01-20',
            status: 'Shipped',
            total: 2499,
            items: 1,
        },
    ];

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="block bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString()} • {order.items} items
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                            <span className={cn(
                                'text-xs px-2 py-1 rounded-full',
                                order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                            )}>
                {order.status}
              </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

function AccountSkeleton() {
    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
            <div className="grid lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="h-32 bg-muted rounded-lg animate-pulse" />
                    <div className="h-64 bg-muted rounded-lg animate-pulse" />
                </div>
                <div className="lg:col-span-3 space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
                        ))}
                    </div>
                    <div className="h-64 bg-muted rounded-lg animate-pulse" />
                </div>
            </div>
        </main>
    );
}