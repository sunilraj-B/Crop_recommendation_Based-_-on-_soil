"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Droplets, Thermometer, Gauge, Leaf, Loader2, AlertCircle, Sparkles, CheckCircle2, WifiOff } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { predictCrop } from "@/lib/crop-prediction"
import { cn } from "@/lib/utils"

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

export function CropRecommendationTool() {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 50,
    ph: 7,
    rainfall: 150,
  })
  const [crop, setCrop] = useState<CropResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<"checking" | "connected" | "fallback">("checking")

  // Check API status on component mount
  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch("http://127.0.0.1:5000/health", {
          signal: AbortSignal.timeout(3000),
        })

        if (response.ok) {
          setApiStatus("connected")
        } else {
          setApiStatus("fallback")
        }
      } catch (error) {
        setApiStatus("fallback")
      }
    }

    checkApi()
  }, [])

  const handleSliderChange = (name: keyof FormData, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await predictCrop(formData)
      setCrop(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-12" id="recommendation-tool">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Crop Recommendations Based on Soil Impurity</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Adjust the sliders below to match your soil and climate conditions and get personalized crop recommendations.
        </p>

        {/* API Status Indicator */}
        <div className="mt-4 flex items-center justify-center">
          {apiStatus === "checking" && (
            <div className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting to ML model...
            </div>
          )}
          {apiStatus === "connected" && (
            <div className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              ML model connected
            </div>
          )}
          {apiStatus === "fallback" && (
            <div className="flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
              <WifiOff className="mr-2 h-4 w-4" />
              Using fallback prediction (ML model unavailable)
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="nitrogen" className="flex items-center text-base font-medium">
                      <Leaf className="mr-2 h-4 w-4 text-green-600" />
                      Nitrogen (N)
                    </Label>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {formData.nitrogen} mg/kg
                    </span>
                  </div>
                  <Slider
                    id="nitrogen"
                    min={0}
                    max={140}
                    step={1}
                    value={[formData.nitrogen]}
                    onValueChange={(value) => handleSliderChange("nitrogen", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="phosphorus" className="flex items-center text-base font-medium">
                      <Leaf className="mr-2 h-4 w-4 text-green-600" />
                      Phosphorus (P)
                    </Label>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {formData.phosphorus} mg/kg
                    </span>
                  </div>
                  <Slider
                    id="phosphorus"
                    min={0}
                    max={140}
                    step={1}
                    value={[formData.phosphorus]}
                    onValueChange={(value) => handleSliderChange("phosphorus", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="potassium" className="flex items-center text-base font-medium">
                      <Leaf className="mr-2 h-4 w-4 text-green-600" />
                      Potassium (K)
                    </Label>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {formData.potassium} mg/kg
                    </span>
                  </div>
                  <Slider
                    id="potassium"
                    min={0}
                    max={140}
                    step={1}
                    value={[formData.potassium]}
                    onValueChange={(value) => handleSliderChange("potassium", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temperature" className="flex items-center text-base font-medium">
                      <Thermometer className="mr-2 h-4 w-4 text-red-500" />
                      Temperature
                    </Label>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                      {formData.temperature}°C
                    </span>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={45}
                    step={0.5}
                    value={[formData.temperature]}
                    onValueChange={(value) => handleSliderChange("temperature", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Cold</span>
                    <span>Moderate</span>
                    <span>Hot</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="humidity" className="flex items-center text-base font-medium">
                      <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                      Humidity
                    </Label>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {formData.humidity}%
                    </span>
                  </div>
                  <Slider
                    id="humidity"
                    min={0}
                    max={100}
                    step={1}
                    value={[formData.humidity]}
                    onValueChange={(value) => handleSliderChange("humidity", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Dry</span>
                    <span>Moderate</span>
                    <span>Humid</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ph" className="flex items-center text-base font-medium">
                      <Gauge className="mr-2 h-4 w-4 text-purple-500" />
                      Soil pH
                    </Label>
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                      {formData.ph}
                    </span>
                  </div>
                  <Slider
                    id="ph"
                    min={0}
                    max={14}
                    step={0.1}
                    value={[formData.ph]}
                    onValueChange={(value) => handleSliderChange("ph", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Acidic</span>
                    <span>Neutral</span>
                    <span>Alkaline</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rainfall" className="flex items-center text-base font-medium">
                      <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                      Rainfall
                    </Label>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {formData.rainfall} mm
                    </span>
                  </div>
                  <Slider
                    id="rainfall"
                    min={0}
                    max={300}
                    step={1}
                    value={[formData.rainfall]}
                    onValueChange={(value) => handleSliderChange("rainfall", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Recommended Crop
                  </>
                )}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className={cn("flex items-center justify-center", crop ? "opacity-100" : "opacity-50")}>
            {crop ? (
              <Card className="w-full overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="mb-4 inline-flex rounded-full bg-green-100 p-2">
                      <div className="rounded-full bg-green-200 p-2">
                        <Sparkles className="h-6 w-6 text-green-700" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">Recommended Crop</h3>
                    <p className="mb-6 text-gray-600">Based on your soil and climate conditions</p>
                  </div>

                  <div className="relative mx-auto mb-6 h-64 w-full overflow-hidden rounded-xl">
                    <Image
                      src={crop.image || "/placeholder.svg"}
                      alt={crop.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                      <h4 className="text-xl font-bold">{crop.name}</h4>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <h4 className="mb-2 font-medium text-green-800">Why {crop.name} is recommended:</h4>
                    <p className="text-sm text-green-700">
                      {crop.name} thrives in conditions similar to what you've described. It performs well with your
                      soil nutrient levels and is adapted to your climate conditions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center">
                <div className="mb-4 inline-flex rounded-full bg-gray-100 p-4">
                  <Leaf className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-700">Awaiting Your Input</h3>
                <p className="text-gray-500">
                  Adjust the sliders and click "Get Recommended Crop" to see what would grow best in your conditions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

