
import React from 'react';
import { InputField, TextareaField, ImageUploadField } from './AdminCommon';
import { ProfileType } from '../../App';

interface AdminAboutProps {
  mustafaData: any;
  hermesData: any;
  onUpdate: (profile: ProfileType, section: string, newData: any) => void;
}

const AdminAbout: React.FC<AdminAboutProps> = ({ mustafaData, hermesData, onUpdate }) => {
  const handleChange = (profile: ProfileType, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const data = profile === 'mustafa' ? mustafaData.about : hermesData.about;
    onUpdate(profile, 'about', { ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (profile: ProfileType, base64: string) => {
    const data = profile === 'mustafa' ? mustafaData.about : hermesData.about;
    onUpdate(profile, 'about', { ...data, image: base64 });
  };

  const handleSkillChange = (profile: ProfileType, category: 'technical' | 'soft', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.about : hermesData.about;
    const newSkills = { ...data.skills };
    newSkills[category][index] = { ...newSkills[category][index], name: e.target.value };
    onUpdate(profile, 'about', { ...data, skills: newSkills });
  };

  const handleSkillImageChange = (profile: ProfileType, category: 'technical' | 'soft', index: number, base64: string) => {
    const data = profile === 'mustafa' ? mustafaData.about : hermesData.about;
    const newSkills = { ...data.skills };
    newSkills[category][index] = { ...newSkills[category][index], iconUrl: base64 };
    onUpdate(profile, 'about', { ...data, skills: newSkills });
  };

  const handleAddSkill = (profile: ProfileType, category: 'technical' | 'soft') => {
    const data = profile === 'mustafa' ? mustafaData.about : hermesData.about;
    const newSkills = { ...data.skills };
    if (!newSkills[category]) newSkills[category] = [];
    newSkills[category] = [...newSkills[category], { name: 'New Skill', icon: () => null, iconUrl: '' }];
    onUpdate(profile, 'about', { ...data, skills: newSkills });
  };

  const handleRemoveSkill = (profile: ProfileType, category: 'technical' | 'soft', index: number) => {
    const data = profile === 'mustafa' ? mustafaData.about : hermesData.about;
    const newSkills = { ...data.skills };
    newSkills[category] = newSkills[category].filter((_: any, i: number) => i !== index);
    onUpdate(profile, 'about', { ...data, skills: newSkills });
  };

  const renderSkillsEditor = (profile: ProfileType, data: any, category: 'technical' | 'soft') => (
      <div className="space-y-3">
          <div className="flex justify-between items-center">
              <h5 className="text-md font-semibold text-white capitalize">{category} Skills</h5>
              <button 
                  onClick={() => handleAddSkill(profile, category)}
                  className={`text-xs px-3 py-1 rounded-full ${data.color.bg} text-black font-semibold hover:bg-opacity-80 transition-colors`}
              >
                  + Add Skill
              </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.about.skills?.[category]?.map((skill: any, index: number) => (
                  <div key={index} className="space-y-2 p-3 border border-gray-800 rounded-lg relative group">
                      <button 
                          onClick={() => handleRemoveSkill(profile, category, index)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors z-10"
                          title="Remove Skill"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                      </button>
                      <InputField
                          label={`Skill #${index + 1} Name`}
                          name={`${category}-${index}`}
                          value={skill.name}
                          onChange={(e) => handleSkillChange(profile, category, index, e)}
                          color={data.color}
                      />
                      <ImageUploadField 
                          label={`Skill #${index + 1} Icon/Logo`} 
                          imageUrl={skill.iconUrl || ''} 
                          onImageChange={(base64) => handleSkillImageChange(profile, category, index, base64)} 
                          color={data.color} 
                      />
                  </div>
              ))}
          </div>
          {!data.about.skills?.[category] && <p className="text-xs text-gray-500">No {category} skills defined in data.ts</p>}
      </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">About Section</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mustafa Column */}
        <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: mustafaData.color.primary }}>{mustafaData.name}</h4>
            <InputField label="Subheading" name="subheading" value={mustafaData.about.subheading} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <InputField label="Heading" name="heading" value={mustafaData.about.heading} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <TextareaField label="Description 1" name="description1" value={mustafaData.about.description1} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} rows={4} />
            <TextareaField label="Description 2" name="description2" value={mustafaData.about.description2} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} rows={4} />
            <InputField label="Resume URL" name="resumeUrl" value={mustafaData.about.resumeUrl || ''} onChange={(e) => handleChange('mustafa', e)} color={mustafaData.color} />
            <ImageUploadField label="About Image" imageUrl={mustafaData.about.image} onImageChange={(base64) => handleImageChange('mustafa', base64)} color={mustafaData.color} />
            
            <div className="mt-6 pt-6 border-t border-gray-800 space-y-4">
                {renderSkillsEditor('mustafa', mustafaData, 'technical')}
                <div className="pt-4"></div>
                {renderSkillsEditor('mustafa', mustafaData, 'soft')}
            </div>
        </div>

        {/* Hermes Column */}
        <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: hermesData.color.primary }}>{hermesData.name}</h4>
            <InputField label="Subheading" name="subheading" value={hermesData.about.subheading} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <InputField label="Heading" name="heading" value={hermesData.about.heading} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <TextareaField label="Description 1" name="description1" value={hermesData.about.description1} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} rows={4} />
            <TextareaField label="Description 2" name="description2" value={hermesData.about.description2} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} rows={4} />
            <InputField label="Resume URL" name="resumeUrl" value={hermesData.about.resumeUrl || ''} onChange={(e) => handleChange('hermes', e)} color={hermesData.color} />
            <ImageUploadField label="About Image" imageUrl={hermesData.about.image} onImageChange={(base64) => handleImageChange('hermes', base64)} color={hermesData.color} />
       
            <div className="mt-6 pt-6 border-t border-gray-800 space-y-4">
                {renderSkillsEditor('hermes', hermesData, 'technical')}
                <div className="pt-4"></div>
                {renderSkillsEditor('hermes', hermesData, 'soft')}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
