import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  collapsed?: boolean;
}

export default function SidebarItem({ to, label, icon: Icon, onClick, collapsed = false }: SidebarItemProps) {
  const link = (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-xl py-2.5 text-[13px] text-white/90 transition-all duration-200",
          collapsed ? "justify-center px-2" : "px-3",
          "hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20 hover:border-white/30 drop-shadow-sm",
          isActive && "bg-white/25 text-white border-white/40 shadow-lg"
        )
      }
    >
      <Icon className="h-4 w-4 opacity-90 group-hover:opacity-100 drop-shadow-sm" />
      {!collapsed && <span className="truncate font-medium drop-shadow-sm">{label}</span>}
    </NavLink>
  );

  if (collapsed) {
    return (
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right" align="center" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
}
