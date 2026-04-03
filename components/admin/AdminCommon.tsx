import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';

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
export const ImageUploadField: React.FC<{ label: string; imageUrl: string; onImageChange: (url: string) => void; color: any; }> = 
({ label, imageUrl, onImageChange, color }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('Starting Firebase Storage upload for file:', file.name, 'Size:', file.size, 'Type:', file.type);
            setUploading(true);
            
            try {
                console.log('Initializing Firebase Storage...');
                // Temporarily removed auth check for testing
                // const auth = getAuth(app);
                // const user = auth.currentUser;
                // if (!user) {
                //     throw new Error('User not authenticated. Please log in to upload images.');
                // }
                // console.log('User authenticated:', user.email);

                const storage = getStorage(app);
                const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
                
                console.log('Storage ref created:', storageRef.fullPath);
                console.log('Starting uploadBytes...');
                
                const snapshot = await uploadBytes(storageRef, file);
                console.log('uploadBytes completed, snapshot:', snapshot);
                
                console.log('Getting download URL...');
                const downloadURL = await getDownloadURL(snapshot.ref);
                console.log('Download URL obtained:', downloadURL.substring(0, 50) + '...');
                
                onImageChange(downloadURL);
                console.log('Upload process completed successfully');
                
            } catch (error) {
                console.error('Firebase Storage upload failed:', error);
                
                // More detailed error information
                if (error instanceof Error) {
                    console.error('Error name:', error.name);
                    console.error('Error message:', error.message);
                    console.error('Error stack:', error.stack);
                }
                
                alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                console.log('Setting uploading to false');
                setUploading(false);
            }
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