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
        name: 'Accessories',
        href: '/collections/accessories',
        submenu: [
            { name: 'All Accessories', href: '/collections/accessories' },
            { name: 'Bags', href: '/collections/accessories/bags' },
            { name: 'Belts', href: '/collections/accessories/belts' },
            { name: 'Watches', href: '/collections/accessories/watches' },
            { name: 'Sunglasses', href: '/collections/accessories/sunglasses' },
            { name: 'Wallets', href: '/collections/accessories/wallets' },
        ],
    },
    {
        name: 'Footwear',
        href: '/collections/footwear',
        submenu: [
            { name: 'All Footwear', href: '/collections/footwear' },
            { name: 'Sneakers', href: '/collections/footwear/sneakers' },
            { name: 'Formal Shoes', href: '/collections/footwear/formal' },
            { name: 'Casual Shoes', href: '/collections/footwear/casual' },
            { name: 'Sandals', href: '/collections/footwear/sandals' },
            { name: 'Boots', href: '/collections/footwear/boots' },
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
            <div className="bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground py-2.5 text-center text-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMjAgMjBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-30" />
                <p className="relative font-medium tracking-wide">
                    <span className="hidden sm:inline">✨ Free Shipping on orders over ₹2,999 | Use code </span>
                    <span className="sm:hidden">Use code </span>
                    <span className="font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME10</span>
                    <span> for 10% off</span>
                </p>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    'sticky top-0 z-50 w-full transition-all duration-300 border-b',
                    isScrolled
                        ? 'bg-background/98 backdrop-blur-lg shadow-soft border-border/50'
                        : 'bg-background border-transparent'
                )}
            >
                <div className="container-custom">
                    <div className="flex h-16 items-center justify-between lg:h-18">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 group">
                            <h1 className="font-display text-2xl font-bold tracking-tight lg:text-3xl transition-colors group-hover:text-primary/80">
                                LUXE
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                            {navigation.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => setActiveSubmenu(item.name)}
                                    onMouseLeave={() => setActiveSubmenu(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center py-2 text-sm font-medium tracking-wide uppercase transition-all duration-200 hover:text-accent',
                                            item.highlight && 'text-destructive font-semibold',
                                            pathname === item.href && 'text-accent',
                                            !item.highlight && !pathname.includes(item.href) && 'text-foreground/80'
                                        )}
                                    >
                                        {item.name}
                                        {item.submenu && (
                                            <ChevronDown className={cn(
                                                "ml-1 h-3.5 w-3.5 transition-transform duration-200",
                                                activeSubmenu === item.name && "rotate-180"
                                            )} />
                                        )}
                                    </Link>

                                    {/* Active Indicator */}
                                    {pathname.includes(item.href) && item.href !== '/sale' && (
                                        <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full" />
                                    )}

                                    {/* Submenu */}
                                    {item.submenu && (
                                        <AnimatePresence>
                                            {activeSubmenu === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                                                >
                                                    <div className="bg-background border border-border/60 shadow-elegant rounded-xl py-2 min-w-[220px] overflow-hidden">
                                                        {item.submenu.map((subitem, idx) => (
                                                            <Link
                                                                key={subitem.name}
                                                                href={subitem.href}
                                                                className={cn(
                                                                    "block px-5 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all duration-150",
                                                                    idx === 0 && "font-medium text-foreground"
                                                                )}
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
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(true)}
                                className="hover:bg-muted rounded-full"
                            >
                                <Search className="h-5 w-5" />
                                <span className="sr-only">Search</span>
                            </Button>

                            <Link href="/account" className="hidden sm:block">
                                <Button variant="ghost" size="icon" className="hover:bg-muted rounded-full">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">Account</span>
                                </Button>
                            </Link>

                            <Link href="/wishlist" className="hidden sm:block relative">
                                <Button variant="ghost" size="icon" className="hover:bg-muted rounded-full">
                                    <Heart className="h-5 w-5" />
                                    <span className="sr-only">Wishlist</span>
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-[10px] font-semibold text-accent-foreground flex items-center justify-center shadow-sm animate-fade-in">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </Button>
                            </Link>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={openCart}
                                className="relative hover:bg-muted rounded-full"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                                {cart && cart.itemCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-[10px] font-semibold text-accent-foreground flex items-center justify-center shadow-sm animate-fade-in">
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