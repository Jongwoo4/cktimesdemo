import React from 'react';
import { Header } from '../components/header';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import {Baro } from '../components/baro';
import {HotClick} from '../components/hotclick';

export default function Barolayout ({ children } : Readonly<{ children: React.ReactNode }>) {
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