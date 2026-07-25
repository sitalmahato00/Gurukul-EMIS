import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { GraduationCap, Search, Printer, Download, Users, BookOpen } from "lucide-react"

const teacherBatches = [
  { id: "1", name: "Science Department", count: 12, printed: 12 },
  { id: "2", name: "Mathematics Department", count: 10, printed: 10 },
  { id: "3", name: "English Department", count: 8, printed: 7 },
  { id: "4", name: "Hindi Department", count: 7, printed: 6 },
  { id: "5", name: "Social Studies Department", count: 9, printed: 9 },
  { id: "6", name: "Computer Science", count: 5, printed: 4 },
]

const previewTeachers = ["Sunita Sharma", "Rahul Verma", "Meena Iyer", "Deepak Nair"]

export function TeacherIDCardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBatch, setSelectedBatch] = useState(teacherBatches[0])

  const filtered = teacherBatches.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalTeachers = teacherBatches.reduce((s, b) => s + b.count, 0)
  const totalPrinted = teacherBatches.reduce((s, b) => s + b.printed, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Teacher Library ID Cards" description="Generate and print teacher library ID cards" actions={<Button className="gap-2"><Printer className="h-4 w-4" />Print Selected</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Teachers" value={totalTeachers} icon={<Users className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Cards Printed" value={totalPrinted} icon={<GraduationCap className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Pending" value={totalTeachers - totalPrinted} icon={<Printer className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Departments" value={teacherBatches.length} icon={<BookOpen className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Departments</CardTitle>
            <CardDescription>Select a department to preview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search departments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="space-y-2">
              {filtered.map((batch) => (
                <button key={batch.id} onClick={() => setSelectedBatch(batch)} className={"w-full text-left rounded-xl px-4 py-3 transition-all " + (selectedBatch?.id === batch.id ? "bg-pink-50 border border-pink-200 dark:bg-pink-950/20 dark:border-pink-800 shadow-sm" : "hover:bg-muted/50 border border-transparent")}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{batch.name}</p>
                      <p className="text-xs text-muted-foreground">{batch.count} teachers</p>
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
              {previewTeachers.map((name, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-white to-violet-50 dark:from-card dark:to-violet-950/10 overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2">
                    <p className="text-white text-xs font-bold tracking-wider uppercase">Gurukul School Library</p>
                  </div>
                  <div className="p-4 flex gap-4">
                    <div className="h-20 w-16 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0 border border-violet-200">
                      <GraduationCap className="h-8 w-8 text-violet-400" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="font-bold text-sm truncate">{name}</p>
                      <p className="text-[10px] text-muted-foreground">{selectedBatch?.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">TCH-{String(2000 + i).padStart(4, "0")}</p>
                      <div className="pt-1"><Badge variant="secondary" className="text-[9px]">Faculty</Badge></div>
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
