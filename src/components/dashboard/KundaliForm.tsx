"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { KundaliFormData, AYANAMSA_OPTIONS } from "@/types/kundali";

interface KundaliFormProps {
  onSubmit: (data: KundaliFormData) => void;
  isLoading?: boolean;
}

export function KundaliForm({ onSubmit, isLoading = false }: KundaliFormProps) {
  const [formData, setFormData] = useState<KundaliFormData>({
    dob: "1998-01-28",
    tob: "17:05",
    lat: 28.61,
    lon: 77.21,
    tz: 5.5,
    ayanamsa: "lahiri",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
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
