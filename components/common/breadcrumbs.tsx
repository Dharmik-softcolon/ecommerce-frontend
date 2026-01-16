// frontend/components/common/breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2 text-sm', className)}>
            <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
            >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
            </Link>
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    {index === items.length - 1 ? (
                        <span className="text-foreground font-medium" aria-current="page">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
