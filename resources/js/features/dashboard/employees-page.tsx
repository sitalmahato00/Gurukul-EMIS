import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { teachers } from "@/lib/mock-data"
import { getInitials } from "@/lib/utils"
import { Users, UserCog, Building2, DollarSign, Plus } from "lucide-react"

export function EmployeesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Employees"
        description="Manage all staff including teachers, admins, and support staff"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Employees" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Employee
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard title="Total Staff" value="89" icon={<Users className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Teaching" value="64" icon={<UserCog className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Non-Teaching" value="25" icon={<Building2 className="h-6 w-6" />} gradient="gradient-warning" />
        <StatCard title="Monthly Payroll" value="₹45.2L" icon={<DollarSign className="h-6 w-6" />} />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {getInitials(`${teacher.firstName} ${teacher.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{teacher.firstName} {teacher.lastName}</p>
                    <Badge variant={teacher.status === "active" ? "success" : "secondary"} className="text-xs">{teacher.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{teacher.department} &middot; {teacher.qualification} &middot; {teacher.experience} years</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₹{(teacher.salary / 1000).toFixed(0)}K/mo</p>
                  <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
