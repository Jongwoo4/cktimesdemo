"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRightIcon , ClockIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { HotClick } from "./components/hotclick";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { DJANGO_BASE_URL } from "@/config/default";
import { Article, Opinion } from "@/types/types";



export default function Home() {
  
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [mainArticles, setMainArticles] = useState<Article[]>([]);
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(DJANGO_BASE_URL + '/main-articles');
        const data = await response.json();

        setMainArticles(data.main_articles);
        setArticles(data.recent_articles)

        const response2 = await fetch(DJANGO_BASE_URL + '/main-opinion');
        const data2 = await response2.json();
        console.log(data.main_articles)
        console.log(data2);
        setOpinions(data2);

        if (data.main_articles.length > 0) {
          setCurrentArticle(data.main_articles[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchArticles();
  }, []);

  if (!currentArticle){
    return <div>Loading...</div>
  }
    return (
      <>
        <Header />
        <Navigation />

        <div className="flex items-center justify-center flex-col">
          {/* Main */}
          <div className="border border-gray-300 m-8 bg-gray-900" style={{maxWidth: '1200px'}}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 h-full" >
                <Link href={`article/${currentArticle.id}`}className="relative col-span-3 text-white border-r border-gray-300 flex flex-col justify-end"
                        style={{ backgroundImage: `url(${currentArticle.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '400px'}}>

                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                        <div className="relative">
                          <h2 className="text-2xl font-bold mb-4 ml-2">{currentArticle.title}</h2>
                          <p className="ml-2">{currentArticle.content}</p>
                        </div>         
                </Link>

                <div className="lg: col-span-1 ">
                    <ul className="space-y-2 ">
                        <li className="text-orange-300 font-bold text-lg m-2 p-4">
                          주요뉴스
                        </li>
                        {mainArticles.map((article, index) => (
                            <Link href={`article/${currentArticle.id}`} key={index} className={`${currentArticle.title === article.title ? 'bg-orange-300': ''}`}>
                              <li
                                  
                                  className={`p-2 py-3 text-sm transform transition-transform duration-300 hover:translate-x-2 hover:text-white truncate ${currentArticle.title === article.title ? 'bg-orange-300 text-white ml-3' : 'text-gray-400'}`}
                                  onMouseEnter={() => setCurrentArticle(article)}
                              >
                                  {article.title}
                              </li>                          
                            </Link>
                        ))}
                        <li className="flex justify-end">
                            <div className="p-2 my-4 text-sm text-gray-400 flex cursor-pointer">
                             <Link href={'/news'} className="flex">전체뉴스 더보기  <ChevronRightIcon className="h-5 w-5"/> </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>        
          </div>

          {/* Contents */}

          <div style={{maxWidth: '1200px'}}>
            <div className="grid grid-cols-1 lg:grid-cols-3  gap-2 ">


              {/* Left Content */}
              <div className="col-span-2">
                {
                  articles.map((article, index) => (
                    <div key={index} className="py-2 grid grid-cols-1 lg:grid-cols-3 border-b border-dotted border-gray-300">
                      <div className="col-span-1 ">
                        <Image src={article.image} alt="" width={400} height={400} className="w-full h-full object-cover" />
                      </div>
                      <div className="col-span-2 ml-4 pt-2 ">
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-500">{article.content}</p>

                        <p className="text-sm text-gray-700 mt-2 font-bold">{article.category}</p>
                        <p className="text-xs text-gray-500 flex mt-1" ><ClockIcon className="w-4 h-4 mr-1"/> {article.published_at.slice(0,10)}</p>


                      </div>

                    </div>)
                  )
                }
                <div className="flex justify-center w-full">
                  <Link href={"/news"} className="flex justify-center w-full"><button className="w-full h-10 border-2 my-2  hover:bg-orange-300 hover:text-white transition duration-500 ">더보기</button></Link>

                
                </div>

                <div className="">
                  <div className="flex border-2 justify-between items-center border-b-orange-300 border-b-4">
                    <h2 className="text-lg font-bold m-2">오피니언</h2>
                    <Link href={"/opinion"}><ChevronRightIcon className="h-5 w-5 m-2"/></Link>
                  </div> 
                 <div className="grid grid-cols-1 lg:grid-cols-2" >
                      {opinions.map((opinion, index) => (
                        <div key={index} className="m-2 p-1 col-span-1 flex flex-col justify-end">
                          <Image src={opinion.image} alt="" width={400} height={400} className=" w-full h-full object-cover"/>
                            <h3 className="text-lg font-bold">{opinion.title}</h3>
                            <div className="flex text-sm text-gray-500 items-center">
                              <Link href={`/opinion/${opinion.group}`}className="font-bold">{opinion.group} </Link>
                              <ClockIcon className="w-4 h-4 mx-1"/> 
                              <p className="text-xs">{opinion.published_at.slice(0,10)}</p>
                            </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>



              {/* Right Content */}
              <div className="col-span-1 p-4 flex flex-col">
                <HotClick />
              </div>



            </div>        
          </div>        
        </div>


        <Footer />  
      </>

  );

}
