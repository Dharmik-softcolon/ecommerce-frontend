// frontend/app/cookies/page.tsx
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { Cookie } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Cookie Policy | LUXE',
    description: 'Learn how LUXE uses cookies and similar technologies on our website.',
};

export default function CookiesPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Cookie Policy', href: '/cookies' },
    ];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-20">
                <div className="container-custom text-center">
                    <Cookie className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Cookie Policy
                    </h1>
                    <p className="text-primary-foreground/80">
                        Last updated: January 1, 2026
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <Breadcrumbs items={breadcrumbs} />

                <div className="max-w-3xl mx-auto mt-12 prose prose-slate dark:prose-invert">
                    <p className="lead">
                        This Cookie Policy explains how LUXE uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                    </p>

                    <h2>What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to site owners.
                    </p>

                    <h2>Types of Cookies We Use</h2>
                    
                    <h3>Essential Cookies</h3>
                    <p>
                        These cookies are necessary for the website to function properly. They enable core functionality such as:
                    </p>
                    <ul>
                        <li>Shopping cart functionality</li>
                        <li>User authentication and login</li>
                        <li>Security features</li>
                        <li>Remembering your cookie preferences</li>
                    </ul>
                    <p><strong>These cookies cannot be disabled.</strong></p>

                    <h3>Performance Cookies</h3>
                    <p>
                        These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously:
                    </p>
                    <ul>
                        <li>Pages visited and time spent</li>
                        <li>Error messages encountered</li>
                        <li>Load times and performance metrics</li>
                    </ul>

                    <h3>Functionality Cookies</h3>
                    <p>
                        These cookies enable enhanced functionality and personalization:
                    </p>
                    <ul>
                        <li>Remembering your preferences (language, region)</li>
                        <li>Saving recently viewed products</li>
                        <li>Customizing content based on your interests</li>
                    </ul>

                    <h3>Marketing Cookies</h3>
                    <p>
                        These cookies track your browsing activity to deliver more relevant advertising:
                    </p>
                    <ul>
                        <li>Displaying personalized ads</li>
                        <li>Measuring ad campaign effectiveness</li>
                        <li>Limiting ad frequency</li>
                    </ul>

                    <h2>Cookie Details</h2>
                    <div className="overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Cookie Name</th>
                                    <th>Type</th>
                                    <th>Purpose</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>session_id</td>
                                    <td>Essential</td>
                                    <td>Maintains user session</td>
                                    <td>Session</td>
                                </tr>
                                <tr>
                                    <td>cart_token</td>
                                    <td>Essential</td>
                                    <td>Stores cart information</td>
                                    <td>7 days</td>
                                </tr>
                                <tr>
                                    <td>_ga</td>
                                    <td>Performance</td>
                                    <td>Google Analytics</td>
                                    <td>2 years</td>
                                </tr>
                                <tr>
                                    <td>preferences</td>
                                    <td>Functionality</td>
                                    <td>User preferences</td>
                                    <td>1 year</td>
                                </tr>
                                <tr>
                                    <td>_fbp</td>
                                    <td>Marketing</td>
                                    <td>Facebook Pixel</td>
                                    <td>3 months</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Third-Party Cookies</h2>
                    <p>
                        We may use cookies from third-party services including:
                    </p>
                    <ul>
                        <li><strong>Google Analytics:</strong> Website traffic analysis</li>
                        <li><strong>Facebook Pixel:</strong> Ad targeting and measurement</li>
                        <li><strong>Hotjar:</strong> User behavior analysis</li>
                        <li><strong>Payment providers:</strong> Secure transaction processing</li>
                    </ul>

                    <h2>Managing Cookies</h2>
                    <p>
                        You can control and manage cookies in several ways:
                    </p>
                    <h3>Browser Settings</h3>
                    <p>
                        Most browsers allow you to refuse or accept cookies through their settings. Here's how to manage cookies in popular browsers:
                    </p>
                    <ul>
                        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
                        <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Firefox</a></li>
                        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
                        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
                    </ul>

                    <h3>Opt-Out Tools</h3>
                    <p>
                        You can also opt out of certain cookies:
                    </p>
                    <ul>
                        <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out</a></li>
                        <li><a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener">Facebook Ad Preferences</a></li>
                    </ul>

                    <h2>Impact of Disabling Cookies</h2>
                    <p>
                        Please note that disabling certain cookies may affect the functionality of our website:
                    </p>
                    <ul>
                        <li>You may not be able to add items to your cart</li>
                        <li>Your preferences won't be saved</li>
                        <li>Some features may not work as intended</li>
                    </ul>

                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have questions about our use of cookies, please contact us:
                    </p>
                    <ul>
                        <li>Email: privacy@luxe.com</li>
                        <li>Phone: +91 1800 123 4567</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
