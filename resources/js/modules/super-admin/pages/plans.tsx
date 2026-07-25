import { useState, useMemo } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Zap,
  Star,
  Crown,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Save,
  Users,
  GraduationCap,
  HardDrive,
  School,
  MoreHorizontal,
  Eye,
  Globe,
  DollarSign,
  Building2,
  X,
  Calendar,
  TrendingUp,
  BarChart3,
  Info,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  useSubscriptionPlans,
  useCreatePlan,
  useUpdatePlan,
  useDeletePlan,
} from "@/lib/hooks"
import { toast } from "sonner"

const planStyles: Record<string, { icon: typeof Zap; gradient: string; badge: string }> = {
  Enterprise: { icon: Crown, gradient: "from-amber-500 to-orange-600", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  Professional: { icon: Star, gradient: "from-violet-500 to-purple-600", badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  Basic: { icon: Zap, gradient: "from-slate-500 to-gray-600", badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
}

const getStyle = (name: string) => planStyles[name] || { icon: Zap, gradient: "from-slate-500 to-gray-600", badge: "bg-slate-100 text-slate-700" }

const emptyForm = {
  name: "",
  price: "",
  period: "monthly",
  description: "",
  max_schools: "",
  max_students: "",
  storage_gb: "",
  features: [] as string[],
  is_popular: false,
  is_active: true,
}

export function SubscriptionPlansPage() {
  const { data, isLoading } = useSubscriptionPlans()
  const createPlan = useCreatePlan()
  const updatePlan = useUpdatePlan()
  const deletePlan = useDeletePlan()

  const [formMode, setFormMode] = useState<"list" | "create" | "edit" | "view">("list")
  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [viewingPlan, setViewingPlan] = useState<any>(null)
  const [form, setForm] = useState(emptyForm)
  const [featureInput, setFeatureInput] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null)

  const plans = useMemo(() => {
    const raw = data?.data || []
    return Array.isArray(raw) ? raw : []
  }, [data])

  const totalRevenue = useMemo(() => plans.reduce((sum: number, p: any) => sum + (Number(p.price) * (p.schools_count || 0)), 0), [plans])
  const totalSubscribers = useMemo(() => plans.reduce((sum: number, p: any) => sum + (p.schools_count || 0), 0), [plans])

  const openCreate = () => {
    setEditingPlan(null)
    setForm(emptyForm)
    setFormMode("create")
  }

  const openEdit = (plan: any) => {
    setEditingPlan(plan)
    setForm({
      name: plan.name || "",
      price: plan.price ? String(plan.price) : "",
      period: plan.period || "monthly",
      description: plan.description || "",
      max_schools: plan.max_schools ? String(plan.max_schools) : "",
      max_students: plan.max_students ? String(plan.max_students) : "",
      storage_gb: plan.storage_gb ? String(plan.storage_gb) : "",
      features: plan.features || [],
      is_popular: plan.is_popular || false,
      is_active: plan.is_active ?? true,
    })
    setFormMode("edit")
  }

  const openView = (plan: any) => {
    setViewingPlan(plan)
    setFormMode("view")
  }

  const handleSubmit = () => {
    const payload: any = {
      name: form.name,
      price: parseFloat(form.price) || 0,
      period: form.period,
      description: form.description || null,
      max_schools: parseInt(form.max_schools) || 1,
      max_students: parseInt(form.max_students) || 100,
      storage_gb: parseInt(form.storage_gb) || 1,
      features: form.features,
      is_popular: form.is_popular,
      is_active: form.is_active,
    }

    if (editingPlan) {
      updatePlan.mutate(
        { id: editingPlan.id, data: payload },
        {
          onSuccess: () => { toast.success("Plan updated successfully"); setFormMode("list") },
          onError: (err: any) => toast.error(err?.message || "Failed to update plan"),
        }
      )
    } else {
      createPlan.mutate(payload, {
        onSuccess: () => { toast.success("Plan created successfully"); setFormMode("list") },
        onError: (err: any) => toast.error(err?.message || "Failed to create plan"),
      })
    }
  }

  const handleDelete = (id: number) => {
    deletePlan.mutate(id, {
      onSuccess: () => { toast.success("Plan deleted successfully"); setDeleteConfirm(null); setFormMode("list") },
      onError: (err: any) => toast.error(err?.message || "Failed to delete plan"),
    })
  }

  const addFeature = () => {
    if (featureInput.trim() && !form.features.includes(featureInput.trim())) {
      setForm((prev) => ({ ...prev, features: [...prev.features, featureInput.trim()] }))
      setFeatureInput("")
    }
  }

  const removeFeature = (feat: string) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((f) => f !== feat) }))
  }

  const setField = (key: string, val: any) => setForm((prev) => ({ ...prev, [key]: val }))

  // ── Full-page View ──────────────────────
  if (formMode === "view" && viewingPlan) {
    const style = getStyle(viewingPlan.name)
    const Icon = style.icon
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="rounded-xl h-10 w-10 p-0" onClick={() => setFormMode("list")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", style.gradient)}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">{viewingPlan.name}</h1>
                  {viewingPlan.is_popular && <Badge className="text-xs bg-violet-100 text-violet-700 border-0">Popular</Badge>}
                  <Badge variant="secondary" className={cn("text-xs font-semibold", viewingPlan.is_active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300")}>
                    {viewingPlan.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-0.5">{viewingPlan.description || "No description"}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-xl h-10 px-4 gap-2" onClick={() => { openEdit(viewingPlan) }}>
              <Pencil className="h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" className="rounded-xl h-10 px-4 gap-2" onClick={() => setDeleteConfirm(viewingPlan)}>
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Price", value: `₹${Number(viewingPlan.price).toLocaleString("en-IN")}`, sub: `/${viewingPlan.period}`, icon: DollarSign, color: "from-emerald-500 to-teal-600" },
            { label: "Schools", value: viewingPlan.schools_count || 0, sub: `${viewingPlan.active_schools_count || 0} active`, icon: School, color: "from-violet-500 to-purple-600" },
            { label: "Max Students", value: viewingPlan.max_students?.toLocaleString() || "—", sub: "per school", icon: Users, color: "from-blue-500 to-indigo-600" },
            { label: "Storage", value: `${viewingPlan.storage_gb} GB`, sub: "per school", icon: HardDrive, color: "from-amber-500 to-orange-600" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="shadow-lg rounded-2xl border-0">
                <CardContent className="pt-5 pb-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", s.color)}><s.icon className="h-4.5 w-4.5" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-xl font-bold">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground">{s.sub}</p>
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
                  <Info className="h-4.5 w-4.5" /> Plan Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Plan Name</p>
                      <p className="text-sm font-semibold text-foreground">{viewingPlan.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Description</p>
                      <p className="text-sm text-foreground">{viewingPlan.description || "No description"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Billing Period</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{viewingPlan.period}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Max Schools</p>
                      <p className="text-sm font-semibold text-foreground">{viewingPlan.max_schools}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Max Students</p>
                      <p className="text-sm font-semibold text-foreground">{viewingPlan.max_students?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Storage</p>
                      <p className="text-sm font-semibold text-foreground">{viewingPlan.storage_gb} GB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5" /> Features ({(viewingPlan.features || []).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(viewingPlan.features || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No features configured for this plan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(viewingPlan.features || []).map((feat: string) => (
                      <div key={feat} className="flex items-center gap-2.5 text-sm rounded-xl bg-muted/40 px-3 py-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-foreground">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4.5 w-4.5" /> Usage Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  <School className="h-5 w-5 mx-auto text-muted-foreground mb-1.5" />
                  <p className="text-2xl font-bold text-foreground">{viewingPlan.schools_count || 0}</p>
                  <p className="text-xs text-muted-foreground">Total Subscribers</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  <TrendingUp className="h-5 w-5 mx-auto text-muted-foreground mb-1.5" />
                  <p className="text-2xl font-bold text-foreground">{viewingPlan.active_schools_count || 0}</p>
                  <p className="text-xs text-muted-foreground">Active Schools</p>
                </div>
                <Separator />
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  <DollarSign className="h-5 w-5 mx-auto text-muted-foreground mb-1.5" />
                  <p className="text-2xl font-bold text-foreground">₹{(Number(viewingPlan.price) * (viewingPlan.schools_count || 0)).toLocaleString("en-IN")}</p>
                  <p className="text-xs text-muted-foreground">Estimated Revenue</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    )
  }

  // ── Full-page create/edit form ──────────────────────
  if (formMode === "create" || formMode === "edit") {
    const isEdit = formMode === "edit"
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="rounded-xl h-10 w-10 p-0" onClick={() => setFormMode("list")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isEdit ? "Edit Plan" : "Create New Plan"}</h1>
            <p className="text-muted-foreground mt-1">{isEdit ? `Editing ${editingPlan?.name}` : "Define a new subscription plan for schools"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <DollarSign className="h-4.5 w-4.5" /> Plan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Plan Name *</Label>
                    <Input value={form.name} onChange={(e) => setField("name", e.target.value)} className="rounded-xl h-10" placeholder="e.g. Enterprise" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Price (₹/month) *</Label>
                    <Input type="number" value={form.price} onChange={(e) => setField("price", e.target.value)} className="rounded-xl h-10" placeholder="4999" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Billing Period</Label>
                    <Select value={form.period} onValueChange={(v) => setField("period", v)}>
                      <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="one-time">One-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Status</Label>
                    <div className="flex items-center gap-3 h-10">
                      <Switch checked={form.is_active} onCheckedChange={(v) => setField("is_active", v)} />
                      <span className="text-sm font-medium">{form.is_active ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Description</Label>
                  <Textarea value={form.description} onChange={(e) => setField("description", e.target.value)} className="rounded-xl min-h-[70px]" placeholder="Brief description of this plan" />
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={form.is_popular} onCheckedChange={(v) => setField("is_popular", v)} />
                  <Label className="text-sm">Mark as Most Popular</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <HardDrive className="h-4.5 w-4.5" /> Limits & Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Max Schools *</Label>
                    <Input type="number" value={form.max_schools} onChange={(e) => setField("max_schools", e.target.value)} className="rounded-xl h-10" placeholder="10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Max Students *</Label>
                    <Input type="number" value={form.max_students} onChange={(e) => setField("max_students", e.target.value)} className="rounded-xl h-10" placeholder="2000" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Storage (GB) *</Label>
                    <Input type="number" value={form.storage_gb} onChange={(e) => setField("storage_gb", e.target.value)} className="rounded-xl h-10" placeholder="100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5" /> Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    className="rounded-xl h-10 flex-1"
                    placeholder="Add a feature and press Enter"
                  />
                  <Button variant="outline" className="rounded-xl h-10 px-4" onClick={addFeature} disabled={!featureInput.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.features.map((feat) => (
                    <Badge key={feat} variant="secondary" className="text-xs gap-1.5 py-1 px-2.5">
                      {feat}
                      <button onClick={() => removeFeature(feat)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                    </Badge>
                  ))}
                  {form.features.length === 0 && <p className="text-xs text-muted-foreground">No features added yet</p>}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3 pb-4">
              <Button
                className="rounded-xl h-11 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all gap-2"
                onClick={handleSubmit}
                disabled={!form.name || !form.price || createPlan.isPending || updatePlan.isPending}
              >
                {(createPlan.isPending || updatePlan.isPending) && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                {isEdit ? "Save Changes" : "Create Plan"}
              </Button>
              <Button variant="outline" className="rounded-xl h-11 px-6" onClick={() => setFormMode("list")}>Cancel</Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className={cn("shadow-lg rounded-2xl border-0 overflow-hidden", form.is_popular && "ring-2 ring-violet-500")}>
              {form.is_popular && (
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-center py-1.5 text-xs font-semibold">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="pb-2">
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white", getStyle(form.name).gradient)}>
                  {(() => { const S = getStyle(form.name).icon; return <S className="h-5 w-5" /> })()}
                </div>
                <CardTitle className="text-lg mt-2">{form.name || "Plan Name"}</CardTitle>
                {form.description && <p className="text-xs text-muted-foreground mt-0.5">{form.description}</p>}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-3xl font-bold">₹{form.price ? Number(form.price).toLocaleString("en-IN") : "0"}</span>
                  <span className="text-sm text-muted-foreground">/{form.period}</span>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div><p className="font-semibold">{form.max_schools || "—"}</p><p className="text-[10px] text-muted-foreground">Schools</p></div>
                  <div><p className="font-semibold">{form.max_students ? Number(form.max_students).toLocaleString() : "—"}</p><p className="text-[10px] text-muted-foreground">Students</p></div>
                  <div><p className="font-semibold">{form.storage_gb || "—"} GB</p><p className="text-[10px] text-muted-foreground">Storage</p></div>
                </div>
                <Separator />
                <div className="space-y-2">
                  {form.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {form.features.length === 0 && <p className="text-xs text-muted-foreground">No features added</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    )
  }

  // ── Main list view ──────────────────────────
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground mt-1">Manage pricing plans, limits, and features for school subscriptions.</p>
        </div>
        <Button className="rounded-xl h-11 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Create Plan
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Plans", value: plans.length, icon: Globe, color: "from-violet-500 to-purple-600" },
          { label: "Total Subscribers", value: totalSubscribers, icon: School, color: "from-emerald-500 to-teal-600" },
          { label: "Monthly Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: DollarSign, color: "from-amber-500 to-orange-600" },
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">All Plans</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">{plans.length} plans configured</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
            ) : plans.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No plans yet</p>
                <p className="text-sm mt-1">Create your first subscription plan</p>
              </div>
            ) : (
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="font-semibold text-foreground">Plan</TableHead>
                      <TableHead className="font-semibold text-foreground">Price</TableHead>
                      <TableHead className="font-semibold text-foreground">Limits</TableHead>
                      <TableHead className="font-semibold text-foreground">Storage</TableHead>
                      <TableHead className="font-semibold text-foreground">Subscribers</TableHead>
                      <TableHead className="font-semibold text-foreground">Features</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan: any) => {
                      const style = getStyle(plan.name)
                      const Icon = style.icon
                      return (
                        <TableRow key={plan.id} className="hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => openView(plan)}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shrink-0", style.gradient)}>
                                <Icon className="h-4.5 w-4.5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                                  {plan.is_popular && <Badge className="text-[9px] bg-violet-100 text-violet-700 border-0">Popular</Badge>}
                                </div>
                                <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">{plan.description || "No description"}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <span className="font-semibold text-foreground">₹{Number(plan.price).toLocaleString("en-IN")}</span>
                              <span className="text-muted-foreground">/{plan.period}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-foreground">
                              <span>{plan.max_schools} schools</span>
                              <span className="text-muted-foreground"> · </span>
                              <span>{plan.max_students?.toLocaleString()} students</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-foreground">
                              <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />
                              {plan.storage_gb} GB
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-foreground">
                              <School className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="font-medium">{plan.schools_count || 0}</span>
                              <span className="text-muted-foreground text-xs">({plan.active_schools_count || 0} active)</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-[10px] font-semibold">{(plan.features || []).length} features</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={cn(
                              "text-[10px] font-semibold",
                              plan.is_active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            )}>
                              {plan.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={() => openView(plan)} className="gap-2 cursor-pointer">
                                  <Eye className="h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openEdit(plan)} className="gap-2 cursor-pointer">
                                  <Pencil className="h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setDeleteConfirm(plan)} className="gap-2 text-destructive cursor-pointer">
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
            )}
          </CardContent>
        </Card>
      </motion.div>

      {plans.length >= 2 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Plan Comparison</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 overflow-x-auto">
              {(() => {
                const allFeatures = [...new Set(plans.flatMap((p: any) => p.features || []))]
                return (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-semibold text-foreground">Feature</TableHead>
                        {plans.map((p: any) => (
                          <TableHead key={p.id} className="font-semibold text-foreground text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {(() => { const I = getStyle(p.name).icon; return <I className="h-3.5 w-3.5" /> })()}
                              {p.name}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allFeatures.map((feat) => (
                        <TableRow key={feat}>
                          <TableCell className="text-sm text-foreground font-medium">{feat}</TableCell>
                          {plans.map((p: any) => (
                            <TableCell key={p.id} className="text-center">
                              {(p.features || []).includes(feat)
                                ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                                : <span className="text-muted-foreground">—</span>
                              }
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="text-sm font-semibold text-foreground">Price</TableCell>
                        {plans.map((p: any) => (
                          <TableCell key={p.id} className="text-center text-sm font-semibold text-foreground">
                            ₹{Number(p.price).toLocaleString("en-IN")}/{p.period}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                )
              })()}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Delete Plan
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong className="text-foreground">{deleteConfirm?.name}</strong>?
            {deleteConfirm?.schools_count > 0 && (
              <span className="block mt-1 text-amber-600 font-medium">
                This plan has {deleteConfirm.schools_count} active school(s). They will lose their subscription.
              </span>
            )}
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)} disabled={deletePlan.isPending} className="rounded-xl">
              {deletePlan.isPending && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />} Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
