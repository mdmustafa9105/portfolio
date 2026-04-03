import React from 'react';
import { InputField, ImageUploadField } from './AdminCommon';
import { v4 as uuidv4 } from 'uuid';
import { ProfileType } from '../../App';

interface AdminGalleryProps {
  mustafaData: any;
  hermesData: any;
  onUpdate: (profile: ProfileType, section: string, newData: any) => void;
}

const AdminGallery: React.FC<AdminGalleryProps> = ({ mustafaData, hermesData, onUpdate }) => {
  const handleHeaderChange = (profile: ProfileType, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.gallery : hermesData.gallery;
    onUpdate(profile, 'gallery', { ...data, [e.target.name]: e.target.value });
  };

  const handleItemChange = (profile: ProfileType, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.gallery : hermesData.gallery;
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], title: e.target.value };
    onUpdate(profile, 'gallery', { ...data, items: newItems });
  };

  const handleImageChange = (profile: ProfileType, index: number, url: string) => {
    const data = profile === 'mustafa' ? mustafaData.gallery : hermesData.gallery;
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], imageUrl: url };
    onUpdate(profile, 'gallery', { ...data, items: newItems });
  };
  
  const handleAddItem = (profile: ProfileType) => {
    const data = profile === 'mustafa' ? mustafaData.gallery : hermesData.gallery;
    const newItem = {
      id: uuidv4(),
      title: 'New Image',
      imageUrl: 'https://images.unsplash.com/photo-1543336396-a6a0f7005581?q=80&w=2070&auto=format&fit=crop',
    };
    onUpdate(profile, 'gallery', { ...data, items: [...data.items, newItem] });
  };

  const handleRemoveItem = (profile: ProfileType, index: number) => {
    const data = profile === 'mustafa' ? mustafaData.gallery : hermesData.gallery;
    const newItems = data.items.filter((_: any, i: number) => i !== index);
    onUpdate(profile, 'gallery', { ...data, items: newItems });
  };

  const renderProfileGallery = (profile: ProfileType, data: any) => (
      <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
        <h4 className="text-lg font-semibold" style={{ color: data.color.primary }}>{data.name}</h4>
        
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
            <h5 className="text-md font-semibold text-white">Section Headers</h5>
            <InputField label="Subheading" name="subheading" value={data.gallery.subheading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
            <InputField label="Heading" name="heading" value={data.gallery.heading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
        </div>

        <div className="space-y-4">
            <h5 className="text-md font-semibold text-white">Gallery Items</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.gallery.items.map((item: any, index: number) => (
                  <div key={item.id || index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-300">Image #{index + 1}</p>
                        <button onClick={() => handleRemoveItem(profile, index)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove</button>
                    </div>
                    <InputField label="Title" name="title" value={item.title} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <ImageUploadField label="Image" imageUrl={item.imageUrl} onImageChange={(url) => handleImageChange(profile, index, url)} color={data.color} />
                  </div>
                ))}
            </div>
        </div>
        
        <button onClick={() => handleAddItem(profile)} className={`${data.color.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 text-sm`}>
            Add Gallery Image
        </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Gallery Section</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderProfileGallery('mustafa', mustafaData)}
        {renderProfileGallery('hermes', hermesData)}
      </div>
    </div>
  );
};

export default AdminGallery;