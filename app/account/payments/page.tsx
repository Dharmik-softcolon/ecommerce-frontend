// frontend/app/account/payments/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, Plus, Trash2, ArrowLeft, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface PaymentMethod {
    id: string;
    type: 'card' | 'upi';
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    upiId?: string;
    isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
    {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2027,
        isDefault: true,
    },
    {
        id: '2',
        type: 'card',
        last4: '5555',
        brand: 'Mastercard',
        expiryMonth: 6,
        expiryYear: 2026,
        isDefault: false,
    },
    {
        id: '3',
        type: 'upi',
        upiId: 'john@okicici',
        isDefault: false,
    },
];

export default function PaymentsPage() {
    const { data: session, status } = useSession();
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [addType, setAddType] = useState<'card' | 'upi'>('card');

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/account' },
        { label: 'Payment Methods', href: '/account/payments' },
    ];

    if (status === 'loading') {
        return <PaymentsSkeleton />;
    }

    if (!session) {
        redirect('/auth/login?callbackUrl=/account/payments');
    }

    const handleSetDefault = (id: string) => {
        setPaymentMethods(paymentMethods.map(pm => ({
            ...pm,
            isDefault: pm.id === id,
        })));
        toast.success('Default payment method updated');
    };

    const handleDelete = (id: string) => {
        setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
        toast.success('Payment method removed');
    };

    const getCardIcon = (brand?: string) => {
        switch (brand?.toLowerCase()) {
            case 'visa':
                return '💳 Visa';
            case 'mastercard':
                return '💳 Mastercard';
            case 'amex':
                return '💳 Amex';
            default:
                return '💳 Card';
        }
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
                    <h1 className="text-3xl font-bold">Payment Methods</h1>
                </div>
                <Button onClick={() => setIsAddingNew(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>

            {/* Add Payment Modal */}
            {isAddingNew && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Add Payment Method</h2>
                        
                        {/* Type Selector */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setAddType('card')}
                                className={cn(
                                    'flex-1 p-4 border rounded-lg text-center transition-colors',
                                    addType === 'card' && 'border-primary bg-primary/5'
                                )}
                            >
                                <CreditCard className="h-6 w-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">Credit/Debit Card</span>
                            </button>
                            <button
                                onClick={() => setAddType('upi')}
                                className={cn(
                                    'flex-1 p-4 border rounded-lg text-center transition-colors',
                                    addType === 'upi' && 'border-primary bg-primary/5'
                                )}
                            >
                                <span className="text-2xl block mb-2">📱</span>
                                <span className="text-sm font-medium">UPI</span>
                            </button>
                        </div>

                        {addType === 'card' ? (
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Card Number</label>
                                    <Input placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                        <Input placeholder="MM/YY" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">CVV</label>
                                        <Input placeholder="123" type="password" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name on Card</label>
                                    <Input placeholder="John Doe" />
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">UPI ID</label>
                                    <Input placeholder="yourname@upi" />
                                </div>
                            </form>
                        )}

                        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                            <Shield className="h-4 w-4" />
                            <span>Your payment info is secure and encrypted</span>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <Button onClick={() => {
                                setIsAddingNew(false);
                                toast.success('Payment method added');
                            }}>
                                Save
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Methods List */}
            {paymentMethods.length === 0 ? (
                <div className="text-center py-16">
                    <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">No payment methods saved</h2>
                    <p className="text-muted-foreground mb-8">
                        Add a payment method for faster checkout.
                    </p>
                    <Button onClick={() => setIsAddingNew(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                    </Button>
                </div>
            ) : (
                <div className="space-y-4 max-w-2xl">
                    {paymentMethods.map((pm) => (
                        <div
                            key={pm.id}
                            className={cn(
                                'border rounded-lg p-4 flex items-center gap-4',
                                pm.isDefault && 'border-primary bg-primary/5'
                            )}
                        >
                            <div className="flex-1">
                                {pm.type === 'card' ? (
                                    <>
                                        <p className="font-medium">{getCardIcon(pm.brand)}</p>
                                        <p className="text-sm text-muted-foreground">
                                            •••• •••• •••• {pm.last4} | Expires {pm.expiryMonth}/{pm.expiryYear}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-medium">📱 UPI</p>
                                        <p className="text-sm text-muted-foreground">{pm.upiId}</p>
                                    </>
                                )}
                            </div>
                            {pm.isDefault && (
                                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                    Default
                                </span>
                            )}
                            <div className="flex items-center gap-2">
                                {!pm.isDefault && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSetDefault(pm.id)}
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(pm.id)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

function PaymentsSkeleton() {
    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
            <div className="space-y-4 max-w-2xl">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-muted rounded animate-pulse" />
                ))}
            </div>
        </main>
    );
}
