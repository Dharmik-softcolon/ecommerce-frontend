// frontend/app/account/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { formatPrice, formatDate, cn } from '@/lib/utils';
import type { Order } from '@/types';

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-purple-100 text-purple-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await api.getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (session) {
            fetchOrders();
        }
    }, [session]);

    if (status === 'loading' || isLoading) {
        return <OrdersSkeleton />;
    }

    if (!session) {
        redirect('/login?callbackUrl=/account/orders');
    }

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/account" className="hover:text-foreground">Account</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Orders</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold">My Orders</h1>

                <div className="flex gap-3">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-border rounded bg-background text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No orders found</h2>
                    <p className="text-muted-foreground mb-6">
                        {searchQuery || filterStatus !== 'all'
                            ? 'Try adjusting your search or filter'
                            : "You haven't placed any orders yet"}
                    </p>
                    <Button asChild>
                        <Link href="/collections">Start Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </main>
    );
}

function OrderCard({ order }: { order: Order }) {
    return (
        <Link
            href={`/account/orders/${order.id}`}
            className="block bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{order.orderNumber}</h3>
                        <Badge className={statusColors[order.status]}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Placed on {formatDate(order.createdAt)} • {order.items.length} items
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold">{formatPrice(order.total)}</p>
                </div>
            </div>

            {/* Order Items Preview */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {order.items.slice(0, 4).map((item) => (
                    <div
                        key={item.id}
                        className="relative w-16 h-20 flex-shrink-0 bg-muted rounded overflow-hidden"
                    >
                        <Image
                            src={item.product.images[0]?.url || '/images/placeholder.svg'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                        {item.quantity > 1 && (
                            <span className="absolute bottom-1 right-1 text-xs bg-black/60 text-white px-1 rounded">
                x{item.quantity}
              </span>
                        )}
                    </div>
                ))}
                {order.items.length > 4 && (
                    <div className="w-16 h-20 flex-shrink-0 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                        +{order.items.length - 4}
                    </div>
                )}
            </div>
        </Link>
    );
}

function OrdersSkeleton() {
    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-40 bg-muted rounded-lg animate-pulse" />
                ))}
            </div>
        </main>
    );
}