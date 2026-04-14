import { useState } from 'react';
import {
  DollarSign,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Hotel,
  Utensils,
  Camera,
  X,
  Info,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Destination {
  name: string;
  country: string;
  image: string;
  avgCostPerDay: number;
  description: string;
}

const OPT = "auto=format&fit=crop&w=800&q=80";

const destinations: Destination[] = [
  { name: 'Paris', country: 'France', image: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?${OPT}`, avgCostPerDay: 180, description: 'The city of love and art.' },
  { name: 'Rome', country: 'Italy', image: `https://images.unsplash.com/photo-1552832230-c0197dd311b5?${OPT}`, avgCostPerDay: 150, description: 'History and amazing food.' },
  { name: 'London', country: 'UK', image: `https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?${OPT}`, avgCostPerDay: 220, description: 'Historic landmarks.' },
  { name: 'Dubai', country: 'UAE', image: `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?${OPT}`, avgCostPerDay: 250, description: 'Luxury and architecture.' },
  { name: 'Prague', country: 'Czechia', image: `https://images.unsplash.com/photo-1519677100203-a0e668c92439??${OPT}`, avgCostPerDay: 90, description: 'Medieval charm.' },
  { name: 'Santorini', country: 'Greece', image: `https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?${OPT}`, avgCostPerDay: 200, description: 'White buildings and sea.' },
  { name: 'Seoul', country: 'South Korea', image: `https://images.unsplash.com/photo-1546874177-9e664107314e?q=80?${OPT}`, avgCostPerDay: 120, description: 'High-tech and tradition.' },
  { name: 'Almaty', country: 'Kazakhstan', image: `https://images.unsplash.com/photo-1659651117607-d2b397cf100f?${OPT}`, avgCostPerDay: 60, description: 'Mountains and city vibes.' },
  { name: 'Kyoto', country: 'Japan', image: `https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?${OPT}`, avgCostPerDay: 130, description: 'Temples and gardens.' },
  { name: 'New York', country: 'USA', image: `https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?${OPT}`, avgCostPerDay: 200, description: 'Iconic skyscrapers.' },
  { name: 'Bali', country: 'Indonesia', image: `https://images.unsplash.com/photo-1537996194471-e657df975ab4?${OPT}`, avgCostPerDay: 50, description: 'Paradise beaches.' },
  { name: 'Tokyo', country: 'Japan', image: `https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?${OPT}`, avgCostPerDay: 120, description: 'Neon lights and culture.' },
  { name: 'Barcelona', country: 'Spain', image: `https://images.unsplash.com/photo-1630219694734-fe47ab76b15e?${OPT}`, avgCostPerDay: 90, description: 'Gaudí and Mediterranean.' },
  { name: 'Istanbul', country: 'Turkey', image: `https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?${OPT}`, avgCostPerDay: 60, description: 'Europe meets Asia.' },
  { name: 'Amsterdam', country: 'Netherlands', image: `https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?${OPT}`, avgCostPerDay: 170, description: 'Canals and bikes.' },
  { name: 'Venice', country: 'Italy', image: `https://images.unsplash.com/photo-1514890547357-a9ee288728e0?${OPT}`, avgCostPerDay: 190, description: 'Romantic gondolas.' },
  { name: 'Lisbon', country: 'Portugal', image: `https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?${OPT}`, avgCostPerDay: 100, description: 'Hilly coastal city.' },
  { name: 'Berlin', country: 'Germany', image: `https://images.unsplash.com/photo-1560969184-10fe8719e047?${OPT}`, avgCostPerDay: 140, description: 'Art and history.' },
  { name: 'Cairo', country: 'Egypt', image: `https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?${OPT}`, avgCostPerDay: 50, description: 'Ancient pyramids.' },
  { name: 'Reykjavik', country: 'Iceland', image: `https://images.unsplash.com/photo-1465353471565-b77e538f34c9?q?${OPT}`, avgCostPerDay: 210, description: 'Northern lights.' },
  { name: 'Sydney', country: 'Australia', image: `https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?${OPT}`, avgCostPerDay: 180, description: 'Opera House.' },
  { name: 'Rio', country: 'Brazil', image: `https://images.unsplash.com/photo-1483729558449-99ef09a8c325?${OPT}`, avgCostPerDay: 90, description: 'Carnival vibes.' },
  { name: 'Hong Kong', country: 'China', image: `https://images.unsplash.com/photo-1507941097613-9f2157b69235?${OPT}`, avgCostPerDay: 160, description: 'Skyline views.' },
  { name: 'Marrakech', country: 'Morocco', image: `https://images.unsplash.com/photo-1539020140153-e479b8c22e70?${OPT}`, avgCostPerDay: 80, description: 'Vibrant souks.' },
  { name: 'Budapest', country: 'Hungary', image: `https://images.unsplash.com/photo-1551867633-194f125bddfa?${OPT}`, avgCostPerDay: 85, description: 'Thermal baths.' },
  { name: 'Vienna', country: 'Austria', image: `https://images.unsplash.com/photo-1516550893923-42d28e5677af?${OPT}`, avgCostPerDay: 160, description: 'Palaces and coffee.' },
  { name: 'Stockholm', country: 'Sweden', image: `https://images.unsplash.com/photo-1509356843151-3e7d96241e11?${OPT}`, avgCostPerDay: 175, description: 'Design and islands.' },
  { name: 'Copenhagen', country: 'Denmark', image: `https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?${OPT}`, avgCostPerDay: 200, description: 'Biking city.' },
  { name: 'Toronto', country: 'Canada', image: `https://images.unsplash.com/photo-1517090504586-fde19ea6066f?${OPT}`, avgCostPerDay: 180, description: 'CN Tower skyline.' },
  { name: 'Vancouver', country: 'Canada', image: `https://images.unsplash.com/photo-1559511260-66a654ae982a?${OPT}`, avgCostPerDay: 190, description: 'Mountains and ocean.' },
  { name: 'Mexico City', country: 'Mexico', image: `https://images.unsplash.com/photo-1512813195386-6cf811ad3542?${OPT}`, avgCostPerDay: 75, description: 'History and tacos.' },
  { name: 'Buenos Aires', country: 'Argentina', image: `https://images.unsplash.com/photo-1589909202802-8f4aadce1849?${OPT}`, avgCostPerDay: 95, description: 'Tango and steak.' },
  { name: 'Lima', country: 'Peru', image: `https://images.unsplash.com/photo-1577587230708-187fdbef4d91?q=80&w=11?${OPT}`, avgCostPerDay: 70, description: 'Culinary capital.' },
  { name: 'Munich', country: 'Germany', image: `https://images.unsplash.com/photo-1467269204594-9661b134dd2b?${OPT}`, avgCostPerDay: 160, description: 'Bavarian culture.' },
  { name: 'Dublin', country: 'Ireland', image: `https://images.unsplash.com/photo-1605969353711-234dea348ce1?${OPT}`, avgCostPerDay: 155, description: 'Pubs and history.' },
  { name: 'Edinburgh', country: 'UK', image: `https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=8?${OPT}`, avgCostPerDay: 145, description: 'Magic vibes.' },
  { name: 'Athens', country: 'Greece', image: `https://images.unsplash.com/photo-1503152394-c571994fd383?${OPT}`, avgCostPerDay: 110, description: 'Birthplace of democracy.' },
  { name: 'Krakow', country: 'Poland', image: `https://images.unsplash.com/photo-1519197924294-4ba991a11128?${OPT}`, avgCostPerDay: 70, description: 'Old Town charm.' },
  { name: 'Oslo', country: 'Norway', image: `https://images.unsplash.com/photo-1583212292454-1fe6229603b7?${OPT}`, avgCostPerDay: 210, description: 'Fjords and Vikings.' },
  { name: 'Zurich', country: 'Switzerland', image: `https://images.unsplash.com/photo-1515488764276-beab7607c1e6?${OPT}`, avgCostPerDay: 260, description: 'Lakes and chocolate.' },
  { name: 'San Francisco', country: 'USA', image: `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?${OPT}`, avgCostPerDay: 240, description: 'Golden Gate Bridge.' },
  { name: 'Los Angeles', country: 'USA', image: `https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&?${OPT}`, avgCostPerDay: 220, description: 'Hollywood stars.' },
  { name: 'Florence', country: 'Italy', image: `https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?q?${OPT}`, avgCostPerDay: 150, description: 'Renaissance capital.' },
  { name: 'Hanoi', country: 'Vietnam', image: `https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w?${OPT}`, avgCostPerDay: 45, description: 'Vibrant markets.' },
  { name: 'Mumbai', country: 'India', image: `https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?${OPT}`, avgCostPerDay: 65, description: 'Coastal energy.' },
  { name: 'Seville', country: 'Spain', image: `https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?${OPT}`, avgCostPerDay: 120, description: 'Flamenco and sun.' },
  { name: 'Maldives', country: 'Maldives', image: `https://images.unsplash.com/photo-1514282401047-d79a71a590e8?${OPT}`, avgCostPerDay: 300, description: 'Island paradise.' }
];


const budgetCategories = [
  { key: 'accommodation', icon: Hotel, label: 'planner.hotel', val: 0.35, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-slate-800', border: 'border-blue-100 dark:border-slate-700' },
  { key: 'food', icon: Utensils, label: 'planner.food', val: 0.25, color: 'text-green-500', bg: 'bg-green-50 dark:bg-slate-800', border: 'border-green-100 dark:border-slate-700' },
  { key: 'activities', icon: Camera, label: 'planner.leisure', val: 0.25, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-slate-800', border: 'border-purple-100 dark:border-slate-700' },
  { key: 'transport', icon: MapPin, label: 'planner.transport', val: 0.15, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-slate-800', border: 'border-orange-100 dark:border-slate-700' },
];

export function TripPlanner() {
  const [budget, setBudget] = useState<string>('1000');
  const [duration, setDuration] = useState<string>('7');
  const [travelers, setTravelers] = useState<string>('2');
  const [popupDest, setPopupDest] = useState<Destination | null>(null);
  const [saving, setSaving] = useState(false);

  const { user } = useAuth();
  const { t } = useLanguage();

  const budgetNum = parseFloat(budget) || 0;
  const durationNum = parseInt(duration) || 1;
  const travelersNum = parseInt(travelers) || 1;
  const budgetPerPersonDay = (budgetNum / durationNum) / travelersNum;

  const recommendedDestinations = destinations.filter(
    (dest) => dest.avgCostPerDay <= budgetPerPersonDay * 1.3
  );

  const handleSaveTrip = () => {
    if (!user) {
      toast.error(t('planner.signInToSave'));
      return;
    }
    if (!popupDest) return;

    setSaving(true);
    const actualCost = durationNum * travelersNum * popupDest.avgCostPerDay;
    const breakdown: Record<string, number> = {};

    budgetCategories.forEach((cat) => {
      breakdown[cat.key] = parseFloat((actualCost * cat.val).toFixed(2));
    });

    const newTrip = {
      id: Date.now().toString(),
      userId: user.id,
      destination: { ...popupDest },
      budget: budgetNum,
      duration: durationNum,
      travelers: travelersNum,
      breakdown,
      createdAt: new Date().toISOString(),
    };

    const allTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    allTrips.push(newTrip);
    localStorage.setItem('savedTrips', JSON.stringify(allTrips));

    setTimeout(() => {
      setSaving(false);
      setPopupDest(null);
      toast.success(`${t(popupDest.name)} ${t('planner.savedSuccess')}`);
    }, 500);
  };

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            {t('planner.title')}
          </h1>
          <p className="text-lg text-slate-500 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('planner.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <Sparkles className="w-5 h-5 text-blue-500" />
                {t('planner.tripDetails')}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-gray-300 block mb-1">
                    {t('planner.totalBudgetLabel')}
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-gray-300 block mb-1">
                      {t('planner.durationLabel')}
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-gray-300 block mb-1">
                      {t('planner.travelersLabel')}
                    </label>
                    <input
                      type="number"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-slate-700 text-sm text-slate-500 dark:text-gray-300 flex justify-between">
                  <span>{t('planner.dailyPerPerson')}:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    ${budgetPerPersonDay.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 flex gap-3 items-start transition-colors duration-300">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t('planner.hint')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            {recommendedDestinations.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center transition-colors duration-300">
                <p className="text-slate-400 dark:text-gray-400">
                  {t('planner.noResults')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedDestinations.map((dest, i) => (
                  <div
                    key={i}
                    onClick={() => setPopupDest(dest)}
                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <div className="relative h-40 bg-slate-200 dark:bg-slate-800">
                      <img
                        src={dest.image}
                        alt={t(dest.name)}
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400";
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                        ${dest.avgCostPerDay}/{t('common.day')}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {t(dest.name)}, {t(dest.country)}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {t(dest.description)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {popupDest && (() => {
        const actualCost = durationNum * travelersNum * popupDest.avgCostPerDay;
        const remaining = budgetNum - actualCost;
        const isEnough = budgetNum >= actualCost;

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setPopupDest(null)}
          >
            <div
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-44 flex-shrink-0">
                <img
                  src={popupDest.image}
                  alt={t(popupDest.name)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={() => setPopupDest(null)}
                  className="absolute top-3 right-3 bg-white/20 text-white rounded-full p-1.5 hover:bg-white/40"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 text-white">
                  <h2 className="font-bold text-xl">{t(popupDest.name)}</h2>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t(popupDest.country)}
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex gap-3 text-sm">
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                    <Calendar className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="font-bold text-slate-800 dark:text-white">{durationNum}</p>
                    <p className="text-slate-400 dark:text-gray-400 text-xs">
                      {t('common.days')}
                    </p>
                  </div>

                  <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                    <Users className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                    <p className="font-bold text-slate-800 dark:text-white">{travelersNum}</p>
                    <p className="text-slate-400 dark:text-gray-400 text-xs">
                      {t('common.people')}
                    </p>
                  </div>

                  <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                    <DollarSign className="w-4 h-4 text-green-500 mx-auto mb-1" />
                    <p className="font-bold text-slate-800 dark:text-white">
                      {fmt(budgetNum)}
                    </p>
                    <p className="text-slate-400 dark:text-gray-400 text-xs">
                      {t('planner.totalBudget')}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300">
                    <TrendingUp className="w-4 h-4 text-slate-400 dark:text-gray-400" />
                    {t('planner.actualCost')}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    {fmt(actualCost)}
                  </span>
                </div>

                {!isEnough ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex gap-3 items-start transition-colors duration-300">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {t('planner.insufficientBudget')}
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
                        {t('planner.budgetBreakdown')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetCategories.map((cat) => (
                          <div
                            key={cat.key}
                            className={`${cat.bg} border ${cat.border} rounded-xl p-3 flex items-center gap-3 transition-colors duration-300`}
                          >
                            <cat.icon className={`w-5 h-5 ${cat.color}`} />
                            <div>
                              <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wide">
                                {t(cat.label)}
                              </p>
                              <p className="font-bold text-slate-800 dark:text-white text-sm">
                                {fmt(actualCost * cat.val)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3 flex justify-between items-center transition-colors duration-300">
                      <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                        {t('planner.freeBalance')}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-300 text-base">
                        {fmt(remaining)}
                      </span>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleSaveTrip}
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6"
                >
                  {saving ? t('common.saving') : t('planner.saveBtn')}
                </Button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}