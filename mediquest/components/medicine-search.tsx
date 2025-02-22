"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { MedicineDetails } from "@/components/medicine-details";
import { useMedicineInfo } from "@/hooks/use-medicine-info";
import { motion } from "framer-motion";

interface MedicineSearchProps {
  selectedLanguage: string; // Accepting language as a prop
}

export function MedicineSearch({ selectedLanguage }: MedicineSearchProps) {
  const [medicineName, setMedicineName] = useState("");
  const { fetchMedicineInfo, medicineData, isLoading, error } = useMedicineInfo();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;
    await fetchMedicineInfo(medicineName, selectedLanguage); 
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 backdrop-blur-lg bg-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 border-t border-l border-white/20">
          <form onSubmit={handleSearch} className="flex gap-4 mb-8">
            <Input
              placeholder={`Enter medicine name (${selectedLanguage})...`} 
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="flex-1 bg-white/50 backdrop-blur-sm border-white/20 focus:border-blue-400 text-black transition-all duration-300"
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
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}