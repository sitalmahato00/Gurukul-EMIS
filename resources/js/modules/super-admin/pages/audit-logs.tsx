import {
  ShieldCheck,
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  LogIn,
  FileDown,
  RefreshCw,
  Settings,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useState, useCallback } from "react"
import { useAuditLogs } from "@/lib/hooks"
import { toast } from "sonner"

type AuditStatus = "success" | "failed" | "pending"

const statusConfig: Record<AuditStatus, { color: string; bg: string; icon: typeof CheckCircle2; label: string }> = {
  success: { color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-900/30", icon: CheckCircle2, label: "Success" },
  failed: { color: "text-red-700 dark:text-red-300", bg: "bg-red-50 dark:bg-red-900/30", icon: Trash2, label: "Failed" },
  pending: { color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-900/30", icon: Clock, label: "Pending" },
}

const actionIcons: Record<string, typeof Plus> = {
  create: Plus,
  update: Pencil,
  delete: Trash2,
  auth: LogIn,
  export: FileDown,
}

const PAGE_SIZE = 10

export function AuditLogsPage() {
  const [page, setPage] = useState(1)
  const [actionFilter, setActionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const { data, isLoading, refetch, isFetching } = useAuditLogs({
    page: String(page),
    per_page: String(PAGE_SIZE),
    action_type: actionFilter,
    status: statusFilter,
    search: searchQuery,
    date_from: dateFrom,
    date_to: dateTo,
  })

  const allLogs = data?.data || []
  const total = data?.total || 0
  const lastPage = data?.lastPage || 1
  const summary = data?.summary || {}

  const totalPages = Math.max(lastPage, 1)

  const handleSearch = useCallback(() => {
    setSearchQuery(searchInput)
    setPage(1)
  }, [searchInput])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const handleExport = () => {
    const BOM = "\uFEFF"
    const csv = [
      "Timestamp,User,Action,Resource,IP Address,Status,Action Type",
      ...allLogs.map((log: any) => {
        const ts = log.created_at ? new Date(log.created_at).toLocaleString("en-IN") : ""
        return `"${ts}","${log.user_name || ""}","${(log.action || "").replace(/"/g, '""')}","${log.resource || ""}","${log.ip_address || ""}","${log.status || ""}","${log.action_type || ""}"`
      }),
    ].join("\n")

    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `audit-logs-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Audit logs exported successfully")
  }

  const handleRefresh = () => {
    refetch()
    toast.success("Audit logs refreshed")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track every action across the platform for security and compliance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={cn("relative flex h-2.5 w-2.5")}>
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isFetching ? "bg-emerald-400" : "bg-emerald-400")} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            {isFetching ? "Refreshing..." : "Live"}
          </div>
          <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={handleRefresh} disabled={isFetching}>
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={handleExport} disabled={allLogs.length === 0}>
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {[
          { label: "Total", value: summary.total ?? total, color: "from-slate-500 to-gray-600", icon: ShieldCheck },
          { label: "Create", value: summary.create ?? 0, color: "from-emerald-500 to-green-600", icon: Plus },
          { label: "Update", value: summary.update ?? 0, color: "from-blue-500 to-indigo-600", icon: Pencil },
          { label: "Delete", value: summary.delete ?? 0, color: "from-red-500 to-rose-600", icon: Trash2 },
          { label: "Auth", value: summary.auth ?? 0, color: "from-violet-500 to-purple-600", icon: LogIn },
          { label: "Export", value: summary.export ?? 0, color: "from-amber-500 to-orange-600", icon: FileDown },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-lg rounded-2xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shrink-0", stat.color)}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, action, or resource..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="rounded-xl h-11 pl-9"
              />
            </div>
            <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={handleSearch}>
              <Search className="h-3.5 w-3.5" />
              Search
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={actionFilter} onValueChange={(v) => { setActionFilter(v); setPage(1) }}>
                  <SelectTrigger className="w-36 rounded-xl h-11">
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="auth">Authentication</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
                <SelectTrigger className="w-32 rounded-xl h-11">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setPage(1) }}
                className="rounded-xl h-11 w-36"
                placeholder="From"
              />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setPage(1) }}
                className="rounded-xl h-11 w-36"
                placeholder="To"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Table */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardContent className="pt-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-2">User</div>
            <div className="col-span-2">Action</div>
            <div className="col-span-3">Resource</div>
            <div className="col-span-2">IP Address</div>
            <div className="col-span-1 text-right">Status</div>
          </div>
          <Separator className="mb-1" />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-0.5">
              {allLogs.map((entry: any, index: number) => {
                const status = statusConfig[entry.status as AuditStatus] || statusConfig.success
                const ActionIcon = actionIcons[entry.action_type] || Settings

                const ts = entry.created_at
                  ? new Date(entry.created_at).toLocaleString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })
                  : "—"

                return (
                  <motion.div
                    key={entry.id || index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="grid grid-cols-12 gap-4 items-center rounded-xl px-4 py-3.5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="col-span-2 text-xs font-mono text-muted-foreground">
                      {ts}
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm font-medium">{entry.user_name}</span>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-md",
                          entry.action_type === "create" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                          entry.action_type === "update" && "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                          entry.action_type === "delete" && "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                          entry.action_type === "auth" && "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
                          entry.action_type === "export" && "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                        )}>
                          <ActionIcon className="h-3 w-3" />
                        </div>
                        <span className="text-sm">{entry.action}</span>
                      </div>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground truncate">
                      {entry.resource}
                    </div>
                    <div className="col-span-2 text-xs font-mono text-muted-foreground">
                      {entry.ip_address}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Badge variant="secondary" className={cn("text-[10px] font-semibold px-2 py-0 gap-1", status.bg, status.color)}>
                        <status.icon className="h-2.5 w-2.5" />
                        {status.label}
                      </Badge>
                    </div>
                  </motion.div>
                )
              })}

              {allLogs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <ShieldCheck className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">No audit entries found</p>
                  <p className="text-xs mt-1">
                    {searchQuery || actionFilter !== "all" || statusFilter !== "all" || dateFrom || dateTo
                      ? "Try adjusting your filters"
                      : "Audit logs will appear as actions are performed on the platform"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {total > 0 && (
            <div className="flex items-center justify-between pt-6">
              <p className="text-sm text-muted-foreground">
                Showing {allLogs.length} of {total} entries
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let p: number
                  if (totalPages <= 5) {
                    p = i + 1
                  } else if (page <= 3) {
                    p = i + 1
                  } else if (page >= totalPages - 2) {
                    p = totalPages - 4 + i
                  } else {
                    p = page - 2 + i
                  }
                  return p
                }).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    className={cn("rounded-xl w-9 h-9", p === page && "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md")}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
