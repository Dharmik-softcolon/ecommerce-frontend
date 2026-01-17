// frontend/app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to monitoring service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-muted/30">
            <div className="text-center max-w-lg mx-auto">
                {/* Error Icon */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-full flex items-center justify-center shadow-lg border border-red-200/50 dark:border-red-700/30">
                        <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4 mb-8">
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        We apologize for the inconvenience. An unexpected error occurred 
                        while processing your request. Please try again.
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground/60 font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
                    <Button 
                        onClick={reset} 
                        size="lg"
                        className="shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                        <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {/* Support Link */}
                <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-3">
                        If the problem persists, please contact our support team.
                    </p>
                    <Link 
                        href="/contact" 
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Support
                    </Link>
                </div>
            </div>
        </main>
    );
}
