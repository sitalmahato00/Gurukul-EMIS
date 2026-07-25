import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Tags, Percent, Users, IndianRupee, TrendingUp, Plus, Edit2, Trash2, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const discountCategories = [
  { id: "DC-001", name: "Sibling Discount", description: "Discount for siblings studying in the same school", icon: "👥" },
  { id: "DC-002", name: "Early Payment", description: "Discount for paying full year fee in advance", icon: "⏰" },
  { id: "DC-003", name: "Staff Concession", children: "Concession for employee wards", icon: "👨‍🏫" },
  { id: "DC-004", name: "Alumni Discount", description: "Discount for children of school alumni", icon: "🎓" },
  { id: "DC-005", name: "Meritorious", description: "Performance-based fee reduction", icon: "🏆" },
]

const activeDiscounts = [
  { id: "DISC-001", name: "Sibling 2nd Child", category: "Sibling Discount", type: "percentage", value: 15, minFee: 50000, maxDiscount: 10000, usageCount: 45, status: "active", validFrom: "2024-04-01", validTo: "2025-03-31" },
  { id: "DISC-002", name: "Sibling 3rd Child", category: "Sibling Discount", type: "percentage", value: 25, minFee: 50000, maxDiscount: 18000, usageCount: 12, status: "active", validFrom: "2024-04-01", validTo: "2025-03-31" },
  { id: "DISC-003", name: "Early Bird 10%", category: "Early Payment", type: "percentage", value: 10, minFee: 30000, maxDiscount: 8000, usageCount: 78, status: "active", validFrom: "2024-04-01", validTo: "2024-06-30" },
  { id: "DISC-004", name: "Staff Ward Full", category: "Staff Concession", type: "percentage", value: 50, minFee: 0, maxDiscount: 40000, usageCount: 6, status: "active", validFrom: "2024-04-01", validTo: "2025-03-31" },
  { id: "DISC-005", name: "Alumni Child", category: "Alumni Discount", type: "fixed", value: 5000, minFee: 0, maxDiscount: 5000, usageCount: 18, status: "active", validFrom: "2024-04-01", validTo: "2025-03-31" },
  { id: "DISC-006", name: "Top 10 Merit", category: "Meritorious", type: "percentage", value: 20, minFee: 40000, maxDiscount: 15000, usageCount: 10, status: "inactive", validFrom: "2024-01-01", validTo: "2024-03-31" },
]

const usageData = [
  { category: "Sibling", count: 57, amount: 195000 },
  { category: "Early Payment", count: 78, amount: 312000 },
  { category: "Staff", count: 6, amount: 240000 },
  { category: "Alumni", count: 18, amount: 90000 },
  { category: "Merit", count: 10, amount: 150000 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function DiscountsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filtered = activeDiscounts.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === "all" || d.category === categoryFilter
    return matchSearch && matchCat
  })

  const totalDiscountGiven = activeDiscounts.reduce((s, d) => s + d.usageCount * (d.type === "fixed" ? d.value : d.maxDiscount * 0.6), 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Discounts"
        description="Manage fee discount categories, active discounts, and usage analytics"
        actions={
          <Button size="sm"><Plus className="mr-2 h-4 w-4" /> New Discount</Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Discounts" value={activeDiscounts.filter((d) => d.status === "active").length} icon={<Tags className="h-6 w-6" />} description="currently available" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Usage" value={activeDiscounts.reduce((s, d) => s + d.usageCount, 0)} icon={<Users className="h-6 w-6" />} description="students benefited" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Discount Given" value={formatCurrency(totalDiscountGiven)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+12%" description="this quarter" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Categories" value={discountCategories.length} icon={<Percent className="h-6 w-6" />} description="discount types" gradient="from-amber-500 to-orange-500" />
      </div>

      <Tabs defaultValue="discounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="discounts">Active Discounts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="discounts">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Discount List</CardTitle>
                  <CardDescription className="text-xs">All configured discount rules</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input placeholder="Search discounts..." className="h-9 w-[200px] text-xs pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px] h-9 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {discountCategories.map((c) => (
                        <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Discount</TableHead>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Value</TableHead>
                    <TableHead className="text-xs">Max Discount</TableHead>
                    <TableHead className="text-xs">Usage</TableHead>
                    <TableHead className="text-xs">Valid Period</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.id}</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px]">{d.category}</Badge></TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{d.type}</Badge></TableCell>
                      <TableCell className="text-sm font-semibold">{d.type === "percentage" ? `${d.value}%` : formatCurrency(d.value)}</TableCell>
                      <TableCell className="text-sm">{formatCurrency(d.maxDiscount)}</TableCell>
                      <TableCell className="text-sm font-medium">{d.usageCount}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{d.validFrom} to {d.validTo}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[10px] ${d.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}>
                          {d.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {discountCategories.map((cat) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{cat.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{cat.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="secondary" className="text-[10px]">
                            {activeDiscounts.filter((d) => d.category === cat.name).length} discounts
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Discount Usage by Category</CardTitle>
              <CardDescription className="text-xs">Number of students and total discount amount per category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="category" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [Number(value).toLocaleString(), ""]} />
                    <Legend />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Students" />
                    <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} name="Amount (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
