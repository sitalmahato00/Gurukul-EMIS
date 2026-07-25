import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { AlertTriangle, Search, Send, Phone, Mail, Clock, IndianRupee } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useLibraryOverdue } from "@/lib/hooks"

export function OverduePage() {
  const { data: overdueResult, isLoading } = useLibraryOverdue()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOverdue, setSelectedOverdue] = useState<any | null>(null)
  const [showMessageDialog, setShowMessageDialog] = useState(false)

  const overdueBooks = overdueResult?.data || []

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const filtered = overdueBooks.filter((o: any) =>
    (o.student_name || o.student || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.book_title || o.book || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalFines = overdueBooks.reduce((s: number, o: any) => s + (o.fine || 0), 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Overdue Books" description="Track and manage overdue book returns" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Overdue Books" value={overdueBooks.length} icon={<AlertTriangle className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Total Fines" value={formatCurrency(totalFines)} icon={<IndianRupee className="h-6 w-6" />} gradient="bg-gradient-to-br from-rose-500 to-red-500" />
        <StatCard title="Avg Days Overdue" value={String(Math.round(overdueBooks.reduce((s: number, o: any) => s + (o.days_overdue || o.daysOverdue || 0), 0) / (overdueBooks.length || 1)))} icon={<Clock className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Max Fine" value={formatCurrency(overdueBooks.length > 0 ? Math.max(...overdueBooks.map((o: any) => o.fine || 0)) : 0)} icon={<IndianRupee className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Overdue Books List</CardTitle>
              <CardDescription>{filtered.length} overdue books</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search overdue..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 w-56" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Fine</TableHead>
                  <TableHead className="w-16" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((o: any) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{o.student_name || o.student || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">{o.class || ""}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{o.book_title || o.book || "N/A"}</TableCell>
                    <TableCell className="text-xs">{new Date(o.due_date || o.dueDate || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</TableCell>
                    <TableCell>
                      <Badge variant={(o.days_overdue || o.daysOverdue || 0) > 5 ? "destructive" : (o.days_overdue || o.daysOverdue || 0) > 2 ? "warning" : "secondary"}>{o.days_overdue || o.daysOverdue || 0}d</Badge>
                    </TableCell>
                    <TableCell className="font-bold">{formatCurrency(o.fine || 0)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setSelectedOverdue(o); setShowMessageDialog(true) }}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Overdue Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "0-2 days", count: overdueBooks.filter((o: any) => (o.days_overdue || o.daysOverdue || 0) <= 2).length, fill: "#f59e0b" },
                    { name: "3-5 days", count: overdueBooks.filter((o: any) => (o.days_overdue || o.daysOverdue || 0) > 2 && (o.days_overdue || o.daysOverdue || 0) <= 5).length, fill: "#f97316" },
                    { name: "6+ days", count: overdueBooks.filter((o: any) => (o.days_overdue || o.daysOverdue || 0) > 5).length, fill: "#ef4444" },
                  ]} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value} books`, "Count"]} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {[{ fill: "#f59e0b" }, { fill: "#f97316" }, { fill: "#ef4444" }].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {selectedOverdue && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Contact Student</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium">{selectedOverdue.student}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {selectedOverdue.phone || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {selectedOverdue.email || "N/A"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Previous contact attempts: {selectedOverdue.contact_attempts || selectedOverdue.contactAttempts || 0}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-1"><Phone className="h-3 w-3" /> Call</Button>
                  <Button size="sm" variant="outline" className="gap-1"><Mail className="h-3 w-3" /> Email</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Reminder</DialogTitle>
            <DialogDescription>Send an overdue reminder to the student</DialogDescription>
          </DialogHeader>
          {selectedOverdue && (
            <div className="space-y-4">
              <div className="rounded-xl border p-3 space-y-1">
                <p className="text-sm font-medium">{selectedOverdue.student_name || selectedOverdue.student || "N/A"} ({selectedOverdue.class || ""})</p>
                <p className="text-xs text-muted-foreground">{selectedOverdue.book_title || selectedOverdue.book || "N/A"}</p>
                <p className="text-xs text-muted-foreground">Fine: {formatCurrency(selectedOverdue.fine || 0)}</p>
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea defaultValue={`Dear ${selectedOverdue.student_name || selectedOverdue.student || "Student"}, your book "${selectedOverdue.book_title || selectedOverdue.book || ""}" is ${selectedOverdue.days_overdue || selectedOverdue.daysOverdue || 0} day(s) overdue. Please return it immediately to avoid additional fines. Current fine: ${formatCurrency(selectedOverdue.fine || 0)}.`} rows={5} />
              </div>
              <div className="space-y-2">
                <Label>Channel</Label>
                <Select defaultValue="sms">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowMessageDialog(false)} className="gap-1"><Send className="h-3 w-3" /> Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
