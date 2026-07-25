import {
  Bell,
  CheckCheck,
  X,
  Shield,
  CreditCard,
  Server,
  UserPlus,
  AlertTriangle,
  Info,
  Settings,
  Mail,
  Smartphone,
  Monitor,
  CheckCircle2,
  CircleAlert,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn, formatDate } from "@/lib/utils"
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/lib/hooks"

const typeConfig: Record<string, { label: string; color: string }> = {
  security: { label: "Security", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  billing: { label: "Billing", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  system: { label: "System", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
}

const typeIcon: Record<string, typeof Shield> = {
  security: Shield,
  billing: CreditCard,
  system: Server,
}

const typeColor: Record<string, string> = {
  security: "text-red-500 bg-red-50 dark:bg-red-900/20",
  billing: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
  system: "text-violet-500 bg-violet-50 dark:bg-violet-900/20",
}

interface NotificationItem {
  id: number
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

function mapNotification(raw: any): NotificationItem {
  const rawType = (raw.type || "system").replace("App\\\\Notifications\\\\", "").replace("App\\Notifications\\", "").toLowerCase()
  const knownTypes = ["security", "billing", "system"]
  const type = knownTypes.includes(rawType) ? rawType : "system"
  return {
    id: raw.id,
    type,
    title: raw.title || "Notification",
    message: raw.data?.message || raw.data?.body || "",
    timestamp: raw.created_at || raw.timestamp || "",
    read: !!raw.read_at,
  }
}

export function AdminNotificationsPage() {
  const { data: rawNotifications, isLoading } = useNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()

  const notifications: NotificationItem[] = (Array.isArray(rawNotifications) ? rawNotifications : []).map(mapNotification)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllRead = () => {
    markAllRead.mutate()
  }

  const handleMarkRead = (id: number) => {
    markRead.mutate(id)
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with platform alerts, billing updates, and security notifications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-sm border-red-200 text-red-600 dark:border-red-800 dark:text-red-400"
          >
            <Bell className="h-3.5 w-3.5" />
            {unreadCount} unread
          </Badge>
          <Button
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={handleMarkAllRead}
            disabled={markAllRead.isPending || unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4" />
            {markAllRead.isPending ? "Marking..." : "Mark All Read"}
          </Button>
        </div>
      </div>

      {/* Notifications and Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification List */}
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">All Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && (
                    <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <NotificationList items={notifications} onMarkRead={handleMarkRead} />
              </TabsContent>
              <TabsContent value="unread">
                <NotificationList items={notifications.filter((n) => !n.read)} onMarkRead={handleMarkRead} />
              </TabsContent>
              <TabsContent value="system">
                <NotificationList items={notifications.filter((n) => n.type === "system")} onMarkRead={handleMarkRead} />
              </TabsContent>
              <TabsContent value="billing">
                <NotificationList items={notifications.filter((n) => n.type === "billing")} onMarkRead={handleMarkRead} />
              </TabsContent>
              <TabsContent value="security">
                <NotificationList items={notifications.filter((n) => n.type === "security")} onMarkRead={handleMarkRead} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Preferences</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">Configure how you receive notifications</p>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            {/* Email Notifications */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Notifications
              </h4>
              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Security Alerts</p>
                    <p className="text-xs text-muted-foreground">Login attempts, 2FA changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Billing Updates</p>
                    <p className="text-xs text-muted-foreground">Payments, invoices, expirations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">System Updates</p>
                    <p className="text-xs text-muted-foreground">Maintenance, deployments</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <Separator />

            {/* Push Notifications */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                Push Notifications
              </h4>
              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Security Alerts</p>
                    <p className="text-xs text-muted-foreground">Immediate push alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">New Registrations</p>
                    <p className="text-xs text-muted-foreground">When schools sign up</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Support Tickets</p>
                    <p className="text-xs text-muted-foreground">New and updated tickets</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <Separator />

            {/* In-App Notifications */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                In-App Notifications
              </h4>
              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Badge Count</p>
                    <p className="text-xs text-muted-foreground">Show unread count</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sound Alerts</p>
                    <p className="text-xs text-muted-foreground">Play sound on new alerts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Desktop Notifications</p>
                    <p className="text-xs text-muted-foreground">OS-level notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function NotificationList({ items, onMarkRead }: { items: NotificationItem[]; onMarkRead: (id: number) => void }) {
  return (
    <div className="space-y-2">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No notifications</p>
        </div>
      ) : (
        items.map((notification, index) => {
          const Icon = typeIcon[notification.type] || Bell
          const type = typeConfig[notification.type] || typeConfig.system
          const color = typeColor[notification.type] || typeColor.system
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className={cn(
                "flex items-start gap-3 rounded-xl p-3 transition-colors group",
                notification.read
                  ? "hover:bg-muted/50"
                  : "bg-violet-50/50 dark:bg-violet-950/10 hover:bg-violet-50 dark:hover:bg-violet-950/20"
              )}
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className={cn("text-sm", notification.read ? "font-medium" : "font-semibold")}>
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                    )}
                  </div>
                  {!notification.read && (
                    <button
                      className="p-1 rounded-lg hover:bg-background opacity-0 group-hover:opacity-100 transition-all shrink-0"
                      title="Mark as read"
                      onClick={() => onMarkRead(notification.id)}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <Badge
                    variant="secondary"
                    className={cn("text-[10px] font-medium", type.color)}
                  >
                    {type.label}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(notification.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })
      )}
    </div>
  )
}
