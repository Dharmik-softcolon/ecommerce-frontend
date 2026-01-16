// frontend/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

const registerSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: 'You must accept the terms and conditions',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);

        try {
            await api.register({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                password: data.password,
            });

            toast.success('Account created successfully! Please sign in.');
            router.push('/auth/login');
        } catch (error: any) {
            toast.error(error.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <h1 className="font-display text-3xl font-bold">LUXE</h1>
                    </Link>
                    <p className="text-muted-foreground mt-2">Create your account</p>
                </div>

                {/* Form */}
                <div className="bg-background border border-border rounded-lg p-8 shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="First name"
                                    className="pl-10"
                                    {...register('firstName')}
                                    error={errors.firstName?.message}
                                />
                            </div>
                            <Input
                                placeholder="Last name"
                                {...register('lastName')}
                                error={errors.lastName?.message}
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="Email address"
                                className="pl-10"
                                {...register('email')}
                                error={errors.email?.message}
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="tel"
                                placeholder="Phone number"
                                className="pl-10"
                                {...register('phone')}
                                error={errors.phone?.message}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="pl-10 pr-10"
                                {...register('password')}
                                error={errors.password?.message}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        <Input
                            type="password"
                            placeholder="Confirm password"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                        />

                        <label className="flex items-start gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded border-border mt-1"
                                {...register('acceptTerms')}
                            />
                            <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
                        </label>
                        {errors.acceptTerms && (
                            <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
                        )}

                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            Create Account
                        </Button>
                    </form>
                </div>

                {/* Login Link */}
                <p className="text-center mt-6 text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-primary font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}