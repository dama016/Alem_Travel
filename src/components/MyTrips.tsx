import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Trash2,
  Plane,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface SavedTrip {
  id: string;
  userId: string;
  destination: {
    name: string;
    country: string;
    image: string;
    avgCostPerDay: number;
    description: string;
  };
  budget: number;
  duration: number;
  travelers: number;
  breakdown: {
    accommodation: number;
    food: number;
    activities: number;
    transport: number;
  };
  createdAt: string;
}

export function MyTrips() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    if (user) {
      const allTrips = JSON.parse(
        localStorage.getItem("savedTrips") || "[]",
      );
      const userTrips = allTrips.filter(
        (trip: SavedTrip) => trip.userId === user.id,
      );
      setSavedTrips(userTrips);
    }
  }, [user]);

  const handleDeleteTrip = (tripId: string) => {
    const allTrips = JSON.parse(
      localStorage.getItem("savedTrips") || "[]",
    );
    const updatedTrips = allTrips.filter(
      (trip: SavedTrip) => trip.id !== tripId,
    );
    localStorage.setItem(
      "savedTrips",
      JSON.stringify(updatedTrips),
    );
    setSavedTrips(
      savedTrips.filter((trip) => trip.id !== tripId),
    );
    toast.success(t("mytrips.removed"));
  };

  if (!user) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20 space-y-4">
            <Plane className="w-16 h-16 text-gray-400 dark:text-slate-500 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t("mytrips.signInRequired")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              {t("mytrips.signInMessage")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {t("mytrips.title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            {t("mytrips.subtitle")}
          </p>
        </div>

        {savedTrips.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-12 text-center transition-colors duration-300">
            <Plane className="w-16 h-16 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("mytrips.noTrips")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("mytrips.startPlanning")}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={trip.destination.image}
                    alt={trip.destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm shadow-lg border border-gray-200 dark:border-slate-700 transition-colors duration-300">
                    ${trip.budget}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {trip.destination.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {trip.destination.country}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm">
                        {trip.duration} {t("mytrips.days")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm">
                        {trip.travelers}{" "}
                        {trip.travelers === 1
                          ? t("mytrips.traveler")
                          : t("mytrips.travelers")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm">
                        $
                        {(trip.budget / trip.duration).toFixed(
                          0,
                        )}
                        /day
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {t("mytrips.savedOn")}{" "}
                      {new Date(
                        trip.createdAt,
                      ).toLocaleDateString()}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="w-full border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t("mytrips.removeTrip")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}