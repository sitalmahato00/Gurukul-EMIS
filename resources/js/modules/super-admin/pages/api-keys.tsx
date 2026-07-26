import { useState } from "react"
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Pencil,
  Activity,
  Clock,
  CheckCircle2,
  Info,
  Smartphone,
  Globe,
  Fingerprint,
  CreditCard,
  Building2,
  Users,
  Server,
  Eye,
  MoreHorizontal,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Save,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn, formatDate, formatNumber } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StatCard } from "@/components/shared/stat-card"
import {
  useApiKeys,
  useCreateApiKey,
  useUpdateApiKey,
  useDeleteApiKey,
  useToggleApiKeyStatus,
  useSchools,
} from "@/lib/hooks"
import { toast } from "sonner"

const DEVICE_TYPES = [
  { value: "web", label: "Web Application", icon: Globe, color: "text-blue-500" },
  { value: "mobile", label: "Mobile App", icon: Smartphone, color: "text-violet-500" },
  { value: "attendance_device", label: "Attendance Device", icon: Fingerprint, color: "text-emerald-500" },
  { value: "accounting_software", label: "Accounting Software", icon: CreditCard, color: "text-amber-500" },
  { value: "government_portal", label: "Government Portal", icon: Building2, color: "text-red-500" },
  { value: "parent_app", label: "Parent App", icon: Users, color: "text-pink-500" },
  { value: "other", label: "Other", icon: Server, color: "text-gray-500" },
]

function getDeviceIcon(type: string) {
  return DEVICE_TYPES.find((d) => d.value === type) || DEVICE_TYPES[6]
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  toast.success("API key copied to clipboard")
}

const emptyForm = {
  name: "",
  school_id: "",
  device_type: "web",
  rate_limit: "1000",
  description: "",
}

