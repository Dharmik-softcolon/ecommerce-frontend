// frontend/app/terms/page.tsx
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms of Service | LUXE',
    description: 'Read the terms and conditions for using LUXE website and services.',
};

export default function TermsPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Terms of Service', href: '/terms' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-20">
                <div className="container-custom text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-primary-foreground/80">
                        Last updated: January 1, 2026
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                <div className="max-w-3xl mx-auto mt-12 prose prose-slate dark:prose-invert">
                    <p className="lead">
                        Welcome to LUXE. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
                    </p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using the LUXE website (www.luxe.com), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                    </p>

                    <h2>2. Use of Services</h2>
                    <h3>Eligibility</h3>
                    <p>
                        You must be at least 18 years old to use our services. By using our website, you represent that you are of legal age to form a binding contract.
                    </p>
                    <h3>Account Responsibilities</h3>
                    <ul>
                        <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                        <li>You agree to provide accurate and complete information</li>
                        <li>You are responsible for all activities that occur under your account</li>
                        <li>You must notify us immediately of any unauthorized use</li>
                    </ul>

                    <h2>3. Products and Pricing</h2>
                    <h3>Product Information</h3>
                    <p>
                        We strive to display products and their colors as accurately as possible. However, we cannot guarantee that your device's display will accurately reflect the actual product.
                    </p>
                    <h3>Pricing</h3>
                    <ul>
                        <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
                        <li>Prices are subject to change without notice</li>
                        <li>We reserve the right to correct pricing errors</li>
                        <li>Prices do not include shipping and handling unless specified</li>
                    </ul>

                    <h2>4. Orders and Payment</h2>
                    <h3>Order Acceptance</h3>
                    <p>
                        Your order constitutes an offer to purchase. We reserve the right to accept or decline your order for any reason, including product availability, pricing errors, or suspected fraud.
                    </p>
                    <h3>Payment</h3>
                    <ul>
                        <li>Payment must be received before order processing</li>
                        <li>We accept major credit/debit cards, UPI, net banking, and COD</li>
                        <li>All transactions are processed securely</li>
                    </ul>

                    <h2>5. Shipping and Delivery</h2>
                    <p>
                        Shipping times and costs are estimates and may vary. LUXE is not responsible for delays caused by shipping carriers, customs, or other factors outside our control. Please refer to our <a href="/shipping-returns">Shipping Policy</a> for details.
                    </p>

                    <h2>6. Returns and Refunds</h2>
                    <p>
                        Our return and refund policies are detailed in our <a href="/shipping-returns">Returns Policy</a>. By making a purchase, you agree to these policies.
                    </p>

                    <h2>7. Intellectual Property</h2>
                    <p>
                        All content on this website, including text, graphics, logos, images, and software, is the property of LUXE and is protected by intellectual property laws. You may not:
                    </p>
                    <ul>
                        <li>Copy, reproduce, or distribute our content without permission</li>
                        <li>Use our trademarks without authorization</li>
                        <li>Modify or create derivative works from our content</li>
                    </ul>

                    <h2>8. Prohibited Activities</h2>
                    <p>You agree not to:</p>
                    <ul>
                        <li>Use the website for any unlawful purpose</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with the proper functioning of the website</li>
                        <li>Upload malicious software or content</li>
                        <li>Engage in any activity that could damage our reputation</li>
                        <li>Use automated systems to access the website without permission</li>
                    </ul>

                    <h2>9. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, LUXE shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services. Our total liability shall not exceed the amount paid by you for the product or service in question.
                    </p>

                    <h2>10. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold LUXE harmless from any claims, losses, damages, liabilities, and expenses arising from your use of our services or violation of these terms.
                    </p>

                    <h2>11. Modifications to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting to the website. Your continued use of our services after any changes constitutes acceptance of the new terms.
                    </p>

                    <h2>12. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                    </p>

                    <h2>13. Contact Information</h2>
                    <p>
                        For questions about these Terms of Service, please contact us:
                    </p>
                    <ul>
                        <li>Email: legal@luxe.com</li>
                        <li>Phone: +91 1800 123 4567</li>
                        <li>Address: LUXE Headquarters, Linking Road, Bandra West, Mumbai 400050</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
