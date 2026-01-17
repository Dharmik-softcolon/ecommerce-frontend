// frontend/app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ShoppingBag, Sparkles } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="text-center relative z-10 max-w-2xl mx-auto">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <h1 className="font-display text-[120px] sm:text-[160px] md:text-[200px] font-bold text-primary/5 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-full flex items-center justify-center shadow-lg border border-amber-200/50 dark:border-amber-700/30">
                                    <ShoppingBag className="h-10 w-10 sm:h-14 sm:w-14 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                    <span className="text-white text-xs font-bold">?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4 mb-10">
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                        Oops! The page you're looking for seems to have wandered off. 
                        Let's help you find your way back to our amazing collections.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                    <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="border-2 hover:bg-muted/50 transition-all duration-300 group">
                        <Link href="/collections">
                            <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            Browse Collections
                        </Link>
                    </Button>
                </div>

                {/* Quick Links */}
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 sm:p-8 shadow-soft">
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Popular Destinations
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { label: 'New Arrivals', href: '/collections/new-arrivals' },
                            { label: "Men's Collection", href: '/collections/men' },
                            { label: "Women's Collection", href: '/collections/women' },
                            { label: 'Accessories', href: '/collections/accessories' },
                            { label: 'Sale', href: '/sale', highlight: true },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                                    link.highlight
                                        ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md hover:shadow-lg'
                                        : 'bg-muted/80 hover:bg-muted text-foreground'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Help text */}
                <p className="text-sm text-muted-foreground mt-8">
                    Need help? <Link href="/contact" className="text-primary hover:underline font-medium">Contact our support team</Link>
                </p>
            </div>
        </main>
    );
}
