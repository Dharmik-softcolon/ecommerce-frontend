// frontend/components/layout/mobile-menu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
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
            <SheetContent side="left" className="w-full sm:max-w-sm p-0">
                <SheetHeader className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="font-display text-2xl font-bold">LUXE</SheetTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </SheetHeader>

                <nav className="flex flex-col p-4">
                    {navigation.map((item) => (
                        <div key={item.name}>
                            {item.submenu ? (
                                <>
                                    <button
                                        onClick={() => toggleExpanded(item.name)}
                                        className={cn(
                                            'w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-wide',
                                            item.highlight && 'text-red-600'
                                        )}
                                    >
                                        {item.name}
                                        {expandedItems.has(item.name) ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </button>
                                    {expandedItems.has(item.name) && (
                                        <div className="pl-4 pb-2">
                                            {item.submenu.map((subitem) => (
                                                <Link
                                                    key={subitem.name}
                                                    href={subitem.href}
                                                    onClick={onClose}
                                                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    {subitem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        'block py-3 text-sm font-medium uppercase tracking-wide',
                                        item.highlight && 'text-red-600'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
