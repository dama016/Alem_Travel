import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Star, Navigation, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Location {
  id: number;
  name: string;
  type: 'attraction' | 'hotel' | 'restaurant' | 'transport';
  description: string;
  rating: number;
  coordinates: { lat: number; lng: number };
  city: string;
  country: string;
}

interface Country {
  code: string;
  name: string;
  center: { lat: number; lng: number };
  zoom: number;
}

const countries: Country[] = [
  { code: 'KZ', name: 'Kazakhstan', center: { lat: 48.0196, lng: 66.9237 }, zoom: 4 },
  { code: 'FR', name: 'France', center: { lat: 46.2276, lng: 2.2137 }, zoom: 6 },
  { code: 'US', name: 'United States', center: { lat: 37.0902, lng: -95.7129 }, zoom: 4 },
  { code: 'IT', name: 'Italy', center: { lat: 41.8719, lng: 12.5674 }, zoom: 6 },
  { code: 'JP', name: 'Japan', center: { lat: 36.2048, lng: 138.2529 }, zoom: 5 },
  { code: 'TR', name: 'Turkey', center: { lat: 38.9637, lng: 35.2433 }, zoom: 6 },
  { code: 'AE', name: 'United Arab Emirates', center: { lat: 23.4241, lng: 53.8478 }, zoom: 7 },
  { code: 'DE', name: 'Germany', center: { lat: 51.1657, lng: 10.4515 }, zoom: 6 },
  { code: 'ES', name: 'Spain', center: { lat: 40.4637, lng: -3.7492 }, zoom: 6 },
  { code: 'BR', name: 'Brazil', center: { lat: -14.2350, lng: -51.9253 }, zoom: 4 },
  { code: 'CA', name: 'Canada', center: { lat: 56.1304, lng: -106.3468 }, zoom: 3 },
  { code: 'AU', name: 'Australia', center: { lat: -25.2744, lng: 133.7751 }, zoom: 4 },
  { code: 'CN', name: 'China', center: { lat: 35.8617, lng: 104.1954 }, zoom: 4 },
  { code: 'EG', name: 'Egypt', center: { lat: 26.8206, lng: 30.8025 }, zoom: 6 },
  { code: 'GR', name: 'Greece', center: { lat: 39.0742, lng: 21.8243 }, zoom: 6 },
  { code: 'TH', name: 'Thailand', center: { lat: 15.87, lng: 100.9925 }, zoom: 6 },
  { code: 'PT', name: 'Portugal', center: { lat: 39.3999, lng: -8.2245 }, zoom: 7 },
];

