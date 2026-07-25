import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Search, CheckCircle, Clock, IndianRupee, Download, Receipt } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const fineReasons = [
  { name: "Late Return", value: 8400, fill: "#ec4899" },
  { name: "Damaged Book", value: 3200, fill: "#f43f5e" },
  { name: "Lost Book", value: 5500, fill: "#8b5cf6" },
  { name: "Overdue + Damage", value: 1800, fill: "#6366f1" },
]

const fineRecords = [
  { id: "1", student: "Kiran Desai", cls: "10-B", book: "Wren & Grammar", reason: "Late Return", amount: 650, paid: 650, status: "paid", date: "2026-07-22" },
  { id: "2", student: "Vivek Rao", cls: "11-B", book: "HC Verma Physics", reason: "Lost Book", amount: 850, paid: 500, status: "partial", date: "2026-07-20" },
  { id: "3", student: "Ananya Singh", cls: "11-A", book: "Oswaal Chemistry", reason: "Late Return", amount: 150, paid: 0, status: "unpaid", date: "2026-07-18" },
  { id: "4", student: "Arjun Mehta", cls: "9-A", book: "RD Sharma Mathematics", reason: "Damaged Book", amount: 400, paid: 400, status: "paid", date: "2026-07-15" },
  { id: "5", student: "Nisha Joshi", cls: "10-A", book: "NCERT Biology Class 10", reason: "Late Return", amount: 400, paid: 0, status: "unpaid", date: "2026-07-14" },
  { id: "6", student: "Rohan Gupta", cls: "10-A", book: "NCERT Science Class 10", reason: "Overdue + Damage", amount: 550, paid: 550, status: "paid", date: "2026-07-12" },
  { id: "7", student: "Priya Patel", cls: "12-A", book: "HC Verma Physics", reason: "Damaged Book", amount: 300, paid: 0, status: "unpaid", date: "2026-07-10" },
  { id: "8", student: "Aarav Sharma", cls: "10-B", book: "NCERT Mathematics Class 10", reason: "Late Return", amount: 200, paid: 200, status: "paid", date: "2026-07-08" },
]

const monthlyCollection = [
  { month: "Jan", collected: 3200 },
  { month: "Feb", collected: 2800 },
  { month: "Mar", collected: 4100 },
  { month: "Apr", collected: 3600 },
  { month: "May", collected: 2900 },
  { month: "Jun", collected: 4200 },
]

export function FinesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedFine, setSelectedFine] = useState<(typeof fineRecords)[0] | null>(null)
  const [showPayDialog, setShowPayDialog] = useState(false)

  const filtered = fineRecords.filter((f) => {
    const matchesSearch = f.student.toLowerCase().includes(searchQuery.toLowerCase()) || f.book.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || f.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCollected = fineRecords.reduce((s, f) => s + f.paid, 0)
  const totalPending = fineRecords.reduce((s, f) => s + (f.amount - f.paid), 0)
  const totalFines = fineRecords.reduce((s, f) => s + f.amount, 0)
  const paidCount = fineRecords.filter((f) => f.status === "paid").length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Fine Collection" description="Track and manage library fines and payments" actions={<Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export Report</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Fines" value={formatCurrency(totalFines)} icon={<IndianRupee className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Collected" value={formatCurrency(totalCollected)} icon={<CheckCircle className="h-6 w-6" />} trend="up" trendValue="+18%" description="this month" gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Pending" value={formatCurrency(totalPending)} icon={<Clock className="h-6 w-6" />} trend="down" trendValue="-5%" description="vs last month" gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Paid Records" value={paidCount + "/" + fineRecords.length} icon={<Receipt className="h-6 w-6" />} description="fully settled" gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Fine Records</CardTitle>
              <CardDescription>{filtered.length} records found</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search fines..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 w-52" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((fine) => (
                  <TableRow key={fine.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{fine.student}</p>
                        <p className="text-xs text-muted-foreground">{fine.cls}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-[160px] truncate">{fine.book}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{fine.reason}</Badge></TableCell>
                    <TableCell className="font-bold">{formatCurrency(fine.amount)}</TableCell>
                    <TableCell className="text-muted-foreground">{formatCurrency(fine.paid)}</TableCell>
                    <TableCell>
                      <Badge variant={fine.status === "paid" ? "default" : fine.status === "partial" ? "secondary" : "destructive"} className="capitalize">{fine.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {fine.status !== "paid" && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setSelectedFine(fine); setShowPayDialog(true) }}>
                          <IndianRupee className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Fines by Reason</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={fineReasons} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                      {fineReasons.map((entry, index) => (<Cell key={"cell-" + index} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [formatCurrency(Number(value)), "Amount"]} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Collection Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {monthlyCollection.slice(-4).map((m, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{m.month}</span>
                    <span className="font-medium">{formatCurrency(m.collected)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: (m.collected / 5000) * 100 + "%" }} transition={{ duration: 0.6, delay: i * 0.1 }} className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showPayDialog} onOpenChange={setShowPayDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>Process fine payment for this student</DialogDescription>
          </DialogHeader>
          {selectedFine && (
            <div className="space-y-4">
              <div className="rounded-xl border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{selectedFine.student}</p>
                    <p className="text-xs text-muted-foreground">{selectedFine.book}</p>
                  </div>
                  <Badge variant="secondary">{selectedFine.reason}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Total Fine</span>
                  <span className="font-bold">{formatCurrency(selectedFine.amount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Already Paid</span>
                  <span className="text-sm">{formatCurrency(selectedFine.paid)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Remaining</span>
                  <span className="font-bold text-destructive">{formatCurrency(selectedFine.amount - selectedFine.paid)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Payment Amount</Label>
                <Input type="number" placeholder="Enter amount" defaultValue={selectedFine.amount - selectedFine.paid} />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select defaultValue="cash">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowPayDialog(false)} className="gap-1"><CheckCircle className="h-3 w-3" /> Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
