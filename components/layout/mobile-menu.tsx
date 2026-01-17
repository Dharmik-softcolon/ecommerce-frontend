// frontend/components/layout/mobile-menu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, User, Heart, Phone, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationItem {
    name: string;
    href: string;
    submenu?: { name: string; href: string }[];
    highlight?: boolean;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navigation: NavigationItem[];
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleExpanded = (name: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(name)) {
            newExpanded.delete(name);
        } else {
            newExpanded.add(name);
        }
        setExpandedItems(newExpanded);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-full sm:max-w-md p-0 flex flex-col">
                {/* Header */}
                <SheetHeader className="p-5 border-b border-border/50 bg-muted/30">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="font-display text-2xl font-bold tracking-tight">
                            LUXE
                        </SheetTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="rounded-full hover:bg-muted"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </SheetHeader>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 space-y-1">
                        {navigation.map((item, idx) => (
                            <div key={item.name}>
                                {item.submenu ? (
                                    <div className="border-b border-border/30 last:border-0">
                                        <button
                                            onClick={() => toggleExpanded(item.name)}
                                            className={cn(
                                                'w-full flex items-center justify-between py-4 text-base font-medium tracking-wide transition-colors',
                                                item.highlight ? 'text-rose-500' : 'text-foreground',
                                                expandedItems.has(item.name) && 'text-accent'
                                            )}
                                        >
                                            <span>{item.name}</span>
                                            <ChevronDown 
                                                className={cn(
                                                    "h-4 w-4 transition-transform duration-200",
                                                    expandedItems.has(item.name) && "rotate-180"
                                                )} 
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {expandedItems.has(item.name) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pl-4 pb-4 space-y-1 bg-muted/20 rounded-lg mx-1 mb-2">
                                                        {item.submenu.map((subitem, subIdx) => (
                                                            <Link
                                                                key={subitem.name}
                                                                href={subitem.href}
                                                                onClick={onClose}
                                                                className={cn(
                                                                    "block py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-md transition-colors",
                                                                    subIdx === 0 && "font-medium text-foreground pt-3"
                                                                )}
                                                            >
                                                                {subitem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            'block py-4 text-base font-medium tracking-wide border-b border-border/30 transition-colors',
                                            item.highlight 
                                                ? 'text-rose-500 hover:text-rose-600' 
                                                : 'text-foreground hover:text-accent'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Quick Actions */}
                <div className="border-t border-border/50 p-4 bg-muted/30">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <Link 
                            href="/account" 
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-background rounded-lg border border-border/50 hover:border-accent hover:bg-accent/5 transition-all"
                        >
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">Account</span>
                        </Link>
                        <Link 
                            href="/wishlist" 
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-background rounded-lg border border-border/50 hover:border-accent hover:bg-accent/5 transition-all"
                        >
                            <Heart className="h-4 w-4" />
                            <span className="text-sm font-medium">Wishlist</span>
                        </Link>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <a href="tel:+911800123456" className="flex items-center gap-2 hover:text-foreground transition-colors">
                            <Phone className="h-4 w-4" />
                            <span>+91 1800 123 4567</span>
                        </a>
                        <a href="mailto:support@luxe.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                            <Mail className="h-4 w-4" />
                            <span>support@luxe.com</span>
                        </a>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
