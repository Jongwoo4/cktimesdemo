"use client";
import React, { useEffect, useState} from 'react';
import Image from 'next/image';
import { DJANGO_BASE_URL } from '@/config/default';
import { Article } from '@/types/types';
import { ChevronRightIcon } from '@heroicons/react/16/solid';


const news = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch(DJANGO_BASE_URL + `/articles/?page=${page}`);
          const data = await response.json();
          setMaxPage(Math.ceil(data.count/10));
          setArticles(data.results);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchArticles();
    }, [page]);

    return (

                <div className='col-span-2'>
                    <h1 className='text-lg font-bold border-b-4 border-orange-300 pt-6 pb-4 pl-2'> 뉴스</h1>
                    
                    <ul className='grid grid-cols-1'>
                        {articles.map((article, index) => (
                            <li key={index} className='mx-2 my-6 grid grid-cols-2 lg:grid-cols-4 border-b-2 pb-3'>
                                <div className='col-span-1'>
                                    <Image src={article.image} alt="" width={320} height={200} className='object-cover w-full h-full'/>                                    
                                </div>

                                <div className='col-span-1 lg:col-span-3 ml-4'>
                                    <p className='text-lg font-bold'>{article.title}</p>
                                    <p className='text-gray-500 text-sm'>{article.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='flex justify-center w-full'>
                        {/* i want to create number buttons until the max page based on count from data */}
                        {Array.from({length: maxPage}, (_, i) => (
                            <button className="my-2 mx-1 border-2 w-8 h-full text-lg hover:bg-orange-300" key={i} onClick={
                              () => {
                                setPage(i+1);
                                window.scrollTo({top: 0, behavior: 'smooth'});
                              }
                            }>{i+1}</button>
                        ))}
                        {
                            // if the page is not the last page, show the right arrow
                            // if the page is the last page, don't show the right arrow
                            page + 5 < maxPage && <ChevronRightIcon className="w-6 h-6" onClick={() => setPage(page+5)}/>
                        }

                    </div>
                </div>

    )
};

export default news;