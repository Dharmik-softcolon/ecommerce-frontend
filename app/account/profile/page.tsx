// frontend/app/account/profile/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, Camera, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
    });

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/account' },
        { label: 'Profile', href: '/account/profile' },
    ];

    if (status === 'loading') {
        return <ProfileSkeleton />;
    }

    if (!session) {
        redirect('/auth/login?callbackUrl=/account/profile');
    }

    // Initialize form data from session
    if (!formData.name && session.user?.name) {
        setFormData({
            ...formData,
            name: session.user.name || '',
            email: session.user.email || '',
        });
    }

    const handleSave = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success('Profile updated successfully!');
        setIsEditing(false);
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
                <h1 className="text-3xl font-bold">My Profile</h1>
            </div>

            <div className="max-w-2xl">
                {/* Profile Picture */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-semibold overflow-hidden">
                            {session.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || ''}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                session.user?.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">{session.user?.name}</h2>
                        <p className="text-muted-foreground">{session.user?.email}</p>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <Input
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Date of Birth</label>
                            <Input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <select
                            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            disabled={!isEditing}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {isEditing ? (
                            <>
                                <Button onClick={handleSave}>Save Changes</Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </div>
                </div>

                {/* Delete Account */}
                <div className="border-t mt-12 pt-8">
                    <h3 className="font-semibold text-lg mb-2 text-destructive">Danger Zone</h3>
                    <p className="text-muted-foreground mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
            </div>
        </main>
    );
}

function ProfileSkeleton() {
    return (
        <main className="container-custom py-8 lg:py-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
            <div className="max-w-2xl space-y-6">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-muted rounded-full animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="h-10 bg-muted rounded animate-pulse" />
                    <div className="h-10 bg-muted rounded animate-pulse" />
                </div>
            </div>
        </main>
    );
}
