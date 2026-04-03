import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { SocialIcon } from './icons/SocialIcons';

interface FooterProps {
  data: any;
}

const footerLinks = [
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

const Footer: React.FC<FooterProps> = ({ data }) => {
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
        <footer id="contact" className="bg-[#1C1C1C] text-gray-400">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {/* Logo and info */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="scale-75 origin-left"><LogoIcon color={data.color.primary} /></div>
                            <span className="text-lg font-bold text-white">{data.logoName}</span>
                        </div>
                        <p className="max-w-md mb-3 text-xs">Let's connect and create something amazing together.</p>
                         <a href={`mailto:${data.contact.email}`} className={`inline-block ${data.color.bg} text-black font-semibold px-4 py-1.5 text-xs rounded-full hover:bg-opacity-80 transition-colors duration-300`}>
                            {data.contact.email}
                        </a>
                    </div>

                    {/* Navigation */}
                    <div className="md:justify-self-center">
                        <h4 className="text-lg font-bold text-white mb-2">Navigation</h4>
                        <ul className="space-y-1 text-sm">
                            {footerLinks.map(link => (
                                <li key={link.name}><a href={link.href} onClick={handleNavClick} className="hover:text-white transition-colors duration-300">{link.name}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="md:justify-self-end">
                        <h4 className="text-lg font-bold text-white mb-2">Follow Me</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                           {data.contact.socials.map(social => (
                               <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name}>
                                   <SocialIcon name={social.name} />
                               </a>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 py-3 flex flex-col sm:flex-row justify-between items-center text-center text-xs gap-2">
                    <p>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</p>
                    <a href="#/login" className="hover:text-white transition-colors duration-300">Admin Login</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;