"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Leaf, Sprout, Sun, Droplets, ChevronLeft, ChevronRight, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroSlides = [
  {
    title: "Grow Smarter",
    subtitle: "Harvest Better",
    description: "Discover the perfect crops for your land with our advanced recommendation system.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    color: "from-green-800 to-green-600",
    textColor: "text-green-200",
  },
  {
    title: "Sustainable",
    subtitle: "Agriculture",
    description: "Learn eco-friendly farming practices that preserve resources for future generations.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    color: "from-amber-800 to-amber-600",
    textColor: "text-amber-200",
  },
  {
    title: "Data-Driven",
    subtitle: "Farming",
    description: "Make informed decisions based on soil analysis and climate conditions.",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    color: "from-blue-800 to-blue-600",
    textColor: "text-blue-200",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)

  // Handle slide change
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    setAutoplayEnabled(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
    setAutoplayEnabled(false)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplayEnabled) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplayEnabled])

  // Mouse move effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovering) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })
  }

  const slide = heroSlides[currentSlide]

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              style={{
                transform: isHovering
                  ? `translate(${(mousePosition.x - 50) * -0.05}px, ${(mousePosition.y - 50) * -0.05}px)`
                  : "none",
                transition: isHovering ? "transform 0.2s ease-out" : "transform 0.5s ease-out",
              }}
              priority
            />
          </div>
        ))}
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-20 py-24 md:py-32 bg-gradient-to-b ${slide.color} bg-opacity-70`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="flex justify-center gap-3 lg:justify-start">
                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                  <Leaf className="mr-1 h-4 w-4" />
                  Smart Farming
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                  <Sprout className="mr-1 h-4 w-4" />
                  Sustainable
                </span>
              </div>

              <div className="mt-6 overflow-hidden">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in">
                  {slide.title} <span className={`block ${slide.textColor} animate-slide-up`}>{slide.subtitle}</span>
                </h1>
                <p className="mt-6 text-xl text-white/90 animate-fade-in">{slide.description}</p>
              </div>

              <div className="mt-8 flex justify-center gap-4 lg:justify-start">
                <Button size="lg" className="bg-white text-gray-800 hover:bg-white/90 group relative overflow-hidden">
                  <span className="absolute inset-0 w-0 bg-green-100 transition-all duration-500 ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center">
                    Get Started
                    <MousePointer className="ml-2 h-4 w-4 animate-bounce" />
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>

              {/* Slide Indicators */}
              <div className="mt-8 flex justify-center gap-2 lg:justify-start">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      index === currentSlide
                        ? "bg-white scale-100"
                        : "bg-white/50 scale-75 hover:scale-90 hover:bg-white/70",
                    )}
                    onClick={() => {
                      setCurrentSlide(index)
                      setAutoplayEnabled(false)
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-white/20 opacity-30 blur-3xl animate-pulse"></div>
                <div
                  className="absolute -bottom-12 -right-12 h-72 w-72 rounded-full bg-white/20 opacity-30 blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                <div className="relative rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20 transform transition-transform duration-500 hover:scale-105">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: <Sun className="h-8 w-8 text-yellow-300" />,
                        title: "Optimal Sunlight",
                        description: "Understand the perfect light conditions for your crops",
                      },
                      {
                        icon: <Droplets className="h-8 w-8 text-blue-300" />,
                        title: "Water Management",
                        description: "Learn efficient irrigation techniques for your farm",
                      },
                      {
                        icon: <Leaf className="h-8 w-8 text-green-300" />,
                        title: "Soil Health",
                        description: "Maintain nutrient-rich soil for maximum yield",
                      },
                      {
                        icon: <Sprout className="h-8 w-8 text-green-200" />,
                        title: "Growth Tracking",
                        description: "Monitor your crops through every stage of growth",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
                      >
                        <div className="mb-3 transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                          {item.icon}
                        </div>
                        <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-white/80">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

