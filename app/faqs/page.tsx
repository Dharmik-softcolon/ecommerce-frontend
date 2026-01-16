// frontend/app/faqs/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const faqCategories = [
    {
        name: 'Orders & Shipping',
        faqs: [
            {
                question: 'How long does shipping take?',
                answer: 'Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Metro cities may receive orders faster.',
            },
            {
                question: 'Can I track my order?',
                answer: 'Yes! Once your order ships, you\'ll receive an email with tracking information. You can also track your order in your account under "Orders".',
            },
            {
                question: 'Do you offer free shipping?',
                answer: 'Yes, we offer free standard shipping on all orders over ₹2,999. Orders below this amount have a flat shipping fee of ₹99.',
            },
            {
                question: 'Can I change my shipping address after placing an order?',
                answer: 'You can modify your shipping address within 2 hours of placing your order. Contact our customer support team immediately for assistance.',
            },
        ],
    },
    {
        name: 'Returns & Exchanges',
        faqs: [
            {
                question: 'What is your return policy?',
                answer: 'We offer a 30-day return policy for unworn items with original tags attached. Simply initiate a return through your account or contact customer support.',
            },
            {
                question: 'How do I exchange an item?',
                answer: 'You can exchange items for a different size or color within 30 days. Start an exchange through your account, and we\'ll ship the new item once we receive the return.',
            },
            {
                question: 'When will I receive my refund?',
                answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method.',
            },
            {
                question: 'Are there any items that cannot be returned?',
                answer: 'For hygiene reasons, underwear, swimwear, and pierced jewelry cannot be returned. Sale items marked as "Final Sale" are also non-returnable.',
            },
        ],
    },
    {
        name: 'Payments',
        faqs: [
            {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), UPI, net banking, and popular wallets like PayTM and PhonePe. We also offer Cash on Delivery.',
            },
            {
                question: 'Is it safe to use my credit card on your site?',
                answer: 'Absolutely. We use industry-standard SSL encryption and are PCI-DSS compliant. Your payment information is never stored on our servers.',
            },
            {
                question: 'Do you offer EMI options?',
                answer: 'Yes, we offer no-cost EMI on orders above ₹5,000 for select credit cards. You\'ll see available EMI options at checkout.',
            },
        ],
    },
    {
        name: 'Products',
        faqs: [
            {
                question: 'How do I find my size?',
                answer: 'Check our detailed Size Guide for measurements. Each product page also includes specific sizing information. When in doubt, our customer support can help you choose the right size.',
            },
            {
                question: 'Are your products true to size?',
                answer: 'Our products are designed to fit true to size based on standard Indian measurements. Each product page notes if an item runs small or large.',
            },
            {
                question: 'How do I care for my LUXE garments?',
                answer: 'Each garment includes care instructions on the label. Generally, we recommend cold water wash, gentle cycle, and air drying for best results.',
            },
        ],
    },
    {
        name: 'Account',
        faqs: [
            {
                question: 'How do I create an account?',
                answer: 'Click "Sign Up" in the header, enter your email and create a password. You can also sign up using Google or Facebook for faster access.',
            },
            {
                question: 'I forgot my password. What should I do?',
                answer: 'Click "Forgot Password" on the login page. We\'ll send a password reset link to your registered email address.',
            },
            {
                question: 'How do I update my account information?',
                answer: 'Log in to your account and navigate to "Settings". From there, you can update your personal information, addresses, and payment methods.',
            },
        ],
    },
];

export default function FAQsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'FAQs', href: '/faqs' },
    ];

    const toggleItem = (id: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    const filteredCategories = faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(
            faq =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    })).filter(category => category.faqs.length > 0);

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-24">
                <div className="container-custom text-center">
                    <HelpCircle className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        How Can We Help?
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                        Find answers to frequently asked questions
                    </p>
                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search FAQs..."
                            className="pl-10 bg-primary-foreground text-foreground"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* FAQ Sections */}
                <div className="mt-12 space-y-12">
                    {filteredCategories.map((category) => (
                        <section key={category.name}>
                            <h2 className="font-display text-2xl font-bold mb-6">{category.name}</h2>
                            <div className="space-y-4">
                                {category.faqs.map((faq, index) => {
                                    const itemId = `${category.name}-${index}`;
                                    const isOpen = openItems.has(itemId);
                                    
                                    return (
                                        <div
                                            key={index}
                                            className="border rounded-lg overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleItem(itemId)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="font-medium pr-4">{faq.question}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        'h-5 w-5 flex-shrink-0 transition-transform',
                                                        isOpen && 'rotate-180'
                                                    )}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-4 pb-4 text-muted-foreground">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Still Need Help */}
                <section className="mt-16 text-center py-12 bg-muted/30 rounded-xl">
                    <h2 className="font-display text-2xl font-bold mb-4">Still Have Questions?</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Can't find what you're looking for? Our customer support team is here to help.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="mailto:support@luxe.com">Email Support</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
}
