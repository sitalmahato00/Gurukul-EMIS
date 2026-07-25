import { useState, useMemo } from "react"
import {
  School,
  Users,
  GraduationCap,
  UserCog,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building2,
  Globe,
  Phone,
  Mail,
  Filter,
  MoreHorizontal,
  ArrowLeft,
  Save,
  HardDrive,
  DollarSign,
  BookOpen,
  Info,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  useSchools,
  useSchool,
  useCreateSchool,
  useUpdateSchool,
  useDeleteSchool,
  useSubscriptionPlans,
} from "@/lib/hooks"
import { toast } from "sonner"

const subscriptionColors: Record<string, string> = {
  Enterprise: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Professional: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Basic: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
}

const emptyForm = {
  name: "",
  slug: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  website: "",
  established_year: "",
  board: "",
  medium: "",
  subscription_plan_id: "",
  subscription_starts_at: "",
  subscription_ends_at: "",
  is_active: true,
}

export function SchoolsPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [perPage] = useState("10")
  const [planFilter, setPlanFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [formMode, setFormMode] = useState<"list" | "create" | "edit" | "view">("list")
  const [editingSchool, setEditingSchool] = useState<any>(null)
  const [viewingSchoolId, setViewingSchoolId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null)

  const params: Record<string, string> = { page: String(page), per_page: perPage }
  if (search) params.search = search
  if (planFilter !== "all") params.plan_id = planFilter
  if (statusFilter !== "all") params.is_active = statusFilter === "active" ? "1" : "0"

  const { data, isLoading } = useSchools(params)
  const { data: schoolDetail, isLoading: isLoadingDetail } = useSchool(viewingSchoolId ?? 0)
  const { data: plans } = useSubscriptionPlans()
  const createSchool = useCreateSchool()
  const updateSchool = useUpdateSchool()
  const deleteSchool = useDeleteSchool()

  const schools = data?.data || []
  const pagination = data?.pagination || {}
  const planList = Array.isArray(plans?.data) ? plans.data : Array.isArray(plans) ? plans : []
  const viewedSchool = schoolDetail?.data

  const stats = useMemo(() => {
    const total = pagination.total || schools.length
    let activeCount = 0
    let expiringSoon = 0
    let totalStudents = 0
    schools.forEach((s: any) => {
      if (s.is_active) activeCount++
      if (s.subscription_status === "expiring_soon") expiringSoon++
      totalStudents += s.students_count || 0
    })
    return { total, activeCount, suspendedCount: total - activeCount, expiringSoon, totalStudents }
  }, [schools, pagination])

  const openCreate = () => {
    setEditingSchool(null)
    setForm(emptyForm)
    setFormMode("create")
  }

  const openEdit = (school: any) => {
    setEditingSchool(school)
    setForm({
      name: school.name || "",
      slug: school.slug || "",
      email: school.email || "",
      phone: school.phone || "",
      address: school.address || "",
      city: school.city || "",
      state: school.state || "",
      pincode: school.pincode || "",
      website: school.website || "",
      established_year: school.established_year ? String(school.established_year) : "",
      board: school.board || "",
      medium: school.medium || "",
      subscription_plan_id: school.subscription_plan_id ? String(school.subscription_plan_id) : "",
      subscription_starts_at: school.subscription_starts_at ? school.subscription_starts_at.slice(0, 10) : "",
      subscription_ends_at: school.subscription_ends_at ? school.subscription_ends_at.slice(0, 10) : "",
      is_active: school.is_active,
    })
    setFormMode("edit")
  }

  const openView = (school: any) => {
    setViewingSchoolId(school.id)
    setFormMode("view")
  }

  const handleSubmit = () => {
    const payload: any = {
      ...form,
      established_year: form.established_year ? parseInt(form.established_year) : null,
      subscription_plan_id: form.subscription_plan_id && form.subscription_plan_id !== "none" ? parseInt(form.subscription_plan_id) : null,
      is_active: form.is_active,
    }

    if (!payload.slug) payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

    if (editingSchool) {
      updateSchool.mutate(
        { id: editingSchool.id, data: payload },
        {
          onSuccess: () => {
            toast.success("School updated successfully")
            setFormMode("list")
          },
          onError: (err: any) => toast.error(err?.message || "Failed to update school"),
        }
      )
    } else {
      createSchool.mutate(payload, {
        onSuccess: () => {
          toast.success("School created successfully")
          setFormMode("list")
        },
        onError: (err: any) => toast.error(err?.message || "Failed to create school"),
      })
    }
  }

  const handleDelete = (id: number) => {
    deleteSchool.mutate(id, {
      onSuccess: () => {
        toast.success("School deleted successfully")
        setDeleteConfirm(null)
        if (formMode === "view") setFormMode("list")
      },
      onError: (err: any) => toast.error(err?.message || "Failed to delete school"),
    })
  }

  const setField = (key: string, val: any) => setForm((prev) => ({ ...prev, [key]: val }))

  // ── Full-page View ──────────────────────────
  if (formMode === "view") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="rounded-xl h-10 w-10 p-0" onClick={() => setFormMode("list")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            {isLoadingDetail ? (
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
                <div className="space-y-2">
                  <div className="h-6 w-48 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ) : viewedSchool ? (
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold shrink-0">
                  {viewedSchool.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">{viewedSchool.name}</h1>
                    <Badge variant="secondary" className={cn("text-xs font-semibold", viewedSchool.is_active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300")}>
                      {viewedSchool.is_active ? "Active" : "Suspended"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-0.5">{viewedSchool.email || "No email"} {viewedSchool.board ? `· ${viewedSchool.board}` : ""}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">School not found</p>
            )}
          </div>
          {viewedSchool && (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl h-10 px-4 gap-2" onClick={() => openEdit(viewedSchool)}>
                <Pencil className="h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" className="rounded-xl h-10 px-4 gap-2" onClick={() => setDeleteConfirm(viewedSchool)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          )}
        </div>

        {isLoadingDetail ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <Card key={i} className="shadow-lg rounded-2xl border-0"><CardContent className="pt-5 pb-4 px-4"><div className="h-16 animate-pulse rounded bg-muted" /></CardContent></Card>
            ))}
          </div>
        ) : viewedSchool && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Students", value: viewedSchool.students_count || 0, icon: GraduationCap, color: "from-violet-500 to-purple-600" },
                { label: "Teachers", value: viewedSchool.teachers_count || 0, icon: UserCog, color: "from-emerald-500 to-teal-600" },
                { label: "Classes", value: viewedSchool.classes_count || 0, icon: School, color: "from-blue-500 to-indigo-600" },
                { label: "Users", value: viewedSchool.users_count || 0, icon: Users, color: "from-amber-500 to-orange-600" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="shadow-lg rounded-2xl border-0">
                    <CardContent className="pt-5 pb-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", s.color)}><s.icon className="h-4.5 w-4.5" /></div>
                        <div>
                          <p className="text-xs text-muted-foreground">{s.label}</p>
                          <p className="text-xl font-bold">{s.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg rounded-2xl border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Building2 className="h-4.5 w-4.5" /> School Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5">
                          <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-sm font-medium text-foreground">{viewedSchool.email || "—"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="text-sm font-medium text-foreground">{viewedSchool.phone || "—"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Globe className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Board</p>
                            <p className="text-sm font-medium text-foreground">{viewedSchool.board || "—"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Medium</p>
                            <p className="text-sm font-medium text-foreground">{viewedSchool.medium || "—"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Address</p>
                            <p className="text-sm font-medium text-foreground">{viewedSchool.address || "—"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">City / State</p>
                            <p className="text-sm font-medium text-foreground">{viewedSchool.city || "—"}{viewedSchool.state ? `, ${viewedSchool.state}` : ""}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Established</p>
                            <p className="text-sm font-medium text-foreground">{viewedSchool.established_year || "—"}</p>
                          </div>
                        </div>
                        {viewedSchool.website && (
                          <div className="flex items-start gap-2.5">
                            <Globe className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Website</p>
                              <p className="text-sm font-medium text-foreground">{viewedSchool.website}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg rounded-2xl border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Globe className="h-4.5 w-4.5" /> Subscription Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Plan</p>
                          <Badge variant="secondary" className={cn("text-xs mt-1", subscriptionColors[viewedSchool.subscription_plan?.name] || subscriptionColors.Basic)}>
                            {viewedSchool.subscription_plan?.name || "No Plan"}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="text-sm font-semibold text-foreground">
                            {viewedSchool.custom_price ? `₹${Number(viewedSchool.custom_price).toLocaleString("en-IN")}` : viewedSchool.subscription_plan?.price ? `₹${Number(viewedSchool.subscription_plan.price).toLocaleString("en-IN")}` : "—"}
                            {viewedSchool.subscription_plan?.period ? `/${viewedSchool.subscription_plan.period}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Starts</p>
                          <p className="text-sm font-medium text-foreground">
                            {viewedSchool.subscription_starts_at ? new Date(viewedSchool.subscription_starts_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Ends</p>
                          <p className="text-sm font-medium text-foreground">
                            {viewedSchool.subscription_ends_at ? new Date(viewedSchool.subscription_ends_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {viewedSchool.days_remaining !== null && viewedSchool.days_remaining !== undefined && (
                      <>
                        <Separator className="my-4" />
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-2.5 w-2.5 rounded-full shrink-0",
                            viewedSchool.subscription_status === "expired" ? "bg-red-500" :
                            viewedSchool.subscription_status === "expiring_soon" ? "bg-amber-500" : "bg-emerald-500"
                          )} />
                          <span className={cn(
                            "text-sm font-semibold",
                            viewedSchool.subscription_status === "expired" ? "text-red-600 dark:text-red-400" :
                            viewedSchool.subscription_status === "expiring_soon" ? "text-amber-600 dark:text-amber-400" : "text-foreground"
                          )}>
                            {viewedSchool.subscription_status === "expired" ? "Subscription expired" : `${viewedSchool.days_remaining} days remaining`}
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg rounded-2xl border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Info className="h-4.5 w-4.5" /> Quick Facts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Slug</span>
                      <span className="font-medium text-foreground">{viewedSchool.slug}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pincode</span>
                      <span className="font-medium text-foreground">{viewedSchool.pincode || "—"}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="secondary" className={cn("text-[10px] font-semibold", viewedSchool.is_active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>
                        {viewedSchool.is_active ? "Active" : "Suspended"}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-medium text-foreground">
                        {viewedSchool.created_at ? new Date(viewedSchool.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </motion.div>
    )
  }

  // ── Full-page create/edit form ──────────────────────────
  if (formMode === "create" || formMode === "edit") {
    const isEdit = formMode === "edit"
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="rounded-xl h-10 w-10 p-0" onClick={() => setFormMode("list")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isEdit ? "Edit School" : "Add New School"}</h1>
            <p className="text-muted-foreground mt-1">{isEdit ? `Editing ${editingSchool?.name}` : "Register a new school on the platform"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Building2 className="h-4.5 w-4.5" /> Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">School Name *</Label>
                    <Input value={form.name} onChange={(e) => setField("name", e.target.value)} className="rounded-xl h-10" placeholder="Gurukul Academy" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Slug *</Label>
                    <Input value={form.slug} onChange={(e) => setField("slug", e.target.value)} className="rounded-xl h-10" placeholder="auto-generated" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Email</Label>
                    <Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className="rounded-xl h-10" placeholder="admin@school.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Phone</Label>
                    <Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} className="rounded-xl h-10" placeholder="+91-9876543210" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Board</Label>
                    <Select value={form.board} onValueChange={(v) => setField("board", v)}>
                      <SelectTrigger className="rounded-xl h-10"><SelectValue placeholder="Select board" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CBSE">CBSE</SelectItem>
                        <SelectItem value="ICSE">ICSE</SelectItem>
                        <SelectItem value="State Board">State Board</SelectItem>
                        <SelectItem value="IB">IB</SelectItem>
                        <SelectItem value="Cambridge">Cambridge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Medium</Label>
                    <Select value={form.medium} onValueChange={(v) => setField("medium", v)}>
                      <SelectTrigger className="rounded-xl h-10"><SelectValue placeholder="Select medium" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Regional">Regional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5" /> Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm">Street Address</Label>
                  <Textarea value={form.address} onChange={(e) => setField("address", e.target.value)} className="rounded-xl min-h-[70px]" placeholder="123 Education Lane" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">City</Label>
                    <Input value={form.city} onChange={(e) => setField("city", e.target.value)} className="rounded-xl h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">State</Label>
                    <Input value={form.state} onChange={(e) => setField("state", e.target.value)} className="rounded-xl h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Pincode</Label>
                    <Input value={form.pincode} onChange={(e) => setField("pincode", e.target.value)} className="rounded-xl h-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Website</Label>
                    <Input value={form.website} onChange={(e) => setField("website", e.target.value)} className="rounded-xl h-10" placeholder="https://school.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Established Year</Label>
                    <Input type="number" value={form.established_year} onChange={(e) => setField("established_year", e.target.value)} className="rounded-xl h-10" placeholder="2005" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Globe className="h-4.5 w-4.5" /> Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Plan</Label>
                    <Select value={form.subscription_plan_id} onValueChange={(v) => setField("subscription_plan_id", v)}>
                      <SelectTrigger className="rounded-xl h-10"><SelectValue placeholder="No plan" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No plan</SelectItem>
                        {planList.map((p: any) => (
                          <SelectItem key={p.id} value={String(p.id)}>{p.name} — ₹{Number(p.price).toLocaleString("en-IN")}/{p.period}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Status</Label>
                    <div className="flex items-center gap-3 h-10">
                      <Switch checked={form.is_active} onCheckedChange={(v) => setField("is_active", v)} />
                      <span className="text-sm font-medium">{form.is_active ? "Active" : "Suspended"}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Subscription Start</Label>
                    <Input type="date" value={form.subscription_starts_at} onChange={(e) => setField("subscription_starts_at", e.target.value)} className="rounded-xl h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Subscription End</Label>
                    <Input type="date" value={form.subscription_ends_at} onChange={(e) => setField("subscription_ends_at", e.target.value)} className="rounded-xl h-10" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3 pb-4">
              <Button
                className="rounded-xl h-11 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all gap-2"
                onClick={handleSubmit}
                disabled={!form.name || createSchool.isPending || updateSchool.isPending}
              >
                {(createSchool.isPending || updateSchool.isPending) && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                {isEdit ? "Save Changes" : "Create School"}
              </Button>
              <Button variant="outline" className="rounded-xl h-11 px-6" onClick={() => setFormMode("list")}>Cancel</Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg rounded-2xl border-0 sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold shrink-0">
                    {form.name ? form.name.slice(0, 2).toUpperCase() : "??"}
                  </div>
                  <div>
                    <p className="font-semibold">{form.name || "School Name"}</p>
                    <p className="text-xs text-muted-foreground">{form.email || "No email"}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Board</span><span className="font-medium">{form.board || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Medium</span><span className="font-medium">{form.medium || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium">{form.phone || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{form.city || "—"}{form.state ? `, ${form.state}` : ""}</span></div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="secondary" className={cn("text-[10px] font-semibold", form.is_active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>
                      {form.is_active ? "Active" : "Suspended"}
                    </Badge>
                  </div>
                </div>
                {form.subscription_plan_id && form.subscription_plan_id !== "none" && (
                  <>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subscription</p>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan</span>
                        <Badge variant="secondary" className={cn("text-[10px] font-semibold", subscriptionColors[planList.find((p: any) => String(p.id) === form.subscription_plan_id)?.name] || subscriptionColors.Basic)}>
                          {planList.find((p: any) => String(p.id) === form.subscription_plan_id)?.name || "—"}
                        </Badge>
                      </div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Starts</span><span className="font-medium">{form.subscription_starts_at || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Ends</span><span className="font-medium">{form.subscription_ends_at || "—"}</span></div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    )
  }

  // ── Main list view ──────────────────────────
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Management</h1>
          <p className="text-muted-foreground mt-1">Manage all registered schools, their subscriptions, and platform access.</p>
        </div>
        <Button className="rounded-xl h-11 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add School
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Schools", value: stats.total, icon: School, color: "from-violet-500 to-purple-600" },
          { label: "Active", value: stats.activeCount, icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
          { label: "Expiring Soon", value: stats.expiringSoon, icon: Clock, color: "from-amber-500 to-orange-600" },
          { label: "Total Students", value: stats.totalStudents.toLocaleString(), icon: GraduationCap, color: "from-blue-500 to-indigo-600" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="shadow-lg rounded-2xl border-0">
              <CardContent className="pt-5 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", s.color)}><s.icon className="h-4.5 w-4.5" /></div>
                  <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-xl font-bold">{s.value}</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold">All Schools</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">{pagination.total || 0} schools registered</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search schools..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="pl-9 rounded-xl h-10 w-64" />
                </div>
                <Select value={planFilter} onValueChange={(v) => { setPlanFilter(v); setPage(1) }}>
                  <SelectTrigger className="rounded-xl h-10 w-36"><Filter className="h-3.5 w-3.5 mr-1.5" /><SelectValue placeholder="All Plans" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    {planList.map((p: any) => (<SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
                  <SelectTrigger className="rounded-xl h-10 w-36"><SelectValue placeholder="All Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
            ) : schools.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <School className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No schools found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-semibold text-foreground">School</TableHead>
                        <TableHead className="font-semibold text-foreground">Location</TableHead>
                        <TableHead className="font-semibold text-foreground">Board</TableHead>
                        <TableHead className="font-semibold text-foreground">Students</TableHead>
                        <TableHead className="font-semibold text-foreground">Teachers</TableHead>
                        <TableHead className="font-semibold text-foreground">Subscription</TableHead>
                        <TableHead className="font-semibold text-foreground">Remaining</TableHead>
                        <TableHead className="font-semibold text-foreground">Status</TableHead>
                        <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schools.map((school: any) => {
                        const planName = school.subscription_plan?.name || "None"
                        const daysLeft = school.days_remaining
                        const subStatus = school.subscription_status
                        const endsAt = school.subscription_ends_at ? new Date(school.subscription_ends_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"

                        return (
                          <TableRow key={school.id} className="group hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => openView(school)}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold shrink-0">
                                  {school.name?.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-foreground truncate">{school.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{school.email || "No email"}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-foreground">
                                <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                                <span className="truncate">{school.city || "—"}, {school.state || ""}</span>
                              </div>
                            </TableCell>
                            <TableCell><Badge variant="secondary" className="text-[10px] font-semibold text-foreground">{school.board || "—"}</Badge></TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5 text-foreground">
                                <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm font-medium">{school.students_count || 0}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5 text-foreground">
                                <UserCog className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm font-medium">{school.teachers_count || 0}</span>
                              </div>
                            </TableCell>
                            <TableCell><Badge variant="secondary" className={cn("text-[10px] font-semibold", subscriptionColors[planName] || subscriptionColors.Basic)}>{planName}</Badge></TableCell>
                            <TableCell>
                              <div className="text-sm text-foreground">
                                {daysLeft !== null && daysLeft !== undefined ? (
                                  <div className="flex items-center gap-1.5">
                                    <div className={cn("h-1.5 w-1.5 rounded-full shrink-0", subStatus === "expired" ? "bg-red-500" : subStatus === "expiring_soon" ? "bg-amber-500" : "bg-emerald-500")} />
                                    <span className={cn("font-medium", subStatus === "expired" ? "text-red-600 dark:text-red-400" : subStatus === "expiring_soon" ? "text-amber-600 dark:text-amber-400" : "text-foreground")}>
                                      {subStatus === "expired" ? "Expired" : `${daysLeft}d left`}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                                <p className="text-[10px] text-muted-foreground mt-0.5">until {endsAt}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={cn("text-[10px] font-semibold", school.is_active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300")}>
                                {school.is_active ? "Active" : "Suspended"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <DropdownMenuItem onClick={() => openView(school)} className="gap-2 cursor-pointer">
                                    <Eye className="h-4 w-4" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openEdit(school)} className="gap-2 cursor-pointer">
                                    <Pencil className="h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => setDeleteConfirm(school)} className="gap-2 text-destructive cursor-pointer">
                                    <Trash2 className="h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {pagination.last_page > 1 && (
                  <div className="flex items-center justify-between mt-4 px-1">
                    <p className="text-sm text-muted-foreground">
                      Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total}
                    </p>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg" disabled={pagination.current_page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: Math.min(pagination.last_page, 5) }, (_, i) => {
                        const start = Math.max(1, Math.min(pagination.current_page - 2, pagination.last_page - 4))
                        const p = start + i
                        if (p > pagination.last_page) return null
                        return (
                          <Button key={p} variant={p === pagination.current_page ? "default" : "outline"} size="sm" className={cn("h-8 w-8 p-0 rounded-lg text-xs", p === pagination.current_page && "bg-violet-500 hover:bg-violet-600 text-white")} onClick={() => setPage(p)}>
                            {p}
                          </Button>
                        )
                      })}
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg" disabled={pagination.current_page >= pagination.last_page} onClick={() => setPage((p) => Math.min(pagination.last_page, p + 1))}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Delete School
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong className="text-foreground">{deleteConfirm?.name}</strong>? This will permanently remove all associated data including students, teachers, and classes. This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)} disabled={deleteSchool.isPending} className="rounded-xl">
              {deleteSchool.isPending && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />} Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
