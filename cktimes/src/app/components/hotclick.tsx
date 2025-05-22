const hotClick = [
    {
        title: 'Tech Giants Clash in AI Arms'
    },
    {
        title: 'Local Farmer Discovers Rare Gemstone'
    },
    {
        title: 'New Study Reveals Sur'
    },
    {
        title: 'City Unveils Plans for Futuristic Eco-Friendly Park'
    },
    {
        title: 'Space Tourism Takes Off: First Commercial Moon Flight Announced'
    },
    {
        title: 'Wildfire Season Starts Early: Communities Brace for Impact'
    },
    {
        title: 'Meet the High Schooler Who Invented a Water-Purifying Robot'
    },
    {
        title: 'Why Mushroom Coffee Is the Latest Wellness Craze'
    },
    {
        title: 'Experts Warn of Rising Cyber Threats Targeting Small Businesses'
    },
    {
        title: 'The Comeback of Vinyl: Why Millennials Are Going Retro'
    },
  ]

export const HotClick = () => {

   
    return (
            
        <div className="border border-gray-300 my-4 ml-5" style={{width:'375px'}}>
          <div className="text-orange-300 font-bold m-2 ml-5">핫클릭</div>
            {hotClick.map((click, index) => (
              <div key={index} className="flex items-center h-10 w-full m-1">
                <span className="bg-orange-300 text-white m-3 p-2 w-8 h-8 flex items-center justify-center">{index + 1}</span>
                <span className="p-2 text-sm truncate flex-1 hover:underline">{click.title}</span>                    
              </div>
            ))}
        </div>
    );

}