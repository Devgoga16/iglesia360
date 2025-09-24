import { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import LoginSlideshow from "@/components/auth/LoginSlideshow";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const sidebarWidth = collapsed ? "4.5rem" : "18rem"; // 72 -> 18rem

  const slideshowImages = [
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Ffa34bf7003bc496c8d5fd4fb831b9330?format=webp&width=1600", alt: "Iglesia 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Fdede0e963be249a0bedc87c628ea3fc4?format=webp&width=1600", alt: "Iglesia 3" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Fc2240e0833fb46ef8e49e907763af5b3?format=webp&width=1600", alt: "Iglesia 4" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground">
      {/* Desktop slideshow background */}
      <div className="hidden md:block absolute inset-0">
        <LoginSlideshow images={slideshowImages} intervalMs={8000} />
      </div>
      
      {/* Desktop overlay for readability */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40"></div>
      <div className="hidden md:block absolute inset-0 backdrop-blur-[1px]"></div>
      
      {/* Mobile slideshow background */}
      <div className="md:hidden absolute inset-0">
        <LoginSlideshow images={slideshowImages} intervalMs={8000} />
      </div>
      
      {/* Mobile overlay for readability */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40"></div>
      <div className="md:hidden absolute inset-0 backdrop-blur-[1px]"></div>
      
      {/* All content with relative positioning */}
      <div className="relative z-10 min-h-screen">
      {/* Floating, collapsible sidebar for md+ */}
      <aside
        className="fixed z-30 hidden md:flex left-4 top-4 bottom-4 rounded-2xl shadow-xl overflow-hidden"
        style={{ width: sidebarWidth }}
      >
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      </aside>

      {/* ✨ Clean Mobile Navigation Bar ✨ */}
      <div className="md:hidden sticky top-0 z-40 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white shadow-xl border-b border-white/20">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Left section: Menu + Logo */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 active:scale-95 transition-all duration-200 rounded-xl" 
              onClick={() => setMobileOpen(true)} 
              aria-label="Abrir navegación"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <div className="font-bold text-lg tracking-tight">Iglesia 360º</div>
              <div className="text-xs text-white/80 -mt-0.5">Panel Administrativo</div>
            </div>
          </div>
          
          {/* Right section: Notifications + Avatar */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 active:scale-95 transition-all duration-200 rounded-xl relative" 
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-white animate-pulse"></span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 active:scale-95 transition-all duration-200 rounded-xl" 
              aria-label="Perfil de usuario"
            >
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center border border-white/20">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer with church slideshow */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl overflow-hidden rounded-r-2xl">
            <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Content */}
      <main className={cn("relative")}
        style={{ 
          marginLeft: isMobile ? '0' : `calc(${sidebarWidth} + 1rem)` 
        }}
      >
        <div className="mx-auto max-w-7xl p-6 md:p-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-6 min-h-[calc(100vh-8rem)] md:shadow-2xl">
            {children}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
