// frontend/components/product/product-filters.tsx (continued)
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import * as Accordion from '@radix-ui/react-accordion';
import * as Slider from '@radix-ui/react-slider';
import { ChevronDown, Check, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#1e3a5f' },
    { name: 'Grey', hex: '#6b7280' },
    { name: 'Beige', hex: '#d4c4a8' },
    { name: 'Brown', hex: '#8b4513' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Blue', hex: '#2563eb' },
];

const categories = [
    { name: 'All', slug: '' },
    { name: 'Shirts', slug: 'shirts' },
    { name: 'T-Shirts', slug: 't-shirts' },
    { name: 'Trousers', slug: 'trousers' },
    { name: 'Jeans', slug: 'jeans' },
    { name: 'Jackets', slug: 'jackets' },
    { name: 'Suits', slug: 'suits' },
    { name: 'Accessories', slug: 'accessories' },
];

export function ProductFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [priceRange, setPriceRange] = useState([
        Number(searchParams.get('priceMin')) || 0,
        Number(searchParams.get('priceMax')) || 15000,
    ]);

    const selectedSizes = searchParams.getAll('sizes');
    const selectedColors = searchParams.getAll('colors');
    const selectedCategory = searchParams.get('category') || '';

    const updateFilters = (key: string, value: string, isChecked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        if (isChecked) {
            params.append(key, value);
        } else {
            const values = params.getAll(key).filter(v => v !== value);
            params.delete(key);
            values.forEach(v => params.append(key, v));
        }

        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const updateSingleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('priceMin', priceRange[0].toString());
        params.set('priceMax', priceRange[1].toString());
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const clearAllFilters = () => {
        router.push(pathname, { scroll: false });
    };

    const hasActiveFilters =
        selectedSizes.length > 0 ||
        selectedColors.length > 0 ||
        selectedCategory ||
        searchParams.has('priceMin') ||
        searchParams.has('priceMax');

    const FilterContent = () => (
        <div className="space-y-6">
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="w-full justify-start text-muted-foreground"
                >
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                </Button>
            )}

            <Accordion.Root
                type="multiple"
                defaultValue={['category', 'sizes', 'colors', 'price']}
                className="space-y-4"
            >
                {/* Category */}
                <Accordion.Item value="category" className="border-b border-border pb-4">
                    <Accordion.Header>
                        <Accordion.Trigger className="flex w-full items-center justify-between py-2 font-medium text-sm [&[data-state=open]>svg]:rotate-180">
                            Category
                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="pt-3 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category.slug}
                                    onClick={() => updateSingleFilter('category', category.slug)}
                                    className={cn(
                                        'block w-full text-left px-2 py-1.5 text-sm rounded transition-colors',
                                        selectedCategory === category.slug
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                    )}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>

                {/* Sizes */}
                <Accordion.Item value="sizes" className="border-b border-border pb-4">
                    <Accordion.Header>
                        <Accordion.Trigger className="flex w-full items-center justify-between py-2 font-medium text-sm [&[data-state=open]>svg]:rotate-180">
                            Size
                            {selectedSizes.length > 0 && (
                                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {selectedSizes.length}
                </span>
                            )}
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 ml-auto" />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="pt-3 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                        <div className="grid grid-cols-3 gap-2">
                            {sizes.map((size) => (
                                <label
                                    key={size}
                                    className={cn(
                                        'flex items-center justify-center h-10 border cursor-pointer transition-all text-sm',
                                        selectedSizes.includes(size)
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-border hover:border-primary'
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={selectedSizes.includes(size)}
                                        onChange={(e) => updateFilters('sizes', size, e.target.checked)}
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>

                {/* Colors */}
                <Accordion.Item value="colors" className="border-b border-border pb-4">
                    <Accordion.Header>
                        <Accordion.Trigger className="flex w-full items-center justify-between py-2 font-medium text-sm [&[data-state=open]>svg]:rotate-180">
                            Color
                            {selectedColors.length > 0 && (
                                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {selectedColors.length}
                </span>
                            )}
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 ml-auto" />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="pt-3 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                        <div className="grid grid-cols-4 gap-3">
                            {colors.map((color) => (
                                <label
                                    key={color.name}
                                    className="relative cursor-pointer group"
                                    title={color.name}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={selectedColors.includes(color.name)}
                                        onChange={(e) => updateFilters('colors', color.name, e.target.checked)}
                                    />
                                    <span
                                        className={cn(
                                            'block w-8 h-8 rounded-full border-2 transition-all',
                                            selectedColors.includes(color.name)
                                                ? 'ring-2 ring-primary ring-offset-2 scale-110'
                                                : 'border-border group-hover:scale-110'
                                        )}
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    {selectedColors.includes(color.name) && (
                                        <Check
                                            className={cn(
                                                'absolute inset-0 m-auto h-4 w-4',
                                                ['White', 'Beige'].includes(color.name) ? 'text-black' : 'text-white'
                                            )}
                                        />
                                    )}
                                </label>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>

                {/* Price Range */}
                <Accordion.Item value="price" className="pb-4">
                    <Accordion.Header>
                        <Accordion.Trigger className="flex w-full items-center justify-between py-2 font-medium text-sm [&[data-state=open]>svg]:rotate-180">
                            Price Range
                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="pt-3 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                        <div className="space-y-4 px-1">
                            <Slider.Root
                                className="relative flex items-center select-none touch-none w-full h-5"
                                value={priceRange}
                                onValueChange={setPriceRange}
                                max={15000}
                                step={500}
                                minStepsBetweenThumbs={1}
                            >
                                <Slider.Track className="bg-muted relative grow rounded-full h-1">
                                    <Slider.Range className="absolute bg-primary rounded-full h-full" />
                                </Slider.Track>
                                <Slider.Thumb className="block w-5 h-5 bg-background border-2 border-primary rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors" />
                                <Slider.Thumb className="block w-5 h-5 bg-background border-2 border-primary rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors" />
                            </Slider.Root>

                            <div className="flex items-center justify-between text-sm">
                                <span>{formatPrice(priceRange[0])}</span>
                                <span>{formatPrice(priceRange[1])}</span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={applyPriceFilter}
                                className="w-full"
                            >
                                Apply Price Filter
                            </Button>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </div>
    );

    return (
        <>
            {/* Desktop Filters */}
            <div className="hidden lg:block sticky top-24">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </h2>
                <FilterContent />
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filters
                            {hasActiveFilters && (
                                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters
                            </SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}