import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simulación de base de datos de usuarios
const USERS = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@iglesia360.com",
    password: "admin123", // En producción usar bcrypt
    role: "admin",
    avatar: null
  },
  {
    id: "2", 
    name: "Pastor Juan",
    email: "pastor@iglesia360.com",
    password: "pastor123",
    role: "pastor",
    avatar: null
  },
  {
    id: "3",
    name: "Usuario Demo",
    email: "demo@iglesia360.com", 
    password: "demo123",
    role: "user",
    avatar: null
  }
];

// Simple token storage (en producción usar Redis o database)
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

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    // Handle login
    if (method === 'POST' && pathname === '/api/auth/login') {
      const { email, password } = req.body;

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

      // Verificar contraseña
      if (password !== user.password) {
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
      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token
      });
    }

    // Handle token verification
    if (method === 'GET' && pathname === '/api/auth/verify') {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.toString().split(' ')[1];

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
      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      });
    }

    // Handle ping
    if (method === 'GET' && pathname === '/api/ping') {
      return res.json({ message: "pong" });
    }

    // Route not found
    return res.status(404).json({ message: "API route not found" });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}