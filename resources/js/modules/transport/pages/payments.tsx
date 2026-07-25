import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Search, IndianRupee, Download, Wallet, CheckCircle2, Clock, Filter, FileText, ArrowUpRight } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const payments = [
  { id: "PAY-001", student: "Aarav Sharma", class: "10-A", route: "Route A", amount: 2500, method: "Online", date: "2025-07-15", status: "completed", receiptNo: "REC-2507-001", transactionId: "TXN-87654321" },
  { id: "PAY-002", student: "Priya Patel", class: "10-A", route: "Route B", amount: 2200, method: "UPI", date: "2025-07-15", status: "completed", receiptNo: "REC-2507-002", transactionId: "TXN-87654322" },
  { id: "PAY-003", student: "Rohan Gupta", class: "9-B", route: "Route C", amount: 2000, method: "Cash", date: "2025-07-14", status: "completed", receiptNo: "REC-2507-003", transactionId: "CASH-001" },
  { id: "PAY-004", student: "Ananya Singh", class: "11-A", route: "Route D", amount: 2800, method: "Cheque", date: "2025-07-14", status: "pending", receiptNo: "-", transactionId: "CHQ-8901" },
  { id: "PAY-005", student: "Arjun Kumar", class: "9-A", route: "Route A", amount: 2500, method: "Online", date: "2025-07-13", status: "completed", receiptNo: "REC-2507-004", transactionId: "TXN-87654325" },
  { id: "PAY-006", student: "Kiran Desai", class: "10-B", route: "Route E", amount: 2200, method: "Bank Transfer", date: "2025-07-13", status: "completed", receiptNo: "REC-2507-005", transactionId: "NEFT-2234" },
  { id: "PAY-007", student: "Vivaan Joshi", class: "8-A", route: "Route F", amount: 2400, method: "UPI", date: "2025-07-12", status: "completed", receiptNo: "REC-2507-006", transactionId: "TXN-87654327" },
  { id: "PAY-008", student: "Meera Reddy", class: "12-A", route: "Route B", amount: 2200, method: "Cash", date: "2025-07-12", status: "completed", receiptNo: "REC-2507-007", transactionId: "CASH-002" },
  { id: "PAY-009", student: "Sai Mehta", class: "11-B", route: "Route D", amount: 2800, method: "Online", date: "2025-07-11", status: "failed", receiptNo: "-", transactionId: "TXN-FAIL-001" },
  { id: "PAY-010", student: "Aditi Verma", class: "10-A", route: "Route C", amount: 2000, method: "UPI", date: "2025-07-11", status: "completed", receiptNo: "REC-2507-008", transactionId: "TXN-87654330" },
]

const statusPieData = [
  { name: "Completed", value: 8, fill: "#22c55e" },
  { name: "Pending", value: 1, fill: "#f59e0b" },
  { name: "Failed", value: 1, fill: "#ef4444" },
]

const methodPieData = [
  { name: "Online", value: 3, fill: "#3b82f6" },
  { name: "UPI", value: 3, fill: "#8b5cf6" },
  { name: "Cash", value: 2, fill: "#22c55e" },
  { name: "Cheque", value: 1, fill: "#f59e0b" },
  { name: "Bank Transfer", value: 1, fill: "#ec4899" },
]

const statusColors: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  failed: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function PaymentsPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMethod, setFilterMethod] = useState("all")

  const filtered = payments.filter((p) => {
    const matchesSearch = p.student.toLowerCase().includes(search.toLowerCase()) || p.receiptNo.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || p.status === filterStatus
    const matchesMethod = filterMethod === "all" || p.method === filterMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalCollected = payments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Payments"
        description="View and manage transport fee payments"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+12%" description="this month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Pending" value={payments.filter(p => p.status === "pending").length} icon={<Clock className="h-6 w-6" />} description="payments" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Failed" value={payments.filter(p => p.status === "failed").length} icon={<Wallet className="h-6 w-6" />} description="need retry" gradient="from-red-500 to-rose-500" />
        <StatCard title="Total Transactions" value={payments.length} icon={<FileText className="h-6 w-6" />} description="this period" gradient="from-blue-500 to-indigo-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Payment Records</CardTitle>
                <CardDescription className="text-xs">{filtered.length} transactions</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 w-[180px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-28"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterMethod} onValueChange={setFilterMethod}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Method" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Receipt</TableHead>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs">Route</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Method</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">{p.receiptNo}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{p.student}</p>
                          <p className="text-[10px] text-muted-foreground">{p.class}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.route}</TableCell>
                      <TableCell className="text-sm font-semibold">{formatCurrency(p.amount)}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px]">{p.method}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.date}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-[10px] capitalize", statusColors[p.status])}>
                          {p.status === "completed" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {p.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" disabled={p.status !== "completed"}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                      {statusPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} payments`, "Count"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {statusPieData.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.fill }} />
                      <span>{s.name}</span>
                    </div>
                    <span className="font-semibold">{s.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">By Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={methodPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                      {methodPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} payments`, "Count"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {methodPieData.map((m) => (
                  <div key={m.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: m.fill }} />
                      <span>{m.name}</span>
                    </div>
                    <span className="font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
