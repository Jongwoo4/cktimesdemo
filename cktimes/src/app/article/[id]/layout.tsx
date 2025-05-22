import React from 'react';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '@/app/components/footer';

export default function ArticleLayout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <Header />
            <Navigation />
            <div className="flex items-center justify-center flex-col">
                {children}
            </div>
            <Footer />
        </div>
    );
}