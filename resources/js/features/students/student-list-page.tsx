import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { type ColumnDef } from "@tanstack/react-table"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { students } from "@/lib/mock-data"
import { getInitials, cn } from "@/lib/utils"
import type { Student } from "@/types"
import {
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  FileText,
  Printer,
  GraduationCap,
  Filter,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

export function StudentListPage() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)

  const columns: ColumnDef<Student, unknown>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "admissionNumber",
      header: "Adm. No.",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.admissionNumber}</span>
      ),
    },
    {
      accessorKey: "firstName",
      header: "Student",
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
      accessorKey: "class",
      header: "Class",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.class}-{row.original.section}</span>
      ),
    },
    {
      accessorKey: "rollNumber",
      header: "Roll No.",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">{row.original.gender}</Badge>
      ),
    },
    {
      accessorKey: "feesPaid",
      header: "Fees Status",
      cell: ({ row }) => {
        const percentage = (row.original.feesPaid / row.original.feesTotal) * 100
        return (
          <div className="flex items-center gap-2">
            <div className="w-16">
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    percentage === 100 ? "bg-success" : percentage > 50 ? "bg-warning" : "bg-destructive"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
          </div>
        )
      },
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
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="gap-2 cursor-pointer">
              <Link to={`/students/${row.original.id}`}>
                <Eye className="h-4 w-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Edit className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Printer className="h-4 w-4" />
              Print ID Card
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <FileText className="h-4 w-4" />
              Generate Certificate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive cursor-pointer">
              <Trash2 className="h-4 w-4" />
              Delete
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
        title="Students"
        description="Manage all student records and information"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Students" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students", value: "1,248", color: "text-primary" },
          { label: "Active", value: "1,180", color: "text-success" },
          { label: "Inactive", value: "42", color: "text-muted-foreground" },
          { label: "Fees Pending", value: "26", color: "text-warning" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={cn("text-2xl font-bold mt-1", stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={students}
        searchPlaceholder="Search students..."
        searchColumn="firstName"
      />

      {/* Add Student Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>Fill in the details to add a new student to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="Enter last name" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="student@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="Enter phone number" />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Class</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((cls) => (
                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Section</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {["A", "B", "C", "D"].map((sec) => (
                    <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Address</Label>
              <Input placeholder="Enter full address" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowAddDialog(false)}>Add Student</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
