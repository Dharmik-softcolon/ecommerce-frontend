// frontend/app/account/settings/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Settings, ArrowLeft, Bell, Lock, Eye, EyeOff, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: true,
        newsletter: false,
        smsAlerts: true,
    });
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/account' },
        { label: 'Settings', href: '/account/settings' },
    ];

    if (status === 'loading') {
        return <SettingsSkeleton />;
    }

    if (!session) {
        redirect('/auth/login?callbackUrl=/account/settings');
    }

    const handlePasswordChange = () => {
        toast.success('Password updated successfully');
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
        toast.success('Notification preferences updated');
    };

    return (
        <main className="container-custom py-8 lg:py-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex items-center gap-4 mt-6 mb-8">
                <Link
                    href="/account"
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-bold">Settings</h1>
            </div>

            <div className="max-w-2xl space-y-12">
                {/* Password Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Change Password</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Current Password</label>
                            <div className="relative">
                                <Input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">New Password</label>
                            <div className="relative">
                                <Input
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                            />
                        </div>
                        <Button onClick={handlePasswordChange}>Update Password</Button>
                    </div>
                </section>

                {/* Notifications Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Notification Preferences</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { key: 'orderUpdates', label: 'Order Updates', description: 'Receive updates about your orders' },
                            { key: 'promotions', label: 'Promotions', description: 'Get notified about sales and offers' },
                            { key: 'newsletter', label: 'Newsletter', description: 'Weekly fashion tips and new arrivals' },
                            { key: 'smsAlerts', label: 'SMS Alerts', description: 'Receive order updates via SMS' },
                        ].map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                                    className={cn(
                                        'relative w-12 h-6 rounded-full transition-colors',
                                        notifications[item.key as keyof typeof notifications]
                                            ? 'bg-primary'
                                            : 'bg-muted'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                                            notifications[item.key as keyof typeof notifications]
                                                ? 'left-7'
                                                : 'left-1'
                                        )}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Appearance Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Sun className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Appearance</h2>
                    </div>
                    <div className="flex gap-4">
                        {[
                            { value: 'light', icon: Sun, label: 'Light' },
                            { value: 'dark', icon: Moon, label: 'Dark' },
                            { value: 'system', icon: Globe, label: 'System' },
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    setTheme(option.value as any);
                                    toast.success(`Theme set to ${option.label}`);
                                }}
                                className={cn(
                                    'flex-1 p-4 border rounded-lg text-center transition-colors',
                                    theme === option.value && 'border-primary bg-primary/5'
                                )}
                            >
                                <option.icon className="h-6 w-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Language Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Language & Region</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Language</label>
                            <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                                <option value="ta">Tamil</option>
                                <option value="te">Telugu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Currency</label>
                            <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                                <option value="INR">₹ INR - Indian Rupee</option>
                                <option value="USD">$ USD - US Dollar</option>
                            </select>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function SettingsSkeleton() {
    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
            <div className="max-w-2xl space-y-12">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-32 bg-muted rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </main>
    );
}
