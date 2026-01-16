// frontend/app/shipping-returns/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Truck, RotateCcw, Clock, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Shipping & Returns | LUXE',
    description: 'Learn about LUXE shipping options, delivery times, and return policy.',
};

export default function ShippingReturnsPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Shipping & Returns', href: '/shipping-returns' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-24">
                <div className="container-custom text-center">
                    <Truck className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Shipping & Returns
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                        Fast delivery and hassle-free returns
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Shipping Section */}
                <section className="py-12">
                    <h2 className="font-display text-3xl font-bold mb-8">Shipping Information</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="border rounded-lg p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Standard Shipping</h3>
                            <p className="text-2xl font-bold text-primary mb-2">₹99</p>
                            <p className="text-sm text-muted-foreground">5-7 business days</p>
                            <p className="text-xs text-muted-foreground mt-2">Free on orders over ₹2,999</p>
                        </div>
                        <div className="border rounded-lg p-6 text-center border-primary">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Express Shipping</h3>
                            <p className="text-2xl font-bold text-primary mb-2">₹199</p>
                            <p className="text-sm text-muted-foreground">2-3 business days</p>
                            <p className="text-xs text-muted-foreground mt-2">Metro cities only</p>
                        </div>
                        <div className="border rounded-lg p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Same Day Delivery</h3>
                            <p className="text-2xl font-bold text-primary mb-2">₹299</p>
                            <p className="text-sm text-muted-foreground">Order by 12 PM</p>
                            <p className="text-xs text-muted-foreground mt-2">Select pin codes only</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <h3>Shipping Details</h3>
                        <ul>
                            <li>All orders are processed within 1-2 business days.</li>
                            <li>Orders placed on weekends or holidays will be processed the next business day.</li>
                            <li>You will receive a confirmation email with tracking information once your order ships.</li>
                            <li>Delivery times may vary during peak seasons and sale events.</li>
                        </ul>

                        <h3>Delivery Areas</h3>
                        <p>We currently deliver across India. Remote areas may have longer delivery times.</p>

                        <h3>Cash on Delivery (COD)</h3>
                        <ul>
                            <li>COD is available for orders up to ₹10,000.</li>
                            <li>Additional COD charges of ₹50 apply.</li>
                            <li>COD is not available for express or same-day delivery.</li>
                        </ul>
                    </div>
                </section>

                {/* Returns Section */}
                <section className="py-12 border-t">
                    <h2 className="font-display text-3xl font-bold mb-8">Returns & Exchanges</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-muted/30 rounded-lg p-6">
                            <RotateCcw className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold text-xl mb-4">30-Day Returns</h3>
                            <p className="text-muted-foreground mb-4">
                                Not satisfied? Return your items within 30 days for a full refund. Items must be unworn, unwashed, and have original tags attached.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>✓ Free returns on first return per order</li>
                                <li>✓ Easy online return initiation</li>
                                <li>✓ Doorstep pickup available</li>
                            </ul>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-6">
                            <CreditCard className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-semibold text-xl mb-4">Refund Process</h3>
                            <p className="text-muted-foreground mb-4">
                                Refunds are processed within 5-7 business days after we receive and inspect the returned items.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>✓ Original payment method refund</li>
                                <li>✓ Store credit option available</li>
                                <li>✓ COD orders refunded via bank transfer</li>
                            </ul>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <h3>How to Return</h3>
                        <ol>
                            <li>Log in to your account and go to "Orders"</li>
                            <li>Select the order and items you wish to return</li>
                            <li>Choose your reason for return</li>
                            <li>Select pickup date and time slot</li>
                            <li>Pack the items securely in original packaging</li>
                            <li>Hand over to our courier partner</li>
                        </ol>

                        <h3>Non-Returnable Items</h3>
                        <ul>
                            <li>Underwear and swimwear (hygiene reasons)</li>
                            <li>Pierced jewelry</li>
                            <li>Items marked as "Final Sale"</li>
                            <li>Customized or altered items</li>
                            <li>Items without original tags</li>
                        </ul>

                        <h3>Exchanges</h3>
                        <p>
                            Want a different size or color? Exchange items within 30 days. Subject to availability. 
                            Initiate an exchange through your account, and we'll ship the new item once we receive your return.
                        </p>
                    </div>
                </section>

                {/* Help Section */}
                <section className="py-12 bg-muted/30 rounded-xl text-center">
                    <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="font-display text-2xl font-bold mb-4">Need Help?</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Our customer service team is available to assist you with any questions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild>
                            <Link href="/contact">Contact Us</Link>
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
