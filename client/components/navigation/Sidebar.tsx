import { useState } from "react";
import { ChevronDown, LayoutDashboard, Users, HandCoins, Calendar, MessageCircle, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { cn } from "@/lib/utils";
import LoginSlideshow from "@/components/auth/LoginSlideshow";

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

export default function Sidebar({ mobile = false, collapsed = false, onToggle, onNavigate }: { mobile?: boolean; collapsed?: boolean; onToggle?: () => void; onNavigate?: () => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Gestión: true, Finanzas: true, Comunidad: true });
  const { user, logout } = useAuth();

  // Same church images for consistency across the app
  const slideshowImages = [
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Ffa34bf7003bc496c8d5fd4fb831b9330?format=webp&width=1600", alt: "Iglesia 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Fdede0e963be249a0bedc87c628ea3fc4?format=webp&width=1600", alt: "Iglesia 3" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F74cba84a45e5447595d8b9727679c450%2Fc2240e0833fb46ef8e49e907763af5b3?format=webp&width=1600", alt: "Iglesia 4" },
  ];

  return (
    <div className={cn("h-full w-full flex flex-col shadow-xl rounded-2xl overflow-hidden relative", mobile ? "p-0" : "p-0")}>
      {/* Sidebar mobile overlay - Más sutil ya que el fondo está en el layout */}
      {mobile && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </>
      )}
      
      {/* Desktop overlay - Más sutil para integrarse con el fondo general */}
      {!mobile && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </>
      )}
      
      {/* Content with glassmorphism */}
      <div className="relative z-10 h-full w-full flex flex-col p-4 text-white">
        <div className={cn("mb-4 select-none flex items-center", collapsed ? "justify-center" : "justify-between")}>
        {collapsed ? (
          <div className="text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">I360</div>
        ) : (
          <div>
            <div className="text-white/90 text-[11px] tracking-[0.18em] uppercase font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Sistema</div>
            <div className="mt-1 text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Iglesia 360º</div>
          </div>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            aria-label={collapsed ? "Expandir" : "Contraer"}
            className="ml-2 rounded-xl bg-white/30 p-2 text-white hover:bg-white/40 transition-all duration-200 backdrop-blur-sm border border-white/40 shadow-lg"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
      </div>
      <nav className="space-y-3 flex-1">
        {MODULES.map((group) => {
          const isOpen = open[group.category];
          return (
            <div key={group.category}>
              {!collapsed && (
                <button
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[12px] font-semibold text-white/95 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30"
                  onClick={() => setOpen((o) => ({ ...o, [group.category]: !isOpen }))}
                  aria-expanded={isOpen}
                >
                  <span className="tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{group.category}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]", isOpen ? "rotate-180" : "rotate-0")} />
                </button>
              )}
              <div className={cn("mt-2 space-y-1 overflow-hidden transition-[max-height,opacity]", collapsed ? "max-h-96 opacity-100" : isOpen ? "max-h-96 opacity-100 pl-1" : "max-h-0 opacity-0")}>
                {group.items.map((item) => (
                  <SidebarItem key={item.slug} to={`/dashboard/${item.slug}`} label={item.label} icon={item.icon} onClick={onNavigate} collapsed={collapsed} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className={cn("pt-5 mt-6 border-t border-white/30", collapsed && "flex flex-col items-center")}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/30 text-white font-bold backdrop-blur-sm border border-white/40 shadow-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{user?.name || "Usuario"}</div>
              <div className="truncate text-xs text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{user?.email || "user@example.com"}</div>
            </div>
          )}
        </div>
        {collapsed ? (
          <button
            onClick={() => {
              logout();
              onNavigate?.();
            }}
            className="mt-3 inline-flex items-center justify-center rounded-xl bg-red-500/80 p-2 text-white hover:bg-red-500 transition-all duration-200 border border-red-400/50 backdrop-blur-sm shadow-lg"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4 drop-shadow-sm" />
          </button>
        ) : (
          <button
            onClick={() => {
              logout();
              onNavigate?.();
            }}
            className="mt-3 w-full rounded-xl bg-red-500/80 text-white px-3 py-2.5 text-center text-[13px] font-medium hover:bg-red-500 transition-all duration-200 shadow-lg backdrop-blur-sm border border-red-400/50 drop-shadow-sm"
          >
            Cerrar sesión
          </button>
        )}
      </div>
      </div>
    </div>
  );
}
