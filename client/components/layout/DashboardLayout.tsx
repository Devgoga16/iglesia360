import { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "4.5rem" : "18rem"; // 72 -> 18rem

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating, collapsible sidebar for md+ */}
      <aside
        className="fixed z-30 hidden md:flex left-4 top-4 bottom-4 rounded-2xl shadow-xl overflow-hidden"
        style={{ width: sidebarWidth }}
      >
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      </aside>

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
      <main className={cn("relative")}
        style={{ marginLeft: `calc(${sidebarWidth} + 1rem)` }}
      >
        <div className="mx-auto max-w-7xl p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
