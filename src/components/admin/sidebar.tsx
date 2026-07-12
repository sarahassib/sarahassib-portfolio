import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  Wrench,
  Lightbulb,
  GraduationCap,
  Briefcase,
  LogOut,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/certifications", label: "Certifications", icon: Award },
  { to: "/admin/tools", label: "Tools", icon: Wrench },
  { to: "/admin/skills", label: "Skills", icon: Lightbulb },
  { to: "/admin/education", label: "Education", icon: GraduationCap },
  { to: "/admin/experience", label: "Experience", icon: Briefcase },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("admin-sidebar-collapsed") === "true";
    } catch (_e) {
      return false;
    }
  });

  const toggle = () => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem("admin-sidebar-collapsed", String(next));
      } catch (_e) {
        // localStorage not available
      }
      return next;
    });
  };

  return (
    <aside
      className="flex h-screen flex-col border-r border-border bg-card text-card-foreground transition-all duration-300"
      style={{ width: collapsed ? 72 : 256 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
          SH
        </span>
        {!collapsed && (
          <div className="min-w-0 overflow-hidden">
            <div className="truncate text-sm font-semibold">Sara Hassib</div>
            <div className="truncate text-[11px] text-card-foreground/60">Admin Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => {
          const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-card-foreground/70 hover:bg-secondary hover:text-card-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-2 py-3 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? "View Portfolio" : undefined}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-card-foreground/70 hover:bg-secondary hover:text-card-foreground transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {!collapsed && <span>View Portfolio</span>}
        </a>
        <button
          onClick={() => signOut()}
          title={collapsed ? "Sign Out" : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-card-foreground/70 hover:bg-secondary hover:text-card-foreground transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <div className="border-t border-border px-2 py-2">
        <button
          onClick={toggle}
          className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-card-foreground/50 hover:bg-secondary hover:text-card-foreground transition-colors"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
