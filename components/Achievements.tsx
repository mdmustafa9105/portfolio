import React from 'react';

interface AchievementItem {
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    imageUrl?: string;
}

interface AchievementsProps {
    data: {
        achievements: {
            subheading: string;
            heading: string;
            items: AchievementItem[];
        };
        color: any;
    };
}

const TrophyIcon = ({ color }: { color: string }) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15C15.866 15 19 11.866 19 8V3H5V8C5 11.866 8.13401 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 4H21C21.5304 4 22.0391 4.21071 22.4142 4.58579C22.7893 4.96086 23 5.46957 23 6C23 6.53043 22.7893 7.03914 22.4142 7.41421C22.0391 7.78929 21.5304 8 21 8H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 4H3C2.46957 4 1.96086 4.21071 1.58579 4.58579C1.21071 4.96086 1 5.46957 1 6C1 6.53043 1.21071 7.03914 1.58579 7.41421C1.96086 7.78929 2.46957 8 3 8H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Achievements: React.FC<AchievementsProps> = ({ data }) => {
    const { achievements, color } = data;

    if (!achievements || !achievements.items || achievements.items.length === 0) return null;

    return (
        <section id="achievements" className="px-4 md:px-8 lg:px-16 py-20 bg-[#111111]">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <p className={`${color.text} font-semibold mb-2`}>{achievements.subheading}</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">{achievements.heading}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.items.map((item) => (
                        <div 
                            key={item.id} 
                            className={`bg-[#1C1C1C] p-8 rounded-2xl border border-transparent ${color.hoverBorder} transition-all duration-300 group`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-3 rounded-full bg-black border border-gray-800 group-hover:border-[${color.primary}] transition-colors duration-300`}>
                                    <TrophyIcon color={color.primary} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.organization}</p>
                                </div>
                            </div>
                            {item.imageUrl && (
                                <div className="mb-4 rounded-xl overflow-hidden border border-gray-800">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                                </div>
                            )}
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-black text-gray-300 border border-gray-800`}>
                                {item.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;