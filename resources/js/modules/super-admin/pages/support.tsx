import { useState, useRef, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  HeadphonesIcon,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CircleDot,
  Circle,
  CircleCheckBig,
  MessageSquare,
  Timer,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  Save,
  Send,
  Search,
  Building2,
  User,
  Tag,
  MessageCircle,
  Info,
  ImagePlus,
  X,
  ZoomIn,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn, formatDate } from "@/lib/utils"
import { StatCard } from "@/components/shared/stat-card"
import { TablePagination } from "@/components/shared/table-pagination"
import {
  useSupportTickets,
  useSupportTicket,
  useCreateSupportTicket,
  useUpdateTicket,
  useDeleteSupportTicket,
} from "@/lib/hooks"
import { toast } from "sonner"

const CATEGORIES = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing" },
  { value: "feature_request", label: "Feature Request" },
  { value: "bug", label: "Bug Report" },
  { value: "onboarding", label: "Onboarding" },
  { value: "other", label: "Other" },
]

const priorityConfig: Record<string, { label: string; color: string; icon: typeof AlertTriangle }> = {
  high: { label: "High", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", icon: AlertTriangle },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: Clock },
  low: { label: "Low", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: Circle },
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof CircleDot }> = {
  open: { label: "Open", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300", icon: CircleDot },
  in_progress: { label: "In Progress", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: Timer },
  resolved: { label: "Resolved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CircleCheckBig },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300", icon: XCircle },
}

const emptyForm = {
  subject: "",
  school_name: "",
  description: "",
  category: "",
  priority: "medium",
  assigned_to: "",
}

export function SupportTicketsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null)

  const { data, isLoading } = useSupportTickets({ per_page: "500" })
  const deleteTicket = useDeleteSupportTicket()

  const allTickets = data?.data || []
  const total = data?.total || 0

  const filteredTickets = allTickets.filter((t: any) => {
    if (tab !== "all" && t.status !== tab) return false
    if (search) {
      const q = search.toLowerCase()
      return (t.subject || "").toLowerCase().includes(q) ||
        (t.school_name || "").toLowerCase().includes(q) ||
        (t.last_message || "").toLowerCase().includes(q)
    }
    return true
  })

  const perPage = 10
  const lastPage = Math.ceil(filteredTickets.length / perPage) || 1
  const currentPage = Math.min(page, lastPage)
  const tickets = filteredTickets.slice((currentPage - 1) * perPage, currentPage * perPage)

  const openCount = allTickets.filter((t: any) => t.status === "open").length
  const inProgressCount = allTickets.filter((t: any) => t.status === "in_progress").length
  const resolvedCount = allTickets.filter((t: any) => t.status === "resolved").length
  const closedCount = allTickets.filter((t: any) => t.status === "closed").length

  const handleDelete = () => {
    if (!deleteConfirm) return
    deleteTicket.mutate(deleteConfirm.id, {
      onSuccess: () => { toast.success("Ticket deleted"); setDeleteConfirm(null) },
      onError: () => toast.error("Failed to delete ticket"),
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Manage support requests from schools. Track, prioritize, and resolve issues.
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200"
          onClick={() => navigate("/super-admin/support/new")}
        >
          <Plus className="h-4 w-4" /> New Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Open Tickets" value={String(openCount)} icon={<CircleDot className="h-6 w-6" />} description="needs attention" gradient="from-violet-500 to-purple-600" />
        <StatCard title="In Progress" value={String(inProgressCount)} icon={<Timer className="h-6 w-6" />} description="being worked on" gradient="from-amber-500 to-orange-600" />
        <StatCard title="Resolved" value={String(resolvedCount)} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue={`${tickets.length > 0 ? Math.round((resolvedCount / tickets.length) * 100) : 0}%`} description="resolution rate" gradient="from-emerald-500 to-teal-600" />
        <StatCard title="Total Tickets" value={String(total)} icon={<HeadphonesIcon className="h-6 w-6" />} description="all time" gradient="from-blue-500 to-indigo-600" />
      </div>

      {/* Ticket List */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Tickets</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  className="pl-9 w-64 rounded-xl h-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={tab} onValueChange={(v) => { setTab(v); setPage(1) }}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({allTickets.length})</TabsTrigger>
              <TabsTrigger value="open">Open ({openCount})</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress ({inProgressCount})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({resolvedCount})</TabsTrigger>
              <TabsTrigger value="closed">Closed ({closedCount})</TabsTrigger>
            </TabsList>

            <TabsContent value={tab}>
              {tickets.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <HeadphonesIcon className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No tickets found</p>
                  <p className="text-sm mt-1">Try adjusting your filters or create a new ticket</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {tickets.map((ticket: any, index: number) => {
                    const priority = priorityConfig[ticket.priority] || priorityConfig.medium
                    const status = statusConfig[ticket.status] || statusConfig.open
                    const PriorityIcon = priority.icon
                    const StatusIcon = status.icon

                    return (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className="rounded-xl border border-border p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        onClick={() => navigate(`/super-admin/support/${ticket.id}`)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                ticket.status === "resolved"
                                  ? "bg-emerald-50 dark:bg-emerald-900/20"
                                  : ticket.priority === "high"
                                    ? "bg-red-50 dark:bg-red-900/20"
                                    : "bg-violet-50 dark:bg-violet-900/20"
                              )}
                            >
                              <HeadphonesIcon
                                className={cn(
                                  "h-5 w-5",
                                  ticket.status === "resolved"
                                    ? "text-emerald-500"
                                    : ticket.priority === "high"
                                      ? "text-red-500"
                                      : "text-violet-500"
                                )}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                  TKT-{String(ticket.id).padStart(3, "0")}
                                </code>
                                <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", priority.color)}>
                                  <PriorityIcon className="h-3 w-3" /> {priority.label}
                                </Badge>
                                <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", status.color)}>
                                  <StatusIcon className="h-3 w-3" /> {status.label}
                                </Badge>
                                {ticket.category && (
                                  <Badge variant="outline" className="text-[10px] font-medium">
                                    {ticket.category.replace("_", " ")}
                                  </Badge>
                                )}
                              </div>
                              <h4 className="text-sm font-semibold mt-1.5 group-hover:text-violet-600 transition-colors">
                                {ticket.subject}
                              </h4>
                              {ticket.last_message && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{ticket.last_message}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-5 shrink-0">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">School</p>
                              <p className="text-sm font-medium">{ticket.school_name}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Created</p>
                              <p className="text-sm font-medium flex items-center gap-1 justify-end">
                                <Clock className="h-3 w-3" /> {formatDate(ticket.created_at)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span className="text-xs font-medium">{ticket.message_count || 0}</span>
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44">
                                  <DropdownMenuItem onClick={() => navigate(`/super-admin/support/${ticket.id}`)} className="gap-2 cursor-pointer">
                                    <Eye className="h-4 w-4" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => navigate(`/super-admin/support/${ticket.id}/edit`)} className="gap-2 cursor-pointer">
                                    <Pencil className="h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => setDeleteConfirm(ticket)} className="gap-2 text-destructive cursor-pointer">
                                    <Trash2 className="h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
              {filteredTickets.length > perPage && (
                <div className="mt-6">
                  <TablePagination currentPage={currentPage} totalPages={lastPage} totalItems={filteredTickets.length} perPage={perPage} onPageChange={setPage} />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(v) => { if (!v) setDeleteConfirm(null) }}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Delete Ticket
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>TKT-{String(deleteConfirm?.id).padStart(3, "0")}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteTicket.isPending} className="rounded-xl gap-2">
              {deleteTicket.isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              Delete Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// ─── Full Page Create / Edit ──────────────────────
export function SupportTicketFormPage({ ticketId: propId }: { ticketId?: string } = {}) {
  const navigate = useNavigate()
  const { ticketId: paramId } = useParams()
  const ticketId = propId || paramId
  const isEdit = !!ticketId
  const { data: existingTicket, isLoading: loadingTicket } = useSupportTicket(ticketId || "")
  const createTicket = useCreateSupportTicket()
  const updateTicket = useUpdateTicket()

  const [form, setForm] = useState(() => {
    if (existingTicket) {
      return {
        subject: existingTicket.subject || "",
        school_name: existingTicket.school_name || "",
        description: existingTicket.description || "",
        category: existingTicket.category || "",
        priority: existingTicket.priority || "medium",
        assigned_to: existingTicket.assigned_to ? String(existingTicket.assigned_to) : "",
      }
    }
    return emptyForm
  })

  const [replyMessage, setReplyMessage] = useState("")
  const [images, setImages] = useState<string[]>(existingTicket?.images || [])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const maxSize = 5 * 1024 * 1024
    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 5MB limit`)
        return
      }
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`)
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!form.subject.trim() || !form.school_name.trim()) return

    if (isEdit && ticketId) {
      const payload: any = {
        subject: form.subject.trim(),
        school_name: form.school_name.trim(),
        description: form.description.trim() || null,
        category: form.category || null,
        priority: form.priority,
        assigned_to: form.assigned_to ? Number(form.assigned_to) : null,
        images: images,
      }
      if (replyMessage.trim()) {
        payload.last_message = replyMessage.trim()
      }
      updateTicket.mutate(
        { id: ticketId, data: payload },
        {
          onSuccess: () => { toast.success("Ticket updated"); navigate("/super-admin/support") },
          onError: () => toast.error("Failed to update ticket"),
        }
      )
    } else {
      createTicket.mutate(
        {
          subject: form.subject.trim(),
          school_name: form.school_name.trim(),
          description: form.description.trim() || null,
          category: form.category || null,
          priority: form.priority,
          assigned_to: form.assigned_to ? Number(form.assigned_to) : null,
          images: images,
        },
        {
          onSuccess: () => { toast.success("Ticket created"); navigate("/super-admin/support") },
          onError: () => toast.error("Failed to create ticket"),
        }
      )
    }
  }

  if (isEdit && loadingTicket) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const selectedPriority = priorityConfig[form.priority] || priorityConfig.medium
  const SelectedPriorityIcon = selectedPriority.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-2 rounded-xl" onClick={() => navigate("/super-admin/support")}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isEdit ? "Edit Ticket" : "New Support Ticket"}</h1>
          <p className="text-muted-foreground mt-1">
            {isEdit ? "Update ticket details and add a reply." : "Create a new support ticket for a school."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form — left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Subject *</Label>
                <Input
                  placeholder="e.g. Login Issues — Cannot access admin panel"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>School Name *</Label>
                  <Input
                    placeholder="e.g. Gurukul Academy"
                    value={form.school_name}
                    onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Priority *</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high" className="gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" /> High
                    </SelectItem>
                    <SelectItem value="medium" className="gap-2">
                      <Clock className="h-4 w-4 text-amber-500" /> Medium
                    </SelectItem>
                    <SelectItem value="low" className="gap-2">
                      <Circle className="h-4 w-4 text-blue-500" /> Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the issue or request in detail..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="rounded-xl min-h-[120px]"
                  rows={5}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" /> Screenshots / Images
                </Label>
                <p className="text-xs text-muted-foreground">Upload screenshots to help describe the issue. Max 5MB per image.</p>
                <div
                  className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">PNG, JPG, GIF up to 5MB each</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-border">
                        <img
                          src={img.startsWith("data:") ? img : `/storage/${img}`}
                          alt={`Upload ${i + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setImagePreview(img) }}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                          >
                            <ZoomIn className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeImage(i) }}
                            className="p-1.5 rounded-lg bg-red-500/60 hover:bg-red-500/80 text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isEdit && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> Add Reply
                    </Label>
                    <Textarea
                      placeholder="Type a reply to this ticket..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="rounded-xl min-h-[80px]"
                      rows={3}
                    />
                  </div>
                </>
              )}
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
                form.priority === "high" ? "bg-red-100 dark:bg-red-900/20" : "bg-violet-100 dark:bg-violet-900/20"
              )}>
                <HeadphonesIcon className={cn("h-7 w-7", form.priority === "high" ? "text-red-500" : "text-violet-500")} />
              </div>

              <div>
                <h3 className="text-lg font-semibold">{form.subject || "Untitled Ticket"}</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="secondary" className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 text-xs gap-1">
                    <CircleDot className="h-3 w-3" /> Open
                  </Badge>
                  <Badge variant="secondary" className={cn("text-xs gap-1", selectedPriority.color)}>
                    <SelectedPriorityIcon className="h-3 w-3" /> {selectedPriority.label}
                  </Badge>
                  {form.category && (
                    <Badge variant="outline" className="text-xs">{form.category.replace("_", " ")}</Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> School</span>
                  <span className="font-medium">{form.school_name || "—"}</span>
                </div>
                {form.description && (
                  <div>
                    <p className="text-muted-foreground mb-1">Description</p>
                    <p className="text-foreground/80 text-xs leading-relaxed">{form.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/super-admin/support")} className="rounded-xl">Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!form.subject.trim() || !form.school_name.trim() || createTicket.isPending || updateTicket.isPending}
          className="rounded-xl gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8"
        >
          {(createTicket.isPending || updateTicket.isPending) && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
          <Save className="h-4 w-4" />
          {isEdit ? "Save Changes" : "Create Ticket"}
        </Button>
      </div>

      {/* Image Preview Lightbox */}
      <Dialog open={!!imagePreview} onOpenChange={(v) => { if (!v) setImagePreview(null) }}>
        <DialogContent className="sm:max-w-3xl p-0 bg-black border-0">
          {imagePreview && (
            <div className="relative">
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={imagePreview.startsWith("data:") ? imagePreview : `/storage/${imagePreview}`}
                alt="Preview"
                className="w-full rounded-2xl max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// ─── Full Page View ──────────────────────────────
export function SupportTicketViewPage({ ticketId: propId }: { ticketId?: string } = {}) {
  const navigate = useNavigate()
  const { ticketId: paramId } = useParams()
  const ticketId = propId || paramId || ""
  const { data: ticket, isLoading } = useSupportTicket(ticketId)
  const updateTicket = useUpdateTicket()
  const [replyMessage, setReplyMessage] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  if (isLoading || !ticket) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const priority = priorityConfig[ticket.priority] || priorityConfig.medium
  const status = statusConfig[ticket.status] || statusConfig.open
  const PriorityIcon = priority.icon
  const StatusIcon = status.icon
  const category = CATEGORIES.find((c) => c.value === ticket.category)

  const handleStatusChange = (newStatus: string) => {
    updateTicket.mutate(
      { id: ticketId, data: { status: newStatus } },
      {
        onSuccess: () => toast.success("Status updated"),
        onError: () => toast.error("Failed to update status"),
      }
    )
  }

  const handleReply = () => {
    if (!replyMessage.trim()) return
    updateTicket.mutate(
      { id: ticketId, data: { last_message: replyMessage.trim() } },
      {
        onSuccess: () => { toast.success("Reply sent"); setReplyMessage("") },
        onError: () => toast.error("Failed to send reply"),
      }
    )
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
          <Button variant="ghost" size="sm" className="gap-2 rounded-xl" onClick={() => navigate("/super-admin/support")}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                TKT-{String(ticket.id).padStart(3, "0")}
              </code>
              <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", priority.color)}>
                <PriorityIcon className="h-3 w-3" /> {priority.label}
              </Badge>
              <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", status.color)}>
                <StatusIcon className="h-3 w-3" /> {status.label}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mt-1">{ticket.subject}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={ticket.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-40 rounded-xl h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open" className="gap-2"><CircleDot className="h-3.5 w-3.5" /> Open</SelectItem>
              <SelectItem value="in_progress" className="gap-2"><Timer className="h-3.5 w-3.5" /> In Progress</SelectItem>
              <SelectItem value="resolved" className="gap-2"><CircleCheckBig className="h-3.5 w-3.5" /> Resolved</SelectItem>
              <SelectItem value="closed" className="gap-2"><XCircle className="h-3.5 w-3.5" /> Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl gap-2" onClick={() => navigate(`/super-admin/support/${ticketId}/edit`)}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main — left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {ticket.description || "No description provided."}
              </p>
            </CardContent>
          </Card>

          {/* Attached Images */}
          {ticket.images && ticket.images.length > 0 && (
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" /> Attached Images ({ticket.images.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ticket.images.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="relative group rounded-xl overflow-hidden border border-border cursor-pointer"
                      onClick={() => setImagePreview(img)}
                    >
                      <img
                        src={img.startsWith("data:") ? img : `/storage/${img}`}
                        alt={`Attachment ${i + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Latest Message */}
          {ticket.last_message && (
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Latest Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{ticket.last_message}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">{ticket.message_count || 1} total messages</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Reply */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Send className="h-4 w-4" /> Add Reply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Type a reply to this ticket..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="rounded-xl min-h-[80px]"
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleReply}
                  disabled={!replyMessage.trim() || updateTicket.isPending}
                  className="rounded-xl gap-2"
                >
                  {updateTicket.isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                  <Send className="h-4 w-4" /> Send Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — right 1/3 */}
        <div className="space-y-6">
          {/* Details */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/20">
                  <HeadphonesIcon className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">TKT-{String(ticket.id).padStart(3, "0")}</p>
                  <p className="text-xs text-muted-foreground">Ticket ID</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> School</span>
                  <span className="font-medium">{ticket.school_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> Category</span>
                  <span className="font-medium">{category?.label || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Priority</span>
                  <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", priority.color)}>
                    <PriorityIcon className="h-3 w-3" /> {priority.label}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><StatusIcon className="h-3.5 w-3.5" /> Status</span>
                  <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", status.color)}>
                    <StatusIcon className="h-3 w-3" /> {status.label}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> Messages</span>
                  <span className="font-medium">{ticket.message_count || 1}</span>
                </div>
                {ticket.images && ticket.images.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5"><ImagePlus className="h-3.5 w-3.5" /> Images</span>
                    <span className="font-medium">{ticket.images.length}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Assigned To</span>
                  <span className="font-medium">{ticket.assigned_to ? `User #${ticket.assigned_to}` : "Unassigned"}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{formatDate(ticket.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="font-medium">{formatDate(ticket.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Preview Lightbox */}
      <Dialog open={!!imagePreview} onOpenChange={(v) => { if (!v) setImagePreview(null) }}>
        <DialogContent className="sm:max-w-3xl p-0 bg-black border-0">
          {imagePreview && (
            <div className="relative">
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={imagePreview.startsWith("data:") ? imagePreview : `/storage/${imagePreview}`}
                alt="Preview"
                className="w-full rounded-2xl max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
