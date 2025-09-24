import { useState, useEffect } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const sidebarWidth = collapsed ? "4.5rem" : "18rem"; // 72 -> 18rem
  const contentMargin = collapsed ? "5rem" : "19rem"; // Margen optimizado para contenido

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating, collapsible sidebar for md+ */}
      <aside
        className="fixed z-30 hidden md:flex left-4 top-4 bottom-4 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out"
        style={{ width: sidebarWidth }}
      >
        <Sidebar collapsed={collapsed} />
      </aside>

      {/* Floating toggle button */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expandir sidebar" : "Contraer sidebar"}
        className="fixed z-40 hidden md:flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110"
        style={{ 
          left: isDesktop ? (collapsed ? '7rem' : '20rem') : '1rem',
          top: '1rem'
        }}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 bg-primary text-white px-4 py-3 flex items-center gap-3 shadow">
        <Button variant="ghost" size="icon" className="text-white hover:bg-secondary" onClick={() => setMobileOpen(true)} aria-label="Abrir navegación">
          <Menu />
        </Button>
        <div className="font-semibold">Iglesia 360º</div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-primary shadow-xl">
            <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Content */}
      <main 
        className={cn("relative min-h-screen flex flex-col transition-all duration-300 ease-in-out")}
        style={{ 
          marginLeft: isDesktop ? contentMargin : '0' 
        }}
      >
        <div className="mx-auto max-w-7xl p-6 md:p-8 flex-1">
          {children}
        </div>
        
        {/* Powered by Unify - Footer */}
        <footer className="py-4 px-6 md:px-8 border-t border-muted/30">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs text-foreground/50">
              Powered by <span className="font-semibold text-primary">Unify</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
