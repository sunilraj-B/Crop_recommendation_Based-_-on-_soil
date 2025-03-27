import { NextResponse } from "next/server"

// This is a server-side route handler that proxies requests to the Flask API
// This helps avoid CORS issues when the Flask API is running on a different domain/port

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Forward the request to the Flask API
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // Add a timeout to prevent hanging if the API is not available
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      throw new Error(`Flask API responded with status: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error proxying to Flask API:", error)
    return NextResponse.json({ error: "Failed to connect to prediction service" }, { status: 500 })
  }
}

