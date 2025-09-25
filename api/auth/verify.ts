// Simulación de base de datos de usuarios
const USERS = [
  {
    id: "1",
    name: "Administrador", 
    email: "admin@iglesia360.com",
    password: "admin123",
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

// Simple token storage
const activeSessions = new Map();

// Token validation (expires after 24 hours)  
function validateToken(token) {
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

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Verify Error:', error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}