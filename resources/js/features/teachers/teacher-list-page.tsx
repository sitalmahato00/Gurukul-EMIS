import { motion } from "framer-motion"
import { type ColumnDef } from "@tanstack/react-table"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { teachers } from "@/lib/mock-data"
import { getInitials } from "@/lib/utils"
import type { Teacher } from "@/types"
import {
  Plus,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  UserCog,
  GraduationCap,
  Building2,
  DollarSign,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TeacherListPage() {
  const columns: ColumnDef<Teacher, unknown>[] = [
    {
      accessorKey: "employeeId",
      header: "ID",
      cell: ({ row }) => <span className="font-mono text-xs">{row.original.employeeId}</span>,
    },
    {
      accessorKey: "firstName",
      header: "Teacher",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {getInitials(`${row.original.firstName} ${row.original.lastName}`)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{row.original.firstName} {row.original.lastName}</p>
            <p className="text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "subjects",
      header: "Subjects",
      cell: ({ row }) => (
        <div className="flex gap-1 flex-wrap">
          {row.original.subjects.map((s) => (
            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "experience",
      header: "Experience",
      cell: ({ row }) => <span>{row.original.experience} years</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "success" : "secondary"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Eye className="h-4 w-4" /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Teachers"
        description="Manage teaching staff and their assignments"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Teachers" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Teacher
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Teachers" value="64" icon={<UserCog className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Departments" value="8" icon={<Building2 className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Avg Experience" value="10.2 yrs" icon={<GraduationCap className="h-6 w-6" />} />
        <StatCard title="Avg Salary" value="₹52K" icon={<DollarSign className="h-6 w-6" />} />
      </div>

      <DataTable columns={columns} data={teachers} searchPlaceholder="Search teachers..." searchColumn="firstName" />
    </motion.div>
  )
}
