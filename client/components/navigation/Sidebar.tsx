import { useState } from "react";
import { ChevronDown, LayoutDashboard, Users, HandCoins, Calendar, MessageCircle, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { cn } from "@/lib/utils";

interface ModuleItem { label: string; slug: string; icon: any }
interface ModuleCategory { category: string; items: ModuleItem[] }

const MODULES: ModuleCategory[] = [
  {
    category: "Gestión",
    items: [
      { label: "Panel", slug: "resumen", icon: LayoutDashboard },
      { label: "Miembros", slug: "miembros", icon: Users },
      { label: "Eventos", slug: "eventos", icon: Calendar },
    ],
  },
  {
    category: "Finanzas",
    items: [
      { label: "Donaciones", slug: "donaciones", icon: HandCoins },
    ],
  },
  {
    category: "Comunidad",
    items: [
      { label: "Mensajes", slug: "mensajes", icon: MessageCircle },
      { label: "Ajustes", slug: "ajustes", icon: Settings },
    ],
  },
];

import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ mobile = false, collapsed = false, onNavigate }: { mobile?: boolean; collapsed?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Gestión: true, Finanzas: true, Comunidad: true });
  const { user, logout } = useAuth();

  return (
    <div className={cn("h-full w-full bg-card text-foreground flex flex-col border border-foreground/10 shadow-xl rounded-2xl transition-all duration-300 ease-in-out", mobile ? "p-4" : "p-4")}>
      <div className={cn("mb-4 select-none flex items-center justify-center transition-all duration-300 ease-in-out")}>
        {collapsed ? (
          <div className="text-lg font-semibold transition-all duration-300">I360</div>
        ) : (
          <div className="transition-all duration-300">
            <div className="mt-1 text-xl font-semibold">Iglesia 360º</div>
          </div>
        )}
      </div>
      <nav className="space-y-3 flex-1 transition-all duration-300">
        {MODULES.map((group) => {
          const isOpen = open[group.category];
          return (
            <div key={group.category} className="transition-all duration-300">
              {!collapsed && (
                <button
                  className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-[12px] font-semibold text-foreground/70 hover:bg-secondary/20"
                  onClick={() => setOpen((o) => ({ ...o, [group.category]: !isOpen }))}
                  aria-expanded={isOpen}
                >
                  <span className="tracking-wide">{group.category}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
                </button>
              )}
              <div className={cn("mt-2 overflow-hidden transition-[max-height,opacity]", collapsed ? "max-h-96 opacity-100 space-y-2" : isOpen ? "max-h-96 opacity-100 pl-1 space-y-1" : "max-h-0 opacity-0")}>
                {group.items.map((item) => (
                  <SidebarItem key={item.slug} to={`/dashboard/${item.slug}`} label={item.label} icon={item.icon} onClick={onNavigate} collapsed={collapsed} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className={cn("pt-5 mt-6 border-t", collapsed && "flex flex-col items-center")}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{user?.name || "Usuario"}</div>
              <div className="truncate text-xs text-foreground/60">{user?.email || "user@example.com"}</div>
            </div>
          )}
        </div>
        {collapsed ? (
          <button
            onClick={() => {
              logout();
              onNavigate?.();
            }}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary hover:bg-secondary/20"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              logout();
              onNavigate?.();
            }}
            className="mt-3 w-full rounded-lg bg-primary text-primary-foreground px-3 py-2 text-center text-[13px] font-medium hover:bg-primary/90"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
}
