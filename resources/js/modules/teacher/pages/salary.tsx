import { useState } from "react"
import { motion } from "framer-motion"
import {
  Wallet,
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Receipt,
  BadgeIndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { formatCurrency, cn } from "@/lib/utils"

const salaryDetails = {
  basic: 45000,
  hra: 18000,
  conveyance: 2500,
  medical: 1500,
  education: 2000,
  pf: 5400,
  professionalTax: 200,
  incomeTax: 4500,
  insurance: 800,
}

const totalAllowances = salaryDetails.hra + salaryDetails.conveyance + salaryDetails.medical + salaryDetails.education
const totalDeductions = salaryDetails.pf + salaryDetails.professionalTax + salaryDetails.incomeTax + salaryDetails.insurance
const grossSalary = salaryDetails.basic + totalAllowances
const netSalary = grossSalary - totalDeductions

const deductionBreakdown = [
  { name: "PF", value: salaryDetails.pf, color: "#6366f1" },
  { name: "Income Tax", value: salaryDetails.incomeTax, color: "#ef4444" },
  { name: "Professional Tax", value: salaryDetails.professionalTax, color: "#f59e0b" },
  { name: "Insurance", value: salaryDetails.insurance, color: "#10b981" },
]

const monthlyTrend = [
  { month: "Jan", gross: grossSalary, net: netSalary },
  { month: "Feb", gross: grossSalary, net: netSalary },
  { month: "Mar", gross: grossSalary + 2000, net: netSalary + 1600 },
  { month: "Apr", gross: grossSalary, net: netSalary },
  { month: "May", gross: grossSalary, net: netSalary },
  { month: "Jun", gross: grossSalary + 5000, net: netSalary + 4000 },
  { month: "Jul", gross: grossSalary, net: netSalary },
]

const salarySlips = [
  { month: "July 2026", gross: grossSalary, deductions: totalDeductions, net: netSalary, status: "generated", date: "Jul 31, 2026" },
  { month: "June 2026", gross: grossSalary + 5000, deductions: totalDeductions, net: netSalary + 4000, status: "generated", date: "Jun 30, 2026" },
  { month: "May 2026", gross: grossSalary, deductions: totalDeductions, net: netSalary, status: "generated", date: "May 31, 2026" },
  { month: "April 2026", gross: grossSalary, deductions: totalDeductions, net: netSalary, status: "generated", date: "Apr 30, 2026" },
  { month: "March 2026", gross: grossSalary + 2000, deductions: totalDeductions, net: netSalary + 1600, status: "generated", date: "Mar 31, 2026" },
  { month: "February 2026", gross: grossSalary, deductions: totalDeductions, net: netSalary, status: "generated", date: "Feb 28, 2026" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function SalaryPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Salary Details"
          description="View your salary breakdown, deductions, and download payslips"
          actions={
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Latest Slip
            </Button>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Gross Salary" value={formatCurrency(grossSalary)} icon={<ArrowUpRight className="h-6 w-6" />} description="before deductions" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Net Salary" value={formatCurrency(netSalary)} icon={<Wallet className="h-6 w-6" />} description="in-hand pay" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Deductions" value={formatCurrency(totalDeductions)} icon={<ArrowDownRight className="h-6 w-6" />} description="this month" gradient="from-rose-500 to-red-500" />
        <StatCard title="Allowances" value={formatCurrency(totalAllowances)} icon={<BadgeIndianRupee className="h-6 w-6" />} description="additional benefits" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Breakdown Card */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="h-5 w-5 text-indigo-500" />
                Salary Breakdown
              </CardTitle>
              <CardDescription>July 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                <p className="text-white/80 text-sm">Net Salary (In-Hand)</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(netSalary)}</p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  Earnings
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Basic Salary", value: salaryDetails.basic },
                    { label: "House Rent Allowance (HRA)", value: salaryDetails.hra },
                    { label: "Conveyance Allowance", value: salaryDetails.conveyance },
                    { label: "Medical Allowance", value: salaryDetails.medical },
                    { label: "Education Allowance", value: salaryDetails.education },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-border">
                    <span>Total Earnings</span>
                    <span className="text-emerald-600">{formatCurrency(grossSalary)}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  Deductions
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Provident Fund (PF)", value: salaryDetails.pf },
                    { label: "Income Tax (TDS)", value: salaryDetails.incomeTax },
                    { label: "Professional Tax", value: salaryDetails.professionalTax },
                    { label: "Group Insurance", value: salaryDetails.insurance },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-red-600">-{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-border">
                    <span>Total Deductions</span>
                    <span className="text-red-600">-{formatCurrency(totalDeductions)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          {/* Deductions PieChart */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <PieChartIcon className="h-4 w-4 text-rose-500" />
                Deductions Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deductionBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
                      {deductionBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [formatCurrency(Number(value)), ""]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {deductionBreakdown.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-muted-foreground flex-1">{d.name}</span>
                    <span className="font-medium">{formatCurrency(d.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend LineChart */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <LineChartIcon className="h-4 w-4 text-indigo-500" />
                Monthly Salary Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => `${(Number(v) / 1000)}K`} />
                    <Tooltip
                      formatter={(value) => [formatCurrency(Number(value)), ""]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                    <Line type="monotone" dataKey="gross" name="Gross" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 3 }} />
                    <Line type="monotone" dataKey="net" name="Net" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Salary Slips Table */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-500" />
              Salary Slips
            </CardTitle>
            <CardDescription>Download or view your monthly salary slips</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Generated On</TableHead>
                  <TableHead className="text-right">Gross</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salarySlips.map((slip, i) => (
                  <TableRow key={i} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-sm">{slip.month}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{slip.date}</TableCell>
                    <TableCell className="text-right text-sm">{formatCurrency(slip.gross)}</TableCell>
                    <TableCell className="text-right text-sm text-red-600">-{formatCurrency(slip.deductions)}</TableCell>
                    <TableCell className="text-right text-sm font-bold">{formatCurrency(slip.net)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        Generated
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
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
    </motion.div>
  )
}
