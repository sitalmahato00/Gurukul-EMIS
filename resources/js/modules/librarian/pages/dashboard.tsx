import { Outlet } from "react-router-dom"
import {
  BookOpen,
  LayoutDashboard,
  BookMarked,
  Tags,
  Users,
  Building2,
  BookPlus,
  BookMinus,
  AlertTriangle,
  UsersRound,
  CircleDollarSign,
  ScanBarcode,
  QrCode,
  CreditCard,
  GraduationCap,
  IdCard,
  FileBarChart,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Bell,
  Plus,
  ArrowRightLeft,
  RotateCcw,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { PortalLayout } from "@/shared/components/portal-layout"
import type { NavGroup } from "@/shared/components/portal-layout"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLibraryBooks, useLibraryIssues, useLibraryOverdue } from "@/lib/hooks"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/librarian", icon: LayoutDashboard },
    ],
  },
  {
    title: "Books",
    items: [
      { label: "Book Management", href: "/librarian/books", icon: BookMarked },
      { label: "Categories", href: "/librarian/categories", icon: Tags },
      { label: "Authors", href: "/librarian/authors", icon: Users },
      { label: "Publishers", href: "/librarian/publishers", icon: Building2 },
    ],
  },
  {
    title: "Issue / Return",
    items: [
      { label: "Issue Books", href: "/librarian/issue", icon: BookPlus },
      { label: "Return Books", href: "/librarian/return", icon: BookMinus },
      { label: "Overdue Books", href: "/librarian/overdue", icon: AlertTriangle, badge: "12" },
    ],
  },
  {
    title: "Library",
    items: [
      { label: "Members", href: "/librarian/members", icon: UsersRound },
      { label: "Fine Collection", href: "/librarian/fines", icon: CircleDollarSign },
      { label: "Barcode Scanner", href: "/librarian/barcode", icon: ScanBarcode },
      { label: "QR Code", href: "/librarian/qr", icon: QrCode },
    ],
  },
  {
    title: "ID Cards",
    items: [
      { label: "Student ID", href: "/librarian/id-cards/student", icon: CreditCard },
      { label: "Teacher ID", href: "/librarian/id-cards/teacher", icon: GraduationCap },
      { label: "Staff ID", href: "/librarian/id-cards/staff", icon: IdCard },
    ],
  },
  {
    title: "Reports",
    items: [
      { label: "Library Reports", href: "/librarian/reports", icon: FileBarChart },
      { label: "Popular Books", href: "/librarian/reports/popular", icon: TrendingUp },
      { label: "Usage Stats", href: "/librarian/reports/usage", icon: BarChart3 },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/librarian/messages", icon: MessageSquare },
      { label: "Notifications", href: "/librarian/notifications", icon: Bell },
    ],
  },
]

export function LibrarianLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-pink-500"
      accentTo="to-rose-600"
      LogoIcon={BookOpen}
    />
  )
}

const categoryData = [
  { name: "Mathematics", count: 150, fill: "#ec4899" },
  { name: "Science", count: 120, fill: "#f43f5e" },
  { name: "English", count: 100, fill: "#8b5cf6" },
  { name: "Hindi", count: 80, fill: "#6366f1" },
  { name: "Social Studies", count: 90, fill: "#3b82f6" },
]

const recentIssues = [
  { student: "Aarav Sharma", book: "NCERT Mathematics Class 10", issueDate: "2026-07-18", returnDate: "2026-08-01", status: "active" },
  { student: "Priya Patel", book: "HC Verma Physics", issueDate: "2026-07-15", returnDate: "2026-07-29", status: "returned" },
  { student: "Rohan Gupta", book: "NCERT Science Class 10", issueDate: "2026-07-20", returnDate: "2026-08-03", status: "active" },
  { student: "Ananya Singh", book: "Oswaal Chemistry", issueDate: "2026-07-10", returnDate: "2026-07-24", status: "overdue" },
  { student: "Kiran Desai", book: "NCERT English Class 10", issueDate: "2026-07-22", returnDate: "2026-08-05", status: "active" },
]

const overdueBooks = [
  { student: "Ananya Singh", book: "Oswaal Chemistry", dueDate: "2026-07-24", fine: 150 },
  { student: "Arjun Mehta", book: "NCERT Mathematics Class 10", dueDate: "2026-07-22", fine: 200 },
  { student: "Vivek Rao", book: "HC Verma Physics", dueDate: "2026-07-20", fine: 350 },
]

const fineCollectionData = [
  { month: "Jan", collected: 3200 },
  { month: "Feb", collected: 2800 },
  { month: "Mar", collected: 4100 },
  { month: "Apr", collected: 3600 },
  { month: "May", collected: 2900 },
  { month: "Jun", collected: 4200 },
]

