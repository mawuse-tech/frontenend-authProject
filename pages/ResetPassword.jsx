import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorm, setErrorm] = useState(null)
      const [loading, setLoading] = useState(true)
      const [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()
  

  const {token} = useParams()
  

  async function handleSubmit (e) {
    e.preventDefault();

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {password, confirmPassword});
      if(res.data.success){
       setLoading(false)
       setSuccessMessage(res.data.message)
          navigate("/")
       toast.success(res.data.message)
      }

      console.log(res.data)

    } catch (error) {
      setLoading(false)
      setErrorm(error.response?.message)
      toast.error(errorm)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
