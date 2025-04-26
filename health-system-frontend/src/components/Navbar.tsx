import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-around items-center">
        <Link to="/" className="text-xl font-bold">Health System</Link>
        <div className="flex justify-between items-center space-x-4">
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-950">Home</Link>
            <Link to="/clients" className="text-gray-700 hover:text-gray-950">Clients</Link>
            <Link to="/programs" className="text-gray-700 hover:text-gray-950">Programs</Link>
          </div>
          <div>
            {!isAuthenticated ? (<Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-950 transition duration-200">
              Login
            </Link>) : (<button onClick={logout} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-950 transition duration-200">
              Logout
            </button>)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// This is a simple Navbar component for a health program system.