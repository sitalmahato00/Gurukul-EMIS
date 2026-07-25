import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getInitials } from "@/lib/utils"
import {
  Search,
  Bell,
  MessageSquare,
  Plus,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  User,
  LogOut,
  Check,
  CheckCheck,
  GraduationCap,
  Calendar,
  Filter,
} from "lucide-react"

interface TopNavProps {
  collapsed: boolean
}

const notifications = [
  { id: "1", title: "Fee Reminder", message: "15 students have pending fees", type: "warning", time: "2 min ago", read: false },
  { id: "2", title: "Exam Schedule", message: "Mid-term exams starting next week", type: "info", time: "1 hour ago", read: false },
  { id: "3", title: "New Admission", message: "5 new students admitted today", type: "success", time: "3 hours ago", read: true },
  { id: "4", title: "System Update", message: "Scheduled maintenance on Sunday", type: "info", time: "1 day ago", read: true },
]

export function TopNav({ collapsed }: TopNavProps) {
  const [isDark, setIsDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 transition-all duration-300"
      )}
    >
      {/* Left - Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setShowSearch(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-muted/50 text-muted-foreground hover:bg-muted transition-colors cursor-pointer text-sm"
        >
          <Search className="h-4 w-4" />
          <span>Search anything...</span>
          <kbd className="ml-8 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </button>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Academic Year */}
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">2024-25</span>
          <ChevronDown className="h-3 w-3" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Quick Create */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
              <GraduationCap className="h-4 w-4" />
              New Student
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              New Teacher
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Calendar className="h-4 w-4" />
              New Event
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Filter className="h-4 w-4" />
              Custom
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground"
          onClick={() => setShowNotifications(true)}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
            2
          </span>
        </Button>

        {/* Messages */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            3
          </span>
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-muted transition-colors cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">SA</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium leading-none">Super Admin</p>
                <p className="text-xs text-muted-foreground mt-0.5">admin@gurukul.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>Super Admin</span>
                <span className="text-xs font-normal text-muted-foreground">admin@gurukul.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive cursor-pointer">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Dialog */}
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="sm:max-w-xl p-0">
          <div className="flex items-center border-b px-4">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              className="flex h-12 w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search students, teachers, fees..."
              autoFocus
            />
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground mb-3">Quick Actions</p>
            <div className="space-y-1">
              {["Add New Student", "Mark Attendance", "Collect Fee", "Generate Report"].map((action) => (
                <button
                  key={action}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-muted transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-muted-foreground" />
                  {action}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Panel */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="sm:max-w-md p-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle>Notifications</DialogTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                <CheckCheck className="h-3 w-3" />
                Mark all read
              </Button>
            </div>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <div className="px-6 pb-6 space-y-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted cursor-pointer",
                    !notif.read && "bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "mt-0.5 flex h-2 w-2 shrink-0 rounded-full",
                    !notif.read ? "bg-primary" : "bg-transparent"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </header>
  )
}
