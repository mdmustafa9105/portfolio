import React from 'react';

const iconProps = {
    className: "w-6 h-6 hover:text-white transition-colors duration-300",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as "round",
    strokeLinejoin: "round" as "round",
};

export const LinkedInIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
export const GitHubIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
export const InstagramIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
export const YouTubeIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
export const TwitchIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>;
export const KickIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M17.5 7.5L12 2L6.5 7.5H2V22h20V7.5h-4.5zM8.5 16H6.5v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"></path></svg>;
export const RumbleIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M19 3H5l-2 3v12l2 3h14l2-3V6l-2-3zm-9 12H7v-2h3v2zm0-4H7V9h3v2zm4 4h-3v-2h3v2zm0-4h-3V9h3v2z"></path></svg>;
export const FacebookIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
export const TwitterIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>;
export const ThreadsIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M16 8.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5C9 6.57 10.57 5 12.5 5S16 6.57 16 8.5zM8 15.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5z"></path></svg>;
export const RedditIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M16.5 10.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zM7.5 10.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"></path><path d="M12 15c-2.76 0-5 1.12-5 2.5h10c0-1.38-2.24-2.5-5-2.5z"></path></svg>;
export const SpotifyIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.97c2.5-.5 4.5-2.47 4.5-4.97"></path><path d="M9 14.97c2-.4 3.5-1.97 3.5-3.97"></path><path d="M10 17.97c1.5-.3 2.5-1.47 2.5-2.97"></path></svg>;
export const TikTokIcon = () => <svg {...iconProps} viewBox="0 0 24 24"><path d="M16 2.05c-2.8-.5-5.6.5-7.5 2.5v7.5c0 1.1.9 2 2 2h1c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H9c-3.3 0-6-2.7-6-6V6.05c1.9-2 4.7-3 7.5-2.5v3.5"></path></svg>;

export const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
    switch ((name || '').toLowerCase()) {
        case 'linkedin': return <LinkedInIcon />;
        case 'github': return <GitHubIcon />;
        case 'instagram': return <InstagramIcon />;
        case 'youtube': return <YouTubeIcon />;
        case 'twitch': return <TwitchIcon />;
        case 'kick': return <KickIcon />;
        case 'rumble': return <RumbleIcon />;
        case 'facebook': return <FacebookIcon />;
        case 'twitter': return <TwitterIcon />;
        case 'threads': return <ThreadsIcon />;
        case 'reddit': return <RedditIcon />;
        case 'spotify': return <SpotifyIcon />;
        case 'tiktok': return <TikTokIcon />;
        default: return null;
    }
};
