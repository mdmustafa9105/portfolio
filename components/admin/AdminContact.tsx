import React from 'react';
import { InputField } from './AdminCommon';
import { v4 as uuidv4 } from 'uuid';
import { ProfileType } from '../../App';

interface AdminContactProps {
  mustafaData: any;
  hermesData: any;
  onUpdate: (profile: ProfileType, section: string, newData: any) => void;
}

const AdminContact: React.FC<AdminContactProps> = ({ mustafaData, hermesData, onUpdate }) => {
  const handleEmailChange = (profile: ProfileType, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.contact : hermesData.contact;
    onUpdate(profile, 'contact', { ...data, email: e.target.value });
  };

  const handleSocialChange = (profile: ProfileType, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.contact : hermesData.contact;
    const newSocials = [...data.socials];
    newSocials[index] = { ...newSocials[index], [e.target.name]: e.target.value };
    onUpdate(profile, 'contact', { ...data, socials: newSocials });
  };

  const handleAddSocial = (profile: ProfileType) => {
    const data = profile === 'mustafa' ? mustafaData.contact : hermesData.contact;
    const newSocials = [...data.socials, { id: uuidv4(), name: 'Platform', url: 'https://' }];
    onUpdate(profile, 'contact', { ...data, socials: newSocials });
  };

  const handleRemoveSocial = (profile: ProfileType, index: number) => {
    const data = profile === 'mustafa' ? mustafaData.contact : hermesData.contact;
    const newSocials = data.socials.filter((_: any, i: number) => i !== index);
    onUpdate(profile, 'contact', { ...data, socials: newSocials });
  };

  const renderProfileContact = (profile: ProfileType, data: any) => (
    <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
        <h4 className="text-lg font-semibold" style={{ color: data.color.primary }}>{data.name}</h4>
        
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
            <InputField label="Contact Email" name="email" value={data.contact.email} onChange={(e) => handleEmailChange(profile, e)} color={data.color} />
        </div>

        <div className="space-y-4">
            <h5 className="text-md font-semibold text-white">Social Media Links</h5>
            {data.contact.socials.map((social: any, index: number) => (
                <div key={social.id || index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-300">Social Link #{index + 1}</p>
                        <button onClick={() => handleRemoveSocial(profile, index)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Name" name="name" value={social.name} onChange={(e) => handleSocialChange(profile, index, e)} color={data.color} />
                        <InputField label="URL" name="url" value={social.url} onChange={(e) => handleSocialChange(profile, index, e)} color={data.color} />
                    </div>
                </div>
            ))}
        </div>
        
        <button onClick={() => handleAddSocial(profile)} className={`${data.color.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 text-sm`}>
            Add Social Link
        </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Contact & Socials</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderProfileContact('mustafa', mustafaData)}
        {renderProfileContact('hermes', hermesData)}
      </div>
    </div>
  );
};

export default AdminContact;