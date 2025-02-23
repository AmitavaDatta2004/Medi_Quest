"use client";

import { useState } from "react";
import { MedicineData } from "@/types/medicine";

export function useMedicineInfo() {
  const [medicineData, setMedicineData] = useState<MedicineData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicineInfo = async (medicineName: string, selectedLanguage: string, location: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/medicine-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicineName, language: selectedLanguage, location }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch medicine information: ${response.statusText}`);
      }

      const data = await response.json();
      setMedicineData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { medicineData, isLoading, error, fetchMedicineInfo };
}
