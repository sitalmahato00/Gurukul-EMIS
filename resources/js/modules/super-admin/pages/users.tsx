import {
  Users,
  Shield,
  GraduationCap,
  UserCheck,
  Plus,
  Search,
  Pencil,
  UserX,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Mail,
  Building2,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials, formatDate } from "@/lib/utils"
import { StatCard } from "@/components/shared/stat-card"
import { useAdminUsers } from "@/lib/hooks"

const roleConfig: Record<string, { label: string; color: string; icon: typeof Shield }> = {
  "super-admin": { label: "Super Admin", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300", icon: Shield },
  "school-admin": { label: "School Admin", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", icon: Building2 },
  teacher: { label: "Teacher", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: GraduationCap },
  student: { label: "Student", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: UserCheck },
}

const avatarGradients = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
]

export function UserManagementPage() {
  const { data, isLoading } = useAdminUsers()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const users = (data?.data || []).map((u: any) => ({
    id: u.id,
    name: u.name || "N/A",
    email: u.email || "N/A",
    role: u.role || "student",
    school: u.school?.name || "Platform",
    status: u.is_active ? "active" : "inactive",
    lastActive: u.last_login_at || u.created_at,
  }))

  const totalCount = users.length
  const schoolAdminCount = users.filter((u) => u.role === "school-admin").length
  const teacherCount = users.filter((u) => u.role === "teacher").length
  const studentCount = users.filter((u) => u.role === "student").length
  const activeCount = users.filter((u) => u.status === "active").length

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
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all users across the platform. Create, edit, and monitor user accounts.
          </p>
        </div>
        <Button className="gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={String(totalCount)}
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue={`${activeCount}`}
          description="active accounts"
          gradient="from-violet-500 to-purple-600"
        />
        <StatCard
          title="School Admins"
          value={String(schoolAdminCount)}
          icon={<Building2 className="h-6 w-6" />}
          description="across all schools"
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Teachers"
          value={String(teacherCount)}
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendValue={`${teacherCount}`}
          description="active educators"
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Active"
          value={String(activeCount)}
          icon={<UserCheck className="h-6 w-6" />}
          description={`${totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0}% of total`}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Search and Filters */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">All Users</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users by name, email..." className="pl-10 rounded-xl" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
              <TabsTrigger value="school-admins">School Admins ({schoolAdminCount})</TabsTrigger>
              <TabsTrigger value="teachers">Teachers ({teacherCount})</TabsTrigger>
              <TabsTrigger value="students">Students ({studentCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <UserTable users={users} />
            </TabsContent>
            <TabsContent value="school-admins">
              <UserTable users={users.filter((u) => u.role === "school-admin")} />
            </TabsContent>
            <TabsContent value="teachers">
              <UserTable users={users.filter((u) => u.role === "teacher")} />
            </TabsContent>
            <TabsContent value="students">
              <UserTable users={users.filter((u) => u.role === "student")} />
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1-{totalCount}</span> of <span className="font-medium">{totalCount}</span> users
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm" className="rounded-xl bg-violet-600 hover:bg-violet-700">
                1
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function UserTable({ users: userList }: { users: any[] }) {
  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-4">User</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-2">School</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-2">Last Active</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Rows */}
      {(userList || []).map((user, index) => {
        const role = roleConfig[user.role] || roleConfig.student
        const RoleIcon = role.icon
        return (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="grid grid-cols-12 gap-4 items-center rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors group"
          >
            {/* User */}
            <div className="col-span-4 flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback
                  className={cn(
                    "bg-gradient-to-br text-white text-xs font-bold",
                    avatarGradients[index % avatarGradients.length]
                  )}
                >
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                  <Mail className="h-3 w-3 shrink-0" />
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="col-span-2">
              <Badge
                variant="secondary"
                className={cn("text-[10px] font-medium gap-1", role.color)}
              >
                <RoleIcon className="h-3 w-3" />
                {role.label}
              </Badge>
            </div>

            {/* School */}
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground truncate">{user.school}</p>
            </div>

            {/* Status */}
            <div className="col-span-1">
              {user.status === "active" ? (
                <Badge
                  variant="secondary"
                  className="text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                >
                  Active
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                >
                  Inactive
                </Badge>
              )}
            </div>

            {/* Last Active */}
            <div className="col-span-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDate(user.lastActive)}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Edit">
                <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Deactivate">
                <UserX className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Reset Password">
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="More">
                <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
