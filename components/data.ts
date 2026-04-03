import React from 'react';
import { UiUxIcon } from './icons/UiUxIcon';
import { AppDesignIcon } from './icons/AppDesignIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';
import { 
    CodeIcon, ReactIcon, PythonIcon, SecurityIcon, 
    ProblemSolvingIcon, TeamworkIcon, CommunicationIcon, 
    VideoEditingIcon, PhotoshopIcon, StreamingIcon, CreativityIcon 
} from './icons/SkillIcons';

const textIconStyle: React.CSSProperties = { fontSize: '24px' };

const GameDevIcon: React.FC<{color?: string}> = ({ color }) => React.createElement('div', { style: {...textIconStyle, color}, className: "group-hover:text-black" }, '❖');
const WritingIcon: React.FC<{color?: string}> = ({ color }) => React.createElement('div', { style: {...textIconStyle, color}, className: "group-hover:text-black" }, '✎');
const FullStackIcon = WebsiteIcon;
const LogoDesignIcon = UiUxIcon;
const GraphicDesignIcon = AppDesignIcon;
const TrainingIcon: React.FC<{color?: string}> = ({ color }) => React.createElement('div', { style: {...textIconStyle, color}, className: "group-hover:text-black" }, '⌬');
const StrategyIcon: React.FC<{color?: string}> = ({ color }) => React.createElement('div', { style: {...textIconStyle, color}, className: "group-hover:text-black" }, '⌾');
const SponsorshipIcon: React.FC<{color?: string}> = ({ color }) => React.createElement('div', { style: {...textIconStyle, color}, className: "group-hover:text-black" }, '🤝');
const CollaborationIcon: React.FC<{color?: string}> = ({ color }) => React.createElement('div', { style: {...textIconStyle, color}, className: "group-hover:text-black" }, '✨');


const mustafaServices = [
    { icon: GameDevIcon, title: 'Game Developer', description: 'Building interactive and engaging game experiences.' },
    { icon: FullStackIcon, title: 'Full Stack Developer', description: 'End-to-end application and web development solutions.' },
    { icon: TrainingIcon, title: 'Training & Mentoring', description: 'Sharing knowledge and guiding aspiring developers and designers.' },
    { icon: CollaborationIcon, title: 'Collaboration', description: 'Partnering on innovative tech and design projects.' },
];

const hermesServices = [
    { icon: StrategyIcon, title: 'Content Strategy', description: 'Developing engaging content plans for streaming and social media.' },
    { icon: SponsorshipIcon, title: 'Sponsorship', description: 'Collaborating with brands that align with Tez Army values.' },
    { icon: CollaborationIcon, title: 'Collaboration', description: 'Partnering with fellow creators on exciting new projects.' },
    { icon: GraphicDesignIcon, title: 'Graphic Design', description: 'Specializing in esports thumbnails and stream branding.' },
    { icon: AppDesignIcon, title: 'Brand kits', description: 'Developing cohesive and strong brand visuals.' },
];

