"use client";
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const Navigation = () => {
    const [expanded, setExpanded] = useState(false);

    const categories = [
        '건강', '경제', '교육', '문화', '사회', '스포츠', '연애', '이민', '정치', '종교'
    ];

    const opinions = [
        'FOCUS 동호회', 'SK 이민 칼럼', '국제 Pen 문학산챡', '글사랑 마을', '김시홍 회계 칼럼', 
        '라임트리 모기지 칼럼', '이아진의 Food Story', '이장원 회계 칼럼', '종교 칼럼', '중앙일보 칼럼', '테드진의 머니 클리닉', '황성주 생식과 건강'
    ];

    const shortcuts = [
        '전자신문', '캐나다 한국인', '문화센터', '업소록', '동영상', 'TV 다시보기'
    ];
    const shortcuts_eng = ['paper-news', 'korean-canadian', 'cultural-center', 'business-directory', 'video', 'TV-replay'];

    const recommendedSites = [
        '토론토 총영사관', '캐나다 대사관', '토론토 한인회', '캐나다 한인여성회'
    ]

    return (
        <>  
            <div className='relative m-2'>
                <div className='flex justify-between items-center px-10 border-b outline-gray-300 w-full'>
                    <div className='flex items-center px-4 py-2 mx-auto pl-0' style={{ width: '1200px' }}>
                        <ul className='flex w-full text-lg font-bold'>
                            <li className='hover:text-orange-300 cursor-pointer flex items-center'>
                                <button onClick={() => setExpanded(!expanded)} className='flex items-center'>
                                    <span className='mr-1'>더보기</span>
                                    <ChevronDownIcon className={`h-6 w-6 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                                </button>
                            </li>
                            {categories.map((category, index) => (
                                <Link href={`/news/${category}`} key={index} className='hover:text-orange-300 cursor-pointer flex items-center'>
                                    <span className='mx-4 h-5 border-l border-gray-300'></span>
                                    {category}
                                   
                                </Link>
                            ))}
                            <Link href={`/baro/paper-news`} className='hover:text-orange-300 cursor-pointer flex items-center'>
                                    <span className='mx-4 h-5 border-l border-gray-300'></span>
                                    전자신문
                                   
                            </Link>
                        </ul>
                    </div>
                </div>
                {expanded &&(
                    <div className='absolute top-full left-0 w-full bg-white shadow-lg z-10 flex justify-center ' >
                        <div className='px-10 py-4 grid grid-cols-4 gap-4'style={{width : '1200px'}}> 
                            <div className='border-r border-gray-300 pr-4'>
                                <Link href="/news" onClick={() => setExpanded(!expanded)} ><p className='font-bold text-lg hover:text-orange-300'>분야별 뉴스</p> </Link>
                                <ul className='text-gray-600 space-y-2 font-bold flex flex-col'>
                                    {categories.map((category, index) => (
                                        <Link className='hover:text-orange-300' onClick={() => setExpanded(!expanded)} href={`/news/${category}`} key={index}>{category}</Link>
                                    ))}
                                </ul>
                            </div>
                            <div className='border-r border-gray-300 pr-4'>
                                <p className='font-bold text-lg'>오피니언</p>
                                <ul className='text-gray-600 space-y-2 font-bold'>
                                    {opinions.map((opinion, index) => (
                                        <li className="hover:text-orange-300" key={index}>{opinion}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='border-r border-gray-300 pr-4'>
                                <p className='font-bold text-lg'>바로가기</p>
                                <ul className='text-gray-600 space-y-2 font-bold'>
                                    {shortcuts.map((shortcut, index) => (
                                        <Link href={`baro/${shortcuts_eng[index]}`} key={index} className='hover:text-orange-300 cursor-pointer flex items-center'>{shortcut}</Link>
                                    ))}
                                </ul>
                            </div>
                            <div className='pr-4'>
                                <p className='font-bold text-lg'>추천사이트</p>
                                <ul className='text-gray-600 space-y-2 font-bold'>
                                    {recommendedSites.map((shortcut, index) => (
                                        <li className="hover:text-orange-300" key={index}>{shortcut}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}