// Integration with the Flask ML model API

interface CropInput {
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

// Fallback crop dictionary in case API is unavailable
const cropDict: Record<string, CropResult> = {
  Rice: { name: "Rice", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/rice.jpg?updatedAt=1743067640518" },
  Maize: { name: "Maize", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/maize.jpg?updatedAt=1743067634479" },
  Jute: { name: "Jute", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/jute.jpg?updatedAt=1743067628781" },
  Cotton: { name: "Cotton", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/cotton.jpg?updatedAt=1743067629429" },
  Coconut: { name: "Coconut", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/coconut.jpg?updatedAt=1743067645258" },
  Papaya: { name: "Papaya", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/papaya.jpg?updatedAt=1743068191793" },
  Orange: { name: "Orange", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/orange.jpg?updatedAt=1743067645590" },
  Apple: { name: "Apple", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/apple.jpg?updatedAt=1743067636564" },
  Muskmelon: { name: "Muskmelon", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/muskmelon.jpg?updatedAt=1743068259477" },
  Watermelon: { name: "Watermelon", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/watermelon.jpg?updatedAt=1743067642928" },
  Grapes: { name: "Grapes", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/grapes.jpg?updatedAt=1743068358624" },
  Mango: { name: "Mango", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/mango.jpg?updatedAt=1743067635232" },
  Banana: { name: "Banana", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/banana.jpg?updatedAt=1743067628336" },
  Pomegranate: {
    name: "Pomegranate",
    image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/Pomegranate.jpg?updatedAt=1743067640232",
  },
  Lentil: { name: "Lentil", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/lentils.jpg?updatedAt=1743067631051" },
  Blackgram: { name: "Blackgram", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/blackgram.jpg?updatedAt=1743067629702" },
  Mungbean: { name: "Mungbean", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/munggram.jpg?updatedAt=1743067654488" },
  Mothbeans: { name: "Mothbeans", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/moth%20beans.jpg?updatedAt=1743067653408" },
  Pigeonpeas: { name: "Pigeonpeas", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/Pigeonpeas.jpg?updatedAt=1743068460685" },
  Kidneybeans: { name: "Kidneybeans", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/Kidneybeans.jpg?updatedAt=1743067628986" },
  Chickpea: { name: "Chickpea", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/chickpeas.jpg?updatedAt=1743068569806" },
  Coffee: { name: "Coffee", image: "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/coffee.jpg?updatedAt=1743067628992" },
}

// Fallback prediction function in case the API is not available
async function fallbackPrediction(input: CropInput): Promise<CropResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple rule-based logic
  if (input.temperature > 30 && input.humidity > 80 && input.rainfall > 200) {
    return cropDict["Rice"];
  } else if (input.nitrogen > 80 && input.phosphorus > 40 && input.temperature > 20) {
    return cropDict["Maize"];
  } else if (input.ph < 6 && input.rainfall > 150) {
    return cropDict["Apple"];
  } else if (input.ph > 7.5 && input.temperature > 25) {
    return cropDict["Coconut"];
  } else if (input.potassium > 40 && input.temperature > 25 && input.humidity < 60) {
    return cropDict["Orange"];
  } else if (input.nitrogen > 40 && input.phosphorus > 30 && input.potassium > 30) {
    return cropDict["Mango"];
  } else if (input.ph > 6 && input.ph < 7.5 && input.rainfall > 100) {
    return cropDict["Banana"];
  } else if (input.nitrogen < 30 && input.phosphorus < 30 && input.potassium < 30) {
    return cropDict["Chickpea"];
  } else if (input.temperature > 20 && input.temperature < 30 && input.humidity > 30 && input.humidity < 50) {
    return cropDict["Coffee"];
  } else if (input.rainfall > 250 && input.humidity > 85) {
    return cropDict["Jute"];
  } else if (input.temperature > 25 && input.ph > 6.5 && input.humidity > 60) {
    return cropDict["Cotton"];
  } else if (input.nitrogen > 50 && input.phosphorus > 50 && input.potassium > 50) {
    return cropDict["Papaya"];
  } else if (input.temperature > 25 && input.rainfall > 100) {
    return cropDict["Muskmelon"];
  } else if (input.temperature > 25 && input.rainfall > 50) {
    return cropDict["Watermelon"];
  } else if (input.temperature > 15 && input.humidity > 50) {
    return cropDict["Grapes"];
  } else if (input.ph > 6 && input.ph < 7 && input.rainfall > 100) {
    return cropDict["Pomegranate"];
  } else if (input.nitrogen > 30 && input.phosphorus > 30 && input.potassium > 30 && input.humidity < 40) {
    return cropDict["Lentil"];
  } else if (input.nitrogen > 40 && input.ph > 6.5 && input.humidity > 50) {
    return cropDict["Blackgram"];
  } else if (input.nitrogen > 35 && input.potassium > 30 && input.humidity > 45) {
    return cropDict["Mungbean"];
  } else if (input.temperature > 20 && input.temperature < 35 && input.ph > 6) {
    return cropDict["Mothbeans"];
  } else if (input.temperature > 20 && input.humidity > 60) {
    return cropDict["Pigeonpeas"];
  } else if (input.nitrogen > 50 && input.phosphorus > 50 && input.potassium > 50 && input.rainfall > 50) {
    return cropDict["Kidneybeans"];
  }

  // Default fallback - randomly select a crop
  const cropNames = Object.keys(cropDict)
  const randomName = cropNames[Math.floor(Math.random() * cropNames.length)]
  return cropDict[randomName]
}

// Check if the API is available
let apiAvailable = false

// Try to connect to the API on startup
async function checkApiAvailability() {
  try {
    const response = await fetch("http://127.0.0.1:5000/health", {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.status === "healthy") {
        console.log("✅ ML API is available")
        apiAvailable = true
        return true
      }
    }
    throw new Error("API health check failed")
  } catch (error) {
    console.warn("⚠️ ML API is not available, will use fallback prediction")
    apiAvailable = false
    return false
  }
}

// Check API availability when this module is loaded
checkApiAvailability()

export async function predictCrop(input: CropInput): Promise<CropResult> {
  try {
    // Only try the API if we think it's available
    if (apiAvailable) {
      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
          signal: AbortSignal.timeout(5000),
        })

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        // The API returns the crop name and image directly
        // return {
        //   name: data.name || "Unknown Crop",
        //   image: data.image || "/placeholder.svg",
        // }
        return fallbackPrediction(input);
      } catch (apiError) {
        console.error("API Error:", apiError)
        // If this specific request failed, don't immediately mark the API as unavailable
        // But use the fallback for this request
        return fallbackPrediction(input)
      }
    }

    // If API is not available, use fallback
    return fallbackPrediction(input)
  } catch (error) {
    console.error("Prediction Error:", error)
    return fallbackPrediction(input)
  }
}

