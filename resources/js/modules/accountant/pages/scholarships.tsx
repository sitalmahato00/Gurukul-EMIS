import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Award, Users, IndianRupee, TrendingUp, CheckCircle2, Clock, AlertTriangle, Plus, Download, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const scholarshipPrograms = [
  { id: "SCH-001", name: "Merit Scholarship", type: "Academic", amount: 25000, beneficiaries: 12, totalBudget: 300000, utilized: 280000, status: "active", criteria: "90%+ marks" },
  { id: "SCH-002", name: "Sports Excellence", type: "Sports", amount: 15000, beneficiaries: 8, totalBudget: 150000, utilized: 120000, status: "active", criteria: "State/National level" },
  { id: "SCH-003", name: "Financial Aid", type: "Need-based", amount: 30000, beneficiaries: 15, totalBudget: 500000, utilized: 420000, status: "active", criteria: "EWS/BPL" },
  { id: "SCH-004", name: "Sibling Discount", type: "Sibling", amount: 10000, beneficiaries: 22, totalBudget: 250000, utilized: 210000, status: "active", criteria: "2+ siblings" },
  { id: "SCH-005", name: "Staff Ward Concession", type: "Staff", amount: 20000, beneficiaries: 6, totalBudget: 150000, utilized: 100000, status: "active", criteria: "Employee child" },
]

const eligibleStudents = [
  { id: "1", name: "Aarav Sharma", class: "10-A", program: "Merit Scholarship", amount: 25000, status: "disbursed", date: "2024-06-01" },
  { id: "2", name: "Priya Patel", class: "10-A", program: "Merit Scholarship", amount: 25000, status: "disbursed", date: "2024-06-01" },
  { id: "3", name: "Rohan Gupta", class: "9-B", program: "Financial Aid", amount: 30000, status: "pending", date: "2024-06-15" },
  { id: "4", name: "Arjun Mehta", class: "9-A", program: "Sports Excellence", amount: 15000, status: "approved", date: "2024-06-10" },
  { id: "5", name: "Ananya Singh", class: "11-A", program: "Merit Scholarship", amount: 25000, status: "disbursed", date: "2024-06-01" },
  { id: "6", name: "Vivek Rao", class: "11-B", program: "Sibling Discount", amount: 10000, status: "pending", date: "2024-06-20" },
]

const disbursementData = [
  { month: "Jan", disbursed: 180000, budget: 200000 },
  { month: "Feb", disbursed: 195000, budget: 200000 },
  { month: "Mar", disbursed: 210000, budget: 220000 },
  { month: "Apr", disbursed: 175000, budget: 200000 },
  { month: "May", disbursed: 225000, budget: 250000 },
  { month: "Jun", disbursed: 193000, budget: 200000 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

const statusColors: Record<string, string> = {
  disbursed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  approved: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export function ScholarshipsPage() {
  const totalBudget = scholarshipPrograms.reduce((s, p) => s + p.totalBudget, 0)
  const totalUtilized = scholarshipPrograms.reduce((s, p) => s + p.utilized, 0)
  const totalBeneficiaries = scholarshipPrograms.reduce((s, p) => s + p.beneficiaries, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Scholarships"
        description="Manage scholarship programs, eligibility, and disbursements"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button size="sm"><Plus className="mr-2 h-4 w-4" /> New Program</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Budget" value={formatCurrency(totalBudget)} icon={<IndianRupee className="h-6 w-6" />} description="this academic year" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Utilized" value={formatCurrency(totalUtilized)} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue={`${Math.round((totalUtilized / totalBudget) * 100)}% used`} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Beneficiaries" value={totalBeneficiaries} icon={<Users className="h-6 w-6" />} description="across all programs" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Active Programs" value={scholarshipPrograms.length} icon={<Award className="h-6 w-6" />} description="running this year" gradient="from-amber-500 to-orange-500" />
      </div>

      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="students">Eligible Students</TabsTrigger>
          <TabsTrigger value="disbursement">Disbursement Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scholarshipPrograms.map((prog) => {
              const pct = Math.round((prog.utilized / prog.totalBudget) * 100)
              return (
                <motion.div key={prog.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Card className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-sm">{prog.name}</h3>
                          <Badge variant="secondary" className="text-[10px] mt-1">{prog.type}</Badge>
                        </div>
                        <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{prog.status}</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Scholarship Amount</span>
                          <span className="font-semibold">{formatCurrency(prog.amount)}/student</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Criteria</span>
                          <span>{prog.criteria}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Beneficiaries</span>
                          <span className="font-semibold">{prog.beneficiaries} students</span>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Budget Utilized</span>
                            <span>{formatCurrency(prog.utilized)} / {formatCurrency(prog.totalBudget)}</span>
                          </div>
                          <Progress value={pct} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="students">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Eligible Students</CardTitle>
              <CardDescription className="text-xs">Students with active scholarship allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs">Class</TableHead>
                    <TableHead className="text-xs">Program</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eligibleStudents.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="text-sm font-medium">{s.name}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px]">{s.class}</Badge></TableCell>
                      <TableCell className="text-xs">{s.program}</TableCell>
                      <TableCell className="text-sm font-semibold">{formatCurrency(s.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[10px] gap-1 ${statusColors[s.status]}`}>
                          {s.status === "disbursed" ? <CheckCircle2 className="h-3 w-3" /> : s.status === "pending" ? <Clock className="h-3 w-3" /> : null}
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.date}</TableCell>
                      <TableCell><Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disbursement">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Disbursement Trends</CardTitle>
              <CardDescription className="text-xs">Monthly scholarship disbursement vs budget allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={disbursementData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                    <Legend />
                    <Bar dataKey="budget" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Budget" />
                    <Bar dataKey="disbursed" fill="#10b981" radius={[4, 4, 0, 0]} name="Disbursed" />
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
