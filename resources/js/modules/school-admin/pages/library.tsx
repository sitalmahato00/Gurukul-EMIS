import {
  Library,
  BookOpen,
  BookMarked,
  Users,
  Search,
  Plus,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const categoryDistribution = [
  { name: "Mathematics", value: 420, fill: "#10b981" },
  { name: "Science", value: 380, fill: "#06b6d4" },
  { name: "English", value: 350, fill: "#8b5cf6" },
  { name: "Hindi", value: 280, fill: "#f59e0b" },
  { name: "Social Studies", value: 310, fill: "#ec4899" },
  { name: "Computer Science", value: 240, fill: "#6366f1" },
  { name: "Others", value: 470, fill: "#94a3b8" },
]

const bookCatalog = [
  { id: "1", title: "NCERT Mathematics Class 10", author: "R.D. Sharma", category: "Mathematics", totalCopies: 50, available: 42, status: "available" as const },
  { id: "2", title: "NCERT Science Class 10", author: "Lakhmir Singh", category: "Science", totalCopies: 45, available: 38, status: "available" as const },
  { id: "3", title: "NCERT English Class 10", author: "Beehive", category: "English", totalCopies: 40, available: 35, status: "available" as const },
  { id: "4", title: "HC Verma Physics", author: "H.C. Verma", category: "Physics", totalCopies: 20, available: 15, status: "available" as const },
  { id: "5", title: "Oswaal Chemistry", author: "Oswaal", category: "Chemistry", totalCopies: 30, available: 22, status: "available" as const },
  { id: "6", title: "Modern History of India", author: "Bipan Chandra", category: "Social Studies", totalCopies: 25, available: 20, status: "available" as const },
  { id: "7", title: "Hindi Sahitya", author: "Ramvilas Sharma", category: "Hindi", totalCopies: 28, available: 24, status: "available" as const },
  { id: "8", title: "Computer Science NCERT", author: "Sumita Arora", category: "Computer Science", totalCopies: 30, available: 26, status: "available" as const },
  { id: "9", title: "RD Sharma Mathematics 11", author: "R.D. Sharma", category: "Mathematics", totalCopies: 22, available: 18, status: "available" as const },
  { id: "10", title: "Together with Science 9", author: "P.S. Dhami", category: "Science", totalCopies: 35, available: 28, status: "available" as const },
  { id: "11", title: "Wren & Grammar", author: "Wren & Martin", category: "English", totalCopies: 18, available: 14, status: "available" as const },
  { id: "12", title: "RD Sharma Mathematics 9", author: "R.D. Sharma", category: "Mathematics", totalCopies: 24, available: 20, status: "available" as const },
]

const recentIssues = [
  { id: "1", student: "Aarav Sharma", book: "HC Verma Physics", type: "issue" as const, date: "2024-06-15", dueDate: "2024-06-29" },
  { id: "2", student: "Priya Patel", book: "NCERT Mathematics Class 10", type: "return" as const, date: "2024-06-14", dueDate: "" },
  { id: "3", student: "Rohan Gupta", book: "Oswaal Chemistry", type: "issue" as const, date: "2024-06-13", dueDate: "2024-06-27" },
  { id: "4", student: "Ananya Singh", book: "Modern History of India", type: "return" as const, date: "2024-06-12", dueDate: "" },
  { id: "5", student: "Kiran Desai", book: "Wren & Grammar", type: "issue" as const, date: "2024-06-11", dueDate: "2024-06-25" },
  { id: "6", student: "Nisha Joshi", book: "Hindi Sahitya", type: "return" as const, date: "2024-06-10", dueDate: "" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function LibraryPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Library Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage book catalog, issues, and returns
            </p>
          </div>
          <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-3.5 w-3.5" />
            Add Book
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Books"
          value="2,450"
          icon={<BookOpen className="h-6 w-6" />}
          trend="up"
          trendValue="+120"
          description="new this year"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Available"
          value="2,100"
          icon={<Library className="h-6 w-6" />}
          description="in library"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Issued"
          value="350"
          icon={<BookMarked className="h-6 w-6" />}
          trend="up"
          trendValue="+25"
          description="currently out"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Members"
          value="680"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+38"
          description="active members"
          gradient="bg-gradient-to-br from-violet-500 to-purple-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Book Catalog</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search books..." className="h-8 pl-8 w-52 text-xs" />
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 h-8">
                  <Filter className="h-3 w-3" />
                  Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left font-medium text-muted-foreground">Title</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Author</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Category</th>
                      <th className="pb-3 text-center font-medium text-muted-foreground">Copies</th>
                      <th className="pb-3 text-center font-medium text-muted-foreground">Available</th>
                      <th className="pb-3 text-right font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookCatalog.map((book, index) => (
                      <motion.tr
                        key={book.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 font-medium">{book.title}</td>
                        <td className="py-3 text-muted-foreground">{book.author}</td>
                        <td className="py-3">
                          <Badge variant="secondary" className="text-[10px]">{book.category}</Badge>
                        </td>
                        <td className="py-3 text-center">{book.totalCopies}</td>
                        <td className="py-3 text-center">{book.available}</td>
                        <td className="py-3 text-right">
                          <Badge variant={book.available > 0 ? "success" : "destructive"} className="text-[10px]">
                            {book.available > 0 ? "Available" : "All Issued"}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid hsl(var(--border))",
                          background: "hsl(var(--background))",
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value) => [`${value} Books`, ""]}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(value: string) => (
                          <span className="text-xs text-muted-foreground ml-1">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          issue.type === "issue" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                        )}>
                          {issue.type === "issue" ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{issue.student}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[140px]">{issue.book}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={issue.type === "issue" ? "warning" : "success"} className="text-[10px]">
                          {issue.type === "issue" ? "Issued" : "Returned"}
                        </Badge>
                        <p className="text-[10px] text-muted-foreground mt-1">{issue.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
