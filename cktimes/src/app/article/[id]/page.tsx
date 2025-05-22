"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HotClick } from '../../components/hotclick';
import { Baro } from '../../components/baro';
import { ClockIcon, ChatBubbleLeftEllipsisIcon} from '@heroicons/react/24/outline';
import { Article } from '@/types/types';
import { DJANGO_BASE_URL } from '@/config/default';

const ArticlePage = ({ params }:{params:any}) => {
    const [unwrappedParams, setUnwrappedParams] = useState<any>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article>();
    const [comments, setComments] = useState([
      {
        user: 'John Doe',
        comment: 'Great article! I found the information very insightful.',
        time: '2021-10-10'
      },
      {
        user: 'Jane Smith',
        comment: 'I have a question about the research mentioned in the article. Can you provide more details?',
        time: '2021-10-10'
      },
      {
        user: 'Sam Johnson',
        comment: 'This is fascinating! I never knew about the potential benefits of napping at work.',
        time: '2021-10-10'
      },
      {
        user: 'Emily Brown',
        comment: 'I love the idea of a futuristic eco-friendly park. It would be a great addition to our city!',
        time: '2021-10-10'
      }
    ]);

    useEffect(() => {
      const unwrapParams = async () => {
        const resolvedParams = await params;
        setUnwrappedParams(resolvedParams);
      };

      unwrapParams();
    }, [params]);

    useEffect(() => {
        if (unwrappedParams) {
          const fetchArticle = async () => {
            try {
                const { id } = unwrappedParams;
                console.log(id);
                const response = await fetch(DJANGO_BASE_URL + '/article/' + id);
                const data = await response.json();
                console.log(data);
                setSelectedArticle(data);
                
            } catch (error) {
                console.log(error);
            }
          }
          fetchArticle();
        }
    }, [unwrappedParams]);

    if (!selectedArticle) {
        return <div>Loading...</div>
    }

    return (

      <div style={{maxWidth: '1200px'}}>
                      {/* Title */}
                      <div className='my-4'>
                        <div className='border-b-2 border-orange-300'>
                          <h1 className='text-3xl m-3' >{selectedArticle.title}</h1>
                          <h2 className='text-lg m-3 text-gray-700'>{selectedArticle.subtitle}</h2>
                          <div className='flex text-xs  m-3 '>
                              <p className='border-r-2 my-2 pr-2'>
                                  {selectedArticle.author}
                              </p>
                              <p className='flex my-2 px-2 border-r-2'>
                                  <ClockIcon className="w-4 h-4 mr-1"/> {selectedArticle.published_at.slice(0, 10)}
                              </p>
                              <p className='my-2 pl-2 flex'>
                                <ChatBubbleLeftEllipsisIcon className="w-4 h-4 mr-1"/> 댓글 0
                              </p>
                          </div>
                        </div>  
                      </div>
                      {/* Content   */}
                      <div className="grid grid-cols-3 mt-10">
                          <div className='col-span-2 '>
                              <div className='flex flex-row'>
                                  <div className='w-1/5 mr-1'>
                                    Ads
                                  </div>
                                  <div className='w-4/5 relative'>                    
                                      <Image src={selectedArticle.image} alt="" quality={85} layout="responsive" width={320} height={200} className='object-contain w-full h-full' />  
                                      {selectedArticle.content}
                                  </div>
                                
                              </div>

                              
                              {/* Comment */}
                              <div className='mt-20 border-b-1 border-orange-3'>
                                <h2 className='border-b-2 border-orange-300'>댓글 {comments.length}</h2>

                                <div>
                                  <div className=''>     
                                    <div className='mt-2 mb-8'>
                                      <input type="text" placeholder="댓글을 입력하세요" className=' border-2 border-gray-400 w-full h-40 rounded-md text-center focus:text-left'/>
                                      <button className='w-full bg-gray-400 mt-1 rounded-md '>등록</button>                                    
                                    </div>                               

                                    <div>
                                      {comments.map((comment, index) => (
                                        <div key={index} className='border-t-2 border-orange-200 mb-3 mt-2'>
                                          <div className='flex mt-2 px-2'>
                                            <p className='font-bold'>{comment.user}</p>
                                            <p className='text-gray-700 ml-2'>{comment.time}</p>
                                          </div>
                                          <p className='px-2 text-sm'>{comment.comment}</p>
                                        </div>
                                      ))}
                                    </div>

                                  </div>
                                </div>
                              </div>
                          </div>          
                  

                          <div className='col-span-1'>
                              <Baro />
                              <HotClick />
                          </div>
                      </div>                    
        </div>     

    );
};

export default ArticlePage;