import { Globe, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import logoSvg from '../imports/Gemini_Generated_Image_m6ma5sm6ma5sm6ma.svg';

interface FooterProps {
  onNavigate?: (section: 'feedbacks' | 'home' | 'planner' | 'translator' | 'maps' | 'mytrips') => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)',
                }}
              >
                <img
                  src={logoSvg}
                  alt="Alem Travel Logo"
                  className="w-8 h-8 object-contain"
                  style={{ filter: 'invert(1) brightness(1.8)' }}
                />
              </div>
              <span
                className="text-xl text-white"
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                }}
              >
                Alem Travel
              </span>
            </div>
            <p className="text-gray-400">
              {t('hero.subtitle')}
            </p>
          </div>

          <div>
            <h3 className="mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.press')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.help')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.faq')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
              {onNavigate && (
                <li>
                  <button 
                    onClick={() => onNavigate('feedbacks')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.admin')}
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4">{t('footer.social')}</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/alem_travel_sdu/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:alemtravel0@gmail.com" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Alem Travel. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}