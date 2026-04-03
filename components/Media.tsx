import React from 'react';
import { ExternalLinkIcon } from './icons/PortfolioIcons';

interface MediaItem {
    id: string;
    title: string;
    type: string;
    url: string;
    thumbnail: string;
    date: string;
}

interface MediaProps {
    data: {
        media: {
            subheading: string;
            heading: string;
            items: MediaItem[];
        };
        color: any;
    };
}

const Media: React.FC<MediaProps> = ({ data }) => {
    const { media, color } = data;

    if (!media || !media.items || media.items.length === 0) return null;

    return (
        <section id="media" className="px-4 md:px-8 lg:px-16 py-20 bg-black relative">
            <div className="container mx-auto">
                <div className="text-left mb-12">
                    <p className={`${color.text} font-semibold mb-2`}>{media.subheading}</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">{media.heading}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {media.items.map((item) => (
                        <a 
                            key={item.id} 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group block rounded-2xl overflow-hidden bg-[#1C1C1C] border border-gray-800 transition-all duration-300 hover:border-opacity-50 hover:shadow-2xl"
                            style={{ borderColor: 'transparent' }}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={item.thumbnail} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className={`absolute top-4 left-4 ${color.bg} text-black text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                                    {item.type}
                                </div>
                            </div>
                            <div className="p-6 relative">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`text-xl font-bold text-white transition-colors duration-300 group-hover:${color.text}`}>
                                        {item.title}
                                    </h3>
                                    <ExternalLinkIcon />
                                </div>
                                <p className="text-gray-500 text-sm mt-2">{item.date}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Media;