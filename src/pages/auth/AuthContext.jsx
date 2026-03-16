import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(null);

  // عند تحميل الصفحة، نسترجع الإيميل من localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email") ||
    sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const login = (userEmail) => {
    setEmail(userEmail);
    sessionStorage.setItem("email", userEmail);
  };

  const loginRemember = (userEmail) => {
    setEmail(userEmail);
    localStorage.setItem("email", userEmail);
  };

  const logout = () => {
    setEmail(null);
    sessionStorage.removeItem("email");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ email, login, loginRemember, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}