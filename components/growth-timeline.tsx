"use client"

import { useState } from "react"
import { Sprout, Leaf, TreesIcon as Plant, Flower2, Apple, Tractor, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const crops = [
  {
    id: "rice",
    name: "Rice",
    stages: [
      {
        name: "Seed Preparation",
        icon: <Sprout className="h-6 w-6" />,
        duration: "Days 1-7",
        description: "Soak seeds for 24 hours, then drain and incubate for 1-2 days until germination begins.",
        tasks: ["Seed selection", "Soaking", "Pre-germination"],
        tips: "Use high-quality seeds with at least 80% germination rate for best results.",
      },
      {
        name: "Seedling Stage",
        icon: <Leaf className="h-6 w-6" />,
        duration: "Days 8-20",
        description: "Transplant seedlings to the main field when they have 3-4 leaves.",
        tasks: ["Prepare nursery bed", "Sow pre-germinated seeds", "Water management"],
        tips: "Maintain 2-3 cm water level in the nursery bed.",
      },
      {
        name: "Vegetative Stage",
        icon: <Plant className="h-6 w-6" />,
        duration: "Days 21-60",
        description: "Plants develop tillers and grow in height. This is a critical period for nutrient uptake.",
        tasks: ["Weed control", "Water management", "Fertilizer application"],
        tips: "Apply nitrogen fertilizer in split doses to maximize efficiency.",
      },
      {
        name: "Reproductive Stage",
        icon: <Flower2 className="h-6 w-6" />,
        duration: "Days 61-90",
        description: "Plants develop panicles and flowers. Ensure adequate water and nutrients during this period.",
        tasks: ["Pest monitoring", "Disease control", "Maintain water level"],
        tips: "Keep fields flooded with 5-7 cm of water during this stage.",
      },
      {
        name: "Ripening Stage",
        icon: <Apple className="h-6 w-6" />,
        duration: "Days 91-120",
        description: "Grains fill and mature, changing from green to golden yellow.",
        tasks: ["Drain field", "Monitor maturity", "Prepare for harvest"],
        tips: "Drain fields 7-10 days before expected harvest date.",
      },
      {
        name: "Harvest",
        icon: <Tractor className="h-6 w-6" />,
        duration: "Days 121-130",
        description: "Cut and thresh the mature rice plants when 80-85% of the grains are golden yellow.",
        tasks: ["Harvesting", "Threshing", "Drying", "Storage"],
        tips: "Harvest in the morning to avoid grain shattering in the heat of the day.",
      },
    ],
  },
  {
    id: "maize",
    name: "Maize",
    stages: [
      {
        name: "Seed Germination",
        icon: <Sprout className="h-6 w-6" />,
        duration: "Days 1-10",
        description: "Seeds germinate and emerge from the soil, developing initial root system.",
        tasks: ["Soil preparation", "Seed planting", "Initial irrigation"],
        tips: "Plant seeds at a depth of 3-5 cm in warm, moist soil.",
      },
      {
        name: "Seedling Stage",
        icon: <Leaf className="h-6 w-6" />,
        duration: "Days 11-30",
        description: "Young plants develop their first true leaves and establish root systems.",
        tasks: ["Thinning", "Weed control", "Light fertilization"],
        tips: "Thin seedlings to maintain 20-25 cm spacing between plants.",
      },
      {
        name: "Vegetative Stage",
        icon: <Plant className="h-6 w-6" />,
        duration: "Days 31-60",
        description: "Rapid growth of stems and leaves. Critical period for water and nutrient uptake.",
        tasks: ["Fertilizer application", "Irrigation", "Pest monitoring"],
        tips: "Apply nitrogen fertilizer when plants are knee-high.",
      },
      {
        name: "Tasseling Stage",
        icon: <Flower2 className="h-6 w-6" />,
        duration: "Days 61-70",
        description: "Male flowers (tassels) appear at the top of the plant, releasing pollen.",
        tasks: ["Irrigation", "Disease monitoring", "Supplemental fertilization"],
        tips: "Ensure adequate soil moisture during this critical reproductive stage.",
      },
      {
        name: "Silking & Pollination",
        icon: <Flower2 className="h-6 w-6" />,
        duration: "Days 71-90",
        description: "Female flowers (silks) emerge from ear shoots and capture pollen for fertilization.",
        tasks: ["Maintain soil moisture", "Pest control", "Avoid disturbance"],
        tips: "Water stress during this period can significantly reduce yield.",
      },
      {
        name: "Grain Fill & Maturity",
        icon: <Apple className="h-6 w-6" />,
        duration: "Days 91-120",
        description: "Kernels develop and mature, changing from milky to dent stage.",
        tasks: ["Irrigation management", "Disease monitoring", "Prepare for harvest"],
        tips: "Kernels are mature when they develop a black layer at the base.",
      },
      {
        name: "Harvest",
        icon: <Tractor className="h-6 w-6" />,
        duration: "Days 121-140",
        description: "Harvest when kernels are hard and moisture content is around 15-20%.",
        tasks: ["Harvesting", "Drying", "Storage"],
        tips: "Dry harvested corn to 13-14% moisture for safe storage.",
      },
    ],
  },
  {
    id: "cotton",
    name: "Cotton",
    stages: [
      {
        name: "Planting & Germination",
        icon: <Sprout className="h-6 w-6" />,
        duration: "Days 1-10",
        description: "Seeds germinate and seedlings emerge from the soil.",
        tasks: ["Soil preparation", "Seed planting", "Initial irrigation"],
        tips: "Plant when soil temperature is at least 18°C at 10 cm depth.",
      },
      {
        name: "Seedling Establishment",
        icon: <Leaf className="h-6 w-6" />,
        duration: "Days 11-30",
        description: "Young plants develop true leaves and establish root systems.",
        tasks: ["Thinning", "Weed control", "Pest monitoring"],
        tips: "Thin seedlings to maintain 10-15 cm spacing between plants.",
      },
      {
        name: "Vegetative Growth",
        icon: <Plant className="h-6 w-6" />,
        duration: "Days 31-60",
        description: "Plants develop branches, leaves, and grow in height.",
        tasks: ["Fertilizer application", "Irrigation", "Pest control"],
        tips: "Apply nitrogen fertilizer to promote vegetative growth.",
      },
      {
        name: "Flowering",
        icon: <Flower2 className="h-6 w-6" />,
        duration: "Days 61-90",
        description: "Plants produce flower buds (squares) that develop into flowers.",
        tasks: ["Irrigation management", "Pest monitoring", "Nutrient management"],
        tips: "Monitor for boll weevils and other pests that target flower buds.",
      },
      {
        name: "Boll Development",
        icon: <Apple className="h-6 w-6" />,
        duration: "Days 91-140",
        description: "Fertilized flowers develop into bolls that contain seeds and fibers.",
        tasks: ["Irrigation", "Disease control", "Nutrient management"],
        tips: "Maintain consistent soil moisture to prevent boll shedding.",
      },
      {
        name: "Boll Opening & Maturity",
        icon: <Apple className="h-6 w-6" />,
        duration: "Days 141-170",
        description: "Bolls mature and split open, exposing the cotton fibers.",
        tasks: ["Irrigation reduction", "Defoliation planning", "Harvest preparation"],
        tips: "Reduce irrigation to encourage boll opening and prevent regrowth.",
      },
      {
        name: "Harvest",
        icon: <Tractor className="h-6 w-6" />,
        duration: "Days 171-180",
        description: "Harvest when 60-70% of bolls are open and fibers are dry.",
        tasks: ["Defoliation", "Harvesting", "Module building", "Ginning"],
        tips: "Apply defoliants 7-14 days before planned harvest date.",
      },
    ],
  },
]

export function GrowthTimeline() {
  const [activeCrop, setActiveCrop] = useState("rice")
  const [activeStage, setActiveStage] = useState(0)

  const selectedCrop = crops.find((crop) => crop.id === activeCrop)
  const stages = selectedCrop?.stages || []
  const currentStage = stages[activeStage]

  return (
    <section className="py-16" id="growth-timeline">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Crop Growth Timeline</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Understand the growth stages and care requirements throughout the lifecycle of popular crops.
        </p>
      </div>

      <Tabs defaultValue="rice" value={activeCrop} onValueChange={setActiveCrop} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="rice">Rice</TabsTrigger>
          <TabsTrigger value="maize">Maize</TabsTrigger>
          <TabsTrigger value="cotton">Cotton</TabsTrigger>
        </TabsList>

        {crops.map((crop) => (
          <TabsContent key={crop.id} value={crop.id} className="mt-0">
            <div className="mb-8 overflow-x-auto">
              <div className="flex min-w-max">
                {crop.stages.map((stage, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative flex-1 cursor-pointer border-t-4 px-4 pt-4 text-center",
                      index === activeStage ? "border-green-600" : "border-gray-200 hover:border-green-200",
                    )}
                    onClick={() => setActiveStage(index)}
                  >
                    <div
                      className={cn(
                        "mx-auto flex h-12 w-12 items-center justify-center rounded-full",
                        index === activeStage ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500",
                      )}
                    >
                      {stage.icon}
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">{stage.name}</h4>
                      <p className="text-xs text-gray-500">{stage.duration}</p>
                    </div>
                    {index < crop.stages.length - 1 && (
                      <div className="absolute right-0 top-10 -mr-2 text-gray-300">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-2 border-green-100">
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <div className="mb-4 flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        {currentStage.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{currentStage.name}</h3>
                        <p className="text-sm text-gray-500">
                          <Calendar className="mr-1 inline-block h-4 w-4" />
                          {currentStage.duration}
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 text-gray-700">{currentStage.description}</p>

                    <div className="mb-4">
                      <h4 className="mb-2 font-medium">Key Tasks:</h4>
                      <ul className="list-inside list-disc space-y-1 text-gray-700">
                        {currentStage.tasks.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <h4 className="mb-2 font-medium text-green-800">Farmer's Tip:</h4>
                    <p className="text-green-700">{currentStage.tips}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                    disabled={activeStage === 0}
                  >
                    Previous Stage
                  </Button>
                  <Button
                    onClick={() => setActiveStage((prev) => Math.min(stages.length - 1, prev + 1))}
                    disabled={activeStage === stages.length - 1}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Next Stage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

