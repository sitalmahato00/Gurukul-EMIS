import { useState, useMemo } from "react"
import {
  Users,
  Shield,
  UserCheck,
  UserX,
  Plus,
  Search,
  Pencil,
  KeyRound,
  MoreHorizontal,
  Mail,
  Building2,
  Clock,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  Trash2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, getInitials, formatDate } from "@/lib/utils"
import { TablePagination } from "@/components/shared/table-pagination"
import { StatCard } from "@/components/shared/stat-card"
import {
  useAdminUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useResetPassword,
  useToggleUserActive,
  useSchools,
} from "@/lib/hooks"
import { toast } from "sonner"

const ALL_ROLES = [
  { value: "super_admin", label: "Super Admin", icon: Shield, color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  { value: "school_admin", label: "School Admin", icon: Building2, color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" },
]

const roleMap = Object.fromEntries(ALL_ROLES.map((r) => [r.value, r]))

const avatarGradients = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-red-500 to-rose-600",
  "from-teal-500 to-cyan-600",
  "from-indigo-500 to-violet-600",
  "from-yellow-500 to-amber-600",
]

function exportCSV(users: any[]) {
  const headers = ["ID", "Name", "Email", "Role", "School", "Phone", "Status", "Last Active"]
  const rows = users.map((u) => [
    u.id, u.name, u.email, u.role, u.school?.name || "Platform",
    u.phone || "", u.is_active ? "Active" : "Inactive",
    u.last_login_at || u.created_at,
  ])
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n")
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function UserManagementPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [showCreate, setShowCreate] = useState(false)
  const [editUser, setEditUser] = useState<any>(null)
  const [resetUser, setResetUser] = useState<any>(null)
  const [deleteUser, setDeleteUser] = useState<any>(null)

  const toggleActive = useToggleUserActive()

  const params: Record<string, string> = { per_page: "20", page: String(page) }
  if (search) params.search = search
  if (activeTab !== "all") params.role = activeTab

  const { data, isLoading } = useAdminUsers(params)

  const users = data?.data || []
  const summary = data?.summary || {}
  const total = data?.total || 0
  const lastPage = data?.lastPage || 1
  const currentPage = data?.currentPage || 1

  const roleCounts = summary.role_counts || {}
  const activeCount = summary.active || 0

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage all users across the platform. Create, edit, and monitor user accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-xl" onClick={() => exportCSV(users)}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button className="gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={String(summary.total || 0)} icon={<Users className="h-6 w-6" />} trend="up" trendValue={`${activeCount}`} description="active accounts" gradient="from-violet-500 to-purple-600" />
        <StatCard title="Super Admins" value={String(roleCounts.super_admin || 0)} icon={<Shield className="h-6 w-6" />} description="platform administrators" gradient="from-violet-500 to-purple-600" />
        <StatCard title="School Admins" value={String(roleCounts.school_admin || 0)} icon={<Building2 className="h-6 w-6" />} description="school administrators" gradient="from-sky-500 to-blue-600" />
        <StatCard title="Active" value={String(activeCount)} icon={<UserCheck className="h-6 w-6" />} description={`${(summary.total || 0) > 0 ? Math.round((activeCount / (summary.total || 1)) * 100) : 0}% of total`} gradient="from-amber-500 to-orange-600" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">All Users</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">{total} total users across all roles</p>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, email, phone..." className="pl-9 rounded-xl" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setPage(1) }}>
            <TabsList className="mb-6 flex-wrap h-auto gap-1">
              <TabsTrigger value="all" className="rounded-lg text-xs">All ({summary.total || 0})</TabsTrigger>
              {ALL_ROLES.filter((r) => (roleCounts[r.value] || 0) > 0).map((r) => (
                <TabsTrigger key={r.value} value={r.value} className="rounded-lg text-xs">
                  {r.label} ({roleCounts[r.value] || 0})
                </TabsTrigger>
              ))}
            </TabsList>

            <UserTable users={users} onEdit={setEditUser} onReset={setResetUser} onDelete={setDeleteUser} onToggle={toggleActive} />
          </Tabs>

          {lastPage > 1 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={lastPage}
              totalItems={total}
              perPage={20}
              onPageChange={setPage}
            />
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {showCreate && <CreateUserDialog onClose={() => setShowCreate(false)} />}
        {editUser && <EditUserDialog user={editUser} onClose={() => setEditUser(null)} />}
        {resetUser && <ResetPasswordDialog user={resetUser} onClose={() => setResetUser(null)} />}
        {deleteUser && <DeleteUserDialog user={deleteUser} onClose={() => setDeleteUser(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}

function UserTable({ users, onEdit, onReset, onDelete, onToggle }: { users: any[]; onEdit: (u: any) => void; onReset: (u: any) => void; onDelete: (u: any) => void; onToggle: any }) {
  const toggleMut = onToggle
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-3">User</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-2">School</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-2">Last Active</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No users found</p>
        </div>
      ) : (
        users.map((user, index) => {
          const role = roleMap[user.role] || ALL_ROLES[ALL_ROLES.length - 1]
          const RoleIcon = role.icon
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="grid grid-cols-12 gap-4 items-center rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors group"
            >
              <div className="col-span-3 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className={cn("bg-gradient-to-br text-white text-xs font-bold", avatarGradients[index % avatarGradients.length])}>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                    <Mail className="h-3 w-3 shrink-0" />{user.email}
                  </p>
                </div>
              </div>

              <div className="col-span-2">
                <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", role.color)}>
                  <RoleIcon className="h-3 w-3" />{role.label}
                </Badge>
              </div>

              <div className="col-span-2">
                <p className="text-sm text-muted-foreground truncate">{user.school?.name || "Platform"}</p>
              </div>

              <div className="col-span-1">
                {user.is_active ? (
                  <Badge variant="secondary" className="text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Active</Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">Inactive</Badge>
                )}
              </div>

              <div className="col-span-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />{formatDate(user.last_login_at || user.created_at)}
              </div>

              <div className="col-span-2 flex items-center justify-end gap-1">
                <button onClick={() => onEdit(user)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Edit">
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button onClick={() => toggleMut.mutate(user.id, { onSuccess: () => toast.success(user.is_active ? "User deactivated" : "User activated") })} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title={user.is_active ? "Deactivate" : "Activate"}>
                  {user.is_active ? <UserX className="h-3.5 w-3.5 text-muted-foreground" /> : <UserCheck className="h-3.5 w-3.5 text-emerald-500" />}
                </button>
                <button onClick={() => onReset(user)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Reset Password">
                  <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button onClick={() => onDelete(user)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Delete">
                  <Trash2 className="h-3.5 w-3.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          )
        })
      )}
    </div>
  )
}

function CreateUserDialog({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "", role: "accountant", school_id: "", phone: "" })
  const [showPass, setShowPass] = useState(false)
  const createMut = useCreateUser()
  const { data: schoolsData } = useSchools({ per_page: "100" })
  const schools = Array.isArray(schoolsData) ? schoolsData : (schoolsData?.data || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...form }
    if (!payload.school_id) delete (payload as any).school_id
    createMut.mutate(payload, {
      onSuccess: () => { toast.success("User created successfully"); onClose() },
      onError: (err: any) => {
        const msg = err?.message || err?.errors?.email?.[0] || "Failed to create user"
        toast.error(msg)
      },
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader><DialogTitle className="text-xl">Create New User</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input className="rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" className="rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input type={showPass ? "text" : "password"} className="rounded-xl pr-10" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" className="rounded-xl" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ALL_ROLES.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input className="rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>School</Label>
            <Select value={form.school_id} onValueChange={(v) => setForm({ ...form, school_id: v })}>
              <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select a school (optional)" /></SelectTrigger>
              <SelectContent>
                {schools.map((s: any) => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600" disabled={createMut.isPending}>
              {createMut.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditUserDialog({ user, onClose }: { user: any; onClose: () => void }) {
  const [form, setForm] = useState({ name: user.name || "", email: user.email || "", role: user.role || "student", phone: user.phone || "", is_active: user.is_active ?? true })
  const updateMut = useUpdateUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMut.mutate({ id: user.id, data: form }, {
      onSuccess: () => { toast.success("User updated successfully"); onClose() },
      onError: (err: any) => toast.error(err?.message || "Failed to update user"),
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader><DialogTitle className="text-xl">Edit User</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input className="rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" className="rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ALL_ROLES.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input className="rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label>Status</Label>
            <Badge variant="secondary" className={cn("text-xs cursor-pointer", form.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600")} onClick={() => setForm({ ...form, is_active: !form.is_active })}>
              {form.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600" disabled={updateMut.isPending}>
              {updateMut.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ResetPasswordDialog({ user, onClose }: { user: any; onClose: () => void }) {
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const resetMut = useResetPassword()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetMut.mutate({ id: user.id, password }, {
      onSuccess: () => { toast.success("Password reset successfully"); onClose() },
      onError: (err: any) => toast.error(err?.message || "Failed to reset password"),
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Reset Password</DialogTitle>
          <p className="text-sm text-muted-foreground">Set a new password for <span className="font-medium text-foreground">{user.name}</span></p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>New Password</Label>
            <div className="relative">
              <Input type={showPass ? "text" : "password"} className="rounded-xl pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600" disabled={resetMut.isPending}>
              {resetMut.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Reset Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteUserDialog({ user, onClose }: { user: any; onClose: () => void }) {
  const deleteMut = useDeleteUser()

  const handleDelete = () => {
    deleteMut.mutate(user.id, {
      onSuccess: () => { toast.success("User deactivated successfully"); onClose() },
      onError: (err: any) => toast.error(err?.message || "Failed to deactivate user"),
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Deactivate User</DialogTitle>
          <p className="text-sm text-muted-foreground">Are you sure you want to deactivate <span className="font-medium text-foreground">{user.name}</span>? They will no longer be able to log in.</p>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" className="rounded-xl" onClick={handleDelete} disabled={deleteMut.isPending}>
            {deleteMut.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Deactivate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
