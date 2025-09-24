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
          "group flex items-center gap-3 rounded-lg py-2 text-[13px] text-foreground/80 transition-colors",
          collapsed ? "justify-center px-2" : "px-3",
          "hover:bg-secondary/20",
          isActive && "bg-primary/10 text-primary border border-primary/20"
        )
      }
    >
      <Icon className="h-4 w-4 opacity-90 group-hover:opacity-100 group-[.active]:text-primary" />
      {!collapsed && <span className="truncate">{label}</span>}
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
