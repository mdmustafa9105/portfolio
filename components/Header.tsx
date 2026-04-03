import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { ProfileType } from '../App';

interface HeaderProps {
  profile: ProfileType;
  toggleProfile: () => void;
  data: any;
}

const navLinks = [
    {name: 'Home', href: '#home'}, 
    {name: 'About', href: '#about'},
    {name: 'Services', href: '#services'},
    {name: 'Portfolio', href: '#portfolio'},
    {name: 'Media', href: '#media'},
    {name: 'Awards', href: '#achievements'},
    {name: 'Gallery', href: '#gallery'},
    {name: 'Blog', href: '#blog'},
    {name: 'Contact', href: '#contact'}
];

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const Header: React.FC<HeaderProps> = ({ profile, toggleProfile, data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Scroll Spy to update active link
  useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.scrollY + 150; // Offset for header

        let currentSection = '#home';
        
        // Edge case: Bottom of page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
             setActiveLink('#contact');
             return;
        }

        for (const link of navLinks) {
            const targetId = link.href.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    currentSection = link.href;
                    break; 
                }
            }
        }
        setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    // If it's a deep link (e.g. #services-web-design), we need to close menu and scroll
    setIsMobileMenuOpen(false);
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        setTimeout(() => {
             targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
  };

  const handleDropdownToggle = (name: string) => {
      setExpandedLink(prev => prev === name ? null : name);
  };

  const Hamburger = () => (
    <button 
        className="xl:hidden relative z-[80] w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
    >
        <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-8 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
    </button>
  );
  
  return (
    <header className="py-6 px-4 md:px-8 lg:px-16 sticky top-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-300 border-b border-white/5">
      <div className="container mx-auto flex justify-between items-center">
        <button 
            onClick={toggleProfile} 
            className="group flex items-center gap-3 relative z-50 focus:outline-none"
            aria-label="Switch Profile"
            title="Click to switch identity"
        >
          <div className="relative group-hover:rotate-180 transition-transform duration-500 ease-in-out">
            <LogoIcon color={data.color.primary} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold text-white leading-none transition-colors group-hover:text-gray-200">{data.logoName}</span>
            <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest mt-1 ${data.color.text} opacity-70 group-hover:opacity-100 transition-all duration-300`}>
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17.414l-4 4l-4 -4"/><path d="M16 3l0 18"/><path d="M8 6.586l4 -4l4 4"/><path d="M12 21l0 -18"/></svg>
               <span>Switch</span>
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={handleNavClick} className={`${activeLink === link.href ? data.color.text : 'text-gray-300'} hover:text-white transition-colors duration-300 text-sm font-medium hover:tracking-wide`}>
              {link.name}
            </a>
          ))}
        </nav>
        
        <div className="hidden xl:flex items-center gap-4">
            <button 
              onClick={toggleProfile} 
              className={`${data.color.bg} text-black font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 text-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]`}
              aria-label={`Switch to ${profile === 'mustafa' ? 'Kaptaan Hermes' : 'Mohammed Mustafa'} profile`}
            >
                Toggle Profile
            </button>
        </div>

        {/* Mobile Menu Button */}
        <Hamburger />

        {/* Mobile Nav Backdrop */}
        <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={() => setIsMobileMenuOpen(false)}
        />

         {/* Mobile Nav Drawer */}
         <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] z-[70] shadow-2xl border-l border-white/10 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
             
             {/* Decorative background glow */}
             <div 
                className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none transition-colors duration-500 opacity-10"
                style={{ backgroundColor: data.color.primary }}
             ></div>

             <div className="flex flex-col h-full p-8 pt-24 pb-32 relative z-10 overflow-y-auto">
                <nav className="flex flex-col gap-6 items-start w-full">
                    {navLinks.map((link, index) => {
                        const isActive = activeLink === link.href;
                        const isServices = link.name === 'Services';
                        const hasSubItems = isServices && data.services?.items?.length > 0;
                        const isExpanded = expandedLink === link.name;
                        
                        return (
                        <div 
                            key={link.name} 
                            // Removed 'transition-all' to prevent height animation conflicts with children
                            className={`w-full transition-[opacity,transform] duration-500 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                            style={{ transitionDelay: `${index * 50 + 100}ms` }}
                        >
                            {hasSubItems ? (
                                <div className="flex flex-col w-full">
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleDropdownToggle(link.name); }}
                                        className={`flex items-center justify-between w-full text-2xl font-bold border-b border-white/5 pb-2 group cursor-pointer bg-transparent focus:outline-none ${isActive || isExpanded ? data.color.text : 'text-gray-400'}`}
                                    >
                                        <span className={`transition-colors duration-300 ${isActive || isExpanded ? '' : 'group-hover:text-white'}`}>{link.name}</span>
                                        <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                                    </button>
                                    <div 
                                        className="overflow-hidden transition-all duration-300 ease-in-out"
                                        style={{ 
                                            maxHeight: isExpanded ? '2000px' : '0px',
                                            opacity: isExpanded ? 1 : 0,
                                            marginTop: isExpanded ? '1rem' : '0'
                                        }}
                                    >
                                        <div className="flex flex-col gap-3 pl-4 border-l border-white/10 ml-1">
                                            <a 
                                                href="#services" 
                                                onClick={handleNavClick}
                                                className="text-lg text-gray-300 hover:text-white transition-colors py-1 block"
                                            >
                                                All Services
                                            </a>
                                            {Array.isArray(data.services?.items) && data.services.items.map((service: any, idx: number) => {
                                                if (!service || typeof service.title !== 'string') return null;
                                                return (
                                                <a 
                                                    key={service.title || idx}
                                                    href={`#service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={handleNavClick}
                                                    className="text-base text-gray-400 hover:text-white transition-colors py-1 block truncate"
                                                >
                                                    {service.title}
                                                </a>
                                            )})}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <a 
                                    href={link.href} 
                                    onClick={handleNavClick} 
                                    className={`block w-full text-2xl font-bold transition-colors duration-300 border-b border-white/5 pb-2 ${isActive ? data.color.text : 'text-gray-400 hover:text-white'}`}
                                >
                                    <span className={`hover:${data.color.text} transition-colors duration-300`}>{link.name}</span>
                                </a>
                            )}
                        </div>
                    )})}
                </nav>
                
                <div className={`mt-auto flex flex-col gap-6 pt-12 transition-[opacity,transform] duration-700 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                    <button 
                    onClick={() => { toggleProfile(); }} 
                    className={`${data.color.bg} text-black font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] w-full`}
                    >
                        Switch Profile
                    </button>
                    <a href="#/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-white text-sm text-center uppercase tracking-widest font-semibold py-2">
                        Admin Login
                    </a>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;