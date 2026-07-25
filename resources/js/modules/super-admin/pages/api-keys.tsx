import {
  Key,
  Plus,
  Copy,
  Ban,
  ExternalLink,
  Shield,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  RefreshCw,
  Eye,
  Server,
  Info,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn, formatDate, formatNumber } from "@/lib/utils"
import { StatCard } from "@/components/shared/stat-card"
import { useApiKeys, useCreateApiKey, useRevokeApiKey } from "@/lib/hooks"

export function ApiKeysPage() {
  const { data, isLoading } = useApiKeys()
  const createApiKey = useCreateApiKey()
  const revokeApiKey = useRevokeApiKey()

  const apiKeys = data?.data || []
  const totalKeys = data?.total || apiKeys.length
  const activeKeys = apiKeys.filter((k: any) => k.status === "active").length
  const totalCalls = apiKeys.reduce((sum: number, k: any) => sum + (k.total_calls || 0), 0)

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
            Manage API keys for third-party integrations and external services.
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200"
          onClick={() => createApiKey.mutate({ name: "New API Key" })}
          disabled={createApiKey.isPending}
        >
          <Plus className="h-4 w-4" />
          Generate New Key
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
              <h3 className="text-sm font-semibold text-violet-900 dark:text-violet-100">
                API Key Management
              </h3>
              <p className="text-sm text-violet-700 dark:text-violet-300 mt-1">
                API keys allow third-party integrations to securely access the Gurukul platform.
                Keep your keys confidential and rotate them regularly. Each key can be scoped to
                specific schools and rate-limited to prevent abuse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Calls Today"
          value={formatNumber(totalCalls)}
          icon={<Activity className="h-6 w-6" />}
          trend="up"
          trendValue="+8.3%"
          description="vs yesterday"
          gradient="from-violet-500 to-purple-600"
        />
        <StatCard
          title="Avg Response Time"
          value="142ms"
          icon={<Zap className="h-6 w-6" />}
          trend="down"
          trendValue="-12ms"
          description="improved"
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Error Rate"
          value="0.12%"
          icon={<AlertTriangle className="h-6 w-6" />}
          description="within threshold"
          gradient="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Active Keys"
          value={String(activeKeys)}
          icon={<Key className="h-6 w-6" />}
          description={`out of ${totalKeys} total`}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* API Keys List */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">API Keys</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {(apiKeys || []).map((key: any, index: number) => (
              <motion.div
                key={key.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className={cn(
                  "rounded-xl border p-4 transition-all duration-200 hover:shadow-md",
                  key.status === "active"
                    ? "border-border bg-card"
                    : "border-border/50 bg-muted/30 opacity-70"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        key.status === "active"
                          ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{key.name}</h4>
                        {key.status === "active" ? (
                          <Badge
                            variant="secondary"
                            className="text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 gap-1"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="text-[10px] font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 gap-1"
                          >
                            <Ban className="h-3 w-3" /> Revoked
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded-md">
                          {key.key || "sk-****...****"}
                        </code>
                        <span className="text-xs text-muted-foreground">
                          {key.school?.name || "Platform"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Rate Limit */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Rate Limit</p>
                      <p className="text-sm font-medium">{key.rate_limit} req/min</p>
                    </div>

                    {/* Total Calls */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Total Calls</p>
                      <p className="text-sm font-medium">{formatNumber(key.total_calls || 0)}</p>
                    </div>

                    {/* Created */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="text-sm font-medium">{formatDate(key.created_at)}</p>
                    </div>

                    {/* Last Used */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Last Used</p>
                      <p className="text-sm font-medium flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {key.last_used_at ? formatDate(key.last_used_at) : "Never"}
                      </p>
                    </div>

                    <Separator orientation="vertical" className="h-8" />

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        title="Copy Key"
                      >
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {key.status === "active" && (
                        <button
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Revoke Key"
                          onClick={() => revokeApiKey.mutate(key.id)}
                          disabled={revokeApiKey.isPending}
                        >
                          <Ban className="h-4 w-4 text-red-500" />
                        </button>
                      )}
                      <button
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        title="View Usage"
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
