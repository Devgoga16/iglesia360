import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role?: string;
};

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "iglesia360.auth.user";
const TOKEN_KEY = "iglesia360.auth.token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            // Token inválido, limpiar almacenamiento
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token y usuario
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setError(null);
  };

  const isAuthenticated = !!user;

  const value = useMemo(() => ({ 
    user, 
    isLoading, 
    isAuthenticated, 
    login, 
    logout, 
    error 
  }), [user, isLoading, isAuthenticated, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
