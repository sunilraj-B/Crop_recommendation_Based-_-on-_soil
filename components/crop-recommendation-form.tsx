"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { AlertCircle, Loader2 } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { predictCrop } from "@/lib/crop-prediction"

interface FormData {
  nitrogen: number
  phosphorus: number
  potassium: number
  temperature: number
  humidity: number
  ph: number
  rainfall: number
}

interface CropResult {
  name: string
  image: string
}

export function CropRecommendationForm() {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    temperature: 0,
    humidity: 0,
    ph: 0,
    rainfall: 0,
  })
  const [crop, setCrop] = useState<CropResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number.parseFloat(value) || 0,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setCrop(null)

    try {
      // Validate inputs
      for (const [key, value] of Object.entries(formData)) {
        if (isNaN(value)) {
          throw new Error(`Please enter a valid number for ${key}`)
        }
      }

      if (formData.ph < 0 || formData.ph > 14) {
        throw new Error("pH must be between 0 and 14")
      }

      if (formData.humidity < 0 || formData.humidity > 100) {
        throw new Error("Humidity must be between 0 and 100")
      }

      // Get prediction
      const result = await predictCrop(formData)
      setCrop(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nitrogen">Nitrogen (N)</Label>
            <Input
              id="nitrogen"
              name="nitrogen"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.nitrogen || ""}
              onChange={handleChange}
              placeholder="e.g., 40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phosphorus">Phosphorus (P)</Label>
            <Input
              id="phosphorus"
              name="phosphorus"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.phosphorus || ""}
              onChange={handleChange}
              placeholder="e.g., 50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="potassium">Potassium (K)</Label>
            <Input
              id="potassium"
              name="potassium"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.potassium || ""}
              onChange={handleChange}
              placeholder="e.g., 60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature (°C)</Label>
            <Input
              id="temperature"
              name="temperature"
              type="number"
              step="0.1"
              min="-50"
              max="50"
              required
              value={formData.temperature || ""}
              onChange={handleChange}
              placeholder="e.g., 25"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="humidity">Humidity (%)</Label>
            <Input
              id="humidity"
              name="humidity"
              type="number"
              step="0.1"
              min="0"
              max="100"
              required
              value={formData.humidity || ""}
              onChange={handleChange}
              placeholder="e.g., 70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ph">Soil pH Level</Label>
            <Input
              id="ph"
              name="ph"
              type="number"
              step="0.1"
              min="0"
              max="14"
              required
              value={formData.ph || ""}
              onChange={handleChange}
              placeholder="e.g., 6.5"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="rainfall">Rainfall (mm)</Label>
            <Input
              id="rainfall"
              name="rainfall"
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.rainfall || ""}
              onChange={handleChange}
              placeholder="e.g., 200"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Get Recommended Crop"
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {crop && (
        <Card className="mt-8 overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Recommended Crop: {crop.name}</h2>
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-lg">
              <Image
                src={crop.image || "/placeholder.svg"}
                alt={crop.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Based on your soil and weather parameters, {crop.name} would be an ideal crop to grow.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

