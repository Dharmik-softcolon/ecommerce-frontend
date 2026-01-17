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

// Payment Method Icons
function VisaIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="#1A1F71"/>
            <path d="M19.5 21H17L18.75 11H21.25L19.5 21Z" fill="white"/>
            <path d="M28.5 11.25C28 11.05 27.2 10.85 26.25 10.85C23.75 10.85 22 12.15 22 14C22 15.35 23.25 16.15 24.2 16.6C25.15 17.05 25.5 17.35 25.5 17.8C25.5 18.45 24.7 18.75 24 18.75C23 18.75 22.45 18.6 21.6 18.25L21.25 18.1L20.85 20.45C21.5 20.75 22.65 21 23.85 21C26.5 21 28.2 19.7 28.2 17.75C28.2 16.7 27.55 15.9 26.15 15.25C25.3 14.8 24.75 14.5 24.75 14.05C24.75 13.65 25.2 13.2 26.15 13.2C26.95 13.2 27.55 13.4 28 13.55L28.25 13.65L28.5 11.25Z" fill="white"/>
            <path d="M32.5 11H30.5C29.9 11 29.45 11.15 29.15 11.75L25.5 21H28.15L28.65 19.55H31.85L32.15 21H34.5L32.5 11ZM29.35 17.55C29.6 16.9 30.5 14.55 30.5 14.55C30.5 14.55 30.75 13.85 30.9 13.45L31.1 14.45C31.1 14.45 31.7 17.1 31.8 17.55H29.35Z" fill="white"/>
            <path d="M16 11L13.5 17.75L13.25 16.55C12.75 15.05 11.35 13.45 9.75 12.65L12 21H14.7L18.7 11H16Z" fill="white"/>
            <path d="M11.5 11H7.5L7.45 11.2C10.6 12 12.7 14.05 13.25 16.55L12.65 11.8C12.55 11.2 12.1 11.05 11.5 11Z" fill="#F9A51A"/>
        </svg>
    );
}

function MastercardIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="#16366F"/>
            <circle cx="19" cy="16" r="8" fill="#EB001B"/>
            <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
            <path d="M24 10.5C25.8 12 27 14.35 27 17C27 19.65 25.8 22 24 23.5C22.2 22 21 19.65 21 17C21 14.35 22.2 12 24 10.5Z" fill="#FF5F00"/>
        </svg>
    );
}

function GooglePayIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="white" stroke="#E5E5E5" strokeWidth="1"/>
            <path d="M23.5 16.5V20H22V11H25.5C26.35 11 27.1 11.3 27.7 11.85C28.3 12.4 28.6 13.15 28.6 14C28.6 14.9 28.3 15.65 27.7 16.2C27.15 16.75 26.4 17 25.5 17H23.5V16.5ZM23.5 12.5V15.5H25.55C26.05 15.5 26.45 15.35 26.75 15.05C27.1 14.75 27.25 14.4 27.25 13.95C27.25 13.55 27.1 13.2 26.8 12.9C26.5 12.6 26.1 12.45 25.6 12.45H23.5V12.5Z" fill="#5F6368"/>
            <path d="M32.5 14C33.35 14 34.05 14.25 34.55 14.75C35.1 15.25 35.35 15.95 35.35 16.85V20H33.9V19.05H33.85C33.4 19.75 32.75 20.1 31.95 20.1C31.25 20.1 30.65 19.9 30.2 19.45C29.75 19.05 29.5 18.5 29.5 17.85C29.5 17.2 29.75 16.65 30.25 16.25C30.75 15.85 31.4 15.65 32.25 15.65C32.95 15.65 33.5 15.8 33.9 16.05V15.85C33.9 15.45 33.75 15.1 33.45 14.85C33.15 14.55 32.8 14.45 32.4 14.45C31.75 14.45 31.25 14.7 30.95 15.2L29.65 14.45C30.15 13.65 30.95 13.3 32 13.3C32.2 13.3 32.35 13.35 32.5 14ZM31 17.9C31 18.15 31.1 18.35 31.35 18.55C31.55 18.75 31.85 18.85 32.15 18.85C32.6 18.85 33 18.7 33.35 18.35C33.7 18 33.85 17.6 33.85 17.15C33.5 16.9 33.05 16.75 32.45 16.75C32 16.75 31.65 16.85 31.35 17.05C31.1 17.3 31 17.55 31 17.9Z" fill="#5F6368"/>
            <path d="M40.5 14.1L37.15 21.7C36.65 22.85 35.95 23.4 35 23.4C34.65 23.4 34.35 23.35 34.05 23.25V21.85C34.3 21.95 34.55 22 34.8 22C35.25 22 35.55 21.75 35.75 21.3L35.95 20.85L33 14.1H34.6L36.55 18.95H36.6L38.55 14.1H40.5Z" fill="#5F6368"/>
            <path d="M17.5 15.95C17.5 15.55 17.45 15.2 17.4 14.85H12V16.85H15.1C14.95 17.65 14.5 18.3 13.85 18.75V20.4H15.75C16.85 19.4 17.5 17.85 17.5 15.95Z" fill="#4285F4"/>
            <path d="M12 22C13.65 22 15.05 21.45 15.75 20.4L13.85 18.75C13.35 19.1 12.7 19.3 12 19.3C10.4 19.3 9.05 18.15 8.65 16.65H6.7V18.35C7.65 20.4 9.7 22 12 22Z" fill="#34A853"/>
            <path d="M8.65 16.65C8.5 16.2 8.4 15.75 8.4 15.25C8.4 14.75 8.5 14.3 8.65 13.85V12.15H6.7C6.25 13.05 6 14.1 6 15.25C6 16.4 6.25 17.45 6.7 18.35L8.65 16.65Z" fill="#FBBC05"/>
            <path d="M12 11.2C12.8 11.2 13.5 11.5 14.1 12.05L15.8 10.35C14.9 9.5 13.6 9 12 9C9.7 9 7.65 10.6 6.7 12.65L8.65 14.35C9.05 12.85 10.4 11.2 12 11.2Z" fill="#EA4335"/>
        </svg>
    );
}

function PaytmIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="#00336B"/>
            <path d="M8 13H10.5C11.85 13 12.7 13.75 12.7 14.9C12.7 16.1 11.85 16.85 10.5 16.85H9.25V19H8V13ZM10.35 15.85C11.05 15.85 11.45 15.5 11.45 14.9C11.45 14.35 11.05 14 10.35 14H9.25V15.85H10.35Z" fill="white"/>
            <path d="M13.5 15.5C13.5 14.1 14.45 13 16 13C17.55 13 18.45 14.15 18.45 15.45V15.85H14.75C14.85 16.6 15.35 17.1 16.15 17.1C16.75 17.1 17.15 16.85 17.4 16.45L18.35 17C17.95 17.7 17.2 18.15 16.15 18.15C14.55 18.15 13.5 17.05 13.5 15.5ZM16 14C15.35 14 14.9 14.4 14.75 15H17.15C17.05 14.4 16.6 14 16 14Z" fill="white"/>
            <path d="M19.25 18V13.1H20.4L22.35 16.35L24.3 13.1H25.45V18H24.25V15.05L22.35 18.15H22.3L20.45 15.1V18H19.25Z" fill="#00BAF2"/>
            <path d="M27 13.1H28.25V14.15H27V16.5C27 16.85 27.2 17.05 27.55 17.05C27.8 17.05 28 16.95 28.15 16.85L28.45 17.8C28.2 17.95 27.8 18.1 27.35 18.1C26.45 18.1 25.75 17.6 25.75 16.55V14.15H25V13.1H25.75V11.75H27V13.1Z" fill="#00BAF2"/>
            <path d="M29 15.5C29 14.1 30 13 31.5 13C32.65 13 33.4 13.55 33.75 14.35L32.7 14.9C32.5 14.45 32.1 14.1 31.5 14.1C30.7 14.1 30.2 14.7 30.2 15.55C30.2 16.4 30.7 17 31.5 17C32.1 17 32.55 16.65 32.7 16.2L33.8 16.7C33.4 17.55 32.6 18.15 31.5 18.15C30 18.15 29 17 29 15.5Z" fill="#00BAF2"/>
            <path d="M34.5 18V11.5H35.75V14.85C36.15 13.9 36.85 13.35 37.8 13.35C39.05 13.35 39.75 14.2 39.75 15.5V18H38.5V15.7C38.5 14.9 38.15 14.4 37.4 14.4C36.65 14.4 35.75 14.95 35.75 16.1V18H34.5Z" fill="#00BAF2"/>
        </svg>
    );
}

function UPIIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="white" stroke="#E5E5E5" strokeWidth="1"/>
            <path d="M15.5 9L11 23H14L18.5 9H15.5Z" fill="#097939"/>
            <path d="M20.5 9L16 23H19L23.5 9H20.5Z" fill="#ED752E"/>
            <path d="M26 12V20H28V15.5H30C31.65 15.5 33 14.15 33 12.5V12H26ZM28 13.5H30.5C30.5 13.5 31 13.5 31 14C31 14.5 30.5 14.5 30.5 14.5H28V13.5Z" fill="#6C7378"/>
            <path d="M35 12V20H37V12H35Z" fill="#6C7378"/>
        </svg>
    );
}

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
                        <div className="flex items-center gap-3">
                            <VisaIcon className="h-8 w-12" />
                            <MastercardIcon className="h-8 w-12" />
                            <GooglePayIcon className="h-8 w-12" />
                            <PaytmIcon className="h-8 w-12" />
                            <UPIIcon className="h-8 w-12" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}