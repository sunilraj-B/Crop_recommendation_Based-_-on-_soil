import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">AgroInsight</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Empowering farmers with data-driven insights and recommendations for sustainable and profitable
              agriculture.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Resources</h3>
            <ul className="space-y-3">
              {["Crop Database", "Growing Guides", "Pest Identification", "Weather Forecasts"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-base text-gray-600 hover:text-green-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Tools</h3>
            <ul className="space-y-3">
              {["Crop Recommendation", "Soil Analysis", "Yield Calculator", "Planting Calendar"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-base text-gray-600 hover:text-green-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Connect</h3>
            <ul className="space-y-3">
              {["About Us", "Contact", "Blog", "Newsletter"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-base text-gray-600 hover:text-green-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} AgroInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

