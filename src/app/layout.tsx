import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/shared/AppLayout';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'SOP Zen - Hotel SOP Management',
  description: 'Modern SOP management for hotels.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-background`}>
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
