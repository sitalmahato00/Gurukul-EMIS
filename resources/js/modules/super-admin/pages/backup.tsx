import {
  HardDrive,
  Download,
  Upload,
  Clock,
  Database,
  CheckCircle2,
  XCircle,
  Loader2,
  Calendar,
  Save,
  RefreshCw,
  Archive,
  Cloud,
  Server,
  Activity,
  Trash2,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  useBackups,
  useCreateBackup,
  useDeleteBackup,
  useDownloadLatestBackup,
  useAutoBackupSettings,
  useSaveAutoBackupSettings,
} from "@/lib/hooks"
import { toast } from "sonner"
import { useState } from "react"

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  completed: { color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-900/30", icon: CheckCircle2 },
  failed: { color: "text-red-700 dark:text-red-300", bg: "bg-red-50 dark:bg-red-900/30", icon: XCircle },
  "in-progress": { color: "text-blue-700 dark:text-blue-300", bg: "bg-blue-50 dark:bg-blue-900/30", icon: Loader2 },
}

export function BackupPage() {
  const { data, isLoading, refetch, isFetching } = useBackups()
  const createBackup = useCreateBackup()
  const deleteBackup = useDeleteBackup()
  const downloadLatest = useDownloadLatestBackup()
  const { data: autoSettings } = useAutoBackupSettings()
  const saveAutoSettings = useSaveAutoBackupSettings()

  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [backupType, setBackupType] = useState("full")
  const [autoEnabled, setAutoEnabled] = useState(true)
  const [frequency, setFrequency] = useState("daily")
  const [schedTime, setSchedTime] = useState("06:00")
  const [retention, setRetention] = useState("30")

  const backups = data?.backups || []
  const summary = data?.summary || {}
  const totalBackups = summary.total ?? backups.length
  const completedBackups = summary.completed ?? backups.filter((b: any) => b.status === "completed").length
  const failedBackups = summary.failed ?? backups.filter((b: any) => b.status === "failed").length
  const successRate = summary.success_rate ?? (totalBackups > 0 ? Math.round((completedBackups / totalBackups) * 100) : 0)
  const totalSizeMB = summary.total_size_mb ?? 0
  const fullSizeMB = summary.full_size_mb ?? 0
  const incrSizeMB = summary.incr_size_mb ?? 0
  const logsSizeMB = summary.logs_size_mb ?? 0
  const dbSizeMB = summary.db_size_mb ?? 0
  const storageLimit = 50000
  const storagePercent = Math.min(Math.round((totalSizeMB / storageLimit) * 100), 100)

  const lastBackup = backups.find((b: any) => b.status === "completed") || backups[0]
  const lastBackupDate = lastBackup?.created_at
    ? new Date(lastBackup.created_at).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "No backups yet"

  const nextScheduled = "Tomorrow, 6:00 AM"

  const handleBackupNow = () => {
    createBackup.mutate(
      { type: backupType },
      {
        onSuccess: (res: any) => {
          toast.success(res?.message || "Backup completed successfully")
        },
        onError: (err: any) => {
          toast.error(err?.message || "Backup failed")
        },
      }
    )
  }

  const handleDownloadLatest = () => {
    downloadLatest.mutate(undefined, {
      onSuccess: () => toast.success("Download started"),
      onError: () => toast.error("Download failed — no completed backup found"),
    })
  }

  const handleDelete = (id: number) => {
    deleteBackup.mutate(id, {
      onSuccess: () => {
        toast.success("Backup deleted successfully")
        setDeleteConfirm(null)
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to delete backup")
      },
    })
  }

  const handleRefresh = () => {
    refetch()
    toast.success("Backup list refreshed")
  }

  const handleSaveSchedule = () => {
    saveAutoSettings.mutate(
      {
        auto_backup_enabled: autoEnabled,
        backup_frequency: frequency,
        backup_time: schedTime,
        backup_retention_days: parseInt(retention),
      },
      {
        onSuccess: () => toast.success("Backup schedule saved"),
        onError: () => toast.error("Failed to save schedule"),
      }
    )
  }

  const handleToggleAuto = (val: boolean) => {
    setAutoEnabled(val)
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
          <h1 className="text-3xl font-bold tracking-tight">Backup & Recovery</h1>
          <p className="text-muted-foreground mt-1">
            Manage platform backups, monitor storage, and configure auto-backup schedules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            {isFetching ? "Working..." : "Healthy"}
          </div>
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-sm border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300">
            <HardDrive className="h-3.5 w-3.5" /> Backup Center
          </Badge>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", successRate >= 80 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-amber-50 text-amber-700")}>
                  {successRate >= 80 ? "Healthy" : "Needs Attention"}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Backup</p>
                <p className="text-sm font-semibold mt-0.5">{lastBackupDate}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Next Scheduled</p>
                <p className="text-sm font-semibold mt-0.5">{nextScheduled}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                  <Archive className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Backups</p>
                <p className="text-sm font-semibold mt-0.5">{totalBackups} backups</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <p className="text-sm font-semibold mt-0.5">{successRate}%</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Backup History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                className="rounded-xl h-11 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all gap-2"
                onClick={handleBackupNow}
                disabled={createBackup.isPending}
              >
                {createBackup.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {createBackup.isPending ? "Backing up..." : "Backup Now"}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-11 gap-2"
                onClick={handleDownloadLatest}
                disabled={downloadLatest.isPending || completedBackups === 0}
              >
                {downloadLatest.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Download Latest
              </Button>
              <Button variant="outline" className="rounded-xl h-11 gap-2" onClick={handleRefresh} disabled={isFetching}>
                <RefreshCw className={cn("h-4 w-4", isFetching && "animate-spin")} />
                Refresh
              </Button>
            </div>
          </motion.div>

          {/* Backup History Table */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Backup History</CardTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">Recent backup records and status</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{totalBackups} total</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : (
                  <>
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <div className="col-span-3">Date</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Size</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Duration</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <Separator className="mb-1" />

                    <div className="space-y-0.5">
                      {backups.map((entry: any, index: number) => {
                        const cfg = statusConfig[entry.status] || statusConfig.completed
                        const StatusIcon = cfg.icon
                        const ts = entry.created_at
                          ? new Date(entry.created_at).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                          : "—"

                        return (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.03 }}
                            className="grid grid-cols-12 gap-4 items-center rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors"
                          >
                            <div className="col-span-3 text-sm text-muted-foreground">
                              {ts}
                            </div>
                            <div className="col-span-2">
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "text-[10px] font-semibold px-2 py-0",
                                  entry.type === "full"
                                    ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                )}
                              >
                                {entry.type === "full" ? "Full" : "Incremental"}
                              </Badge>
                            </div>
                            <div className="col-span-2 text-sm font-medium">{entry.size}</div>
                            <div className="col-span-2">
                              <Badge variant="secondary" className={cn("text-[10px] font-semibold px-2 py-0 gap-1", cfg.bg, cfg.color)}>
                                <StatusIcon className={cn("h-3 w-3", entry.status === "in-progress" && "animate-spin")} />
                                {entry.status === "in-progress" ? "In Progress" : entry.status === "completed" ? "Completed" : "Failed"}
                              </Badge>
                            </div>
                            <div className="col-span-2 text-sm text-muted-foreground">
                              {entry.duration || "—"}
                            </div>
                            <div className="col-span-1 flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                                onClick={() => setDeleteConfirm(entry.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>

                    {backups.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <HardDrive className="h-10 w-10 mx-auto mb-3 opacity-40" />
                        <p className="text-sm font-medium">No backups yet</p>
                        <p className="text-xs mt-1">Click "Backup Now" to create your first backup</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Settings & Storage */}
        <div className="space-y-8">
          {/* Storage Usage */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <Cloud className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Storage Usage</CardTitle>
                    <p className="text-sm text-muted-foreground">Cloud backup storage</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{(totalSizeMB / 1024).toFixed(1)} GB used</span>
                    <span className="text-muted-foreground">of {(storageLimit / 1024).toFixed(0)} GB</span>
                  </div>
                  <Progress value={storagePercent} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {storagePercent}% allocated — {((storageLimit - totalSizeMB) / 1024).toFixed(1)} GB remaining
                  </p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Full Backups</span>
                    </div>
                    <span className="text-sm font-semibold">{(fullSizeMB / 1024).toFixed(1)} GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Incremental Backups</span>
                    </div>
                    <span className="text-sm font-semibold">{(incrSizeMB / 1024).toFixed(1)} GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Logs & Metadata</span>
                    </div>
                    <span className="text-sm font-semibold">{logsSizeMB > 0 ? (logsSizeMB / 1024).toFixed(2) : "0.00"} GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Auto-Backup Settings */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Auto-Backup</CardTitle>
                    <p className="text-sm text-muted-foreground">Scheduled backup configuration</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Enable Auto-Backup</Label>
                    <p className="text-xs text-muted-foreground">Automatically backup data on schedule</p>
                  </div>
                  <Switch checked={autoEnabled} onCheckedChange={handleToggleAuto} />
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="rounded-xl h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Scheduled Time</Label>
                    <Input type="time" value={schedTime} onChange={(e) => setSchedTime(e.target.value)} className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Retention Period</Label>
                    <Select value={retention} onValueChange={setRetention}>
                      <SelectTrigger className="rounded-xl h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  className="w-full rounded-xl h-11 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all gap-2"
                  onClick={handleSaveSchedule}
                  disabled={saveAutoSettings.isPending}
                >
                  {saveAutoSettings.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saveAutoSettings.isPending ? "Saving..." : "Save Schedule"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Backup
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this backup? The backup file will be permanently removed. This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deleteBackup.isPending}
              className="rounded-xl"
            >
              {deleteBackup.isPending && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
