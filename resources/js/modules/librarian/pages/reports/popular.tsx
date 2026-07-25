import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { TrendingUp, BookOpen, Star, Download, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts"

const popularBooks = [
  { rank: 1, title: "NCERT Mathematics Class 10", author: "NCERT", issues: 89, rating: 4.8, category: "Mathematics" },
  { rank: 2, title: "HC Verma Physics", author: "H.C. Verma", issues: 76, rating: 4.9, category: "Science" },
  { rank: 3, title: "RD Sharma Mathematics", author: "R.D. Sharma", issues: 72, rating: 4.7, category: "Mathematics" },
  { rank: 4, title: "Oswaal Chemistry", author: "Oswaal", issues: 65, rating: 4.6, category: "Science" },
  { rank: 5, title: "NCERT English Class 10", author: "NCERT", issues: 58, rating: 4.5, category: "English" },
  { rank: 6, title: "Wren and Grammar", author: "Wren and Martin", issues: 52, rating: 4.8, category: "English" },
  { rank: 7, title: "NCERT Science Class 10", author: "NCERT", issues: 48, rating: 4.4, category: "Science" },
  { rank: 8, title: "NCERT Hindi Class 10", author: "NCERT", issues: 42, rating: 4.3, category: "Hindi" },
]

const genreData = [
  { name: "Science", value: 189, fill: "#ec4899" },
  { name: "Mathematics", value: 161, fill: "#f43f5e" },
  { name: "English", value: 110, fill: "#8b5cf6" },
  { name: "Hindi", value: 42, fill: "#6366f1" },
  { name: "Social Studies", value: 35, fill: "#3b82f6" },
]

const trendData = [
  { week: "W1", issues: 45 },
  { week: "W2", issues: 52 },
  { week: "W3", issues: 48 },
  { week: "W4", issues: 61 },
  { week: "W5", issues: 55 },
  { week: "W6", issues: 68 },
  { week: "W7", issues: 72 },
  { week: "W8", issues: 80 },
]

export function PopularBooksPage() {
  const [sortBy, setSortBy] = useState("issues")

  const sorted = [...popularBooks].sort((a, b) => sortBy === "issues" ? b.issues - a.issues : b.rating - a.rating)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Popular Books" description="Most borrowed books and reading trends" actions={<Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Most Borrowed" value="NCERT Maths" icon={<TrendingUp className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Total Issues" value={popularBooks.reduce((s, b) => s + b.issues, 0)} icon={<BookOpen className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Avg Rating" value="4.6" icon={<Star className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Active Genres" value={genreData.length} icon={<BarChart3 className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Book Rankings</CardTitle>
              <CardDescription>Top borrowed books this month</CardDescription>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="issues">By Issues</SelectItem>
                <SelectItem value="rating">By Rating</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sorted.slice(0, 5)} layout="vertical" barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="title" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={130} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} />
                  <Bar dataKey="issues" fill="#ec4899" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {sorted.map((book, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors">
                  <div className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold " + (i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-700" : "bg-muted text-muted-foreground")}>
                    {book.rank}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">{book.category}</Badge>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold">{book.issues}</p>
                    <p className="text-[10px] text-muted-foreground">issues</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Genre Preferences</CardTitle>
              <CardDescription>Issues by genre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genreData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                      {genreData.map((entry, index) => (<Cell key={"cell-" + index} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [value + " issues", "Count"]} />
                    <Legend verticalAlign="bottom" height={30} iconType="circle" formatter={(value) => <span className="text-[10px] text-muted-foreground">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Borrowing Trends</CardTitle>
              <CardDescription>Weekly issue count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} />
                    <Line type="monotone" dataKey="issues" stroke="#ec4899" strokeWidth={2.5} dot={{ fill: "#ec4899", strokeWidth: 2, r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
