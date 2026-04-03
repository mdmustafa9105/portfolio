import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLinkIcon, GitHubPortfolioIcon, ShareIcon } from './icons/PortfolioIcons';

interface Project {
    title: string;
    tags: string[];
    imageUrl: string;
    span: string;
    detailedDescription: string;
    demoUrl?: string;
    githubUrl?: string;
}

interface PortfolioProps {
  data: any;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6"x2="18" y2="18"></line>
    </svg>
);


const PortfolioCard: React.FC<Project & { colorClass: string; onCardClick: () => void }> = ({ title, tags, imageUrl, span, colorClass, onCardClick }) => (
    <button onClick={onCardClick} className={`group relative rounded-2xl overflow-hidden ${span} fade-in text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${'focus:' + colorClass.replace('bg-', 'ring-')}`}>
        <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <div className="flex gap-2 mb-2">
                {tags.map(tag => (
                    <span key={tag} className={`${colorClass} text-black text-xs font-semibold px-2 py-1 rounded-md`}>{tag}</span>
                ))}
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <span className="text-white font-bold text-lg">View Details</span>
        </div>
    </button>
);

const ProjectDetailModal: React.FC<{ project: Project; onClose: () => void; color: any }> = ({ project, onClose, color }) => {
    const [copied, setCopied] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleShare = async () => {
        const urlToShare = (project.demoUrl && project.demoUrl !== '#') ? project.demoUrl : window.location.href;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: project.title,
                    text: `Check out ${project.title}: ${project.detailedDescription}`,
                    url: urlToShare
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(urlToShare || '');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('Error copying to clipboard:', error);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100] fade-in" onClick={onClose}>
            <div className="w-full max-w-5xl bg-[#1C1C1C] rounded-2xl shadow-2xl border border-gray-800 flex flex-col md:flex-row max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
                     <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-90" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1C1C1C]/50"></div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-[#1C1C1C]">
                    <div className="flex justify-between items-start mb-6">
                         <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{project.title}</h2>
                        <button onClick={onClose} className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300 shrink-0 ml-4">
                            <CloseIcon/>
                        </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                             <span key={tag} className={`${color.bg} text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>{tag}</span>
                        ))}
                    </div>
                    
                    <div className="prose prose-invert max-w-none text-gray-300 mb-8 leading-relaxed">
                        <p>{project.detailedDescription}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto pt-6 border-t border-gray-800">
                        {project.demoUrl && project.demoUrl !== '#' && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`${color.bg} text-black font-bold px-8 py-3.5 rounded-full w-full sm:w-auto hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                                <ExternalLinkIcon /> Live Demo
                            </a>
                        )}
                        {project.githubUrl && project.githubUrl !== '#' && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-gray-600 text-white font-bold px-8 py-3.5 rounded-full w-full sm:w-auto hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2">
                                <GitHubPortfolioIcon /> View Code
                            </a>
                        )}
                        <button 
                            onClick={handleShare}
                            className="border border-gray-600 text-gray-300 font-bold px-8 py-3.5 rounded-full w-full sm:w-auto hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <ShareIcon /> {copied ? 'Link Copied!' : 'Share'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    data.portfolio.items.forEach((item: { tags: string[] }) => {
        item.tags.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags);
  }, [data.portfolio.items]);

  const filteredItems = useMemo(() => {
    if (!activeTag) {
        return data.portfolio.items;
    }
    return data.portfolio.items.filter((item: { tags: string[] }) => item.tags.includes(activeTag));
  }, [activeTag, data.portfolio.items]);

  return (
    <>
      <section id="portfolio" className="px-4 md:px-8 lg:px-16 py-20 bg-[#111111]">
        <div className="container mx-auto">
          <div className="text-left mb-8">
              <p className={`${data.color.text} font-semibold mb-2`}>{data.portfolio.subheading}</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">{data.portfolio.heading}</h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 justify-start">
              <button
                  onClick={() => setActiveTag(null)}
                  className={`font-semibold px-4 py-2 rounded-full text-sm transition-all duration-300 ${!activeTag ? `${data.color.bg} text-black` : `bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white`}`}
                  aria-pressed={!activeTag}
              >
                  All Projects
              </button>
              {allTags.map(tag => (
                  <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`font-semibold px-4 py-2 rounded-full text-sm transition-all duration-300 ${activeTag === tag ? `${data.color.bg} text-black` : `bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white`}`}
                      aria-pressed={activeTag === tag}
                  >
                      {tag}
                  </button>
              ))}
          </div>
          
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[350px]">
                {filteredItems.map((project: Project) => (
                    <PortfolioCard key={project.title} {...project} colorClass={data.color.bg} onCardClick={() => setSelectedProject(project)} />
                ))}
            </div>
          ) : (
            <div className="bg-[#1C1C1C] rounded-2xl p-8 text-center text-gray-400 fade-in">
                <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
                <p>There are no projects with the selected tag.</p>
            </div>
          )}

        </div>
      </section>

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          color={data.color}
        />
      )}
    </>
  );
};

export default Portfolio;