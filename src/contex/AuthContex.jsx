import { createContext, useEffect, useState } from "react";
import api from "../../config/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null)

  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password })
      console.log(res)
      if (res.data.success) {
        setCurrentUser(res.data.user)
        setLoading(false)
        return res.data
      }
    } catch (error) {
      const message = error.response?.data.message || 'something went wrong'

      setLoading(false)

      console.log(error)
      toast.error(message)

      return {
        success: false,
        message: message
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function userInfo() {
      try {
        const res = await api.get("/auth/me");
        if (res.data.success) {
          setCurrentUser(res.data.user);
          console.log('this is the response', res)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Always stop loading, success or error
      }
    }
    userInfo();
  }, []);


  async function logout() {
    try {
      const response = await api.post('/auth/logout');
      if (response.data.success) {
        setCurrentUser(null)
        return response.data
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ setCurrentUser, loading, login, currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
