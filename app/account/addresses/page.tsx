// frontend/app/account/addresses/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Plus, Edit, Trash2, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface Address {
    id: string;
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

const mockAddresses: Address[] = [
    {
        id: '1',
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: '123, Park Street',
        addressLine2: 'Near Central Mall',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        isDefault: true,
    },
    {
        id: '2',
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: '456, MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        isDefault: false,
    },
];

export default function AddressesPage() {
    const { data: session, status } = useSession();
    const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/account' },
        { label: 'Addresses', href: '/account/addresses' },
    ];

    if (status === 'loading') {
        return <AddressesSkeleton />;
    }

    if (!session) {
        redirect('/auth/login?callbackUrl=/account/addresses');
    }

    const handleSetDefault = (id: string) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id,
        })));
        toast.success('Default address updated');
    };

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
        toast.success('Address deleted');
    };

    return (
        <main className="container-custom py-8 lg:py-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex items-center justify-between mt-6 mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/account"
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-3xl font-bold">My Addresses</h1>
                </div>
                <Button onClick={() => setIsAddingNew(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                </Button>
            </div>

            {/* Address Form Modal */}
            {isAddingNew && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <Input placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <Input placeholder="+91 98765 43210" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address Line 1</label>
                                <Input placeholder="House/Flat No., Street" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
                                <Input placeholder="Landmark" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <Input placeholder="Mumbai" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pincode</label>
                                    <Input placeholder="400001" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">State</label>
                                <Input placeholder="Maharashtra" />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button type="button" onClick={() => {
                                    setIsAddingNew(false);
                                    toast.success('Address added successfully');
                                }}>
                                    Save Address
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Address List */}
            {addresses.length === 0 ? (
                <div className="text-center py-16">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">No addresses saved</h2>
                    <p className="text-muted-foreground mb-8">
                        Add a delivery address for faster checkout.
                    </p>
                    <Button onClick={() => setIsAddingNew(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            className={cn(
                                'border rounded-lg p-6 relative',
                                address.isDefault && 'border-primary bg-primary/5'
                            )}
                        >
                            {address.isDefault && (
                                <span className="absolute top-4 right-4 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                    Default
                                </span>
                            )}
                            <h3 className="font-semibold mb-1">{address.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{address.phone}</p>
                            <p className="text-sm">
                                {address.addressLine1}
                                {address.addressLine2 && <>, {address.addressLine2}</>}
                            </p>
                            <p className="text-sm">
                                {address.city}, {address.state} - {address.pincode}
                            </p>
                            
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingId(address.id)}
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(address.id)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                                {!address.isDefault && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSetDefault(address.id)}
                                    >
                                        <Check className="h-4 w-4 mr-1" />
                                        Set as Default
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

function AddressesSkeleton() {
    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
            <div className="grid md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-48 bg-muted rounded animate-pulse" />
                ))}
            </div>
        </main>
    );
}
