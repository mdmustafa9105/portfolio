import React, { useState } from 'react';
import { InputField, TextareaField, ImageUploadField } from './AdminCommon';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ProfileType } from '../../App';

interface Post {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    excerpt: string;
    url?: string;
    tags: string[];
}

interface Idea {
    recipeName: string;
    excerpt: string;
}

interface AdminBlogProps {
  mustafaData: any;
  hermesData: any;
  onUpdate: (profile: ProfileType, section: string, newData: any) => void;
}

const AdminBlog: React.FC<AdminBlogProps> = ({ mustafaData, hermesData, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingProfile, setEditingProfile] = useState<ProfileType>('mustafa');
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleHeaderChange = (profile: ProfileType, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.blog : hermesData.blog;
    onUpdate(profile, 'blog', { ...data, [e.target.name]: e.target.value });
  };

  const handleDeletePost = (profile: ProfileType, postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
        const data = profile === 'mustafa' ? mustafaData.blog : hermesData.blog;
        const newPosts = data.posts.filter((p: Post) => p.id !== postId);
        const newRecentPosts = newPosts.slice(0, 3).map((p:Post) => ({ id: p.id, title: p.title, date: p.date, imageUrl: p.imageUrl, url: p.url }));
        onUpdate(profile, 'blog', { ...data, posts: newPosts, recentPosts: newRecentPosts });
    }
  };

  const openEditModal = (profile: ProfileType, post: Post | null) => {
    setEditingProfile(profile);
    setEditingPost(post || {
        id: uuidv4(),
        title: '',
        date: new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }).replace(/(\d+), (\d+)/, '$2 $1, $3'),
        excerpt: '',
        imageUrl: 'https://images.unsplash.com/photo-1543336396-a6a0f7005581?q=80&w=2070&auto=format&fit=crop',
        tags: [],
        url: '#'
    });
    setIsEditModalOpen(true);
  };
  
  const handleSavePost = () => {
    if (!editingPost) return;
    const data = editingProfile === 'mustafa' ? mustafaData.blog : hermesData.blog;

    const existingPostIndex = data.posts.findIndex((p: Post) => p.id === editingPost.id);
    let newPosts;
    if (existingPostIndex > -1) {
        newPosts = [...data.posts];
        newPosts[existingPostIndex] = editingPost;
    } else {
        newPosts = [editingPost, ...data.posts];
    }
    const newRecentPosts = newPosts.slice(0, 3).map(p => ({ id: p.id, title: p.title, date: p.date, imageUrl: p.imageUrl, url: p.url }));

    onUpdate(editingProfile, 'blog', { ...data, posts: newPosts, recentPosts: newRecentPosts });
    setIsEditModalOpen(false);
    setEditingPost(null);
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingPost) return;
    const {name, value} = e.target;
    if (name === 'tags') {
        setEditingPost({...editingPost, tags: value.split(',').map(t => t.trim())});
    } else {
        setEditingPost({...editingPost, [name]: value});
    }
  }
   const handlePostImageChange = (url: string) => {
    if (!editingPost) return;
    setEditingPost({...editingPost, imageUrl: url});
  }

  const handleGenerateIdeas = async () => {
    if (!topic.trim()) {
        setError("Please enter a topic.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setIdeas([]);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate 5 blog post ideas for the topic "${topic}". For each idea, provide a catchy title and a short, one-sentence excerpt.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            recipeName: { type: Type.STRING, description: 'The title of the blog post.' },
                            excerpt: { type: Type.STRING, description: 'A short excerpt for the blog post.' }
                        }
                    }
                }
            }
        });
        const ideasResult = JSON.parse(response.text);
        setIdeas(ideasResult);
    } catch (e: any) {
        console.error(e);
        setError("Failed to generate ideas. " + e.message);
    } finally {
        setIsLoading(false);
    }
  };

  const openIdeaModal = () => {
    setIsModalOpen(true);
    setError(null);
    setTopic('');
    setIdeas([]);
  };

  const renderProfileBlog = (profile: ProfileType, data: any) => (
      <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
        <h4 className="text-lg font-semibold" style={{ color: data.color.primary }}>{data.name}</h4>
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
            <h5 className="text-md font-semibold text-white">Section Headers</h5>
            <InputField label="Subheading" name="subheading" value={data.blog.subheading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
            <InputField label="Heading" name="heading" value={data.blog.heading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
            <InputField label="Popular Tags (comma separated)" name="popularTags" value={data.blog.popularTags.join(', ')} onChange={(e) => onUpdate(profile, 'blog', {...data.blog, popularTags: e.target.value.split(',').map(t=>t.trim())})} color={data.color} />
        </div>
        <div className="flex justify-end">
             <button onClick={() => openEditModal(profile, null)} className={`${data.color.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 text-sm`}>Add Post</button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {data.blog.posts.map((post: Post) => (
                <div key={post.id} className="bg-gray-900/50 p-3 rounded-lg flex items-center gap-4 border border-gray-800">
                    <img src={post.imageUrl} alt={post.title} className="w-12 h-12 rounded-md object-cover hidden sm:block"/>
                    <div className="flex-grow">
                        <h3 className="text-white font-semibold">{post.title}</h3>
                        <p className="text-gray-400 text-xs">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => openEditModal(profile, post)} className="text-gray-400 hover:text-white text-sm">Edit</button>
                        <button onClick={() => handleDeletePost(profile, post.id)} className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                    </div>
                </div>
            ))}
        </div>
      </div>
  );

  const editModalColor = editingProfile === 'mustafa' ? mustafaData.color : hermesData.color;

  return (
    <>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Blog Section</h3>
        <button onClick={openIdeaModal} className={`border font-semibold px-4 py-2 rounded-full text-sm ${mustafaData.color.border} ${mustafaData.color.text} hover:bg-white/10`}>Generate Ideas w/ AI</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderProfileBlog('mustafa', mustafaData)}
        {renderProfileBlog('hermes', hermesData)}
      </div>
    </div>
    
    {/* Add/Edit Post Modal */}
    {isEditModalOpen && editingPost && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in" onClick={() => setIsEditModalOpen(false)}>
            <div className="w-full max-w-2xl bg-[#1C1C1C] rounded-2xl shadow-lg border border-gray-800" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700">
                     <h2 className="text-xl font-bold text-white">Edit Post</h2>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                   <InputField label="Title" name="title" value={editingPost.title} onChange={handlePostChange} color={editModalColor} />
                   <InputField label="Date" name="date" value={editingPost.date} onChange={handlePostChange} color={editModalColor} />
                   <TextareaField label="Excerpt" name="excerpt" value={editingPost.excerpt} onChange={handlePostChange} color={editModalColor} rows={4} />
                   <InputField label="Tags (comma separated)" name="tags" value={editingPost.tags.join(', ')} onChange={handlePostChange} color={editModalColor} />
                   <InputField label="Post URL" name="url" value={editingPost.url || '#'} onChange={handlePostChange} color={editModalColor} />
                   <ImageUploadField label="Post Image" imageUrl={editingPost.imageUrl} onImageChange={handlePostImageChange} color={editModalColor} />
                </div>
                <div className="p-4 bg-black/50 rounded-b-2xl flex justify-end gap-2">
                    <button onClick={() => setIsEditModalOpen(false)} className="border border-gray-700 font-semibold px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-800">Cancel</button>
                    <button onClick={handleSavePost} className={`${editModalColor.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 text-sm`}>Save Post</button>
                </div>
            </div>
        </div>
    )}

    {/* AI Idea Generator Modal */}
     {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in" onClick={() => setIsModalOpen(false)}>
                <div className="w-full max-w-2xl bg-[#1C1C1C] rounded-2xl p-6 shadow-lg border border-gray-800" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-bold text-white">Generate Blog Post Ideas</h2>
                         <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
                    </div>
                   
                    <div className="flex items-center gap-2">
                        <InputField label="" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} color={mustafaData.color} />
                        <button
                            onClick={handleGenerateIdeas}
                            disabled={isLoading}
                            className={`${mustafaData.color.bg} mt-1 text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isLoading ? '...' : 'Generate'}
                        </button>
                    </div>
                    
                    <div className="mt-4">
                        {isLoading && <p className="text-center text-gray-400">AI is thinking...</p>}
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        {ideas.length > 0 && (
                             <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                                {ideas.map((idea, index) => (
                                    <div key={index} className="bg-black p-3 rounded-lg border border-gray-700">
                                        <h4 className={`font-bold text-white ${mustafaData.color.text}`}>{idea.recipeName}</h4>
                                        <p className="text-gray-400 text-xs mt-1">{idea.excerpt}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default AdminBlog;