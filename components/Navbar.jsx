import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../src/contex/AuthContex";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-lg font-bold">MyWebsite</div>

        {/* Nav Links */}
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/home"
              className="hover:text-gray-200 transition duration-200"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="hover:text-gray-200 transition duration-200"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="hover:text-gray-200 transition duration-200"
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Side Buttons */}
        {currentUser ? (
          <div>
            <button onClick={logout}
              className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Register
            </button>
            <button
              className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Login
            </button>
          </div>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
