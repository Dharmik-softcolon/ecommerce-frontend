import dynamic from 'next/dynamic';

const CheckoutClientPage = dynamic(() => import('./checkout-client'), {
    ssr: false,
});

export default function CheckoutPage() {
    return <CheckoutClientPage />;
}