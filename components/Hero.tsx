import React from 'react';

interface HeroProps {
  data: any;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { hero, color } = data;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="px-4 md:px-8 lg:px-16 py-20 lg:py-32">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="text-center lg:text-left">
            <div className="inline-block border border-dashed border-gray-600 px-4 py-2 rounded-full mb-4">
                <p className={color.text}>{hero.greeting}</p>
            </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            {hero.title} <span className={color.text}>{hero.subtitle}</span>
          </h1>
          <p className="text-gray-400 mt-6 text-lg max-w-xl mx-auto lg:mx-0">
            {hero.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#portfolio" onClick={handleNavClick} className={`${color.bg} text-black font-semibold px-8 py-4 rounded-full w-full sm:w-auto hover:bg-opacity-80 transition-all duration-300`}>
              View My Work
            </a>
            <a href="#contact" onClick={handleNavClick} className="border border-gray-600 text-white font-semibold px-8 py-4 rounded-full w-full sm:w-auto hover:bg-gray-800 transition-all duration-300">
              Contact Me
            </a>
          </div>
        </div>
        <div className="relative flex justify-center items-center h-[500px] lg:h-[600px]">
          <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full filter blur-3xl opacity-30" style={{backgroundColor: color.primary}}></div>
          
          <div className="absolute spinner w-[80px] h-[80px] md:w-[120px] md:h-[120px] top-4 right-4 md:top-20 md:right-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                </defs>
                <text dy="5">
                    <textPath xlinkHref="#circle" fill="white" className="text-sm font-semibold tracking-widest uppercase">
                        {hero.spinner}
                    </textPath>
                </text>
            </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <img 
            src={hero.image}
            alt={`${data.name} - ${hero.subtitle}`}
            className="relative z-10 w-[300px] h-[450px] md:w-[350px] md:h-[525px] object-cover rounded-lg"
          />
          <div className="absolute z-20 bottom-16 -left-8 md:bottom-24 md:-left-12 bg-black/50 backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-full text-white text-sm">
            {hero.tag1}
          </div>
          <div className="absolute z-20 bottom-4 right-0 md:bottom-8 md:-right-8 font-semibold px-4 py-2 rounded-full text-sm" style={{backgroundColor: color.primary, color: 'black'}}>
            {hero.tag2}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;