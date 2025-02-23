"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Search, MapPin } from "lucide-react";
import { MedicineDetails } from "@/components/medicine-details";
import { useMedicineInfo } from "@/hooks/use-medicine-info";
import { motion } from "framer-motion";

interface MedicineSearchProps {
  selectedLanguage: string; // Accepting language as a prop
}

export function MedicineSearch({ selectedLanguage }: MedicineSearchProps) {
  const [medicineName, setMedicineName] = useState("");
  const [location, setLocation] = useState(""); // Location state
  const { fetchMedicineInfo, medicineData, isLoading, error } = useMedicineInfo();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim() || !location.trim()) return; // Ensure both fields are filled
    await fetchMedicineInfo(medicineName, selectedLanguage, location); // Pass location
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 backdrop-blur-lg bg-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 border-t border-l border-white/20">
          <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
            <Input
              placeholder={`Enter medicine name (${selectedLanguage})...`}
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="flex-1 bg-white/50 backdrop-blur-sm border-white/20 focus:border-blue-400 transition-all duration-300"
            />

            <Input
              placeholder="Enter your location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-white/50 backdrop-blur-sm border-white/20 focus:border-blue-400 transition-all duration-300"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {medicineData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MedicineDetails data={medicineData} />

              {/* Display Nearby Pharmacies */}
              {medicineData.nearbyPharmacies?.pharmacies?.length > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center">
                    <MapPin className="mr-2 text-red-500" />
                    Nearby Pharmacies in {medicineData.nearbyPharmacies.location}
                  </h2>
                  <ul className="space-y-2">
                    {medicineData.nearbyPharmacies.pharmacies.map((pharmacy, index) => (
                      <li key={index} className="p-3 bg-white rounded-lg shadow-sm">
                        <p className="font-medium text-gray-700">{pharmacy.name}</p>
                        <p className="text-sm text-gray-600">{pharmacy.address}</p>
                        {pharmacy.contact && (
                          <p className="text-sm text-blue-600">{pharmacy.contact}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
