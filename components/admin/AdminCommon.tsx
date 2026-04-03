import React, { useState } from 'react';

// Reusable Input Field
export const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; color: any; name: string, type?: string }> = 
({ label, value, onChange, color, name, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full bg-black border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 ${color.ring}`}
        />
    </div>
);

// Reusable Textarea Field
export const TextareaField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; color: any; name: string, rows?: number }> =
({ label, value, onChange, color, name, rows = 3 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className={`w-full bg-black border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 ${color.ring}`}
        />
    </div>
);

// Reusable Image Upload Field
export const ImageUploadField: React.FC<{ label: string; imageUrl: string; onImageChange: (base64: string) => void; color: any; }> = 
({ label, imageUrl, onImageChange, color }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result as string);
                setUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <div className="flex items-center gap-4">
                <img src={imageUrl} alt="Current Image Preview" className="w-20 h-20 rounded-lg object-cover bg-black" />
                <label className={`cursor-pointer ${color.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 text-sm`}>
                    {uploading ? 'Uploading...' : 'Change Image'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                </label>
            </div>
        </div>
    );
};