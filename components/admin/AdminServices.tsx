import React from 'react';
import { InputField, TextareaField } from './AdminCommon';
import { v4 as uuidv4 } from 'uuid';
import { ProfileType } from '../../App';

interface AdminServicesProps {
  mustafaData: any;
  hermesData: any;
  onUpdate: (profile: ProfileType, section: string, newData: any) => void;
}

const AdminServices: React.FC<AdminServicesProps> = ({ mustafaData, hermesData, onUpdate }) => {

  const handleHeaderChange = (profile: ProfileType, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = profile === 'mustafa' ? mustafaData.services : hermesData.services;
    onUpdate(profile, 'services', { ...data, [e.target.name]: e.target.value });
  };

  const handleItemChange = (profile: ProfileType, index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const data = profile === 'mustafa' ? mustafaData.services : hermesData.services;
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [e.target.name]: e.target.value };
    onUpdate(profile, 'services', { ...data, items: newItems });
  };

  const handleAddItem = (profile: ProfileType) => {
    const data = profile === 'mustafa' ? mustafaData.services : hermesData.services;
    const newItems = [...data.items, { id: uuidv4(), icon: () => null, title: 'New Service', description: 'A description for the new service.' }];
    onUpdate(profile, 'services', { ...data, items: newItems });
  };

  const handleRemoveItem = (profile: ProfileType, index: number) => {
    const data = profile === 'mustafa' ? mustafaData.services : hermesData.services;
    const newItems = data.items.filter((_: any, i: number) => i !== index);
    onUpdate(profile, 'services', { ...data, items: newItems });
  };
  
  const renderProfileServices = (profile: ProfileType, data: any) => (
    <div className="p-4 bg-black rounded-lg border border-gray-700 space-y-4">
        <h4 className="text-lg font-semibold" style={{ color: data.color.primary }}>{data.name}</h4>
        
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
            <h5 className="text-md font-semibold text-white">Section Headers</h5>
            <InputField label="Subheading" name="subheading" value={data.services.subheading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
            <InputField label="Heading" name="heading" value={data.services.heading} onChange={(e) => handleHeaderChange(profile, e)} color={data.color} />
        </div>

        <div className="space-y-4">
            <h5 className="text-md font-semibold text-white">Service Items</h5>
            {data.services.items.map((item: any, index: number) => (
                <div key={item.id || index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-300">Service #{index + 1}</p>
                        <button onClick={() => handleRemoveItem(profile, index)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove</button>
                    </div>
                    <InputField label="Title" name="title" value={item.title} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <TextareaField label="Description" name="description" value={item.description} onChange={(e) => handleItemChange(profile, index, e)} color={data.color} />
                    <p className="text-xs text-gray-500">Note: The icon for this service cannot be changed from this panel.</p>
                </div>
            ))}
        </div>
        
        <button onClick={() => handleAddItem(profile)} className={`${data.color.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 text-sm`}>
            Add Service
        </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Services Section</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderProfileServices('mustafa', mustafaData)}
        {renderProfileServices('hermes', hermesData)}
      </div>
    </div>
  );
};

export default AdminServices;