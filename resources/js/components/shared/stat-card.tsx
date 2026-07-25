import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: ReactNode
  trend?: "up" | "down"
  trendValue?: string
  className?: string
  gradient?: string
}

export function StatCard({ title, value, description, icon, trend, trendValue, className, gradient }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("relative overflow-hidden hover:shadow-2xl transition-all duration-300 group", className)}>
        {gradient && (
          <div className={cn("absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity", gradient)} />
        )}
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {(description || trendValue) && (
                <div className="flex items-center gap-2">
                  {trend && (
                    <span className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      trend === "up" ? "text-success" : "text-destructive"
                    )}>
                      {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {trendValue}
                    </span>
                  )}
                  {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                  )}
                </div>
              )}
            </div>
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
            )}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
