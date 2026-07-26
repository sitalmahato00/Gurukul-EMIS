import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation, Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getInitials } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Sun,
  Moon,
  Search,
  User,
  Settings,
  ChevronDown,
  CheckCheck,
  Command,
  PanelLeftClose,
  PanelLeft,
  Clock,
} from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { ROLE_LABELS, type UserRole } from "@/shared/types"
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/lib/hooks"

export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

interface PortalLayoutProps {
  navGroups: NavGroup[]
  accentFrom?: string
  accentTo?: string
  LogoIcon?: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
}

function SidebarNavItem({
  item,
  isActive,
  collapsed,
}: {
  item: NavItem
  isActive: boolean
  collapsed: boolean
}) {
  const link = (
    <NavLink
      to={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-0 py-3"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive && "text-primary")} />
      {!collapsed && (
        <span className="flex-1 truncate">{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <Badge className="h-5 text-[10px] px-1.5 shrink-0 font-semibold">{item.badge}</Badge>
      )}
    </NavLink>
  )

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return link
}

export function PortalLayout({
  navGroups,
  accentFrom = "from-primary",
  accentTo = "to-secondary",
  LogoIcon,
}: PortalLayoutProps) {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))
  const [showNotifications, setShowNotifications] = useState(false)
  const [showCommand, setShowCommand] = useState(false)
  const location = useLocation()
  const notifRef = useRef<HTMLDivElement>(null)

  const { data: notifData } = useNotifications({ per_page: "10" })
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()

  const rawNotifs = Array.isArray(notifData) ? notifData : Array.isArray(notifData?.notifications) ? notifData.notifications : Array.isArray(notifData?.notifications?.data) ? notifData.notifications.data : []
  const unreadCount = typeof notifData?.unread_count === "number" ? notifData.unread_count : (Array.isArray(rawNotifs) ? rawNotifs.filter((n: any) => !n.read_at).length : 0)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false)
    }
    if (showNotifications) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showNotifications])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowCommand(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!user) return null

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const Icon = LogoIcon

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 272 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar flex flex-col"
      >
        {/* Logo */}
        <div className={cn("flex h-16 items-center px-4 border-b border-border", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed ? (
            <div className="flex items-center gap-3 min-w-0">
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br shrink-0 shadow-md", accentFrom, accentTo)}>
                {Icon ? <Icon className="h-5 w-5 text-white" /> : <Command className="h-5 w-5 text-white" />}
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-sm leading-none truncate">{user.school?.name || "Gurukul SMS"}</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{ROLE_LABELS[user.role as UserRole]}</p>
              </div>
            </div>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br shadow-md cursor-pointer", accentFrom, accentTo)}>
                  {Icon ? <Icon className="h-5 w-5 text-white" /> : <Command className="h-5 w-5 text-white" />}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {user.school?.name || "Gurukul SMS"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-6 px-3">
            {navGroups.map((group, gi) => (
              <div key={group.title}>
                {gi > 0 && !collapsed && (
                  <div className="mx-3 mb-4">
                    <Separator />
                  </div>
                )}
                {!collapsed && (
                  <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                    {group.title}
                  </p>
                )}
                {collapsed && gi > 0 && (
                  <div className="mx-auto mb-3 w-5">
                    <Separator />
                  </div>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname === item.href + "/"
                    return (
                      <SidebarNavItem
                        key={item.href}
                        item={item}
                        isActive={isActive}
                        collapsed={collapsed}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* User + Bottom Actions */}
        <div className="border-t border-border p-3 space-y-2">
          {!collapsed ? (
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br text-white", accentFrom, accentTo)}>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate leading-none">{user.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br text-white", accentFrom, accentTo)}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <button
            onClick={() => logout()}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive/80 hover:text-destructive hover:bg-destructive/5 transition-all duration-200 w-full cursor-pointer",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:shadow-lg hover:bg-muted transition-all cursor-pointer z-50"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={{ marginLeft: collapsed ? 72 : 272 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen flex flex-col"
      >
        {/* Top Nav */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-muted-foreground hover:text-foreground shrink-0"
            >
              {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </Button>
            <button
              onClick={() => setShowCommand(true)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-muted/50 text-muted-foreground hover:bg-muted transition-colors cursor-pointer text-sm max-w-md flex-1"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate">Search anything...</span>
              <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shrink-0">
                &#8984;K
              </kbd>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="relative" ref={notifRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-muted transition-colors cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br text-white", accentFrom, accentTo)}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                    <Badge variant="secondary" className="mt-1.5 w-fit text-[10px]">{ROLE_LABELS[user.role as UserRole]}</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer"><User className="h-4 w-4" /> Profile</DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer"><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="gap-2 text-destructive cursor-pointer"><LogOut className="h-4 w-4" /> Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </motion.div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-16 right-6 z-50 w-[380px] max-h-[480px] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="h-5 min-w-5 rounded-full px-1.5 text-[10px] font-semibold bg-primary/10 text-primary">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 h-7 rounded-lg"
                onClick={() => markAllRead.mutate()}
                disabled={markAllRead.isPending || unreadCount === 0}
              >
                <CheckCheck className="h-3 w-3" />
                Mark all read
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-2 space-y-0.5">
              {rawNotifs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Bell className="h-8 w-8 mb-2 opacity-40" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                rawNotifs.map((n: any) => {
                  const isUnread = !n.read_at
                  const rawType = (n.type || "system").replace("App\\\\Notifications\\\\", "").replace("App\\Notifications\\", "").toLowerCase()
                  const notifType = ["security", "billing", "system"].includes(rawType) ? rawType : "system"
                  const typeColors: Record<string, string> = {
                    security: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                    billing: "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
                    system: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
                  }
                  return (
                    <div
                      key={n.id}
                      className={cn(
                        "flex items-start gap-3 rounded-xl p-3 transition-colors cursor-pointer group",
                        isUnread ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"
                      )}
                      onClick={() => { if (isUnread) markRead.mutate(n.id) }}
                    >
                      <div className={cn("mt-0.5 flex h-2 w-2 shrink-0 rounded-full transition-colors", isUnread ? "bg-primary" : "bg-transparent")} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("text-sm leading-snug", isUnread ? "font-semibold" : "font-medium")}>
                            {n.title || "Notification"}
                          </p>
                          <Badge variant="secondary" className={cn("shrink-0 text-[9px] font-medium rounded-md px-1.5 py-0", typeColors[notifType])}>
                            {notifType}
                          </Badge>
                        </div>
                        {(n.data?.message || n.data?.body) && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.data?.message || n.data?.body}</p>
                        )}
                        <p className="text-[10px] text-muted-foreground/70 mt-1.5 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(n.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <div className="border-t border-border px-5 py-2.5 text-center">
              <button className="text-xs font-medium text-primary hover:underline">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <Dialog open={showCommand} onOpenChange={setShowCommand}>
        <DialogContent className="sm:max-w-xl p-0">
          <div className="flex items-center border-b px-4">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input className="flex h-12 w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground" placeholder="Search students, teachers, fees..." autoFocus />
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">ESC</kbd>
          </div>
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground mb-3">Quick Actions</p>
            <div className="space-y-1">
              {navGroups.flatMap((g) => g.items).slice(0, 8).map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted transition-colors cursor-pointer text-left"
                  onClick={() => setShowCommand(false)}
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
