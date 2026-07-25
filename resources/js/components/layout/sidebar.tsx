import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  School,
  Users,
  UserCog,
  GraduationCap,
  BookUser,
  ClipboardCheck,
  FileCheck,
  MessageSquare,
  DollarSign,
  Calculator,
  BookOpen,
  Bus,
  Building2,
  Award,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Home,
  User,
  Shield,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "School", href: "/school", icon: School },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Students", href: "/students", icon: GraduationCap },
      { label: "Parents", href: "/parents", icon: BookUser },
      { label: "Teachers", href: "/teachers", icon: UserCog },
      { label: "Employees", href: "/employees", icon: Users },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "Academic", href: "/academic", icon: Home },
      { label: "Attendance", href: "/attendance", icon: ClipboardCheck },
      { label: "Examinations", href: "/examinations", icon: FileCheck },
      { label: "Homework", href: "/homework", icon: BookOpen },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Finance", href: "/finance", icon: DollarSign },
      { label: "Accounting", href: "/accounting", icon: Calculator },
      { label: "Library", href: "/library", icon: BookOpen },
      { label: "Transport", href: "/transport", icon: Bus },
      { label: "Hostel", href: "/hostel", icon: Building2 },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Communication", href: "/communication", icon: MessageSquare },
      { label: "Certificates", href: "/certificates", icon: Award },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Reports", href: "/reports", icon: BarChart3 },
      { label: "Subscription", href: "/subscription", icon: CreditCard },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar flex flex-col"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sm leading-none">Gurukul</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">School Management</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary mx-auto">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-6 px-3">
          {navGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/")
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center px-0"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && !collapsed && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                        />
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom */}
      <div className="border-t border-border p-3 space-y-1">
        {!collapsed && (
          <NavLink
            to="/profile"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              location.pathname === "/profile"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>
        )}
        <button
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 w-full cursor-pointer",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:shadow-lg transition-shadow cursor-pointer z-50"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </motion.aside>
  )
}
