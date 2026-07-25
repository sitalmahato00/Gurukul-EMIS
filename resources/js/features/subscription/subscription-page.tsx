import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Check,
  ArrowUpRight,
  Download,
  Receipt,
  Users,
  Database,
  HardDrive,
  Zap,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: 29,
    period: "month",
    description: "Perfect for small schools",
    features: ["Up to 100 Students", "Basic Modules", "Email Support", "5GB Storage", "1 Admin User"],
    current: false,
  },
  {
    name: "Professional",
    price: 79,
    period: "month",
    description: "Best for growing schools",
    features: ["Up to 500 Students", "All Modules", "Priority Support", "25GB Storage", "5 Admin Users", "API Access", "Custom Branding"],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    period: "month",
    description: "For large institutions",
    features: ["Unlimited Students", "All Modules", "Dedicated Support", "100GB Storage", "Unlimited Users", "API Access", "Custom Branding", "SLA", "Custom Integrations"],
    current: false,
  },
]

const usage = [
  { label: "Students", used: 1248, limit: 5000, unit: "" },
  { label: "Teachers", used: 64, limit: 200, unit: "" },
  { label: "Storage", used: 12.5, limit: 25, unit: "GB" },
  { label: "API Calls", used: 45000, limit: 100000, unit: "" },
]

export function SubscriptionPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Subscription"
        description="Manage your subscription plan, billing, and usage"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Subscription" }]}
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Download Invoices
          </Button>
        }
      />

      {/* Current Plan */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default" className="gap-1">
                  <Star className="h-3 w-3" /> Current Plan
                </Badge>
              </div>
              <h2 className="text-2xl font-bold">Professional Plan</h2>
              <p className="text-muted-foreground mt-1">₹79/month &middot; Renews on Aug 15, 2024</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">₹79<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <Button className="mt-3 gap-2">
                <ArrowUpRight className="h-4 w-4" /> Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {usage.map((item) => {
              const percentage = (item.used / item.limit) * 100
              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">
                      {item.used.toLocaleString()}{item.unit} / {item.limit.toLocaleString()}{item.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{percentage.toFixed(1)}% used</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(
              "relative hover:shadow-xl transition-all duration-200",
              plan.current && "border-primary shadow-glow",
              plan.popular && "border-primary"
            )}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1 px-3">
                    <Star className="h-3 w-3" /> Most Popular
                  </Badge>
                </div>
              )}
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <Button
                  variant={plan.current ? "outline" : "default"}
                  className="w-full mb-6"
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Invoices</CardTitle>
          <Button variant="ghost" size="sm" className="gap-2">
            View All <ArrowUpRight className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: "INV-001", date: "Jul 15, 2024", amount: 79, status: "paid" },
              { id: "INV-002", date: "Jun 15, 2024", amount: 79, status: "paid" },
              { id: "INV-003", date: "May 15, 2024", amount: 79, status: "paid" },
            ].map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Receipt className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{invoice.id}</p>
                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">₹{invoice.amount}</p>
                  <Badge variant="success" className="text-xs">Paid</Badge>
                  <Button variant="ghost" size="icon-sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
