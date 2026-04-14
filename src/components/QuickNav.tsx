import { Calendar, Map, Languages, Plane, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface QuickNavProps {
  activeSection: string;
  onNavigate: (section: 'home' | 'planner' | 'translator' | 'maps' | 'mytrips') => void;
}

export function QuickNav({ activeSection, onNavigate }: QuickNavProps) {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeSection === 'home') return null;

  const navItems = [
    { id: 'planner' as const, icon: Calendar, label: t('nav.planner') },
    { id: 'translator' as const, icon: Languages, label: t('nav.translator') },
    { id: 'maps' as const, icon: Map, label: t('nav.maps') },
    { id: 'mytrips' as const, icon: Plane, label: t('nav.mytrips') },
  ];

  return (
    <>
      {/* Desktop Quick Nav - Side Panel */}
      <div className="hidden xl:block fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white shadow-xl rounded-r-xl border-r border-gray-200 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group relative flex items-center gap-3 px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
                <span
                  className={`absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                    isActive ? 'opacity-100' : ''
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-2">
          <div className="grid grid-cols-4 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 transition-all ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-xs">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 xl:bottom-8 right-8 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
