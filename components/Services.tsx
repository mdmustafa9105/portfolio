import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface ServicesProps {
    data: any;
}

const FallbackIcon: React.FC<{color?: string}> = ({ color }) => <div style={{ fontSize: '24px', color }} className="group-hover:text-black">❖</div>;

const ServiceCard: React.FC<{ icon?: React.ElementType<{color?: string}>; title: string; description: string; color: string; colorClass: string; textColorClass: string }> = ({ icon: Icon, title, description, color, colorClass, textColorClass }) => {
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
    
    // Generate a unique ID for deep linking
    const serviceId = `service-${(title || '').toLowerCase().replace(/\s+/g, '-')}`;
    
    const IconToRender = Icon || FallbackIcon;
    
    return (
        <div id={serviceId} className={`bg-[#1C1C1C] p-5 rounded-xl border border-transparent ${colorClass} transition-all duration-300 group flex flex-col scroll-mt-24 hover:bg-[#252525] h-full`}>
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-3 border border-gray-800 text-xl font-bold shrink-0 transition-transform duration-300 group-hover:scale-110">
                <IconToRender color={color} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{title}</h3>
            <p className="text-gray-400 text-xs mb-4 flex-grow leading-relaxed line-clamp-3">{description}</p>
            <a href="#contact" onClick={handleNavClick} className={`text-xs font-semibold text-white flex items-center gap-2 ${textColorClass} transition-colors duration-300 mt-auto group-hover:gap-3`}>
                Learn more <ArrowRightIcon />
            </a>
        </div>
    );
}


const Services: React.FC<ServicesProps> = ({ data }) => {
  return (
    <section id="services" className="px-4 md:px-8 lg:px-16 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <p className={`${data.color.text} font-semibold mb-2`}>{data.services.subheading}</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">{data.services.heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.services.items.map((service: any, index: number) => (
                <ServiceCard 
                    key={index} 
                    {...service} 
                    color={data.color.primary}
                    colorClass={data.color.hoverBorder}
                    textColorClass={data.color.groupHoverText}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;