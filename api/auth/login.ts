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

// Simple token storage (en producción usar Redis o database)
const activeSessions = new Map<string, { userId: string; email: string; role: string; createdAt: number }>();

// Simple token generator
function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son requeridos"
      });
    }

    // Buscar usuario por email
    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user || password !== user.password) {
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

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}