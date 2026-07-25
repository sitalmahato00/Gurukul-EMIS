import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { UserPlus, CheckCircle, CreditCard, FileText, BookOpen, MapPin, Building } from "lucide-react"

interface ActivityItemProps {
  user: string
  action: string
  target: string
  timestamp: string
  icon: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "user-plus": UserPlus,
  "check-circle": CheckCircle,
  "credit-card": CreditCard,
  "file-text": FileText,
  "book-open": BookOpen,
  "map-pin": MapPin,
  "building": Building,
}

export function ActivityItem({ user, action, target, timestamp, icon }: ActivityItemProps) {
  const Icon = iconMap[icon] || CheckCircle

  return (
    <div className="flex items-start gap-4 py-3">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="text-xs">{getInitials(user)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{user}</span>{" "}
          <span className="text-muted-foreground">{action}</span>{" "}
          <span className="font-medium">{target}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
      </div>
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg",
        icon === "user-plus" && "bg-primary/10 text-primary",
        icon === "check-circle" && "bg-success/10 text-success",
        icon === "credit-card" && "bg-warning/10 text-warning",
        icon === "file-text" && "bg-info/10 text-info",
        icon === "book-open" && "bg-secondary/10 text-secondary",
        icon === "map-pin" && "bg-destructive/10 text-destructive",
        icon === "building" && "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
      )}>
        <Icon className="h-4 w-4" />
      </div>
    </div>
  )
}
