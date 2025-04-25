import { FC } from "react"
import { Link } from "react-router-dom"

const HomePage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Welcome to the Health Program System
        </h1>
        <p className="text-gray-700 mb-6">
          A simple system to manage clients and their enrollment in health programs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/clients"
            className="bg-gray-900 p-4 rounded text-white hover:bg-green-700 transition"
          >
            View Clients
          </Link>
          <Link
            to="/programs"
            className="bg-gray-900 p-4 rounded text-white hover:bg-blue-700 transition"
          >
            View Programs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
// This is a simple home page component for a health program system, it provides links to view clients and programs.
// The page is styled using Tailwind CSS for a clean and modern look.
// The component uses React Router's Link component for navigation.