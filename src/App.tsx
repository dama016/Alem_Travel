import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TripPlanner } from './components/TripPlanner';
import { Translator } from './components/Translator';
import { MapExplorer } from './components/MapExplorer';
import { MyTrips } from './components/MyTrips';
import { FeedbackViewer } from './components/FeedbackViewer';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { QuickNav } from './components/QuickNav';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'planner' | 'translator' | 'maps' | 'mytrips' | 'feedbacks'>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white pb-16 transition-colors duration-300 dark:bg-slate-950 xl:pb-0">
          <Header
            activeSection={activeSection} 
            onNavigate={setActiveSection}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenContact={() => setContactModalOpen(true)}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          />

          <QuickNav 
            activeSection={activeSection}
            onNavigate={setActiveSection}
          />
          
          {activeSection === 'home' && (
            <>
              <Hero onGetStarted={() => setActiveSection('planner')} />
              <Features onNavigate={setActiveSection} />
            </>
          )}
          
          {activeSection === 'planner' && <TripPlanner />}
          {activeSection === 'translator' && <Translator />}
          {activeSection === 'maps' && <MapExplorer />}
          {activeSection === 'mytrips' && <MyTrips />}
          {activeSection === 'feedbacks' && <FeedbackViewer />}
          
          <Footer onNavigate={setActiveSection} />

          <AuthModal 
            isOpen={authModalOpen} 
            onClose={() => setAuthModalOpen(false)} 
          />
          
          <ContactModal 
            isOpen={contactModalOpen} 
            onClose={() => setContactModalOpen(false)} 
          />

          <Toaster position="top-right" richColors />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}