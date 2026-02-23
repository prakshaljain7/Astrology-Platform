"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CitySearch } from "@/components/ui/CitySearch";
import { KundaliFormData, AYANAMSA_OPTIONS } from "@/types/kundali";
import { City } from "@/data/cities";
import { useTheme } from "@/context/ThemeContext";

interface KundaliFormProps {
  onSubmit: (data: KundaliFormData) => void;
  isLoading?: boolean;
  initialData?: KundaliFormData | null;
}

const DEFAULT_FORM_DATA: KundaliFormData = {
  dob: "1998-01-28",
  tob: "17:05",
  lat: 28.61,
  lon: 77.21,
  tz: 5.5,
  ayanamsa: "lahiri",
};

export function KundaliForm({ onSubmit, isLoading = false, initialData }: KundaliFormProps) {
  const { themeColors } = useTheme();
  const [formData, setFormData] = useState<KundaliFormData>(
    initialData || DEFAULT_FORM_DATA
  );
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Update form data when initialData changes (e.g., when context loads)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(`${city.name}, ${city.country}`);
    setFormData((prev) => ({
      ...prev,
      lat: city.lat,
      lon: city.lon,
      tz: city.tz,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <Input
          label="Time of Birth"
          type="time"
          name="tob"
          value={formData.tob}
          onChange={handleChange}
          required
        />

        {/* City Search - spans full width */}
        <div className="md:col-span-2">
          <CitySearch
            label="Birth Place (Search City)"
            placeholder="Type city name to search..."
            onSelect={handleCitySelect}
          />
          {selectedCity && (
            <p 
              className="mt-2 text-sm"
              style={{ color: themeColors.text.secondary }}
            >
              Selected: <span style={{ color: themeColors.brand.accent }}>{selectedCity}</span>
            </p>
          )}
        </div>

        <Input
          label="Latitude"
          type="number"
          name="lat"
          step="0.0001"
          value={formData.lat}
          onChange={handleChange}
          placeholder="e.g., 28.6139"
          required
        />

        <Input
          label="Longitude"
          type="number"
          name="lon"
          step="0.0001"
          value={formData.lon}
          onChange={handleChange}
          placeholder="e.g., 77.2090"
          required
        />

        <Input
          label="Timezone (UTC offset)"
          type="number"
          name="tz"
          step="0.5"
          value={formData.tz}
          onChange={handleChange}
          placeholder="e.g., 5.5 for IST"
          required
        />

        <Select
          label="Ayanamsa"
          name="ayanamsa"
          value={formData.ayanamsa}
          onChange={handleChange}
          options={AYANAMSA_OPTIONS}
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button type="submit" variant="gold" size="lg" isLoading={isLoading}>
          {isLoading ? "Calculating..." : "Calculate Chart"}
        </Button>
      </div>
    </form>
  );
}
