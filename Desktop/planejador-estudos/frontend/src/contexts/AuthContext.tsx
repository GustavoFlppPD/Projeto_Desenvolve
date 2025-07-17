import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
name: string;
email: string;
// adicione outras propriedades do usuário se houver
}

interface AuthContextType {
user: User | null;
token: string | null;
login: (
data: { user: User; token: string },
rememberMe?: boolean
) => void;
logout: () => void;
isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (
    data: { user: User; token: string },
    rememberMe: boolean = false
  ) => {
    setUser(data.user);
    setToken(data.token);
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("token", data.token);
    storage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const savedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const savedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};