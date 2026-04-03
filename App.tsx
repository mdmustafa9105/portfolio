import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import { data } from './components/data';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import Login from './components/Login';
import Admin from './components/Admin';
import Chatbot from './components/Chatbot';
import Media from './components/Media';
import Achievements from './components/Achievements';
import ScrollToTop from './components/ScrollToTop';


export type ProfileType = 'mustafa' | 'hermes';

const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType>('mustafa');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [route, setRoute] = useState(window.location.hash);
  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        
        // Deep merge to preserve functions (like icons) from original data
        const mergeData = (original: any, saved: any): any => {
          if (typeof original !== 'object' || original === null) return saved !== undefined ? saved : original;
          if (typeof saved !== 'object' || saved === null) return original;
          
          if (Array.isArray(original)) {
             // For arrays like services or portfolio items, we might want to keep the saved length
             // but restore functions if they exist in the original array at the same index.
             return saved.map((item: any, index: number) => {
                 if (original[index]) {
                     return mergeData(original[index], item);
                 }
                 return item;
             });
          }

          const result = { ...original };
          for (const key in saved) {
            if (typeof original[key] === 'function') {
               // Keep the original function
               result[key] = original[key];
            } else if (typeof saved[key] === 'object' && saved[key] !== null && !Array.isArray(saved[key])) {
               result[key] = mergeData(original[key], saved[key]);
            } else {
               result[key] = saved[key];
            }
          }
          return result;
        };

        return mergeData(data, parsedData);
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    return data;
  });

  const handleSaveData = (newData: any) => {
    setAppData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
  };

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    window.location.hash = '#/admin';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.hash = '#/';
  };

  const toggleProfile = () => {
    setProfile(prev => (prev === 'mustafa' ? 'hermes' : 'mustafa'));
  };

  const currentProfileData = appData[profile];
  
  if (isAuthenticated) {
     return <Admin onLogout={handleLogout} data={appData} onSave={handleSaveData} />;
  }
  
  if (route === '#/login') {
     return <Login onLoginSuccess={handleLoginSuccess} color={currentProfileData.color} />;
  }

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Header profile={profile} toggleProfile={toggleProfile} data={currentProfileData} />
      <div key={profile} className="fade-in">
        <main>
          <Hero data={currentProfileData} />
          <Marquee data={currentProfileData} />
          <Services data={currentProfileData} />
          <Portfolio data={currentProfileData} />
          <Media data={currentProfileData} />
          <Achievements data={currentProfileData} />
          <Gallery data={currentProfileData} />
          <Blog data={currentProfileData} />
          <About data={currentProfileData} />
        </main>
        <Footer data={currentProfileData} />
        <Chatbot profileData={currentProfileData} />
        <ScrollToTop color={currentProfileData.color} />
      </div>
    </div>
  );
};

export default App;