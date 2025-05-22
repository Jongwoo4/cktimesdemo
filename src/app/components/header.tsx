"use client";
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState , useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const Header = () => {    
    const [search, setSearch] = useState(false);
    const [query, setQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle the search query submission
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>  
            <div className='flex justify-center bg-black' >
                <div className='grid grid-cols-2' style={{width: '1200px'}}>
                    <div className='cols-span-1 flex items-center' >
                        <a className='flex items-center' >
                            <FontAwesomeIcon icon={faTwitter} className='mt-2 mb-1 mx-2 h-5 w-5 text-white' />
                        </a>
                        <a className='flex items-center' >
                            <FontAwesomeIcon icon={faInstagram} className='mt-2 mb-1 mx-2 h-5 w-5 text-white' />
                        </a>
                        <a className='flex items-center'>
                            <FontAwesomeIcon icon={faFacebook} className='mt-2 mb-1 mx-2 h-5 w-5 text-white' />   
                        </a>
                    </div>
                    <div className='col-span-1 flex justify-end relative' ref={dropdownRef}>
                        <button className='text-white text-sm m-2' onClick={toggleDropdown}>
                            <span className='flex items-center'>
                                지역보기
                                <ChevronDownIcon className= {`ml-1 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}/>
                            </span>
                        </button>
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-8 w-48 bg-white rounded-md shadow-lg z-10'>
                                <ul className='py-1'>
                                    <a><li className='cursor-pointer px-4 py-1 text-sm text-gray-700 hover:bg-gray-100'>Vancouver</li></a>
                                    <a><li className='cursor-pointer px-4 py-1 text-sm text-gray-700 hover:bg-gray-100'>Los Angeles</li></a>
                                    <a><li className='cursor-pointer px-4 py-1 text-sm text-gray-700 hover:bg-gray-100'>New York</li></a>
                                    <a><li className='cursor-pointer px-4 py-1 text-sm text-gray-700 hover:bg-gray-100'>Atlanta</li></a>
                                    <a><li className='cursor-pointer px-4 py-1 text-sm text-gray-700 hover:bg-gray-100'>Chicago</li></a>
                                    <a><li className='cursor-pointer px-4 py-1 text-sm text-gray-700 hover:bg-gray-100'>Denver</li></a>
                                    <a><li className='cursor-pointer px-4 py-1 text-sm text-gray-700 hover:bg-gray-100'>San Diego</li></a>
                                    <a><li className='cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>한국중앙일보</li></a>
                                </ul>
                            </div>
                        )}
                        <Link href={"/register"}><button className='text-white text-sm m-2'>회원가입</button></Link>
                        <Link href={"/login"}><button className='text-white text-sm m-2'>로그인</button></Link>              
                    </div>                
                </div>
            </div>
            <div className='flex justify-center mt-4'>
                <div className='grid grid-cols-3'style={{width: '1200px'}}>    
                    <div className='col-span-1'>

                    </div>        
                    <div className='col-span-1 flex justify-center'>
                        <Link href="/">
                            <Image src="/images/logo1.png" alt="Logo" width={170} height={100} />
                        </Link>
                    </div>
                    <div className='col-span-1 flex justify-end'>
                        <button onClick={() => setSearch(!search)}> <MagnifyingGlassIcon  className='h-6 w-6 text-black' /></button>
                    </div>
                </div>                
            </div>



            {search && (
                <div className='w-full bg-gray-100 p-4 flex justify-center'>
                    <form onSubmit={handleSearchSubmit} className='w-3/5 flex items-center border border-gray-300 rounded'>
                        <input 
                            type="text" 
                            placeholder="Search..."
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)}
                            className='w-full p-2'
                        />
                        <button type="submit" className='p-2'>
                            <MagnifyingGlassIcon className='h-6 w-6 text-black' />
                        </button>
                    </form>
                </div>
            )}

        </>
    );
}