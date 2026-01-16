// frontend/app/privacy-policy/page.tsx
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy | LUXE',
    description: 'Learn how LUXE collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-20">
                <div className="container-custom text-center">
                    <Shield className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Privacy Policy
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
                        At LUXE, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <h3>Personal Information</h3>
                    <p>We may collect personal information that you voluntarily provide, including:</p>
                    <ul>
                        <li>Name and contact information (email, phone number, address)</li>
                        <li>Payment information (credit card details, billing address)</li>
                        <li>Account credentials (username, password)</li>
                        <li>Order history and preferences</li>
                        <li>Communications you send to us</li>
                    </ul>

                    <h3>Automatically Collected Information</h3>
                    <p>When you visit our website, we automatically collect:</p>
                    <ul>
                        <li>Device information (browser type, operating system)</li>
                        <li>IP address and location data</li>
                        <li>Browsing behavior and patterns</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Process and fulfill your orders</li>
                        <li>Communicate with you about your orders and account</li>
                        <li>Send promotional materials and updates (with your consent)</li>
                        <li>Improve our website and services</li>
                        <li>Personalize your shopping experience</li>
                        <li>Prevent fraud and ensure security</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We may share your information with:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> Payment processors, shipping carriers, and marketing partners</li>
                        <li><strong>Business Partners:</strong> For joint promotions or collaborations</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    </ul>
                    <p>We do not sell your personal information to third parties.</p>

                    <h2>4. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include:
                    </p>
                    <ul>
                        <li>SSL encryption for all data transmission</li>
                        <li>Secure payment processing through PCI-DSS compliant partners</li>
                        <li>Regular security audits and updates</li>
                        <li>Employee training on data protection</li>
                    </ul>

                    <h2>5. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal information</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Data portability</li>
                    </ul>

                    <h2>6. Cookies</h2>
                    <p>
                        We use cookies and similar technologies to enhance your browsing experience. For more information, please see our <a href="/cookies">Cookie Policy</a>.
                    </p>

                    <h2>7. Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
                    </p>

                    <h2>8. Children's Privacy</h2>
                    <p>
                        Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
                    </p>

                    <h2>9. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
                    </p>

                    <h2>10. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <ul>
                        <li>Email: privacy@luxe.com</li>
                        <li>Phone: +91 1800 123 4567</li>
                        <li>Address: LUXE Headquarters, Linking Road, Bandra West, Mumbai 400050</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
