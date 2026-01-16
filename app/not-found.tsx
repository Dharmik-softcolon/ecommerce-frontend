// frontend/app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center">
                {/* 404 Graphic */}
                <div className="relative mb-8">
                    <h1 className="font-display text-[150px] md:text-[200px] font-bold text-muted/30 leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-2">🔍</div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved. 
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/collections">
                            <Search className="mr-2 h-4 w-4" />
                            Browse Collections
                        </Link>
                    </Button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                        Looking for something specific? Try these:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/collections/new-arrivals" className="text-primary hover:underline">
                            New Arrivals
                        </Link>
                        <span className="text-muted">•</span>
                        <Link href="/collections/men" className="text-primary hover:underline">
                            Men's Collection
                        </Link>
                        <span className="text-muted">•</span>
                        <Link href="/collections/women" className="text-primary hover:underline">
                            Women's Collection
                        </Link>
                        <span className="text-muted">•</span>
                        <Link href="/sale" className="text-primary hover:underline">
                            Sale
                        </Link>
                        <span className="text-muted">•</span>
                        <Link href="/contact" className="text-primary hover:underline">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
