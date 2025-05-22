import Link from 'next/link'

const categories = [
    '건강', '경제', '교육', '문화', '사회', '스포츠', '연애', '이민', '정치', '종교'
]

export const Baro = () => {

    return(
    <div className=" my-4" style={{width:'400px'}}>
        <div className="text-orange-300 font-bold m-2 ml-5">뉴스 바로가기</div>
        <div className="grid grid-cols-2 gap-1 m-2 ml-5">
            {
                categories.map((category, index) => (
                    <Link href={`/news/${category}`} key={index} className="border h-10 flex justify-center items-center hover:bg-orange-300 hover:cursor-pointer hover:text-white">
                        {category}
                    </Link>
                ))
            }
        </div>
 
    </div>
    )
}