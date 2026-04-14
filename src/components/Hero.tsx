import { ArrowRight, Plane } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const { t } = useLanguage();
  
  return (
    <section className="bg-white dark:bg-slate-950 transition-colors duration-300 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full inline-flex items-center gap-2 transition-colors duration-300">
            <Plane className="w-5 h-5" />
            <span className="bg-blue-200 dark:bg-blue-900/40 px-2 rounded-md transition-colors duration-300">
              Plan Your Dream Trip
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white transition-colors duration-300 leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300 leading-relaxed">
            {t('hero.description')}
          </p>

          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all text-lg group mt-4"
          >
            <span>{t('hero.cta')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}