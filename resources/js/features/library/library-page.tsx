import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { books } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  BookCheck,
  BookX,
  DollarSign,
  Plus,
  Download,
  Search,
  QrCode,
  Barcode,
  Printer,
  ArrowUpRight,
  Users,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const categoryData = [
  { category: "Mathematics", books: 150, issued: 42 },
  { category: "Science", books: 120, issued: 38 },
  { category: "English", books: 100, issued: 35 },
  { category: "Hindi", books: 80, issued: 28 },
  { category: "Social Studies", books: 90, issued: 30 },
]

export function LibraryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Library"
        description="Manage books, issues, returns, and library resources"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Library" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <QrCode className="h-4 w-4" /> QR Scan
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Printer className="h-4 w-4" /> ID Cards
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Book
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Books" value="2,450" icon={<BookOpen className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Available" value="2,280" icon={<BookCheck className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Issued" value="170" icon={<BookX className="h-6 w-6" />} gradient="gradient-warning" />
        <StatCard title="Fines Collected" value="₹4,200" icon={<DollarSign className="h-6 w-6" />} trend="up" trendValue="+12%" />
      </div>

      <Tabs defaultValue="books" className="space-y-6">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="issues">Issues & Returns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Book Catalog</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Search books..."
                    className="h-9 pl-9 pr-4 rounded-xl border bg-background text-sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {books.map((book) => (
                  <div key={book.id} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author} &middot; {book.publisher} &middot; {book.publishYear}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{book.availableCopies}/{book.totalCopies} available</p>
                      <p className="text-xs text-muted-foreground">Shelf: {book.shelf}</p>
                    </div>
                    <Badge variant={book.availableCopies > 0 ? "success" : "destructive"}>
                      {book.availableCopies > 0 ? "Available" : "Issued"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Issues</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <BookCheck className="h-4 w-4" /> Issue Book
                </Button>
                <Button size="sm" className="gap-2">
                  <BookX className="h-4 w-4" /> Return Book
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">No recent issues to display</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Books by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
                  <Bar dataKey="books" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="issued" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
