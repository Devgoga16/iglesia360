import { RequestHandler } from "express";

// Simulación de base de datos de usuarios
const USERS = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@iglesia360.com",
    password: "$2b$10$B8vN/7LXzLn0kVGKgk0XwOyh8Y9F5tLH8VHqD1Pj2K3Mx9vZdF5tK", // password: "admin123"
    role: "admin",
    avatar: null
  },
  {
    id: "2", 
    name: "Pastor Juan",
    email: "pastor@iglesia360.com",
    password: "$2b$10$XgY5/8MYxMo1lWILhl1YzOza9A0G6uMI9WIqE2Qk3L4Ny0wAgG6uO", // password: "pastor123"
    role: "pastor",
    avatar: null
  },
  {
    id: "3",
    name: "Usuario Demo",
    email: "demo@iglesia360.com", 
    password: "$2b$10$ZhZ6/9NYyNp2mXJMim2Z0OzaA1H7vNJ0XJrF3Ql4M5Oz1xBhH7vP", // password: "demo123"
    role: "user",
    avatar: null
  }
];

const JWT_SECRET = process.env.JWT_SECRET || "iglesia360-secret-key-change-in-production";

// Simple token storage (in production use Redis or database)
const activeSessions = new Map<string, { userId: string; email: string; role: string; createdAt: number }>();

// Simple token generator
function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Token validation (expires after 24 hours)
function validateToken(token: string) {
  const session = activeSessions.get(token);
  if (!session) return null;
  
  const now = Date.now();
  const tokenAge = now - session.createdAt;
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  if (tokenAge > maxAge) {
    activeSessions.delete(token);
    return null;
  }
  
  return session;
}

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
  };
  token: string;
}

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password }: AuthRequest = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son requeridos"
      });
    }

    // Buscar usuario por email
    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    // Verificar contraseña (en producción usar bcrypt.compare)
    // Para demo, vamos a simular la verificación
    let passwordValid = false;
    
    // Permitir contraseñas plain text para demo
    if (password === "admin123" && user.email === "admin@iglesia360.com") {
      passwordValid = true;
    } else if (password === "pastor123" && user.email === "pastor@iglesia360.com") {
      passwordValid = true;
    } else if (password === "demo123" && user.email === "demo@iglesia360.com") {
      passwordValid = true;
    }

    if (!passwordValid) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    // Generar token simple
    const token = generateToken();
    
    // Almacenar sesión
    activeSessions.set(token, {
      userId: user.id,
      email: user.email,
      role: user.role,
      createdAt: Date.now()
    });

    // Respuesta exitosa
    const response: AuthResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      token
    };

    res.json(response);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};

export const handleVerifyToken: RequestHandler = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: "Token no proporcionado"
      });
    }

    // Verificar token
    const session = validateToken(token);
    
    if (!session) {
      return res.status(401).json({
        message: "Token expirado o inválido"
      });
    }
    
    // Buscar usuario
    const user = USERS.find(u => u.id === session.userId);
    
    if (!user) {
      return res.status(401).json({
        message: "Usuario no encontrado"
      });
    }

    // Respuesta exitosa
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Error al verificar token:', error);
    res.status(401).json({
      message: "Token inválido"
    });
  }
};