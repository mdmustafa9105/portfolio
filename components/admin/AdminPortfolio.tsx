import React from 'react';
import { InputField, ImageUploadField, TextareaField } from './AdminCommon';
import { v4 as uuidv4 } from 'uuid';
import { ProfileType } from '../../App';

interface AdminPortfolioProps {
  mustafaData: any;
  hermesData: any;
  onUpdate: (profile: ProfileType, section: string, newData: any) => void;
}

const AdminPortfolio: React.FC<AdminPortfolioProps> = ({ mustafaData, hermesData, onUpdate }) => {
  
  const handleHeaderChange = (profile: ProfileType, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.portfolio : hermesData.portfolio;
    onUpdate(profile, 'portfolio', { ...data, [e.target.name]: e.target.value });
  };

  const handleItemChange = (profile: ProfileType, index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const data = profile === 'mustafa' ? mustafaData.portfolio : hermesData.portfolio;
    const newItems = [...data.items];
    const { name, value } = e.target;
    if (name === 'tags') {
      newItems[index] = { ...newItems[index], tags: value.split(',').map(tag => tag.trim()) };
    } else {
      newItems[index] = { ...newItems[index], [name]: value };
    }
    onUpdate(profile, 'portfolio', { ...data, items: newItems });
  };

  const handleImageChange = (profile: ProfileType, index: number, base64: string) => {
    const data = profile === 'mustafa' ? mustafaData.portfolio : hermesData.portfolio;
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], imageUrl: base64 };
    onUpdate(profile, 'portfolio', { ...data, items: newItems });
  };

  const handleAddItem = (profile: ProfileType) => {
    const data = profile === 'mustafa' ? mustafaData.portfolio : hermesData.portfolio;
    const newItem = {
      id: uuidv4(),
      title: 'New Project',
      tags: ['new', 'project'],
      imageUrl: 'https://images.unsplash.com/photo-1543336396-a6a0f7005581?q=80&w=2070&auto=format&fit=crop',
      span: '',
      detailedDescription: 'A detailed description for this new project goes here. Explain the purpose, technologies used, and your role in its development.',
      demoUrl: '#',
      githubUrl: '#',
    };
    onUpdate(profile, 'portfolio', { ...data, items: [...data.items, newItem] });
  };

  const handleRemoveItem = (profile: ProfileType, index: number) => {
    const data = profile === 'mustafa' ? mustafaData.portfolio : hermesData.portfolio;
    const newItems = data.items.filter((_: any, i: number) => i !== index);
    onUpdate(profile, 'portfolio', { ...data, items: newItems });
  };

  const renderProfilePortfolio = (profile: ProfileType, data: any) => (
    <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
        <h4 className="text-lg font-semibold" style={{ color: data.color.primary }}>{data.name}</h4>
        
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
            <h5 className="text-md font-semibold text-white">Section Headers</h5>
            <InputField label="Subheading" name="subheading" value={data.portfolio.subheading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
            <InputField label="Heading" name="heading" value={data.portfolio.heading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
        </div>

        <div className="space-y-4">
            <h5 className="text-md font-semibold text-white">Portfolio Items</h5>
            {data.portfolio.items.map((item: any, index: number) => (
                <div key={item.id || index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-300">Project #{index + 1}</p>
                        <button onClick={() => handleRemoveItem(profile, index)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove</button>
                    </div>
                    <InputField label="Title" name="title" value={item.title} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <InputField label="Tags (comma separated)" name="tags" value={item.tags.join(', ')} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <TextareaField label="Detailed Description" name="detailedDescription" value={item.detailedDescription} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} rows={4} />
                    <InputField label="Live Demo URL" name="demoUrl" value={item.demoUrl || ''} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <InputField label="GitHub URL" name="githubUrl" value={item.githubUrl || ''} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <InputField label="Grid Span Class (optional)" name="span" value={item.span} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <ImageUploadField label="Project Image" imageUrl={item.imageUrl} onImageChange={(base64) => handleImageChange(profile, index, base64)} color={data.color} />
                </div>
            ))}
        </div>
        <button onClick={() => handleAddItem(profile)} className={`${data.color.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 text-sm`}>
            Add Project
        </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Portfolio Section</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderProfilePortfolio('mustafa', mustafaData)}
        {renderProfilePortfolio('hermes', hermesData)}
      </div>
    </div>
  );
};

export default AdminPortfolio;