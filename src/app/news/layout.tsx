import React from 'react';
import { Header } from '../components/header';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import {Baro } from '../components/baro';
import {HotClick} from '../components/hotclick';

export default function NewsLayout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <Header />
            <Navigation />
            <div className="flex items-center justify-center flex-col">
                <div style={{maxWidth: '1200px'}}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                         {children}          

                        <div className='col-span-1'>
                            <Baro />
                            <HotClick />
                        </div>

                    </div>
                </div>     
            </div>


            <Footer /> 
        </div>
    );
}