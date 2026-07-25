import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { BookOpen, Search, Clock, CheckCircle2, AlertCircle, BookMarked, Download, BookmarkPlus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useLibraryBooks } from "@/lib/hooks"

const catalogBooks = [
  { id: 1, title: "Advanced Physics", author: "H.C. Verma", category: "Science", available: 3, total: 5, isbn: "978-8174091789" },
  { id: 2, title: "Mathematics for Class X", author: "R.D. Sharma", category: "Mathematics", available: 0, total: 4, isbn: "978-9389432152" },
  { id: 3, title: "English Grammar & Composition", author: "Wren & Martin", category: "English", available: 2, total: 3, isbn: "978-8183503143" },
  { id: 4, title: "Modern Chemistry", author: "O.P. Tandon", category: "Chemistry", available: 1, total: 3, isbn: "978-9389432169" },
  { id: 5, title: "Python Programming", author: "E.Balagurusamy", category: "Computer Science", available: 2, total: 4, isbn: "978-1259029950" },
  { id: 6, title: "Hindi Sahitya", author: "Ram Vilas Sharma", category: "Hindi", available: 4, total: 5, isbn: "978-8126714520" },
]

const borrowedBooks = [
  { id: 1, title: "Advanced Physics", author: "H.C. Verma", issuedDate: "Jul 1, 2026", dueDate: "Jul 15, 2026", status: "overdue" },
  { id: 2, title: "Python Programming", author: "E.Balagurusamy", issuedDate: "Jul 10, 2026", dueDate: "Jul 24, 2026", status: "due-soon" },
  { id: 3, title: "English Grammar & Composition", author: "Wren & Martin", issuedDate: "Jul 18, 2026", dueDate: "Aug 1, 2026", status: "active" },
]

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: booksData, isLoading } = useLibraryBooks()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiBooks = booksData?.data || []
  const catalogBooksData = apiBooks.length > 0 ? apiBooks.map((b: any, i: number) => ({
    id: b.id || i + 1,
    title: b.title || b.name || "",
    author: b.author || "",
    category: b.category || b.genre || "",
    available: b.available ?? b.copies_available ?? 0,
    total: b.total ?? b.total_copies ?? 0,
    isbn: b.isbn || "",
  })) : catalogBooks
  const filteredBooks = catalogBooksData.filter((b: any) =>
    b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const overdueCount = borrowedBooks.filter(b => b.status === "overdue").length
  const dueSoonCount = borrowedBooks.filter(b => b.status === "due-soon").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Library"
        description="Search books, check availability, and manage borrowed books"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Books" value={catalogBooksData.length.toString()} icon={<BookOpen className="h-6 w-6" />} description="In catalog" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Borrowed" value={borrowedBooks.length.toString()} icon={<BookMarked className="h-6 w-6" />} description="Currently issued" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Overdue" value={overdueCount.toString()} icon={<AlertCircle className="h-6 w-6" />} description="Return immediately" gradient="from-rose-500 to-red-500" />
        <StatCard title="Due Soon" value={dueSoonCount.toString()} icon={<Clock className="h-6 w-6" />} description="Within 7 days" gradient="from-amber-500 to-orange-500" />
      </div>

      <Tabs defaultValue="catalog">
        <TabsList>
          <TabsTrigger value="catalog">Book Catalog</TabsTrigger>
          <TabsTrigger value="borrowed">My Borrowed Books</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Book Catalog</CardTitle>
                  <CardDescription>Search and browse available books</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by title, author, or category..." className="pl-9 w-72" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredBooks.map((book: any) => (
                  <div key={book.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm">{book.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{book.author} &middot; ISBN: {book.isbn}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="outline" className="text-xs">{book.category}</Badge>
                          <Badge className={cn("text-xs", book.available > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                            {book.available > 0 ? `${book.available} available` : "Unavailable"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: book.total }).map((_, i) => (
                              <div key={i} className={cn("w-2 h-2 rounded-full", i < book.available ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700")} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">{book.available}/{book.total} copies</span>
                        </div>
                        {book.available > 0 && (
                          <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white">
                            <BookmarkPlus className="h-3 w-3 mr-1" />
                            Reserve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrowed">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base">My Borrowed Books</CardTitle>
              <CardDescription>Books currently issued to you</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowedBooks.map((book, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.issuedDate}</TableCell>
                      <TableCell className="font-medium">{book.dueDate}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("text-xs",
                          book.status === "active" ? "bg-green-100 text-green-700" :
                          book.status === "due-soon" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        )}>
                          {book.status === "active" ? "Active" : book.status === "due-soon" ? "Due Soon" : "Overdue"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {book.status === "overdue" && (
                          <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white">
                            Renew
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {overdueCount > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">You have {overdueCount} overdue book(s). Please return or renew to avoid fines.</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
