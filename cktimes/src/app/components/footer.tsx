import Image from 'next/image';

export const Footer = () => {

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

    const recommendedSites = [
        '토론토 총영사관', '캐나다 대사관', '토론토 한인회', '캐나다 한인여성회'
    ]

    return (
        <div className='mt-3'>
            <div className='bg-[#2c2c2c] flex justify-center'>
                    <div className='left-0 w-full shadow-lg z-10' style={{maxWidth: '1200px'}}>
                        <div className='px-10 py-4 grid grid-cols-4 gap-4'>
                            <div className='border-r border-gray-300 pr-4'>
                                <p className='font-bold text-white text-lg'>분야별</p>
                                <ul className='text-gray-300 space-y-2 font-bold'>
                                    {categories.map((category, index) => (
                                        <li key={index}>{category}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='border-r border-gray-300 pr-4'>
                                <p className='font-bold text-white text-lg'>오피니언</p>
                                <ul className='text-gray-300 space-y-2 font-bold'>
                                    {opinions.map((opinion, index) => (
                                        <li key={index}>{opinion}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='border-r border-gray-300 pr-4'>
                                <p className='font-bold text-white text-lg'>바로가기</p>
                                <ul className='text-gray-300 space-y-2 font-bold'>
                                    {shortcuts.map((shortcut, index) => (
                                        <li key={index}>{shortcut}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='pr-4'>
                                <p className='font-bold  text-white text-lg'>추천사이트</p>
                                <ul className='text-gray-300 space-y-2 font-bold'>
                                    {recommendedSites.map((shortcut, index) => (
                                        <li key={index}>{shortcut}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='bg-gray-900 text-white'>
                <p>회사소개</p>
                <p>개인정보처리방침</p>
                <p>이용약관</p>
                
            </div>
        </div>
    )
}


