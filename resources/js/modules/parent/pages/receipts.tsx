import { useState } from "react"
import {
  Receipt,
  Search,
  Download,
  Eye,
  Filter,
  Calendar,
  CheckCircle2,
  FileText,
  Printer,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn, formatCurrency } from "@/lib/utils"

const receipts = [
  { id: "REC-001", transactionId: "PAY-2026-001", date: "Jul 1, 2026", description: "Tuition Fee - Q2", amount: 9000, method: "UPI", status: "issued", school: "Gurukul Public School" },
  { id: "REC-002", transactionId: "PAY-2026-002", date: "Apr 5, 2026", description: "Tuition Fee - Q1", amount: 9000, method: "Card", status: "issued", school: "Gurukul Public School" },
  { id: "REC-003", transactionId: "PAY-2026-003", date: "Apr 5, 2026", description: "Library Fee", amount: 3000, method: "Net Banking", status: "issued", school: "Gurukul Public School" },
  { id: "REC-004", transactionId: "PAY-2026-004", date: "Apr 5, 2026", description: "Lab Fee", amount: 5000, method: "UPI", status: "issued", school: "Gurukul Public School" },
  { id: "REC-005", transactionId: "PAY-2026-005", date: "Mar 10, 2026", description: "Exam Fee", amount: 2000, method: "Card", status: "issued", school: "Gurukul Public School" },
  { id: "REC-006", transactionId: "PAY-2026-006", date: "Feb 5, 2026", description: "Sports Fee", amount: 2000, method: "UPI", status: "issued", school: "Gurukul Public School" },
  { id: "REC-007", transactionId: "PAY-2026-007", date: "Jan 10, 2026", description: "Transport Fee - Q1", amount: 2500, method: "Net Banking", status: "issued", school: "Gurukul Public School" },
]

const totalReceipts = receipts.length
const totalAmount = receipts.reduce((sum, r) => sum + r.amount, 0)

const stats = [
  { title: "Total Receipts", value: String(totalReceipts), icon: Receipt, gradient: "from-purple-500 to-pink-500", description: "This academic year" },
  { title: "Total Amount", value: formatCurrency(totalAmount), icon: FileText, gradient: "from-emerald-500 to-teal-500", description: "All receipts combined" },
  { title: "Latest Receipt", value: "Jul 1", icon: Calendar, gradient: "from-blue-500 to-indigo-500", description: "2026" },
  { title: "All Issued", value: "100%", icon: CheckCircle2, gradient: "from-amber-500 to-orange-500", description: "No pending receipts" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ReceiptsPage() {
  const [search, setSearch] = useState("")
  const [previewReceipt, setPreviewReceipt] = useState<typeof receipts[0] | null>(null)

  const filtered = receipts.filter(
    (r) =>
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Receipts"
        description="View and download payment receipts for Aarav Sharma"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        }
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search receipts..."
            className="pl-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Receipts Table */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-purple-500" />
              All Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt No.</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-mono text-xs font-medium">{receipt.id}</TableCell>
                    <TableCell className="text-sm">{receipt.date}</TableCell>
                    <TableCell className="font-medium text-sm">{receipt.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{receipt.method}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{formatCurrency(receipt.amount)}</TableCell>
                    <TableCell className="text-center">
                      <Badge className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        Issued
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setPreviewReceipt(receipt)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Receipt Preview Dialog */}
      <Dialog open={!!previewReceipt} onOpenChange={() => setPreviewReceipt(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>Receipt details for the selected payment</DialogDescription>
          </DialogHeader>
          {previewReceipt && (
            <div className="space-y-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50">
                <p className="text-xs text-muted-foreground">Gurukul Public School</p>
                <p className="text-lg font-bold mt-1">Payment Receipt</p>
                <p className="text-xs text-muted-foreground mt-1">{previewReceipt.id}</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Date", value: previewReceipt.date },
                  { label: "Description", value: previewReceipt.description },
                  { label: "Transaction ID", value: previewReceipt.transactionId },
                  { label: "Payment Method", value: previewReceipt.method },
                  { label: "Amount", value: formatCurrency(previewReceipt.amount) },
                  { label: "Status", value: "Issued" },
                ].map((field) => (
                  <div key={field.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{field.label}</span>
                    <span className="text-sm font-medium">{field.value}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setPreviewReceipt(null)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
