// frontend/components/common/pagination.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
    pagination: {
        page: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export function Pagination({ pagination }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { page, totalPages, hasNext, hasPrev } = pagination;

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (page > 3) {
                pages.push('ellipsis');
            }

            for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
                pages.push(i);
            }

            if (page < totalPages - 2) {
                pages.push('ellipsis');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-center gap-1 mt-12" aria-label="Pagination">
            <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(page - 1)}
                disabled={!hasPrev}
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((pageNum, index) => (
                pageNum === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} className="px-2">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </span>
                ) : (
                    <Button
                        key={pageNum}
                        variant={pageNum === page ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => goToPage(pageNum)}
                        aria-label={`Page ${pageNum}`}
                        aria-current={pageNum === page ? 'page' : undefined}
                    >
                        {pageNum}
                    </Button>
                )
            ))}

            <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(page + 1)}
                disabled={!hasNext}
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
    );
}