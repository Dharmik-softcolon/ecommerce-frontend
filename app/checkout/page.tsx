// frontend/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Truck, Check, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const addressSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    address1: z.string().min(5, 'Address is required'),
    address2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
    country: z.string().default('India'),
});

type AddressFormData = z.infer<typeof addressSchema>;

const steps = [
    { id: 'information', title: 'Information' },
    { id: 'shipping', title: 'Shipping' },
    { id: 'payment', title: 'Payment' },
];

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [shippingAddress, setShippingAddress] = useState<AddressFormData | null>(null);
    const [shippingMethod, setShippingMethod] = useState('standard');
    const { cart } = useCartStore();
    const router = useRouter();

    if (!cart || cart.items.length === 0) {
        router.push('/cart');
        return null;
    }

    return (
        <main className="min-h-screen bg-muted/30">
            <div className="container-custom py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold">LUXE</h1>
                </div>

                {/* Progress Steps */}
                <div className="max-w-3xl mx-auto mb-8">
                    <div className="flex items-center justify-center">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={cn(
                                        'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                                        index <= currentStep
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                    )}
                                >
                                    {index < currentStep ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        'ml-2 text-sm font-medium',
                                        index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                                    )}
                                >
                  {step.title}
                </span>
                                {index < steps.length - 1 && (
                                    <ChevronRight className="mx-4 h-4 w-4 text-muted-foreground" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Form Section */}
                    <div className="bg-background p-6 lg:p-8 rounded-lg shadow-sm">
                        {currentStep === 0 && (
                            <InformationStep
                                onComplete={(data) => {
                                    setShippingAddress(data);
                                    setCurrentStep(1);
                                }}
                            />
                        )}
                        {currentStep === 1 && (
                            <ShippingStep
                                shippingMethod={shippingMethod}
                                onShippingMethodChange={setShippingMethod}
                                onBack={() => setCurrentStep(0)}
                                onComplete={() => setCurrentStep(2)}
                            />
                        )}
                        {currentStep === 2 && (
                            <Elements stripe={stripePromise}>
                                <PaymentStep
                                    shippingAddress={shippingAddress!}
                                    shippingMethod={shippingMethod}
                                    onBack={() => setCurrentStep(1)}
                                />
                            </Elements>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-background p-6 lg:p-8 rounded-lg shadow-sm h-fit lg:sticky lg:top-8">
                        <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {cart.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.product.images[0]?.url || '/images/placeholder.svg'}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.variant.size} / {item.variant.color}
                                        </p>
                                    </div>
                                    <p className="font-medium text-sm">
                                        {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 py-4 border-t border-border">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>{formatPrice(cart.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>
                  {shippingMethod === 'express' ? formatPrice(199) : 'Free'}
                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax</span>
                                <span>{formatPrice(cart.tax)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border">
                            <span>Total</span>
                            <span>
                {formatPrice(
                    cart.total + (shippingMethod === 'express' ? 199 : 0)
                )}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Information Step Component
function InformationStep({ onComplete }: { onComplete: (data: AddressFormData) => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
    });

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            <form onSubmit={handleSubmit(onComplete)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        {...register('firstName')}
                        error={errors.firstName?.message}
                    />
                    <Input
                        label="Last Name"
                        {...register('lastName')}
                        error={errors.lastName?.message}
                    />
                </div>
                <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                />
                <Input
                    label="Phone"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                />

                <h3 className="text-lg font-semibold pt-4">Shipping Address</h3>
                <Input
                    label="Address"
                    {...register('address1')}
                    error={errors.address1?.message}
                />
                <Input
                    label="Apartment, suite, etc. (optional)"
                    {...register('address2')}
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="City"
                        {...register('city')}
                        error={errors.city?.message}
                    />
                    <Input
                        label="State"
                        {...register('state')}
                        error={errors.state?.message}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Postal Code"
                        {...register('postalCode')}
                        error={errors.postalCode?.message}
                    />
                    <Input
                        label="Country"
                        value="India"
                        disabled
                        {...register('country')}
                    />
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
                    Continue to Shipping
                </Button>
            </form>
        </div>
    );
}

// Shipping Step Component
function ShippingStep({
                          shippingMethod,
                          onShippingMethodChange,
                          onBack,
                          onComplete,
                      }: {
    shippingMethod: string;
    onShippingMethodChange: (method: string) => void;
    onBack: () => void;
    onComplete: () => void;
}) {
    const shippingOptions = [
        {
            id: 'standard',
            name: 'Standard Shipping',
            description: '5-7 business days',
            price: 0,
        },
        {
            id: 'express',
            name: 'Express Shipping',
            description: '2-3 business days',
            price: 199,
        },
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
            <div className="space-y-3 mb-8">
                {shippingOptions.map((option) => (
                    <label
                        key={option.id}
                        className={cn(
                            'flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors',
                            shippingMethod === option.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                checked={shippingMethod === option.id}
                                onChange={() => onShippingMethodChange(option.id)}
                                className="h-4 w-4 text-primary"
                            />
                            <div>
                                <p className="font-medium">{option.name}</p>
                                <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                        </div>
                        <span className="font-medium">
              {option.price === 0 ? 'Free' : formatPrice(option.price)}
            </span>
                    </label>
                ))}
            </div>

            <div className="flex gap-4">
                <Button variant="outline" onClick={onBack} className="flex-1">
                    Back
                </Button>
                <Button onClick={onComplete} className="flex-1">
                    Continue to Payment
                </Button>
            </div>
        </div>
    );
}

// Payment Step Component
function PaymentStep({
                         shippingAddress,
                         shippingMethod,
                         onBack,
                     }: {
    shippingAddress: AddressFormData;
    shippingMethod: string;
    onBack: () => void;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const { cart, clearCart } = useCartStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        try {
            // Create order and get payment intent
            const { clientSecret } = await api.createPaymentIntent('order-id');

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) throw new Error('Card element not found');

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                        email: shippingAddress.email,
                        phone: shippingAddress.phone,
                        address: {
                            line1: shippingAddress.address1,
                            line2: shippingAddress.address2 || undefined,
                            city: shippingAddress.city,
                            state: shippingAddress.state,
                            postal_code: shippingAddress.postalCode,
                            country: 'IN',
                        },
                    },
                },
            });

            if (error) {
                toast.error(error.message || 'Payment failed');
            } else if (paymentIntent.status === 'succeeded') {
                await clearCart();
                router.push(`/order-confirmation?order=${paymentIntent.id}`);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Payment</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Card Details</label>
                    <div className="p-4 border border-border rounded-lg">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                </div>

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                        Back
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1"
                        disabled={!stripe || isProcessing}
                        isLoading={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : `Pay ${formatPrice(cart?.total || 0)}`}
                    </Button>
                </div>
            </form>
        </div>
    );
}