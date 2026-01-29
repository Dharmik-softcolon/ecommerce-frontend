'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShopCheckoutPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/checkout');
    }, [router]);

    return null;
}
