import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { students } from "@/lib/mock-data"
import { getInitials } from "@/lib/utils"
import {
  BookUser,
  Plus,
  Users,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react"

export function ParentsPage() {
  const parentStudents = students.slice(0, 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Parents"
        description="Manage parent/guardian accounts and communication"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Parents" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Parent
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Parents" value="980" icon={<BookUser className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Active Accounts" value="892" icon={<Users className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Messages Sent" value="2,340" icon={<MessageSquare className="h-6 w-6" />} gradient="gradient-warning" />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            {parentStudents.map((student) => (
              <div key={student.id} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {getInitials(student.parentName || "Parent")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{student.parentName}</p>
                  <p className="text-xs text-muted-foreground">Parent of {student.firstName} {student.lastName} &middot; Class {student.class}-{student.section}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <MessageSquare className="h-4 w-4" />
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
