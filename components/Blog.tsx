
import React, { useState, useMemo } from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface Post {
    title: string;
    date: string;
    imageUrl: string;
    excerpt: string;
    url?: string;
    tags: string[];
}

interface BlogProps {
    data: {
        blog: {
            subheading: string;
            heading: string;
            posts: Post[];
            popularTags: string[];
            recentPosts: {
                title: string;
                date: string;
                imageUrl: string;
                url?: string;
            }[];
        };
        color: any;
    };
}

const Blog: React.FC<BlogProps> = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    if (!data.blog) {
        return null;
    }
    const { blog, color } = data;

    const filteredPosts = useMemo(() => {
        return blog.posts.filter(post => {
            const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
            return matchesSearch && matchesTag;
        });
    }, [searchQuery, selectedTag, blog.posts]);
    
    const handleTagClick = (tag: string | null) => {
        setSelectedTag(currentTag => currentTag === tag ? null : tag);
    };

    return (
        <section id="blog" className="px-4 md:px-8 lg:px-16 py-20 bg-[#111111]">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <p className={`${color.text} font-semibold mb-2`}>{blog.subheading}</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">{blog.heading}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Blog Posts */}
                    <div className="lg:col-span-2 space-y-12">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                 <div key={post.title} className="group">
                                    <img src={post.imageUrl} alt={post.title} className="rounded-2xl mb-6 w-full h-80 object-cover" />
                                     <div className="flex items-center flex-wrap gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <button 
                                                key={tag} 
                                                onClick={() => handleTagClick(tag)}
                                                className={`text-xs font-semibold px-2 py-1 rounded-md transition-all duration-300 hover:opacity-80 ${selectedTag === tag ? 'ring-2' : ''}`}
                                                style={{backgroundColor: color.primary, color: 'black', borderColor: color.primary}}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                                    <h3 className={`text-3xl font-bold text-white mb-4 transition-colors duration-300 group-hover:${color.text}`}>
                                        <a href={post.url || '#'}>{post.title}</a>
                                    </h3>
                                    <p className="text-gray-400">{post.excerpt}</p>
                                </div>
                            ))
                        ) : (
                            <div className="bg-[#1C1C1C] rounded-2xl p-8 text-center text-gray-400 lg:col-span-2 flex flex-col justify-center items-center h-full">
                                <h3 className="text-2xl font-bold text-white mb-2">No Posts Found</h3>
                                <p>Try adjusting your search or selected tag.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-10">
                        {/* Search */}
                        <div className="bg-[#1C1C1C] p-6 rounded-2xl">
                            <h4 className="text-xl font-bold text-white mb-4">Search</h4>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search posts..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full bg-black border border-gray-700 rounded-lg py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-2 ${color.ring}`} 
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Search">
                                    <SearchIcon />
                                </button>
                            </div>
                        </div>
                        {/* Popular Tags */}
                        <div className="bg-[#1C1C1C] p-6 rounded-2xl">
                             <h4 className="text-xl font-bold text-white mb-4">Popular Tags</h4>
                             <div className="flex flex-wrap gap-2">
                                <button 
                                    onClick={() => handleTagClick(null)}
                                    className={`border border-gray-700 px-3 py-1 rounded-md text-sm transition-colors duration-300 ${!selectedTag ? `${color.bg} text-black font-semibold` : `bg-black text-gray-300 ${color.hoverBg} hover:text-black`}`}
                                >
                                    All
                                </button>
                                {blog.popularTags.map(tag => (
                                    <button 
                                        key={tag} 
                                        onClick={() => handleTagClick(tag)}
                                        className={`border border-gray-700 px-3 py-1 rounded-md text-sm transition-colors duration-300 ${selectedTag === tag ? `${color.bg} text-black font-semibold` : `bg-black text-gray-300 ${color.hoverBg} hover:text-black`}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                             </div>
                        </div>
                        {/* Recent Posts */}
                        <div className="bg-[#1C1C1C] p-6 rounded-2xl">
                            <h4 className="text-xl font-bold text-white mb-4">Recent Post</h4>
                            <div className="space-y-4">
                                {blog.recentPosts.map(post => (
                                    <a href={post.url || '#'} key={post.title} className="flex items-center gap-4 group">
                                        <img src={post.imageUrl} alt={post.title} className="w-16 h-16 rounded-lg object-cover" />
                                        <div>
                                            <p className={`font-semibold text-white ${color.groupHoverText} transition-colors duration-300`}>{post.title}</p>
                                            <p className="text-xs text-gray-500">{post.date}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Blog;
