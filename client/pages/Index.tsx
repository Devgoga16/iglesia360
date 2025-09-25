import LoginForm from "@/components/auth/LoginForm";
import { CheckCircle2, ShieldCheck, Calendar, Info } from "lucide-react";
import LoginSlideshow from "@/components/auth/LoginSlideshow";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const isMobile = useIsMobile();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const slideshowImages = [
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Ffa34bf7003bc496c8d5fd4fb831b9330?format=webp&width=1600", alt: "Iglesia 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Fdede0e963be249a0bedc87c628ea3fc4?format=webp&width=1600", alt: "Iglesia 3" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Fc2240e0833fb46ef8e49e907763af5b3?format=webp&width=1600", alt: "Iglesia 4" },
  ];

  return (
    <div className="min-h-screen bg-background grid md:grid-cols-2 relative">
      {/* Mobile slideshow background - covers entire screen */}
      {isMobile && (
        <div className="absolute inset-0 z-0">
          <LoginSlideshow images={slideshowImages} intervalMs={4500} />
        </div>
      )}
      
      {/* Left hero with slideshow - desktop only */}
      <aside className="relative hidden md:flex items-center justify-center overflow-hidden">
        <LoginSlideshow images={slideshowImages} intervalMs={4500} />
        <div className="relative z-10 max-w-md px-10 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-white/80">Bienvenido</div>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight">Iglesia 360º</h1>
          <p className="mt-3 text-white/80">Gestión moderna para tu comunidad. Todo en un solo lugar, seguro y accesible.</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-white" /> Registro de miembros</li>
            <li className="flex items-center gap-3"><Calendar className="h-5 w-5 text-white" /> Eventos y calendarios</li>
            <li className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-white" /> Seguridad y control</li>
          </ul>
        </div>
      </aside>

      {/* Right panel: login */}
      <div className="flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-md">
          <div className={`mb-6 text-center md:text-left ${isMobile ? 'text-white' : ''}`}>
            <h2 className={`text-3xl font-extrabold tracking-tight ${isMobile ? 'text-white' : 'text-foreground'}`}>Iniciar sesión</h2>
            <p className={`mt-2 text-sm ${isMobile ? 'text-white/90' : 'text-foreground/70'}`}>Accede a tu panel administrativo de Iglesia 360º</p>
          </div>
          <div className={`rounded-2xl p-6 shadow-md ${isMobile ? 'bg-white/95 backdrop-blur-sm' : 'bg-card'}`}>
            <LoginForm />
          </div>

          {/* Demo Users Info */}
          <div className={`mt-4 rounded-xl p-4 border ${isMobile ? 'bg-white/90 backdrop-blur-sm border-white/20' : 'bg-muted/50 border-muted'}`}>
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs space-y-2">
                <p className={`font-medium ${isMobile ? 'text-gray-800' : 'text-foreground'}`}>
                  Usuarios de demostración:
                </p>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className={`font-medium ${isMobile ? 'text-gray-700' : 'text-foreground/80'}`}>Admin:</span>
                    <span className={`ml-2 ${isMobile ? 'text-gray-600' : 'text-foreground/70'}`}>admin@iglesia360.com / admin123</span>
                  </div>
                  <div>
                    <span className={`font-medium ${isMobile ? 'text-gray-700' : 'text-foreground/80'}`}>Pastor:</span>
                    <span className={`ml-2 ${isMobile ? 'text-gray-600' : 'text-foreground/70'}`}>pastor@iglesia360.com / pastor123</span>
                  </div>
                  <div>
                    <span className={`font-medium ${isMobile ? 'text-gray-700' : 'text-foreground/80'}`}>Demo:</span>
                    <span className={`ml-2 ${isMobile ? 'text-gray-600' : 'text-foreground/70'}`}>demo@iglesia360.com / demo123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className={`mt-6 text-center text-xs md:text-left ${isMobile ? 'text-white/70' : 'text-foreground/50'}`}>
            © {new Date().getFullYear()} Iglesia 360º
          </p>
        </div>
      </div>
    </div>
  );
}
