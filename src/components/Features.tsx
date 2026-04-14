import { Calculator, Languages, MapPin, Sparkles, TrendingDown, Wallet } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeaturesProps {
  onNavigate: (section: 'planner' | 'translator' | 'maps') => void;
}

export function Features({ onNavigate }: FeaturesProps) {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Wallet,
      title: t('features.planner.title'),
      description: t('features.planner.description'),
      action: () => onNavigate('planner'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Languages,
      title: t('features.translator.title'),
      description: t('features.translator.description'),
      action: () => onNavigate('translator'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: MapPin,
      title: t('features.maps.title'),
      description: t('features.maps.description'),
      action: () => onNavigate('maps'),
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl text-gray-900 dark:text-white transition-colors duration-300 leading-tight">
            All Tools for the Perfect Trip
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300 leading-relaxed">
            We created a platform that makes travel planning simple and accessible for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.action}
              className={`group p-8 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all ${
                feature.action ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 dark:text-white mb-3 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}