const quickActions = [
  { label: "Add Book", icon: Plus, color: "text-pink-600 bg-pink-50 hover:bg-pink-100" },
  { label: "Issue Book", icon: ArrowRightLeft, color: "text-rose-600 bg-rose-50 hover:bg-rose-100" },
  { label: "Return Book", icon: RotateCcw, color: "text-violet-600 bg-violet-50 hover:bg-violet-100" },
  { label: "Scan Barcode", icon: ScanBarcode, color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100" },
  { label: "Generate ID Card", icon: IdCard, color: "text-amber-600 bg-amber-50 hover:bg-amber-100" },
  { label: "Library Report", icon: FileBarChart, color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function LibrarianDashboard() {
  const { data: booksData, isLoading: booksLoading } = useLibraryBooks()
  const { data: issuesData, isLoading: issuesLoading } = useLibraryIssues()
  const { data: overdueData, isLoading: overdueLoading } = useLibraryOverdue()

  const isLoading = booksLoading || issuesLoading || overdueLoading

  const totalBooks = booksData?.total || 0
  const issuedBooks = issuesData?.data?.filter((i: any) => i.status === "active").length || issuesData?.total || 0
  const overdueCount = overdueData?.total || 0
  const availableBooks = totalBooks - issuedBooks

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good Morning, Sonia Gupta
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of the library today
            </p>
          </div>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-xs">
            <BookOpen className="h-3.5 w-3.5 text-pink-500" />
            Librarian
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Total Books"
          value={String(totalBooks.toLocaleString())}
          icon={<BookMarked className="h-6 w-6" />}
          description="in library"
          gradient="bg-gradient-to-br from-pink-500 to-rose-500"
        />
        <StatCard
          title="Issued Books"
          value={String(issuedBooks)}
          icon={<BookPlus className="h-6 w-6" />}
          description="currently issued"
          gradient="bg-gradient-to-br from-rose-500 to-red-500"
        />
        <StatCard
          title="Available"
          value={String(availableBooks)}
          icon={<BookOpen className="h-6 w-6" />}
          description="ready to issue"
          gradient="bg-gradient-to-br from-violet-500 to-purple-500"
        />
        <StatCard
          title="Overdue"
          value={String(overdueCount)}
          icon={<AlertTriangle className="h-6 w-6" />}
          description="past due date"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Fines Collected"
          value={`₹${overdueData?.data?.reduce((s: number, o: any) => s + (o.fine || 0), 0)?.toLocaleString() || "0"}`}
          icon={<CircleDollarSign className="h-6 w-6" />}
          description="total fines"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Books by Category */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Books by Category</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <BarChart3 className="mr-1 h-3 w-3" />
                Distribution
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value} books`, "Count"]}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fine Collection Trend */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Fine Collection</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <TrendingUp className="mr-1 h-3 w-3" />
                Monthly
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fineCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Collected"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="collected"
                      stroke="#ec4899"
                      strokeWidth={2.5}
                      dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Issues + Overdue */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Issues */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Issues</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {(issuesData?.data || []).slice(0, 5).map((issue: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10">
                        <BookOpen className="h-5 w-5 text-pink-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{issue.student_name || issue.student || "N/A"}</p>
                        <p className="text-xs text-muted-foreground truncate">{issue.book_title || issue.book || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="hidden sm:block text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(issue.issue_date || issue.issueDate || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          {" → "}
                          {new Date(issue.due_date || issue.returnDate || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                      <Badge
                        variant={
                          issue.status === "active"
                            ? "default"
                            : issue.status === "returned"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-[10px] capitalize"
                      >
                        {issue.status || "N/A"}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!issuesData?.data || issuesData.data.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">No issues found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Overdue Books Alert */}
        <motion.div variants={item}>
          <Card className="border-destructive/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Overdue Books
              </CardTitle>
              <Badge variant="destructive" className="text-[10px]">
                {overdueCount} overdue
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(overdueData?.data || []).slice(0, 3).map((book: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl border border-destructive/10 bg-destructive/5 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{book.student_name || book.student || "N/A"}</p>
                        <p className="text-xs text-muted-foreground truncate">{book.book_title || book.book || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(book.due_date || book.dueDate || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                      <Badge variant="destructive" className="text-[10px] font-bold">
                        ₹{book.fine || 0}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!overdueData?.data || overdueData.data.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">No overdue books</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center gap-2.5 rounded-xl border border-border p-4 transition-colors ${action.color} cursor-pointer`}
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
