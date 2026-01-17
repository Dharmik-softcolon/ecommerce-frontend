// frontend/app/loading.tsx
export default function Loading() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-6">
                {/* Animated Logo */}
                <div className="relative">
                    <div className="w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-muted" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
                    </div>
                </div>
                
                {/* Brand Name */}
                <div className="space-y-2">
                    <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                        LUXE
                    </h2>
                    <p className="text-sm text-muted-foreground animate-pulse">
                        Loading your experience...
                    </p>
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center gap-1.5">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}