export function ApiKeysPage() {
  const { data, isLoading } = useApiKeys()
  const createKey = useCreateApiKey()
  const updateKey = useUpdateApiKey()
  const deleteKey = useDeleteApiKey()
  const toggleStatus = useToggleApiKeyStatus()
  const { data: schoolsData } = useSchools({ per_page: "200" })

  const [mode, setMode] = useState<"list" | "create" | "edit" | "view">("list")
  const [selectedKey, setSelectedKey] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null)
  const [revealKey, setRevealKey] = useState<Record<string, boolean>>({})

  const apiKeys = data?.data || []
  const summary = data?.summary || {}
  const schools = Array.isArray(schoolsData?.data) ? schoolsData.data : []

  const handleCopy = (key: string) => copyToClipboard(key)

  const handleToggle = (id: number | string) => {
    toggleStatus.mutate(id, {
      onSuccess: () => toast.success("API key status updated"),
      onError: () => toast.error("Failed to update status"),
    })
  }

  const handleDelete = () => {
    if (!deleteConfirm) return
    deleteKey.mutate(deleteConfirm.id, {
      onSuccess: () => { toast.success("API key deleted"); setDeleteConfirm(null) },
      onError: () => toast.error("Failed to delete API key"),
    })
  }

  const openView = (key: any) => { setSelectedKey(key); setMode("view") }
  const openEdit = (key: any) => { setSelectedKey(key); setMode("edit") }

  if (mode === "create" || mode === "edit") {
    return (
      <ApiKeyFormPage
        editData={mode === "edit" ? selectedKey : null}
        schools={schools}
        onBack={() => { setMode("list"); setSelectedKey(null) }}
        onSubmit={(values) => {
          if (mode === "edit" && selectedKey) {
            updateKey.mutate(
              { id: selectedKey.id, ...values },
              {
                onSuccess: () => { toast.success("API key updated"); setMode("list"); setSelectedKey(null) },
                onError: () => toast.error("Failed to update API key"),
              }
            )
          } else {
            createKey.mutate(values, {
              onSuccess: (res) => { toast.success("API key created"); setSelectedKey(res?.data); setMode("view") },
              onError: () => toast.error("Failed to create API key"),
            })
          }
        }}
        isPending={createKey.isPending || updateKey.isPending}
      />
    )
  }

  if (mode === "view" && selectedKey) {
    return (
      <ApiKeyViewPage
        apiKey={selectedKey}
        schools={schools}
        onBack={() => { setMode("list"); setSelectedKey(null) }}
        onEdit={() => setMode("edit")}
        onDelete={() => setDeleteConfirm(selectedKey)}
      />
    )
  }

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground mt-1">
            Manage API keys for third-party integrations, mobile apps, and external devices.
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200"
          onClick={() => { setSelectedKey(null); setMode("create") }}
        >
          <Plus className="h-4 w-4" /> Generate New Key
        </Button>
      </div>

      {/* Info Card */}
      <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-100 dark:border-violet-800/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <Info className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-violet-900 dark:text-violet-100">API Key Management</h3>
              <p className="text-sm text-violet-700 dark:text-violet-300 mt-1">
                Create and manage API keys for integrations — mobile apps, attendance devices,
                accounting software, government portals, and more.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Keys" value={String(summary.total || 0)} icon={<Key className="h-6 w-6" />} description="all API keys" gradient="from-violet-500 to-purple-600" />
        <StatCard title="Active Keys" value={String(summary.active || 0)} icon={<CheckCircle2 className="h-6 w-6" />} description="currently in use" gradient="from-emerald-500 to-teal-600" />
        <StatCard title="Inactive Keys" value={String(summary.inactive || 0)} icon={<XCircle className="h-6 w-6" />} description="temporarily disabled" gradient="from-amber-500 to-orange-600" />
        <StatCard title="Total API Calls" value={formatNumber(summary.total_calls || 0)} icon={<Activity className="h-6 w-6" />} description="across all keys" gradient="from-blue-500 to-indigo-600" />
      </div>

      {/* API Keys List */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">API Keys</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {apiKeys.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Key className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No API keys yet</p>
              <p className="text-sm mt-1">Generate your first key to start integrating</p>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key: any, index: number) => {
                const device = getDeviceIcon(key.device_type)
                const DeviceIcon = device.icon
                const isRevealed = revealKey[key.id]

                return (
                  <motion.div
                    key={key.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className={cn(
                      "rounded-xl border p-4 transition-all duration-200 hover:shadow-md cursor-pointer",
                      key.status === "active"
                        ? "border-border bg-card"
                        : key.status === "inactive"
                          ? "border-amber-200 dark:border-amber-800/30 bg-amber-50/30 dark:bg-amber-900/5"
                          : "border-border/50 bg-muted/30 opacity-60"
                    )}
                    onClick={() => openView(key)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        <div className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          key.status === "active" ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white" : "bg-muted text-muted-foreground"
                        )}>
                          <DeviceIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-semibold">{key.name}</h4>
                            <Badge variant="secondary" className={cn(
                              "text-[10px] font-medium gap-1",
                              key.status === "active" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
                              key.status === "inactive" && "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
                              key.status === "revoked" && "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
                            )}>
                              {key.status === "active" && <CheckCircle2 className="h-3 w-3" />}
                              {key.status === "inactive" && <XCircle className="h-3 w-3" />}
                              {key.status === "revoked" && <AlertTriangle className="h-3 w-3" />}
                              {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] font-medium gap-1">
                              <DeviceIcon className={cn("h-3 w-3", device.color)} />
                              {device.label}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3 mt-1.5">
                            <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded-md max-w-[300px] truncate">
                              {isRevealed ? key.key : (key.key ? key.key.slice(0, 12) + "••••••••••••" : "ak_****...****")}
                            </code>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1" onClick={(e) => { e.stopPropagation(); setRevealKey((prev) => ({ ...prev, [key.id]: !prev[key.id] })) }}>
                              <Eye className="h-3 w-3" /> {isRevealed ? "Hide" : "Reveal"}
                            </Button>
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            {key.school?.name ? (
                              <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {key.school.name}</span>
                            ) : (
                              <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Platform-wide</span>
                            )}
                            <span>{key.rate_limit} req/min</span>
                            <span>{formatNumber(key.total_calls || 0)} calls</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {key.last_used_at ? formatDate(key.last_used_at) : "Never used"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right side actions */}
                      <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={key.status === "active"}
                            onCheckedChange={() => handleToggle(key.id)}
                            disabled={toggleStatus.isPending}
                          />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {key.status === "active" ? "Active" : key.status === "revoked" ? "Revoked" : "Inactive"}
                          </span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem onClick={() => handleCopy(key.key)} className="gap-2 cursor-pointer">
                              <Copy className="h-4 w-4" /> Copy Key
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEdit(key)} className="gap-2 cursor-pointer">
                              <Pencil className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openView(key)} className="gap-2 cursor-pointer">
                              <Eye className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setDeleteConfirm(key)} className="gap-2 text-destructive cursor-pointer">
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(v) => { if (!v) setDeleteConfirm(null) }}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Delete API Key
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? This action cannot be undone and any
            integrations using this key will stop working immediately.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteKey.isPending} className="rounded-xl gap-2">
              {deleteKey.isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              Delete Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// ─── Full Page Create / Edit ──────────────────────
function ApiKeyFormPage({
  editData,
  schools,
  onBack,
  onSubmit,
  isPending,
}: {
  editData: any | null
  schools: any[]
  onBack: () => void
  onSubmit: (values: any) => void
  isPending: boolean
}) {
  const isEdit = !!editData
  const [form, setForm] = useState(() => {
    if (editData) {
      return {
        name: editData.name || "",
        school_id: editData.school_id ? String(editData.school_id) : "",
        device_type: editData.device_type || "web",
        rate_limit: String(editData.rate_limit || 1000),
        description: editData.description || "",
      }
    }
    return emptyForm
  })

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onSubmit({
      name: form.name.trim(),
      school_id: form.school_id ? Number(form.school_id) : null,
      device_type: form.device_type,
      rate_limit: Number(form.rate_limit) || 1000,
      description: form.description.trim() || null,
    })
  }

  const selectedDevice = getDeviceIcon(form.device_type)
  const DeviceIcon = selectedDevice.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-2 rounded-xl" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isEdit ? "Edit API Key" : "Generate New API Key"}</h1>
          <p className="text-muted-foreground mt-1">
            {isEdit ? "Update the configuration for this API key." : "Create a new API key for third-party integrations."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form — left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Key Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  placeholder="e.g. Attendance Device Key"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Device Type *</Label>
                <Select value={form.device_type} onValueChange={(v) => setForm({ ...form, device_type: v })}>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEVICE_TYPES.map((dt) => (
                      <SelectItem key={dt.value} value={dt.value} className="gap-2">
                        <dt.icon className={cn("h-4 w-4", dt.color)} /> {dt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Rate Limit (requests per minute)</Label>
                <Input
                  type="number"
                  min="1"
                  max="100000"
                  value={form.rate_limit}
                  onChange={(e) => setForm({ ...form, rate_limit: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Assign to School</Label>
                <Select value={form.school_id} onValueChange={(v) => setForm({ ...form, school_id: v })}>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Platform-wide (all schools)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Platform-wide (all schools)</SelectItem>
                    {schools.map((s: any) => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="What is this key used for? e.g. Used by the school's attendance biometric device"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="rounded-xl min-h-[80px]"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview — right 1/3 */}
        <div className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl",
                "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
              )}>
                <DeviceIcon className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">{form.name || "Untitled Key"}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <DeviceIcon className={cn("h-3 w-3", selectedDevice.color)} /> {selectedDevice.label}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">School</span>
                  <span className="font-medium">{form.school_id ? schools.find((s: any) => String(s.id) === form.school_id)?.name || "—" : "Platform-wide"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate Limit</span>
                  <span className="font-medium">{form.rate_limit || "1000"} req/min</span>
                </div>
                {form.description && (
                  <div>
                    <p className="text-muted-foreground mb-1">Description</p>
                    <p className="text-foreground/80">{form.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onBack} className="rounded-xl">Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!form.name.trim() || isPending}
          className="rounded-xl gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8"
        >
          {isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
          <Save className="h-4 w-4" />
          {isEdit ? "Save Changes" : "Generate Key"}
        </Button>
      </div>
    </motion.div>
  )
}

// ─── Full Page View ──────────────────────────────
function ApiKeyViewPage({
  apiKey,
  schools: _schools,
  onBack,
  onEdit,
  onDelete,
}: {
  apiKey: any
  schools: any[]
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const toggleStatus = useToggleApiKeyStatus()

  const device = getDeviceIcon(apiKey.device_type)
  const DeviceIcon = device.icon

  const handleToggle = () => {
    toggleStatus.mutate(apiKey.id, {
      onSuccess: () => toast.success("API key status updated"),
      onError: () => toast.error("Failed to update status"),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2 rounded-xl" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{apiKey.name}</h1>
            <p className="text-muted-foreground mt-1">API key details and configuration</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {apiKey.status !== "revoked" && (
            <div className="flex items-center gap-2">
              <Switch
                checked={apiKey.status === "active"}
                onCheckedChange={handleToggle}
                disabled={toggleStatus.isPending}
              />
              <span className="text-sm text-muted-nowrap">
                {apiKey.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          )}
          <Button variant="outline" className="rounded-xl gap-2" onClick={onEdit}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" className="rounded-xl gap-2" onClick={onDelete}>
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main info — left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Value */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">API Key</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono bg-muted px-4 py-2.5 rounded-xl flex-1 break-all">{apiKey.key}</code>
                <Button variant="outline" className="shrink-0 gap-2 rounded-xl" onClick={() => copyToClipboard(apiKey.key)}>
                  <Copy className="h-4 w-4" /> Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-medium">{apiKey.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="secondary" className={cn(
                    "text-xs font-medium gap-1",
                    apiKey.status === "active" && "bg-emerald-50 text-emerald-700",
                    apiKey.status === "inactive" && "bg-amber-50 text-amber-700",
                    apiKey.status === "revoked" && "bg-red-50 text-red-700",
                  )}>
                    {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Device Type</p>
                  <div className="flex items-center gap-2">
                    <DeviceIcon className={cn("h-4 w-4", device.color)} />
                    <span className="text-sm font-medium">{device.label}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">School</p>
                  <p className="text-sm font-medium">{apiKey.school?.name || "Platform-wide"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Rate Limit</p>
                  <p className="text-sm font-medium">{apiKey.rate_limit} req/min</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total API Calls</p>
                  <p className="text-sm font-medium">{formatNumber(apiKey.total_calls || 0)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">{formatDate(apiKey.created_at)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Used</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {apiKey.last_used_at ? formatDate(apiKey.last_used_at) : "Never"}
                  </p>
                </div>
              </div>

              {apiKey.description && (
                <>
                  <Separator className="my-5" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{apiKey.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — right 1/3 */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Usage Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                  <DeviceIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold">{formatNumber(apiKey.total_calls || 0)}</p>
                  <p className="text-xs text-muted-foreground">Total API Calls</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-lg font-bold">{apiKey.rate_limit}</p>
                  <p className="text-xs text-muted-foreground">Rate Limit</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-lg font-bold">{apiKey.total_calls || 0}</p>
                  <p className="text-xs text-muted-foreground">Total Calls</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
            <CardContent className="p-5">
              <h4 className="text-sm font-semibold mb-2">How to use this key</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Include this key in the <code className="bg-muted px-1 py-0.5 rounded">X-API-Key</code> header of your API requests:
              </p>
              <code className="text-[11px] font-mono bg-background px-3 py-2 rounded-lg block break-all">
                {`curl -H "X-API-Key: ${apiKey.key?.slice(0, 16)}..." /api/v1/...`}
              </code>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
