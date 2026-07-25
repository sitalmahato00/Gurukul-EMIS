import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  FileText,
  BookOpen,
  Bus,
  Download,
  FileSpreadsheet,
  FileImage,
  Printer,
} from "lucide-react"

const reportCategories = [
  {
    title: "Student Reports",
    icon: GraduationCap,
    color: "text-primary bg-primary/10",
    reports: [
      { name: "Student List", description: "Complete list of all students" },
      { name: "Admission Report", description: "New admissions by period" },
      { name: "Student Performance", description: "Academic performance analysis" },
      { name: "Student Demographics", description: "Age, gender, category distribution" },
    ],
  },
  {
    title: "Attendance Reports",
    icon: ClipboardCheck,
    color: "text-success bg-success/10",
    reports: [
      { name: "Daily Attendance", description: "Day-wise attendance summary" },
      { name: "Monthly Attendance", description: "Monthly attendance analysis" },
      { name: "Absentee Report", description: "Frequent absentees list" },
      { name: "Class-wise Attendance", description: "Attendance by class and section" },
    ],
  },
  {
    title: "Finance Reports",
    icon: DollarSign,
    color: "text-warning bg-warning/10",
    reports: [
      { name: "Fee Collection", description: "Fee collection summary" },
      { name: "Pending Fees", description: "Outstanding fees report" },
      { name: "Income Statement", description: "Revenue and expense summary" },
      { name: "Payroll Report", description: "Staff salary disbursement" },
    ],
  },
  {
    title: "Academic Reports",
    icon: FileText,
    color: "text-info bg-info/10",
    reports: [
      { name: "Exam Results", description: "Examination result analysis" },
      { name: "Grade Distribution", description: "Grade-wise student distribution" },
      { name: "Subject Performance", description: "Subject-wise performance" },
      { name: "Transcript", description: "Individual student transcripts" },
    ],
  },
  {
    title: "Library Reports",
    icon: BookOpen,
    color: "text-secondary bg-secondary/10",
    reports: [
      { name: "Book Catalog", description: "Complete book inventory" },
      { name: "Issue Report", description: "Books issued and returned" },
      { name: "Overdue Report", description: "Pending returns and fines" },
      { name: "Popular Books", description: "Most borrowed books" },
    ],
  },
  {
    title: "Transport Reports",
    icon: Bus,
    color: "text-destructive bg-destructive/10",
    reports: [
      { name: "Vehicle List", description: "All registered vehicles" },
      { name: "Route Report", description: "Route-wise student allocation" },
      { name: "Fee Collection", description: "Transport fee collection" },
      { name: "Maintenance Log", description: "Vehicle maintenance history" },
    ],
  },
]

export function ReportsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Reports"
        description="Generate and download comprehensive reports"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Reports" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportCategories.map((category) => (
          <Card key={category.title}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${category.color}`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.reports.map((report) => (
                  <div key={report.name} className="flex items-center justify-between rounded-xl border p-3 hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <FileSpreadsheet className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Printer className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
