// frontend/app/size-guide/page.tsx
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Ruler, Info } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Size Guide | LUXE',
    description: 'Find your perfect fit with our comprehensive size guide for men and women.',
};

const menSizes = {
    tops: [
        { size: 'XS', chest: '34-36', waist: '28-30', length: '26' },
        { size: 'S', chest: '36-38', waist: '30-32', length: '27' },
        { size: 'M', chest: '38-40', waist: '32-34', length: '28' },
        { size: 'L', chest: '40-42', waist: '34-36', length: '29' },
        { size: 'XL', chest: '42-44', waist: '36-38', length: '30' },
        { size: '2XL', chest: '44-46', waist: '38-40', length: '31' },
    ],
    bottoms: [
        { size: '28', waist: '28', hip: '34', inseam: '32' },
        { size: '30', waist: '30', hip: '36', inseam: '32' },
        { size: '32', waist: '32', hip: '38', inseam: '32' },
        { size: '34', waist: '34', hip: '40', inseam: '32' },
        { size: '36', waist: '36', hip: '42', inseam: '32' },
        { size: '38', waist: '38', hip: '44', inseam: '32' },
    ],
};

const womenSizes = {
    tops: [
        { size: 'XS', bust: '32-33', waist: '24-25', hip: '34-35' },
        { size: 'S', bust: '34-35', waist: '26-27', hip: '36-37' },
        { size: 'M', bust: '36-37', waist: '28-29', hip: '38-39' },
        { size: 'L', bust: '38-40', waist: '30-32', hip: '40-42' },
        { size: 'XL', bust: '41-43', waist: '33-35', hip: '43-45' },
        { size: '2XL', bust: '44-46', waist: '36-38', hip: '46-48' },
    ],
    dresses: [
        { size: 'XS (0-2)', bust: '32-33', waist: '24-25', hip: '34-35' },
        { size: 'S (4-6)', bust: '34-35', waist: '26-27', hip: '36-37' },
        { size: 'M (8-10)', bust: '36-37', waist: '28-29', hip: '38-39' },
        { size: 'L (12-14)', bust: '38-40', waist: '30-32', hip: '40-42' },
        { size: 'XL (16-18)', bust: '41-43', waist: '33-35', hip: '43-45' },
    ],
};

export default function SizeGuidePage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Size Guide', href: '/size-guide' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-24">
                <div className="container-custom text-center">
                    <Ruler className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Size Guide
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                        Find your perfect fit with our comprehensive sizing charts
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* How to Measure */}
                <section className="py-12">
                    <h2 className="font-display text-2xl font-bold mb-6">How to Measure</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-muted/30 rounded-lg p-6">
                            <h3 className="font-semibold mb-2">Chest/Bust</h3>
                            <p className="text-sm text-muted-foreground">
                                Measure around the fullest part of your chest, keeping the tape horizontal.
                            </p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-6">
                            <h3 className="font-semibold mb-2">Waist</h3>
                            <p className="text-sm text-muted-foreground">
                                Measure around your natural waistline, keeping the tape comfortably loose.
                            </p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-6">
                            <h3 className="font-semibold mb-2">Hip</h3>
                            <p className="text-sm text-muted-foreground">
                                Measure around the fullest part of your hips, about 8" below your waist.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Men's Sizes */}
                <section className="py-12">
                    <h2 className="font-display text-2xl font-bold mb-6">Men's Sizes</h2>
                    
                    <h3 className="font-semibold text-lg mb-4">Tops (Shirts, T-Shirts, Jackets)</h3>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="border p-3 text-left">Size</th>
                                    <th className="border p-3 text-left">Chest (inches)</th>
                                    <th className="border p-3 text-left">Waist (inches)</th>
                                    <th className="border p-3 text-left">Length (inches)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menSizes.tops.map((row) => (
                                    <tr key={row.size} className="hover:bg-muted/50">
                                        <td className="border p-3 font-medium">{row.size}</td>
                                        <td className="border p-3">{row.chest}</td>
                                        <td className="border p-3">{row.waist}</td>
                                        <td className="border p-3">{row.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3 className="font-semibold text-lg mb-4">Bottoms (Trousers, Jeans)</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="border p-3 text-left">Size</th>
                                    <th className="border p-3 text-left">Waist (inches)</th>
                                    <th className="border p-3 text-left">Hip (inches)</th>
                                    <th className="border p-3 text-left">Inseam (inches)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menSizes.bottoms.map((row) => (
                                    <tr key={row.size} className="hover:bg-muted/50">
                                        <td className="border p-3 font-medium">{row.size}</td>
                                        <td className="border p-3">{row.waist}</td>
                                        <td className="border p-3">{row.hip}</td>
                                        <td className="border p-3">{row.inseam}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Women's Sizes */}
                <section className="py-12">
                    <h2 className="font-display text-2xl font-bold mb-6">Women's Sizes</h2>
                    
                    <h3 className="font-semibold text-lg mb-4">Tops</h3>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="border p-3 text-left">Size</th>
                                    <th className="border p-3 text-left">Bust (inches)</th>
                                    <th className="border p-3 text-left">Waist (inches)</th>
                                    <th className="border p-3 text-left">Hip (inches)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {womenSizes.tops.map((row) => (
                                    <tr key={row.size} className="hover:bg-muted/50">
                                        <td className="border p-3 font-medium">{row.size}</td>
                                        <td className="border p-3">{row.bust}</td>
                                        <td className="border p-3">{row.waist}</td>
                                        <td className="border p-3">{row.hip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3 className="font-semibold text-lg mb-4">Dresses</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="border p-3 text-left">Size</th>
                                    <th className="border p-3 text-left">Bust (inches)</th>
                                    <th className="border p-3 text-left">Waist (inches)</th>
                                    <th className="border p-3 text-left">Hip (inches)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {womenSizes.dresses.map((row) => (
                                    <tr key={row.size} className="hover:bg-muted/50">
                                        <td className="border p-3 font-medium">{row.size}</td>
                                        <td className="border p-3">{row.bust}</td>
                                        <td className="border p-3">{row.waist}</td>
                                        <td className="border p-3">{row.hip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Tips */}
                <section className="py-12 bg-muted/30 rounded-xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="font-semibold text-lg mb-4">Sizing Tips</h2>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>• If you're between sizes, we recommend sizing up for a more comfortable fit.</li>
                                <li>• Measurements may vary by style. Check product-specific sizing notes.</li>
                                <li>• For a slim fit, consider your regular size. For a relaxed fit, size up.</li>
                                <li>• Need help? Our customer support team is happy to assist with sizing questions.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
