// frontend/components/product/product-sort.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'bestselling', label: 'Best Selling' },
];

export function ProductSort() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get('sort') || 'newest';

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', value);
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <Select.Root value={currentSort} onValueChange={handleSortChange}>
            <Select.Trigger className="inline-flex items-center justify-between gap-2 px-4 py-2 text-sm border border-border rounded bg-background hover:bg-accent transition-colors min-w-[180px]">
                <Select.Value>
                    {sortOptions.find(o => o.value === currentSort)?.label}
                </Select.Value>
                <Select.Icon>
                    <ChevronDown className="h-4 w-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="overflow-hidden bg-background border border-border rounded-md shadow-lg z-50">
                    <Select.Viewport className="p-1">
                        {sortOptions.map((option) => (
                            <Select.Item
                                key={option.value}
                                value={option.value}
                                className={cn(
                                    'relative flex items-center px-8 py-2 text-sm rounded cursor-pointer outline-none',
                                    'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
                                    'data-[state=checked]:font-medium'
                                )}
                            >
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                    <Check className="h-4 w-4" />
                                </Select.ItemIndicator>
                                <Select.ItemText>{option.label}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}