export const data = {
  mustafa: {
    name: "Mohammed Mustafa",
    logoName: "Mustafa.",
    color: {
      primary: '#00FFFF', // Cyan
      bg: 'bg-[#00FFFF]',
      hoverBg: 'hover:bg-[#00FFFF]',
      text: 'text-[#00FFFF]',
      border: 'border-[#00FFFF]',
      hoverBorder: 'hover:border-[#00FFFF]',
      groupHoverText: 'group-hover:text-[#00FFFF]',
      ring: 'focus:ring-[#00FFFF]',
    },
    hero: {
      greeting: "Hello There!",
      title: "Im Mohammed Mustafa,",
      subtitle: "Multi domain learner",
      description: "I am a student focused on building discipline, fitness, and real world skills. I push myself through challenges to improve both mentally and physically. I am also exploring content creation to document my journey and growth. My goal is to become a well rounded, high performing individual.",
      image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1974&auto=format&fit=crop",
      tag1: "Idealogist",
      tag2: "Developer",
      spinner: "JACK OF ALL TRADES • MASTER OF NONE •"
    },
    marquee: ['Co-Founder','Mentor','Enthusiast','Cybersecurity', 'Entrepreneurship', 'Full Stack'],
    services: {
        subheading: 'My Specialization',
        heading: 'Services I Provide',
        items: mustafaServices
    },
    portfolio: {
        subheading: 'My Portfolio',
        heading: 'Have a Look At My Projects',
        items: [
            { title: 'Pawbrulee', tags: ['Pet Rescue', 'SOS App'], imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop', span: '', detailedDescription: 'Pawbrulee is a mobile application concept designed to connect pet owners with emergency veterinary services and create a community-based alert system for lost pets. The app features real-time location tracking and a network of volunteers.', demoUrl: 'https://pawbrulee.netlify.app', githubUrl: 'https://github.com' },
            { title: 'Spendora', tags: ['AI', 'Expense Tracker'], imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop', span: '', detailedDescription: 'Spendora is an intelligent expense tracker that uses AI to categorize spending, identify trends, and provide personalized budget recommendations. It integrates with various financial institutions to automate transaction logging.', demoUrl: '#', githubUrl: 'https://github.com' },
        ]
    },
    media: {
        subheading: 'Press & Talks',
        heading: 'Featured Appearances',
        items: [
            { id: '1', title: 'Tech Talk: Future of AI', type: 'Talk', date: 'Sept 2024', url: '#', thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop' },
            { id: '2', title: 'Cybersecurity Awareness Workshop', type: 'Workshop', date: 'Aug 2024', url: '#', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop' },
        ]
    },
    achievements: {
        subheading: 'Milestones',
        heading: 'Awards & Certifications',
        items: [
            { id: '1', title: 'IBM ICE DAY ', organization: 'IBM', date: 'Dec 2025', description: 'First place winner in the IBM ICE Day.' },
            { id: '2', title: 'Hackathon Winner', organization: 'TechFest 2023', date: '2023', description: 'First place winner in the "AI for Good" category for the Spendora project.' },
            { id: '3', title: 'Dean\'s List', organization: 'S-Vyasa University', date: '2023-2024', description: 'Recognized for outstanding academic performance in Computer Science Engineering.' },
        ]
    },
    gallery: {
        subheading: 'Visual Showcase',
        heading: 'My Gallery of Work',
        items: [
            { title: 'Cybersecurity Dashboard', imageUrl: 'https://images.unsplash.com/photo-1555949963-ff980877a23a?q=80&w=2070&auto=format&fit=crop' },
            { title: '3D Game Environment', imageUrl: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?q=80&w=1932&auto=format&fit=crop' },
            { title: 'Web Application Design', imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop' },
            { title: 'AI Robot Arm', imageUrl: 'https://images.unsplash.com/photo-1620712943543-95fc6962c2f7?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Minimalist Logo Collection', imageUrl: 'https://images.unsplash.com/photo-1600585152220-029415515286?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Corporate Branding Mockup', imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop' },
        ]
    },
    blog: {
      subheading: "Tech & Thoughts",
      heading: "Insights from My Journey",
      posts: [
        {
          id: '1',
          title: "The Future of Cybersecurity in an AI-Driven World",
          date: "25 October 2024",
          imageUrl: "https://images.unsplash.com/photo-1526374965328-5f61d4dc16c6?q=80&w=2070&auto=format&fit=crop",
          excerpt: "Exploring the intersection of artificial intelligence and cybersecurity, and what it means for the future of digital defense...",
          url: "#",
          tags: ['Cybersecurity', 'AI']
        },
        {
          id: '2',
          title: "My First Steps into Full Stack Development with React and Node.js",
          date: "12 October 2024",
          imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
          excerpt: "A look back at my learning process, the challenges I faced, and the key takeaways from building my first full-stack application...",
          url: "#",
          tags: ['Web Development', 'React', 'Node.js']
        }
      ],
      popularTags: ['Cybersecurity', 'AI', 'Web Development', 'React', 'Node.js', 'Game Design', 'Entrepreneurship'],
      recentPosts: [
        { id: '1', title: "Demystifying Blockchain Technology", date: "22 October 2024", imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop", url: "#" },
        { id: '2', title: "Principles of Good UI/UX Design", date: "18 October 2024", imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop", url: "#" },
        { id: '3', title: "Why I'm Passionate About AI Robotics", date: "15 October 2024", imageUrl: "https://images.unsplash.com/photo-1527525443983-6e60c7535586?q=80&w=1974&auto=format&fit=crop", url: "#" }
      ]
    },
    about: {
        subheading: 'About Me',
        heading: "Jack of All Trades, Master of Some.",
        description1: "I'm currently pursuing my BTech in CSE Cybersecurity at S-Vyasa University (Aug 2024-Sept 2028). My journey in tech is driven by a relentless curiosity and a passion for building things that matter.",
        description2: "Completed my Grade 11-12 at Smt. Kamala Bai Educational Institution (May 2012-Mar 2022). My goal is to leverage technology to create innovative solutions and build my own ventures.",
        image: "https://images.unsplash.com/photo-1622463097233-7d63a45b4892?q=80&w=1887&auto=format&fit=crop",
        resumeUrl: "/mohammed-mustafa-resume.pdf",
        skills: {
            technical: [
                { name: 'JavaScript / TS', icon: CodeIcon },
                { name: 'React / Next.js', icon: ReactIcon },
                { name: 'Python', icon: PythonIcon },
                { name: 'Cybersecurity', icon: SecurityIcon },
            ],
            soft: [
                { name: 'Problem Solving', icon: ProblemSolvingIcon },
                { name: 'Team Collaboration', icon: TeamworkIcon },
                { name: 'Communication', icon: CommunicationIcon },
                { name: 'Creativity', icon: CreativityIcon },
            ]
        }
    },
    contact: {
        email: "mhdmustafa9105@gmail.com",
        socials: [
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammed-mustafa9105' },
            { name: 'GitHub', url: 'https://github.com/mdmustafa9105' },
            { name: 'Instagram', url: 'https://www.instagram.com/mdmustafa9105' },
        ]
    }
  },
  hermes: {
    name: "Kaptaan Hermes",
    logoName: "Kaptaan.",
    color: {
      primary: '#65F43A', // Green
      bg: 'bg-[#65F43A]',
      hoverBg: 'hover:bg-[#65F43A]',
      text: 'text-[#65F43A]',
      border: 'border-[#65F43A]',
      hoverBorder: 'hover:border-[#65F43A]',
      groupHoverText: 'group-hover:text-[#65F43A]',
      ring: 'focus:ring-[#65F43A]',
    },
    hero: {
      greeting: "Welcome to Tez Army!",
      title: "I am Kaptaan Hermes,",
      subtitle: "A Content Creator & Athlete.",
      description: "A Bengaluruian based Indian Content Creator and live-streamer known for his Self Improvement, Athleticism, World Records, Music , Storyteller, Reaction and other skills in his videos even also he play games on his channels..",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
      tag1: "Content Creator",
      tag2: "Athlete",
      tag3: "Sway",
      spinner: "100% WORK HARD • 0% TALENT •"
    },
    marquee: ['Content Creator', 'Athlete', 'Tez Army', 'Streamer', 'Gamer', 'Skill Taker' , ],
    services: {
        subheading: 'My Offerings',
        heading: 'Services I Provide',
        items: hermesServices
    },
    portfolio: {
        subheading: 'My Work',
        heading: 'Explore My Creative Projects',
        items: [
            { title: 'Streaming Overlays', tags: ['Twitch', 'Branding'], imageUrl: 'https://images.unsplash.com/photo-1593113646773-ae62114034be?q=80&w=2070&auto=format&fit=crop', span: 'row-span-2', detailedDescription: 'A comprehensive branding package for Twitch streamers, including animated overlays, alerts, and panels. Designed to be easily customizable and integrated with platforms like Streamlabs and OBS.', demoUrl: '#', githubUrl: '#' },
            { title: 'Community Management', tags: ['Tez Army', 'Discord'], imageUrl: 'https://images.unsplash.com/photo-1585834893322-e83718525e43?q=80&w=1962&auto=format&fit=crop', span: '', detailedDescription: 'Developed and currently manage the official "Tez Army" Discord server. This includes bot integration, role management, event organization, and moderation to foster a positive and engaging community environment.', demoUrl: '#', githubUrl: 'https://github.com' },
            { title: 'Twitch Affiliation', tags: ['Streaming', 'Community'], imageUrl: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1932&auto=format&fit=crop', span: '', detailedDescription: 'Achieved Twitch Affiliate status through consistent streaming, content planning, and community engagement. This project represents the strategic growth of a personal brand on the platform.', demoUrl: 'https://twitch.tv/kaptaanhermes', githubUrl: '#' },
            { title: 'YouTube Content Series', tags: ['Editing', 'Strategy'], imageUrl: 'https://images.unsplash.com/photo-1543336396-a6a0f7005581?q=80&w=2070&auto=format&fit=crop', span: 'col-span-1 md:col-span-2', detailedDescription: 'Planned, edited, and produced a multi-part content series for YouTube, focusing on athletic challenges. The project involved storyboarding, video editing with Adobe Premiere Pro, creating custom thumbnails, and SEO optimization.', demoUrl: 'https://example.com', githubUrl: 'https://github.com' },
        ]
    },
    media: {
        subheading: 'In The News',
        heading: 'Media & Features',
        items: [
            { id: '1', title: 'Viral Reaction Video', type: 'YouTube', date: 'Oct 2024', url: '#', thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2070&auto=format&fit=crop' },
            { id: '2', title: 'Community Charity Stream', type: 'Live Stream', date: 'Aug 2024', url: '#', thumbnail: 'https://images.unsplash.com/photo-1534669740902-e09e38a6a29f?q=80&w=2068&auto=format&fit=crop' },
        ]
    },
    achievements: {
        subheading: 'Hall of Fame',
        heading: 'Records & Milestones',
        items: [
            { id: '1', title: 'Twitch Affiliate', organization: 'Twitch', date: 'April 2024', description: 'Reached affiliate status in record time through community engagement and consistent schedule.' },
            { id: '2', title: '1K Tez Army Members', organization: 'Discord', date: '2024', description: 'Grew the community discord server to over 1000 active members.' },
            { id: '3', title: 'Marathon Finisher', organization: 'Bengaluru Marathon', date: '2023', description: 'Completed first full marathon with a sub-4 hour time.' },
        ]
    },
    gallery: {
        subheading: 'The Tez Army Vault',
        heading: 'Moments & Milestones',
        items: [
            { title: 'Epic Gameplay Moment', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Custom Stream Overlay', imageUrl: 'https://images.unsplash.com/photo-1609701546252-cf8b1b288c3a?q=80&w=1964&auto=format&fit=crop' },
            { title: 'Athletic Training', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Community Discord Event', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1931&auto=format&fit=crop' },
            { title: 'YouTube Thumbnail Showcase', imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop' },
            { title: 'Streaming Setup', imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785f5533?q=80&w=1964&auto=format&fit=crop' },
        ]
    },
    blog: {
      subheading: "News & Blogs",
      heading: "Insights from My Blogs",
      posts: [
        {
          id: '1',
          title: "Building the Tez Army: A Community Story",
          date: "24 October 2024",
          imageUrl: "https://images.unsplash.com/photo-1529007196341-35b8504c2bdd?q=80&w=2070&auto=format&fit=crop",
          excerpt: "From a simple idea to a thriving community, this is the story of how the Tez Army was built on passion, dedication, and a lot of hard work...",
          url: "#",
          tags: ['Community', 'Tez Army', 'Streaming']
        },
        {
          id: '2',
          title: "My Journey to Becoming a Twitch Affiliate",
          date: "10 October 2024",
          imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop",
          excerpt: "The grind is real. Here are the lessons I learned on the path to becoming a Twitch affiliate and what's next for the channel...",
          url: "#",
          tags: ['Twitch', 'Streaming']
        }
      ],
      popularTags: ['Streaming', 'Community', 'Twitch', 'Athleticism', 'Content Creation', 'Tez Army', 'YouTube'],
      recentPosts: [
        { id: '1', title: "The Role of Visual Storytelling in Content", date: "20 October 2024", imageUrl: "https://images.unsplash.com/photo-1574717521945-9831380e2f4b?q=80&w=2070&auto=format&fit=crop", url: "#" },
        { id: '2', title: "My Top 5 Favorite Games to Stream Right Now", date: "18 October 2024", imageUrl: "https://images.unsplash.com/photo-1612287230202-95a04162e213?q=80&w=2070&auto=format&fit=crop", url: "#" },
        { id: '3', title: "How '100% Work Hard' Became My Motto", date: "14 October 2024", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop", url: "#" }
      ]
    },
    about: {
        subheading: 'About Me',
        heading: "100% Work Hard, 0% Talent.",
        description1: "Inspired by creators like Ryan Trahan and Mike Shake, I've been on YouTube for 11 years. I'm a streamer affiliated on Twitch (since April 6, 2024) and active on Kick and Rumble for 2 years.",
        description2: "My motto is my core belief. It's about dedication and perseverance in everything I do, from content creation to my athletic pursuits, all while building the Tez Army community.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        resumeUrl: "",
        skills: {
            technical: [
                { name: 'Video Editing', icon: VideoEditingIcon },
                { name: 'Photoshop', icon: PhotoshopIcon },
                { name: 'Streaming (OBS)', icon: StreamingIcon },
            ],
            soft: [
                { name: 'Creativity', icon: CreativityIcon },
                { name: 'Communication', icon: CommunicationIcon },
                { name: 'Community Engagement', icon: TeamworkIcon },
            ]
        }
    },
    contact: {
        email: "kaptaanhermescollab@gmail.com",
        socials: [
            { name: 'YouTube', url: 'https://www.youtube.com/channel/UCt_qr1pomfdJmFnpK61JgCA' },
            { name: 'Instagram', url: 'https://www.instagram.com/kaptaanhermes' },
            { name: 'Twitch', url: 'https://www.twitch.tv/kaptaanhermes' },
            { name: 'Kick', url: 'https://kick.com/kaptaanhermes' },
            { name: 'Rumble', url: 'https://rumble.com/user/KaptaanHermes' },
            { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100091378879570' },
            { name: 'Twitter', url: 'https://x.com/KaptaanHermes' },
            { name: 'Threads', url: 'https://www.threads.com/@kaptaanhermes' },
            { name: 'Reddit', url: 'https://www.reddit.com/user/kaptaanhermes/' },
            { name: 'Spotify', url: 'https://open.spotify.com/user/31viv2phthulqwvkvznojkyejoai' },
            { name: 'TikTok', url: 'https://www.tiktok.com/@kaptaanhermes' },
        ]
    }
  }
};