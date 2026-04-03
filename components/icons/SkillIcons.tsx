import React from 'react';

const iconProps = {
    className: "w-8 h-8",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as "round",
    strokeLinejoin: "round" as "round",
};

export const CodeIcon: React.FC = () => <svg {...iconProps}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
export const ReactIcon: React.FC = () => <svg {...iconProps}><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>;
export const PythonIcon: React.FC = () => <svg {...iconProps}><path d="M13 10V3H7v18h10V10h-4zM7 15h4"></path></svg>;
export const SecurityIcon: React.FC = () => <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;

export const ProblemSolvingIcon: React.FC = () => <svg {...iconProps}><path d="M12 20v-4M12 4v4M4 12h4M16 12h4M18.36 5.64l-2.83 2.83M8.46 15.54l-2.83 2.83M18.36 18.36l-2.83-2.83M8.46 8.46L5.64 5.64"></path><circle cx="12" cy="12" r="3"></circle></svg>;
export const TeamworkIcon: React.FC = () => <svg {...iconProps}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
export const CommunicationIcon: React.FC = () => <svg {...iconProps}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

export const VideoEditingIcon: React.FC = () => <svg {...iconProps}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
export const PhotoshopIcon: React.FC = () => <svg {...iconProps}><path d="M12 22a7 7 0 0 0 7-7h-2a5 5 0 0 1-5 5v2z"></path><path d="M22 12a7 7 0 0 0-7-7v2a5 5 0 0 1 5 5h2z"></path><path d="M12 2a7 7 0 0 0-7 7h2a5 5 0 0 1 5-5V2z"></path><path d="M2 12a7 7 0 0 0 7 7v-2a5 5 0 0 1-5-5H2z"></path></svg>;
export const StreamingIcon: React.FC = () => <svg {...iconProps}><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><path d="M12 8a4 4 0 0 1 4 4"></path><path d="M8 12a4 4 0 0 1 4-4"></path></svg>;
export const CreativityIcon: React.FC = () => <svg {...iconProps}><path d="M3 17l6-6 4 4 8-8"></path><path d="M14 7h7v7"></path></svg>;