const locations: Location[] = [
  { id: 601, name: 'Medeu', type: 'attraction', description: 'High-altitude mountain ice rink.', rating: 4.9, coordinates: { lat: 43.1574, lng: 77.059 }, city: 'Almaty', country: 'Kazakhstan' },
  { id: 602, name: 'Baiterek Tower', type: 'attraction', description: 'Iconic monument and observation tower.', rating: 4.7, coordinates: { lat: 51.1283, lng: 71.4305 }, city: 'Astana', country: 'Kazakhstan' },
  { id: 603, name: 'Charyn Canyon', type: 'attraction', description: 'Dramatic sedimentary rock canyon.', rating: 4.8, coordinates: { lat: 43.3507, lng: 79.0782 }, city: 'Almaty Region', country: 'Kazakhstan' },
  { id: 604, name: 'SDU University', type: 'attraction', description: 'Suleyman Demirel University campus in Kaskelen.', rating: 5.0, coordinates: { lat: 43.2077, lng: 76.669 }, city: 'Kaskelen', country: 'Kazakhstan' },

  { id: 1, name: 'Eiffel Tower', type: 'attraction', description: 'Famous landmark of Paris.', rating: 4.8, coordinates: { lat: 48.8584, lng: 2.2945 }, city: 'Paris', country: 'France' },
  { id: 2, name: 'Louvre Museum', type: 'attraction', description: "World's largest art museum.", rating: 4.7, coordinates: { lat: 48.8606, lng: 2.3376 }, city: 'Paris', country: 'France' },
  { id: 3, name: 'Palace of Versailles', type: 'attraction', description: 'Royal chateau and gardens.', rating: 4.8, coordinates: { lat: 48.8049, lng: 2.1204 }, city: 'Versailles', country: 'France' },

  { id: 101, name: 'Statue of Liberty', type: 'attraction', description: 'Iconic symbol of freedom.', rating: 4.8, coordinates: { lat: 40.6892, lng: -74.0445 }, city: 'New York', country: 'United States' },
  { id: 102, name: 'Golden Gate Bridge', type: 'attraction', description: 'Famous suspension bridge.', rating: 4.8, coordinates: { lat: 37.8199, lng: -122.4783 }, city: 'San Francisco', country: 'United States' },
  { id: 103, name: 'The Plaza Hotel', type: 'hotel', description: 'Luxury landmark hotel.', rating: 4.6, coordinates: { lat: 40.7644, lng: -73.9742 }, city: 'New York', country: 'United States' },

  { id: 501, name: 'Tokyo Tower', type: 'attraction', description: 'Iconic communications tower.', rating: 4.5, coordinates: { lat: 35.6586, lng: 139.7454 }, city: 'Tokyo', country: 'Japan' },
  { id: 502, name: 'Fushimi Inari-taisha', type: 'attraction', description: 'Thousands of vermilion torii gates.', rating: 4.8, coordinates: { lat: 34.9671, lng: 135.7727 }, city: 'Kyoto', country: 'Japan' },
  { id: 503, name: 'Mount Fuji', type: 'attraction', description: 'Highest mountain in Japan.', rating: 4.9, coordinates: { lat: 35.3606, lng: 138.7274 }, city: 'Shizuoka', country: 'Japan' },

  { id: 901, name: 'Neuschwanstein Castle', type: 'attraction', description: 'Fairytale castle in the Bavarian Alps.', rating: 4.8, coordinates: { lat: 47.5576, lng: 10.7498 }, city: 'Bavaria', country: 'Germany' },
  { id: 902, name: 'Brandenburg Gate', type: 'attraction', description: '18th-century neoclassical monument.', rating: 4.7, coordinates: { lat: 52.5163, lng: 13.3777 }, city: 'Berlin', country: 'Germany' },
  { id: 903, name: 'Europa-Park', type: 'attraction', description: 'Largest theme park in Germany.', rating: 4.8, coordinates: { lat: 48.2661, lng: 7.722 }, city: 'Rust', country: 'Germany' },

  { id: 401, name: 'Sagrada Familia', type: 'attraction', description: 'Gaudí’s unfinished masterpiece.', rating: 4.9, coordinates: { lat: 41.4036, lng: 2.1744 }, city: 'Barcelona', country: 'Spain' },
  { id: 402, name: 'The Alhambra', type: 'attraction', description: 'Palace and fortress complex.', rating: 4.8, coordinates: { lat: 37.176, lng: -3.5881 }, city: 'Granada', country: 'Spain' },
  { id: 403, name: 'Royal Palace of Madrid', type: 'attraction', description: 'Official residence of the Spanish royal family.', rating: 4.7, coordinates: { lat: 40.4179, lng: -3.7143 }, city: 'Madrid', country: 'Spain' },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'attraction':
      return {
        hex: '#EAB308',
        bg: 'bg-yellow-100 dark:bg-yellow-950/30',
        text: 'text-yellow-600 dark:text-yellow-400',
      };
    case 'hotel':
      return {
        hex: '#3B82F6',
        bg: 'bg-blue-100 dark:bg-blue-950/30',
        text: 'text-blue-600 dark:text-blue-400',
      };
    case 'restaurant':
      return {
        hex: '#EF4444',
        bg: 'bg-red-100 dark:bg-red-950/30',
        text: 'text-red-600 dark:text-red-400',
      };
    default:
      return {
        hex: '#6B7280',
        bg: 'bg-gray-100 dark:bg-slate-800',
        text: 'text-gray-600 dark:text-slate-300',
      };
  }
};

declare global {
  interface Window {
    ymaps: any;
  }
}

