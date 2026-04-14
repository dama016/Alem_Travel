import { useState } from 'react';
import { Languages, Copy, Volume2, ArrowLeftRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'kk', name: 'Kazakh', flag: '🇰🇿' },
];

const commonPhrases = [
  { en: 'Hello', category: 'Greetings' },
  { en: 'Thank you', category: 'Courtesy' },
  { en: 'How much does it cost?', category: 'Shopping' },
  { en: 'Where is...?', category: 'Navigation' },
  { en: 'Help, please', category: 'Emergency' },
  { en: 'The bill, please', category: 'Restaurant' },
  { en: "I don't understand", category: 'Communication' },
  { en: 'Goodbye', category: 'Greetings' },
  { en: 'Good morning', category: 'Greetings' },
  { en: 'Good evening', category: 'Greetings' },
  { en: 'Please', category: 'Courtesy' },
  { en: 'Excuse me', category: 'Courtesy' },
  { en: 'Yes', category: 'Basic' },
  { en: 'No', category: 'Basic' },
  { en: 'Where is the bathroom?', category: 'Navigation' },
  { en: 'I need a doctor', category: 'Emergency' },
];

export function Translator() {
  const { t } = useLanguage();
  const [fromLang, setFromLang] = useState('it');
  const [toLang, setToLang] = useState('es');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLang}|${toLang}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch {
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    toast.success(t('translator.copied'));
  };

  const handlePhraseClick = (phrase: string) => {
    setInputText(phrase);
    setFromLang('en');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-3xl sm:text-4xl text-gray-900 dark:text-white leading-tight">
            {t('translator.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('translator.subtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                {t('translator.from')}
              </label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              title={t('translator.swap')}
              className="md:mt-5 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors self-center"
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <div className="flex-1">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                {t('translator.to')}
              </label>
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                {t('translator.enterText')}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.ctrlKey && e.key === 'Enter') handleTranslate();
                }}
                className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg resize-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
                placeholder={t('translator.enterText')}
              />
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                {t('translator.ctrlEnter')}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-gray-600 dark:text-gray-300">
                  {t('translator.translation')}
                </label>
                {translatedText && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      title={t('translator.copy')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                    </button>
                    <button
                      title="Listen"
                      className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full h-40 px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 overflow-auto transition-colors duration-300">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-gray-400 dark:text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('translator.translating')}
                  </div>
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {translatedText}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('translator.translating')}
                </>
              ) : (
                <>
                  <Languages className="w-4 h-4" />
                  {t('translator.translate')}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h2 className="text-2xl text-gray-900 dark:text-white mb-2">
            {t('translator.phrases')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('translator.phrasesSubtitle')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commonPhrases.map((phrase, index) => (
              <button
                key={index}
                onClick={() => handlePhraseClick(phrase.en)}
                className="text-left p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
              >
                <span className="text-xs text-blue-500 dark:text-blue-400 block mb-1">
                  {phrase.category}
                </span>
                <span className="text-gray-800 dark:text-gray-200 text-sm">
                  {phrase.en}
                </span>
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 dark:text-slate-500 mt-4 text-center">
            • {t('translator.supports')}
          </p>
        </div>
      </div>
    </section>
  );
}