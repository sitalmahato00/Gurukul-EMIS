import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { CreditCard, Search, Printer, Download, GraduationCap, Users } from "lucide-react"

const studentBatches = [
  { id: "1", name: "Class 10 - A", count: 45, printed: 42 },
  { id: "2", name: "Class 10 - B", count: 42, printed: 38 },
  { id: "3", name: "Class 9 - A", count: 48, printed: 48 },
  { id: "4", name: "Class 9 - B", count: 44, printed: 30 },
  { id: "5", name: "Class 11 - A", count: 40, printed: 40 },
  { id: "6", name: "Class 11 - B", count: 38, printed: 35 },
  { id: "7", name: "Class 12 - A", count: 36, printed: 36 },
  { id: "8", name: "Class 12 - B", count: 35, printed: 28 },
]

const previewStudents = ["Aarav Sharma", "Priya Patel", "Rohan Gupta", "Ananya Singh"]

export function StudentIDCardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBatch, setSelectedBatch] = useState(studentBatches[0])

  const filtered = studentBatches.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalStudents = studentBatches.reduce((s, b) => s + b.count, 0)
  const totalPrinted = studentBatches.reduce((s, b) => s + b.printed, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Student Library ID Cards" description="Generate and print student library ID cards" actions={<Button className="gap-2"><Printer className="h-4 w-4" />Print Selected</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={totalStudents} icon={<Users className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Cards Printed" value={totalPrinted} icon={<CreditCard className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Pending" value={totalStudents - totalPrinted} icon={<Printer className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Batches" value={studentBatches.length} icon={<GraduationCap className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Student Batches</CardTitle>
            <CardDescription>Select a batch to preview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search batches..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="space-y-2">
              {filtered.map((batch) => (
                <button key={batch.id} onClick={() => setSelectedBatch(batch)} className={"w-full text-left rounded-xl px-4 py-3 transition-all " + (selectedBatch?.id === batch.id ? "bg-pink-50 border border-pink-200 dark:bg-pink-950/20 dark:border-pink-800 shadow-sm" : "hover:bg-muted/50 border border-transparent")}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{batch.name}</p>
                      <p className="text-xs text-muted-foreground">{batch.count} students</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{batch.printed}/{batch.count}</p>
                      <div className="w-20 h-1.5 rounded-full bg-muted mt-1 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: (batch.printed / batch.count * 100) + "%" }} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">ID Card Preview</CardTitle>
              <CardDescription>{selectedBatch?.name}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Download className="h-3 w-3" />Download</Button>
              <Button size="sm" className="gap-1"><Printer className="h-3 w-3" />Print All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {previewStudents.map((name, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-white to-pink-50 dark:from-card dark:to-pink-950/10 overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2">
                    <p className="text-white text-xs font-bold tracking-wider uppercase">Gurukul School Library</p>
                  </div>
                  <div className="p-4 flex gap-4">
                    <div className="h-20 w-16 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center shrink-0 border border-pink-200">
                      <GraduationCap className="h-8 w-8 text-pink-400" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="font-bold text-sm truncate">{name}</p>
                      <p className="text-[10px] text-muted-foreground">{selectedBatch?.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">LIB-{String(1000 + i).padStart(4, "0")}</p>
                      <div className="pt-1"><Badge variant="secondary" className="text-[9px]">Active Member</Badge></div>
                    </div>
                  </div>
                  <div className="border-t px-4 py-1.5 bg-muted/30">
                    <p className="text-[9px] text-center text-muted-foreground">Valid till: March 2027</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
