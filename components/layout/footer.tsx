// frontend/components/layout/footer.tsx
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const footerLinks = {
    shop: [
        { name: 'New Arrivals', href: '/collections/new-arrivals' },
        { name: 'Men', href: '/collections/men' },
        { name: 'Women', href: '/collections/women' },
        { name: 'Accessories', href: '/collections/accessories' },
        { name: 'Sale', href: '/sale' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Store Locator', href: '/stores' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' },
    ],
    help: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Shipping & Returns', href: '/shipping-returns' },
        { name: 'Track Order', href: '/track-order' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ],
};

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            {/* Newsletter Section */}
            <div className="border-b border-primary-foreground/10">
                <div className="container-custom py-12 lg:py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="font-display text-2xl lg:text-3xl mb-4">
                            Join Our Newsletter
                        </h3>
                        <p className="text-primary-foreground/70 mb-6">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                            />
                            <Button variant="secondary" className="whitespace-nowrap">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container-custom py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/">
                            <h2 className="font-display text-3xl font-bold mb-4">LUXE</h2>
                        </Link>
                        <p className="text-primary-foreground/70 mb-6 max-w-sm">
                            Premium clothing for the modern individual. Crafted with care,
                            designed for life.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                                <Phone className="h-4 w-4" />
                                <span>+91 1800 123 4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                                <Mail className="h-4 w-4" />
                                <span>support@luxe.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                                <MapPin className="h-4 w-4" />
                                <span>Mumbai, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Help</h4>
                        <ul className="space-y-3">
                            {footerLinks.help.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-foreground/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-primary-foreground/70">
                            © {new Date().getFullYear()} LUXE. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-2">
                            <img src="/images/payments/visa.svg" alt="Visa" className="h-6" />
                            <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-6" />
                            <img src="/images/payments/amex.svg" alt="American Express" className="h-6" />
                            <img src="/images/payments/upi.svg" alt="UPI" className="h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}