import React from 'react';

interface AboutProps {
  data: any;
}

const FallbackSkillIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-bold">
        ?
    </div>
);

const SkillCard: React.FC<{ name: string; icon?: React.ElementType, iconUrl?: string, colorClass: string }> = ({ name, icon: Icon, iconUrl, colorClass }) => {
    const IconToRender = Icon || FallbackSkillIcon;
    return (
        <div className={`bg-[#1C1C1C] p-4 rounded-lg border border-gray-800 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 ${colorClass}`}>
            {iconUrl ? (
                <img src={iconUrl} alt={`${name} icon`} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
            ) : (
                <IconToRender />
            )}
            <p className="text-sm font-medium text-gray-300">{name}</p>
        </div>
    );
};


const About: React.FC<AboutProps> = ({ data }) => {
    const { about, color } = data;
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
        <section id="about" className="px-4 md:px-8 lg:px-16 py-20">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-12">
                <div className="relative flex justify-center items-center h-[500px] lg:h-[600px] order-first lg:order-last">
                     <img 
                        src={about.image} 
                        alt={`About ${data.name}`}
                        className="relative z-10 w-[300px] h-[450px] md:w-[350px] md:h-[525px] object-cover rounded-lg"
                     />
                     <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full filter blur-3xl opacity-20" style={{backgroundColor: color.primary}}></div>
                </div>
                <div className="text-center lg:text-left">
                    <p className={`${color.text} font-semibold mb-2`}>{about.subheading}</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{about.heading}</h2>
                    <p className="text-gray-400 mb-4">
                        {about.description1}
                    </p>
                    <p className="text-gray-400 mb-8">
                        {about.description2}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a href="#contact" onClick={handleNavClick} className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-200 transition-all duration-300 w-full sm:w-auto">
                            Get In Touch
                        </a>
                        {about.resumeUrl && (
                             <a href={about.resumeUrl} download className={`${color.bg} text-black font-semibold px-8 py-4 rounded-full w-full sm:w-auto hover:bg-opacity-80 transition-all duration-300`}>
                                Download Resume
                            </a>
                        )}
                    </div>

                    {/* NEW SKILLS SUBSECTION */}
                    <div className="mt-16">
                        {about.skills && (about.skills.technical?.length > 0 || about.skills.soft?.length > 0) &&
                            <h3 className="text-3xl font-bold text-white text-center lg:text-left mb-8">My Skillset</h3>
                        }
                        <div className="space-y-8">
                            {about.skills?.technical?.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-4 text-gray-400 text-center lg:text-left uppercase tracking-wider text-sm">Technical Skills</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {about.skills.technical.map((skill: any) => (
                                            <SkillCard key={skill.name} name={skill.name} icon={skill.icon} iconUrl={skill.iconUrl} colorClass={color.hoverBorder} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {about.skills?.soft?.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-4 text-gray-400 text-center lg:text-left uppercase tracking-wider text-sm mt-8">Soft Skills</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {about.skills.soft.map((skill: any) => (
                                            <SkillCard key={skill.name} name={skill.name} icon={skill.icon} iconUrl={skill.iconUrl} colorClass={color.hoverBorder} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;