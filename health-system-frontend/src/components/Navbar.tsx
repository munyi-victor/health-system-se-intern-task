import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-around items-center">
        <Link to="/" className="text-xl font-bold text-primary">Health System</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-gray-950">Home</Link>
          <Link to="/clients" className="text-gray-700 hover:text-gray-950">Clients</Link>
          <Link to="/programs" className="text-gray-700 hover:text-gray-950">Programs</Link>
          <Link to="/enroll" className="text-gray-700 hover:text-gray-950">Enroll</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// This is a simple Navbar component for a health program system.