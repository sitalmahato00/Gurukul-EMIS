import {
  ScrollText,
  Search,
  Download,
  RefreshCw,
  Info,
  AlertTriangle,
  XCircle,
  Skull,
  Filter,
  Clock,
  Server,
  Database,
  Shield,
  Users,
  CreditCard,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { TablePagination } from "@/components/shared/table-pagination"
import { useState, useCallback, useMemo } from "react"
import { useSystemLogs } from "@/lib/hooks"
import { toast } from "sonner"

const levelConfig: Record<string, { color: string; bg: string; icon: typeof Info; label: string }> = {
  info: { color: "text-blue-700 dark:text-blue-300", bg: "bg-blue-50 dark:bg-blue-900/30", icon: Info, label: "Info" },
  warning: { color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-900/30", icon: AlertTriangle, label: "Warning" },
  error: { color: "text-red-700 dark:text-red-300", bg: "bg-red-50 dark:bg-red-900/30", icon: XCircle, label: "Error" },
  critical: { color: "text-purple-700 dark:text-purple-300", bg: "bg-purple-50 dark:bg-purple-900/30", icon: Skull, label: "Critical" },
}

const sourceIcons: Record<string, typeof Server> = {
  "Auth Service": Shield,
  "API Gateway": Server,
  "Payment Service": CreditCard,
  "Database": Database,
  "User Service": Users,
  "Storage Service": Database,
  "Email Service": ScrollText,
  "Scheduler": Clock,
  "School Service": Users,
  "Report Service": ScrollText,
  "CDN": Server,
  "Integration Service": Server,
  "Notification Service": ScrollText,
  "Application": Server,
}

export function SystemLogsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 25

  const { data, isLoading, refetch, isFetching } = useSystemLogs({
    level: activeTab,
    search: searchQuery,
    lines: 200,
  })

  const logs = data?.logs || []
  const summary = data?.summary || { total: 0, info: 0, warning: 0, error: 0, critical: 0 }

  const totalPages = Math.ceil(logs.length / perPage)
  const paginatedLogs = useMemo(() => logs.slice((page - 1) * perPage, page * perPage), [logs, page, perPage])

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
      "Timestamp,Level,Source,Channel,Message",
      ...logs.map((log: any) => {
        const ts = log.timestamp ? new Date(log.timestamp).toLocaleString("en-IN") : ""
        return `"${ts}","${log.level || ""}","${log.source || ""}","${log.channel || ""}","${(log.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`
      }),
    ].join("\n")

    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `system-logs-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("System logs exported successfully")
  }

  const handleRefresh = () => {
    refetch()
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
          <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
          <p className="text-muted-foreground mt-1">
            Monitor platform activity, errors, and system events in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={cn("relative flex h-2.5 w-2.5", isFetching && "opacity-100")}>
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isFetching ? "bg-emerald-400" : "bg-emerald-400")} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            {isFetching ? "Refreshing..." : "Live"}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-2"
            onClick={handleRefresh}
            disabled={isFetching}
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-2"
            onClick={handleExport}
            disabled={logs.length === 0}
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: "Total", value: summary.total, color: "from-slate-500 to-gray-600", icon: ScrollText },
          { label: "Info", value: summary.info, color: "from-blue-500 to-indigo-600", icon: Info },
          { label: "Warning", value: summary.warning, color: "from-amber-500 to-orange-600", icon: AlertTriangle },
          { label: "Error", value: summary.error, color: "from-red-500 to-rose-600", icon: XCircle },
          { label: "Critical", value: summary.critical, color: "from-purple-500 to-violet-600", icon: Skull },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-lg rounded-2xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs by message or source..."
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
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {paginatedLogs.length} of {logs.length} entries
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Level Tabs + Log List */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setPage(1) }}>
        <TabsList className="rounded-xl">
          <TabsTrigger value="all" className="rounded-lg gap-1.5">
            All
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
              {summary.total}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="info" className="rounded-lg gap-1.5">
            <Info className="h-3 w-3 text-blue-500" />
            Info
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {summary.info}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="warning" className="rounded-lg gap-1.5">
            <AlertTriangle className="h-3 w-3 text-amber-500" />
            Warning
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              {summary.warning}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="error" className="rounded-lg gap-1.5">
            <XCircle className="h-3 w-3 text-red-500" />
            Error
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {summary.error}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="critical" className="rounded-lg gap-1.5">
            <Skull className="h-3 w-3 text-purple-500" />
            Critical
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              {summary.critical}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                <>
                <div className="space-y-1">
                  {paginatedLogs.map((log: any, index: number) => {
                    const cfg = levelConfig[log.level] || levelConfig.info
                    const LevelIcon = cfg.icon
                    const SourceIcon = sourceIcons[log.source] || Server

                    return (
                      <motion.div
                        key={log.id || index}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className={cn(
                          "flex items-start gap-4 rounded-xl px-4 py-3.5 hover:bg-muted/50 transition-colors",
                          log.level === "critical" && "bg-purple-50/50 dark:bg-purple-900/10",
                          log.level === "error" && "bg-red-50/30 dark:bg-red-900/5"
                        )}
                      >
                        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", cfg.bg)}>
                          <LevelIcon className={cn("h-4 w-4", cfg.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className={cn("text-[10px] font-semibold px-2 py-0", cfg.bg, cfg.color)}>
                              {cfg.label.toUpperCase()}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <SourceIcon className="h-3 w-3" />
                              {log.source}
                            </div>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono">
                              {log.channel}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground/90 leading-relaxed font-mono text-[13px]">
                            {log.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap font-mono shrink-0">
                          {log.timestamp}
                        </span>
                      </motion.div>
                    )
                  })}

                  {logs.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <ScrollText className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="text-sm font-medium">No logs found</p>
                      <p className="text-xs mt-1">
                        {searchQuery ? "Try adjusting your search query" : "System logs will appear here as events occur"}
                      </p>
                    </div>
                  )}
                </div>

                {totalPages > 1 && (
                  <TablePagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={logs.length}
                    perPage={perPage}
                    onPageChange={setPage}
                  />
                )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