export function MapExplorer() {
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[0]);
  const [countrySearchQuery, setCountrySearchQuery] = useState(countries[0].name);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const countrySearchRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  const countryLocations = locations.filter((loc) => loc.country === selectedCountry?.name);

  const filteredLocations = countryLocations.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || loc.type === selectedType;
    return matchesSearch && matchesType;
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=f4e2ebb1-86cf-4b57-bb35-1d8fed731c4b&lang=en_US`;
    script.onload = () => window.ymaps.ready(initMap);
    document.head.appendChild(script);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        countrySearchRef.current &&
        !countrySearchRef.current.contains(e.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (window.ymaps && mapInstance.current) updateMap();
  }, [selectedCountry, filteredLocations, selectedLocation]);

  const initMap = () => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new window.ymaps.Map(mapRef.current, {
      center: [selectedCountry?.center.lat || 48, selectedCountry?.center.lng || 2],
      zoom: selectedCountry?.zoom || 4,
      controls: ['zoomControl', 'fullscreenControl'],
    });

    updateMap();
  };

  const updateMap = () => {
    const map = mapInstance.current;
    map.geoObjects.removeAll();

    filteredLocations.forEach((loc) => {
      const placemark = new window.ymaps.Placemark(
        [loc.coordinates.lat, loc.coordinates.lng],
        {
          balloonContentHeader: `<strong>${loc.name}</strong>`,
          balloonContentBody: loc.description,
          hintContent: loc.name,
        },
        {
          preset: 'islands#dotIcon',
          iconColor: getTypeColor(loc.type).hex,
        }
      );

      placemark.events.add('click', () => setSelectedLocation(loc));
      map.geoObjects.add(placemark);
    });

    if (selectedLocation) {
      map.setCenter(
        [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng],
        14,
        { duration: 500 }
      );
    } else if (selectedCountry) {
      map.setCenter(
        [selectedCountry.center.lat, selectedCountry.center.lng],
        selectedCountry.zoom,
        { duration: 500 }
      );
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 font-sans text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
            {t('maps.title')}
          </h1>

          <div className="relative max-w-md mx-auto" ref={countrySearchRef}>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
              <input
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl focus:ring-2 focus:ring-orange-500 outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
                value={countrySearchQuery}
                onChange={(e) => {
                  setCountrySearchQuery(e.target.value);
                  setShowCountryDropdown(true);
                }}
                onFocus={() => setShowCountryDropdown(true)}
                placeholder={t('maps.search')}
              />
            </div>

            {showCountryDropdown && (
              <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-64 overflow-y-auto transition-colors duration-300">
                {filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    className="w-full px-5 py-3 text-left hover:bg-orange-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between transition-colors duration-300"
                    onClick={() => {
                      setSelectedCountry(c);
                      setCountrySearchQuery(c.name);
                      setShowCountryDropdown(false);
                      setSelectedLocation(null);
                    }}
                  >
                    <span className="font-medium text-slate-800 dark:text-white">
                      {c.name}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs uppercase">
                      {c.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors duration-300"
                  placeholder={t('maps.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['all', 'attractions', 'hotels', 'restaurants'].map((typeKey) => (
                  <button
                    key={typeKey}
                    onClick={() =>
                      setSelectedType(typeKey === 'all' ? 'all' : typeKey.slice(0, -1))
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedType === typeKey || selectedType + 's' === typeKey
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-200/40 dark:shadow-orange-900/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t(`maps.${typeKey}`).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center transition-colors duration-300">
                <span className="font-bold text-slate-700 dark:text-white">
                  {t('maps.placesFound')}
                </span>
                <span className="bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-md text-[10px] font-black">
                  {filteredLocations.length}
                </span>
              </div>

              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                {filteredLocations.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-5 cursor-pointer transition-all ${
                      selectedLocation?.id === loc.id
                        ? 'bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                          {loc.name}
                        </h4>
                        <div className="mt-2 inline-flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                              getTypeColor(loc.type).bg
                            } ${getTypeColor(loc.type).text}`}
                          >
                            {loc.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs font-bold text-yellow-500">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        {loc.rating}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
                      {loc.description}
                    </p>
                  </div>
                ))}

                {filteredLocations.length === 0 && (
                  <div className="p-10 text-center text-slate-400 dark:text-slate-500 text-xs italic">
                    {t('maps.noPlaces')}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden h-[600px] relative transition-colors duration-300">
              <div ref={mapRef} className="w-full h-full grayscale-[0.2] contrast-[1.1]" />

              {selectedLocation && (
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white dark:border-slate-700 flex justify-between items-center animate-in slide-in-from-bottom-4 transition-colors duration-300">
                  <div>
                    <h3 className="font-black text-slate-800 dark:text-white">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedLocation.city}, {selectedLocation.country}
                    </p>
                  </div>

                  <button className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors">
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}