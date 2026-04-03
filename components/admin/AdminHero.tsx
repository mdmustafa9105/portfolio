import React from 'react';
import { InputField, TextareaField, ImageUploadField } from './AdminCommon';
import { ProfileType } from '../../App';

interface AdminHeroProps {
  mustafaData: any;
  hermesData: any;
  onUpdate: (profile: ProfileType, section: string, newData: any) => void;
}

const AdminHero: React.FC<AdminHeroProps> = ({ mustafaData, hermesData, onUpdate }) => {
  const handleChange = (profile: ProfileType, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const data = profile === 'mustafa' ? mustafaData.hero : hermesData.hero;
    onUpdate(profile, 'hero', { ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (profile: ProfileType, base64: string) => {
    const data = profile === 'mustafa' ? mustafaData.hero : hermesData.hero;
    onUpdate(profile, 'hero', { ...data, image: base64 });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Hero Section</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mustafa Column */}
        <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: mustafaData.color.primary }}>{mustafaData.name}</h4>
            <InputField label="Greeting" name="greeting" value={mustafaData.hero.greeting} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <InputField label="Title" name="title" value={mustafaData.hero.title} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <InputField label="Subtitle" name="subtitle" value={mustafaData.hero.subtitle} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <InputField label="Spinner Text" name="spinner" value={mustafaData.hero.spinner} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <TextareaField label="Description" name="description" value={mustafaData.hero.description} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <InputField label="Tag 1" name="tag1" value={mustafaData.hero.tag1} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <InputField label="Tag 2" name="tag2" value={mustafaData.hero.tag2} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <ImageUploadField label="Hero Image" imageUrl={mustafaData.hero.image} onImageChange={(base64) => handleImageChange('mustafa', base64)} color={mustafaData.color} />
        </div>

        {/* Hermes Column */}
        <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: hermesData.color.primary }}>{hermesData.name}</h4>
            <InputField label="Greeting" name="greeting" value={hermesData.hero.greeting} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <InputField label="Title" name="title" value={hermesData.hero.title} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <InputField label="Subtitle" name="subtitle" value={hermesData.hero.subtitle} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <InputField label="Spinner Text" name="spinner" value={hermesData.hero.spinner} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <TextareaField label="Description" name="description" value={hermesData.hero.description} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <InputField label="Tag 1" name="tag1" value={hermesData.hero.tag1} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <InputField label="Tag 2" name="tag2" value={hermesData.hero.tag2} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <ImageUploadField label="Hero Image" imageUrl={hermesData.hero.image} onImageChange={(base64) => handleImageChange('hermes', base64)} color={hermesData.color} />
        </div>
      </div>
    </div>
  );
};

export default AdminHero;