import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import AdminHero from './admin/AdminHero';
import AdminAbout from './admin/AdminAbout';
import AdminServices from './admin/AdminServices';
import AdminPortfolio from './admin/AdminPortfolio';
import AdminGallery from './admin/AdminGallery';
import AdminBlog from './admin/AdminBlog';
import AdminContact from './admin/AdminContact';
import AdminMedia from './admin/AdminMedia';
import AdminAchievements from './admin/AdminAchievements';
import { ProfileType } from '../App';

const TABS = ['Hero', 'About', 'Services', 'Portfolio', 'Media', 'Awards', 'Gallery', 'Blog', 'Contact'];

const Admin: React.FC<{ onLogout: () => void; data: any; onSave: (data: any) => void }> = ({ onLogout, data, onSave }) => {
  const [activeTab, setActiveTab] = useState('Hero');
  const [localData, setLocalData] = useState(data);

  const handleUpdate = (profile: ProfileType, section: string, value: any) => {
    setLocalData((prevData: any) => {
      const newData = {
        ...prevData,
        [profile]: {
          ...prevData[profile],
          [section]: value,
        },
      };
      // Auto-save on every update
      onSave(newData);
      return newData;
    });
  };


  const renderContent = () => {
    const props = {
        mustafaData: localData.mustafa,
        hermesData: localData.hermes,
        onUpdate: handleUpdate
    };
    switch (activeTab) {
      case 'Hero': return <AdminHero {...props} />;
      case 'About': return <AdminAbout {...props} />;
      case 'Services': return <AdminServices {...props} />;
      case 'Portfolio': return <AdminPortfolio {...props} />;
      case 'Media': return <AdminMedia {...props} />;
      case 'Awards': return <AdminAchievements {...props} />;
      case 'Gallery': return <AdminGallery {...props} />;
      case 'Blog': return <AdminBlog {...props} />;
      case 'Contact': return <AdminContact {...props} />;
      default: return null;
    }
  };

  const activeColor = data.mustafa.color; // Use a consistent color for the admin panel UI

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-4 px-4 md:px-8 lg:px-16 sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LogoIcon color={activeColor.primary} />
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className={`${activeColor.bg} text-black font-semibold px-4 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 text-sm`}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 md:px-8 lg:px-16 py-8">
        <div className="container mx-auto">
          <div className="bg-[#1C1C1C] rounded-2xl p-4 md:p-6 border border-gray-800">
             <h1 className="text-2xl font-bold text-white mb-6">Manage Portfolio Content</h1>

            <div className="border-b border-gray-700 mb-6">
              <nav className="-mb-px flex space-x-6 overflow-x-auto">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab
                        ? `${activeColor.border} ${activeColor.text}`
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="fade-in">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;