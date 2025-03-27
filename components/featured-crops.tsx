import Image from "next/image"
import { Droplets, Sun, Thermometer, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const crops = [
  {
    name: "Rice",
    image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/rice.jpg?updatedAt=1743067640518",
    description:
      "A staple food for over half the world's population, rice thrives in warm, humid environments with abundant water.",
    requirements: {
      water: "High",
      sunlight: "Full",
      temperature: "25-35°C",
      soil: "Clay, pH 5.5-6.5",
    },
    tags: ["Staple Food", "Grain"],
  },
  {
    name: "Maize",
    image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/maize.jpg?updatedAt=1743067634479",
    description:
      "Also known as corn, maize is a versatile crop used for food, feed, and industrial products. It requires moderate water and full sunlight.",
    requirements: {
      water: "Moderate",
      sunlight: "Full",
      temperature: "20-30°C",
      soil: "Well-drained, pH 5.8-7.0",
    },
    tags: ["Grain", "Versatile"],
  },
  {
    name: "Cotton",
    image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/cotton.jpg?updatedAt=1743067629429",
    description:
      "A soft, fluffy staple fiber that grows in a protective case around the seeds of cotton plants. It's a major cash crop worldwide.",
    requirements: {
      water: "Moderate",
      sunlight: "Full",
      temperature: "20-30°C",
      soil: "Well-drained, pH 5.8-8.0",
    },
    tags: ["Fiber", "Cash Crop"],
  },
  {
    name: "Mango",
    image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/mango.jpg?updatedAt=1743067635232",
    description:
      "A juicy stone fruit with a sweet flavor, mangoes are one of the most widely cultivated fruits in tropical regions.",
    requirements: {
      water: "Moderate",
      sunlight: "Full",
      temperature: "24-30°C",
      soil: "Well-drained, pH 5.5-7.5",
    },
    tags: ["Fruit", "Tropical"],
  },
]

export function FeaturedCrops() {
  return (
    <section className="py-16" id="featured-crops">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Crops</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Explore detailed information about various crops, their characteristics and cultivation requirements.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {crops.map((crop) => (
          <Card key={crop.name} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={crop.image || "/placeholder.svg"}
                alt={crop.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <CardContent className="p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {crop.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-green-50">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="mb-2 text-xl font-bold">{crop.name}</h3>
              <p className="mb-4 text-sm text-gray-600">{crop.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="font-medium">Water:</span>
                  <span className="ml-2 text-gray-600">{crop.requirements.water}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Sun className="mr-2 h-4 w-4 text-yellow-500" />
                  <span className="font-medium">Sunlight:</span>
                  <span className="ml-2 text-gray-600">{crop.requirements.sunlight}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Thermometer className="mr-2 h-4 w-4 text-red-500" />
                  <span className="font-medium">Temperature:</span>
                  <span className="ml-2 text-gray-600">{crop.requirements.temperature}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Leaf className="mr-2 h-4 w-4 text-green-500" />
                  <span className="font-medium">Soil:</span>
                  <span className="ml-2 text-gray-600">{crop.requirements.soil}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

