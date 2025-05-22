import React from 'react';
import { Header } from '../components/header';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';

export default function opinionLayout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <Header />
            <Navigation />
            <div className="flex items-center justify-center flex-col">
                <div style={{maxWidth: '1200px'}}>

                    {children}
                </div>                
            </div>


            <Footer /> 
        </div>
    );
}