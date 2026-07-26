import { useState } from "react"
import {
  Search,
  Users,
  UserPlus,
  Phone,
  Mail,
  Eye,
  Edit,
  MoreHorizontal,
  UserCheck,
  TrendingUp,
  Link2,
  Loader2,
  EyeOff,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { getInitials } from "@/lib/utils"
import { useParents, useCreateParent } from "@/lib/hooks"
import { toast } from "sonner"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ParentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreate, setShowCreate] = useState(false)

  const { data: parentsData, isLoading } = useParents()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const parentsList = (parentsData?.data || []).map((p: any) => ({
    id: String(p.id),
    name: p.user?.name || "N/A",
    phone: p.user?.phone || "N/A",
    email: p.user?.email || "N/A",
    occupation: p.occupation || "N/A",
    relation: p.relation || "N/A",
    isActive: p.is_active ?? true,
    children: (p.students || []).map((s: any) => ({ name: s.user?.name || "N/A", class: s.class?.name || "N/A" })),
    status: p.is_active ? "active" : "inactive",
  }))

  const filtered = parentsList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount = parentsList.filter((p) => p.status === "active").length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Parents</h1>
            <p className="text-muted-foreground mt-1">Manage parent accounts and linked students</p>
          </div>
          <Button className="gap-2 rounded-xl" onClick={() => setShowCreate(true)}>
            <UserPlus className="h-4 w-4" />
            Add Parent
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Parents" value={parentsList.length.toString()} icon={<Users className="h-6 w-6" />} trend="up" trendValue={`${parentsList.length}`} description="registered" gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Active" value={activeCount.toString()} icon={<UserCheck className="h-6 w-6" />} trend="up" trendValue={`${parentsList.length ? Math.round((activeCount / parentsList.length) * 100) : 0}%`} description="of total parents" gradient="bg-gradient-to-br from-teal-500 to-cyan-500" />
        <StatCard title="Total Children" value={parentsList.reduce((sum, p) => sum + p.children.length, 0).toString()} icon={<Link2 className="h-6 w-6" />} description="linked students" gradient="bg-gradient-to-br from-cyan-500 to-blue-500" />
      </motion.div>

      <motion.div variants={item}>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, email, or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4">
        {filtered.length === 0 && (
          <Card className="border-0 shadow-xl rounded-2xl"><CardContent className="py-12 text-center text-muted-foreground">No parents found</CardContent></Card>
        )}
        {filtered.map((parent, idx) => (
          <motion.div key={parent.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
            <Card className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">{getInitials(parent.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold truncate">{parent.name}</h3>
                        <Badge variant={parent.status === "active" ? "success" : "secondary"}>{parent.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{parent.phone}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{parent.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:border-l md:pl-4">
                    <Link2 className="h-4 w-4 text-muted-foreground shrink-0 hidden md:block" />
                    <div className="flex flex-wrap gap-2">
                      {parent.children.map((child) => (
                        <div key={child.name} className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Users className="h-3 w-3" /></div>
                          <div>
                            <p className="text-xs font-medium">{child.name}</p>
                            <p className="text-[10px] text-muted-foreground">{child.class}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 md:border-l md:pl-4">
                    <Badge variant="outline" className="gap-1 px-2.5 py-1"><Users className="h-3 w-3" />{parent.children.length} {parent.children.length === 1 ? "child" : "children"}</Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {showCreate && <CreateParentDialog onClose={() => setShowCreate(false)} />}
    </motion.div>
  )
}

function CreateParentDialog({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", occupation: "", relation: "father" })
  const [showPass, setShowPass] = useState(false)
  const createMut = useCreateParent()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password,
      relation: form.relation,
    }
    if (form.phone) payload.phone = form.phone
    if (form.occupation) payload.occupation = form.occupation

    createMut.mutate(payload, {
      onSuccess: () => { toast.success("Parent created successfully"); onClose() },
      onError: (err: any) => toast.error(err?.message || "Failed to create parent"),
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader><DialogTitle className="text-xl">Add New Parent</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name</Label><Input className="rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" className="rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input type={showPass ? "text" : "password"} className="rounded-xl pr-10" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <div className="space-y-2"><Label>Phone</Label><Input className="rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Occupation</Label><Input className="rounded-xl" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>Relation</Label>
              <Select value={form.relation} onValueChange={(v) => setForm({ ...form, relation: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600" disabled={createMut.isPending}>
              {createMut.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Create Parent
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
