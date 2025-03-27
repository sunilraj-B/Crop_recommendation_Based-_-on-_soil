import { Lightbulb, Droplets, Sprout, Bug, Sun, Leaf, Tractor, Thermometer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const tips = [
  {
    icon: <Droplets className="h-8 w-8 text-blue-500" />,
    title: "Water Management",
    description:
      "Implement drip irrigation to reduce water usage by up to 60% compared to traditional methods. Water early in the morning to minimize evaporation.",
  },
  {
    icon: <Sprout className="h-8 w-8 text-green-500" />,
    title: "Crop Rotation",
    description:
      "Rotate crops annually to break pest cycles, improve soil health, and reduce the need for synthetic fertilizers. Legumes can add nitrogen to soil for subsequent crops.",
  },
  {
    icon: <Bug className="h-8 w-8 text-amber-500" />,
    title: "Integrated Pest Management",
    description:
      "Use beneficial insects like ladybugs and lacewings to control pests naturally. Monitor crops regularly to catch pest problems early.",
  },
  {
    icon: <Sun className="h-8 w-8 text-yellow-500" />,
    title: "Sunlight Optimization",
    description:
      "Plant rows north to south to maximize sunlight exposure. Consider the shade patterns when planting mixed crops to ensure all plants receive adequate light.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: "Soil Health",
    description:
      "Test soil annually to understand nutrient levels. Use cover crops during off-seasons to prevent erosion and add organic matter to the soil.",
  },
  {
    icon: <Tractor className="h-8 w-8 text-red-500" />,
    title: "Equipment Maintenance",
    description:
      "Regularly calibrate sprayers and seeders for optimal performance. Keep cutting edges sharp to reduce fuel consumption and improve efficiency.",
  },
  {
    icon: <Thermometer className="h-8 w-8 text-red-400" />,
    title: "Climate Adaptation",
    description:
      "Select crop varieties that are adapted to your local climate conditions. Consider heat-tolerant varieties in areas experiencing warming trends.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-yellow-400" />,
    title: "Smart Farming",
    description:
      "Use weather forecasting apps to plan planting and harvesting. Consider soil moisture sensors to optimize irrigation scheduling.",
  },
]

export function FarmingTips() {
  return (
    <section className="py-16" id="farming-tips">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Expert Farming Tips</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Practical advice to improve your farming practices and increase yields sustainably.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tips.map((tip, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">{tip.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

