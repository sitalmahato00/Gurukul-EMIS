import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
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
  X,
  CheckCheck,
} from "lucide-react"
import { Outlet } from "react-router-dom"

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
  logo: React.ReactNode
  title: string
  subtitle: string
  userName: string
  userRole: string
  userEmail: string
  accentColor?: string
}

const notifications = [
  { id: "1", title: "Fee Reminder", message: "15 students have pending fees", time: "2 min ago", read: false },
  { id: "2", title: "Exam Schedule", message: "Mid-term exams starting next week", time: "1 hour ago", read: false },
  { id: "3", title: "New Admission", message: "5 new students admitted today", time: "3 hours ago", read: true },
]

export function PortalLayout({
  navGroups,
  logo,
  title,
  subtitle,
  userName,
  userRole,
  userEmail,
  accentColor = "from-primary to-secondary",
}: PortalLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const location = useLocation()

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
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
                {logo}
                <div>
                  <h1 className="font-bold text-sm leading-none">{title}</h1>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && <div className="mx-auto">{logo}</div>}
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
                    const isActive = location.pathname === item.href
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
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="flex items-center gap-2 flex-1"
                            >
                              <span className="whitespace-nowrap">{item.label}</span>
                              {item.badge && (
                                <Badge className="ml-auto h-5 text-[10px] px-1.5">{item.badge}</Badge>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {isActive && !collapsed && (
                          <motion.div layoutId="portal-indicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
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
        <div className="border-t border-border p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-xl py-2 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={{ marginLeft: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen flex flex-col"
      >
        {/* Top Nav */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-muted/50 text-muted-foreground hover:bg-muted transition-colors cursor-pointer text-sm">
              <Search className="h-4 w-4" />
              <span>Search...</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                2
              </span>
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-muted transition-colors cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br", accentColor, "text-white")}>
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{userRole}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{userName}</span>
                    <span className="text-xs font-normal text-muted-foreground">{userEmail}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer"><User className="h-4 w-4" /> Profile</DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer"><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive cursor-pointer"><LogOut className="h-4 w-4" /> Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </motion.div>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="sm:max-w-md p-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle>Notifications</DialogTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1"><CheckCheck className="h-3 w-3" /> Mark all read</Button>
            </div>
          </DialogHeader>
          <div className="px-6 pb-6 space-y-1 max-h-[400px] overflow-auto">
            {notifications.map((notif) => (
              <div key={notif.id} className={cn("flex items-start gap-3 rounded-xl p-3 hover:bg-muted cursor-pointer", !notif.read && "bg-primary/5")}>
                <div className={cn("mt-0.5 flex h-2 w-2 shrink-0 rounded-full", !notif.read ? "bg-primary" : "bg-transparent")} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notif.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
