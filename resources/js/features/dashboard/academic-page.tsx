import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Users,
  Plus,
  Clock,
  CheckCircle2,
} from "lucide-react"

const classes = [
  { name: "Class 1", sections: ["A", "B"], students: 80, classTeacher: "Meera Joshi" },
  { name: "Class 2", sections: ["A", "B"], students: 76, classTeacher: "Pradeep Nair" },
  { name: "Class 3", sections: ["A", "B", "C"], students: 110, classTeacher: "Kavita Rao" },
  { name: "Class 4", sections: ["A", "B"], students: 78, classTeacher: "Arun Kumar" },
  { name: "Class 5", sections: ["A", "B"], students: 82, classTeacher: "Neha Gupta" },
  { name: "Class 6", sections: ["A", "B"], students: 85, classTeacher: "Ravi Shankar" },
  { name: "Class 7", sections: ["A", "B", "C"], students: 115, classTeacher: "Sonia Verma" },
  { name: "Class 8", sections: ["A", "B"], students: 80, classTeacher: "Deepak Singh" },
  { name: "Class 9", sections: ["A", "B"], students: 88, classTeacher: "Rahul Verma" },
  { name: "Class 10", sections: ["A", "B"], students: 92, classTeacher: "Sunita Sharma" },
  { name: "Class 11", sections: ["A", "B"], students: 85, classTeacher: "Meena Iyer" },
  { name: "Class 12", sections: ["A", "B"], students: 77, classTeacher: "Vikash Kumar" },
]

export function AcademicPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Academic"
        description="Manage classes, sections, subjects, and schedules"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Academic" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Class
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard title="Total Classes" value="24" icon={<GraduationCap className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Subjects" value="18" icon={<BookOpen className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Schedule" value="96" icon={<Calendar className="h-6 w-6" />} gradient="gradient-warning" description="periods/week" />
        <StatCard title="Sections" value="24" icon={<Users className="h-6 w-6" />} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">All Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <div key={cls.name} className="rounded-xl border p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{cls.name}</h3>
                  <Badge variant="secondary">{cls.sections.length} sections</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{cls.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sections</span>
                    <span>{cls.sections.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class Teacher</span>
                    <span>{cls.classTeacher}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
