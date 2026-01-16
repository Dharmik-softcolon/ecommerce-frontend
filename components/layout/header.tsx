// frontend/components/layout/header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    User,
    Heart,
    ShoppingBag,
    Menu,
    X,
    ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { SearchModal } from '@/components/common/search-modal';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { MobileMenu } from './mobile-menu';

const navigation = [
    {
        name: 'New Arrivals',
        href: '/collections/new-arrivals',
    },
    {
        name: 'Men',
        href: '/collections/men',
        submenu: [
            { name: 'All Men', href: '/collections/men' },
            { name: 'Shirts', href: '/collections/men/shirts' },
            { name: 'Trousers', href: '/collections/men/trousers' },
            { name: 'Suits', href: '/collections/men/suits' },
            { name: 'Jackets', href: '/collections/men/jackets' },
            { name: 'Accessories', href: '/collections/men/accessories' },
        ],
    },
    {
        name: 'Women',
        href: '/collections/women',
        submenu: [
            { name: 'All Women', href: '/collections/women' },
            { name: 'Dresses', href: '/collections/women/dresses' },
            { name: 'Tops', href: '/collections/women/tops' },
            { name: 'Bottoms', href: '/collections/women/bottoms' },
            { name: 'Ethnic Wear', href: '/collections/women/ethnic' },
            { name: 'Accessories', href: '/collections/women/accessories' },
        ],
    },
    {
        name: 'Collections',
        href: '/collections',
        submenu: [
            { name: 'Summer Collection', href: '/collections/summer' },
            { name: 'Winter Collection', href: '/collections/winter' },
            { name: 'Festive Edit', href: '/collections/festive' },
            { name: 'Wedding Collection', href: '/collections/wedding' },
        ],
    },
    {
        name: 'Sale',
        href: '/sale',
        highlight: true,
    },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    const pathname = usePathname();
    const { cart, isOpen: isCartOpen, openCart, closeCart } = useCartStore();
    const { items: wishlistItems } = useWishlistStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveSubmenu(null);
    }, [pathname]);

    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
                <p>Free Shipping on orders over ₹2,999 | Use code WELCOME10 for 10% off</p>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    'sticky top-0 z-50 w-full transition-all duration-300',
                    isScrolled
                        ? 'bg-background/95 backdrop-blur-md shadow-sm'
                        : 'bg-background'
                )}
            >
                <div className="container-custom">
                    <div className="flex h-16 items-center justify-between lg:h-20">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 -ml-2"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <h1 className="font-display text-2xl font-bold tracking-tight lg:text-3xl">
                                LUXE
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => setActiveSubmenu(item.name)}
                                    onMouseLeave={() => setActiveSubmenu(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary/70',
                                            item.highlight && 'text-red-600',
                                            pathname === item.href && 'text-primary/70'
                                        )}
                                    >
                                        {item.name}
                                        {item.submenu && (
                                            <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
                                        )}
                                    </Link>

                                    {/* Submenu */}
                                    {item.submenu && (
                                        <AnimatePresence>
                                            {activeSubmenu === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-0 top-full pt-2"
                                                >
                                                    <div className="bg-background border shadow-lg rounded-lg py-2 min-w-[200px]">
                                                        {item.submenu.map((subitem) => (
                                                            <Link
                                                                key={subitem.name}
                                                                href={subitem.href}
                                                                className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                                                            >
                                                                {subitem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search className="h-5 w-5" />
                            </Button>

                            <Link href="/account" className="hidden sm:block">
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>

                            <Link href="/wishlist" className="hidden sm:block relative">
                                <Button variant="ghost" size="icon">
                                    <Heart className="h-5 w-5" />
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                                    )}
                                </Button>
                            </Link>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={openCart}
                                className="relative"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {cart && cart.itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navigation={navigation}
            />
        </>
    );
}