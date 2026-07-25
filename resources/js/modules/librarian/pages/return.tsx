import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BookMinus, Search, CheckCircle, AlertTriangle, Clock, IndianRupee, RotateCcw } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useLibraryIssues } from "@/lib/hooks"

export function ReturnPage() {
  const { data: issuesResult, isLoading } = useLibraryIssues()
  const [searchQuery, setSearchQuery] = useState("")
  const [showReturnDialog, setShowReturnDialog] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<any | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const allIssues = issuesResult?.data || []
  const pendingReturns = allIssues.filter((r: any) => r.status === "active")
  const overdueReturns = allIssues.filter((r: any) => r.status === "overdue")

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const totalPending = pendingReturns.length
  const totalOverdue = overdueReturns.length
  const totalFines = overdueReturns.reduce((s: number, r: any) => s + (r.fine || 0), 0)

  const filtered = pendingReturns.filter((r: any) =>
    (r.student_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.book_title || r.book?.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Book Returns" description="Process book returns and track overdue items" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending Returns" value={totalPending} icon={<BookMinus className="h-6 w-6" />} gradient="bg-gradient-to-br from-blue-500 to-indigo-500" />
        <StatCard title="Overdue Returns" value={totalOverdue} icon={<AlertTriangle className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Total Fines" value={formatCurrency(totalFines)} icon={<IndianRupee className="h-6 w-6" />} gradient="bg-gradient-to-br from-rose-500 to-red-500" />
        <StatCard title="Returned Today" value={allIssues.filter((r: any) => r.status === "returned" && new Date(r.return_date || r.updatedAt || "").toDateString() === new Date().toDateString()).length} icon={<CheckCircle className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-green-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Pending Returns</CardTitle>
              <CardDescription>{totalPending} books awaiting return</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 w-56" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r: any) => {
                  const daysLeft = r.due_date ? Math.max(0, Math.ceil((new Date(r.due_date).getTime() - Date.now()) / 86400000)) : 0
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.student?.user?.name || r.student_name || "N/A"}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">{r.book?.title || r.book_title || "N/A"}</TableCell>
                      <TableCell className="text-xs">{new Date(r.due_date || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</TableCell>
                      <TableCell>
                        <Badge variant={daysLeft <= 5 ? "secondary" : "destructive"}>{daysLeft}d</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setSelectedReturn(r); setShowConfirmDialog(true) }}>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-destructive/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Overdue Returns
                </CardTitle>
                <CardDescription>{totalOverdue} books past due date</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {overdueReturns.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No overdue returns</p>
              ) : (
                overdueReturns.slice(0, 5).map((r: any) => (
                  <div key={r.id} className="flex items-center justify-between rounded-xl border p-3">
                    <div>
                      <p className="text-sm font-medium">{r.student?.user?.name || r.student_name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{r.book?.title || r.book_title || "N/A"}</p>
                    </div>
                    <Badge variant="destructive">{formatCurrency(r.fine || 0)}</Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Return</DialogTitle>
            <DialogDescription>Mark this book as returned</DialogDescription>
          </DialogHeader>
          {selectedReturn && (
            <div className="space-y-3">
              <div className="rounded-xl border p-3 space-y-1">
                <p className="text-sm font-medium">{selectedReturn.student?.user?.name || selectedReturn.student_name || "N/A"}</p>
                <p className="text-xs text-muted-foreground">{selectedReturn.book?.title || selectedReturn.book_title || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <Label>Fine Amount</Label>
                <Input type="number" defaultValue={selectedReturn.fine || 0} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowConfirmDialog(false)} className="gap-1">
              <CheckCircle className="h-3 w-3" /> Confirm Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
