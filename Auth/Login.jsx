import React, { useContext, useState } from 'react';
import { Link, NavLink, replace, useNavigate } from 'react-router-dom';
import api from '../config/axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../src/contex/AuthContex';

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const {login} = useContext(AuthContext)

  const loginFunction = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!user.email || !user.password) {
      setError('Please enter and email and password');
      return;
    }

    try {

      const res = await login(user.email, user.password);
      console.log(res);

      if (res.success) {
        window.history.pushState(null, "", "/home");
        navigate("/home", {replace: true})
        toast.success("logged in successfully")
       
      }

    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={loginFunction}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
             onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
             onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition duration-200"
          >
            Log In
          </button>
        </form>

        <Link to="/forgotPassword" className="text-purple-600 hover:underline">
            forgot password
          </Link>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-purple-600 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
