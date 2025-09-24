import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LoginForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const { login } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ username, email: username.includes("@") ? username : undefined });
      if (!remember) {
        // Clear persisted user immediately if remember is off
        try { localStorage.removeItem("iglesia360.auth.user"); } catch {}
      }
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={cn("space-y-5", className)}>
      {/* Mobile title */}
      {isMobile && (
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Iglesia 360º</h1>
          <p className="text-sm text-foreground/70 mt-1">Gestión moderna para tu comunidad</p>
        </div>
      )}
      
      <div className="space-y-1">
          <label htmlFor="username" className="block text-sm font-medium text-foreground">
            Usuario
          </label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu usuario"
          required
          className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-lg border bg-white px-4 py-2.5 pr-12 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 px-3 text-xs font-medium text-foreground/70 hover:text-foreground"
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {show ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-xs text-foreground/80">
          <input type="checkbox" className="h-3.5 w-3.5 rounded border" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Recuérdame
        </label>
        <a href="#" className="text-xs text-secondary hover:underline" onClick={(e) => e.preventDefault()}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button type="submit" className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>

      <p className="text-[11px] text-foreground/60 text-center">
        Al continuar aceptas nuestros Términos y Política de Privacidad.
      </p>
    </form>
  );
}
