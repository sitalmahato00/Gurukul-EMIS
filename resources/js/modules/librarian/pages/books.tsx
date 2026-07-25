import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BookMarked, Search, Plus, Edit, Eye, Filter, MoreHorizontal, BookOpen, CheckCircle, XCircle } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { useLibraryBooks } from "@/lib/hooks"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BooksPage() {
  const { data: booksResult, isLoading } = useLibraryBooks()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBook, setSelectedBook] = useState<any | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const allBooks = booksResult?.data || []

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const filteredBooks = allBooks.filter((book: any) => {
    const title = book.title || ""
    const author = book.author || ""
    const isbn = book.isbn || ""
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      isbn.includes(searchQuery)
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "available" && (book.available_copies ?? book.availableCopies ?? 0) > 0) ||
      (statusFilter === "issued" && (book.available_copies ?? book.availableCopies ?? 0) === 0)
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(allBooks.map((b: any) => b.category).filter(Boolean))]
  const totalBooks = allBooks.reduce((sum: number, b: any) => sum + (b.total_copies ?? b.totalCopies ?? 0), 0)
  const availableBooks = allBooks.reduce((sum: number, b: any) => sum + (b.available_copies ?? b.availableCopies ?? 0), 0)
  const issuedBooks = totalBooks - availableBooks

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Book Catalog"
        description="Manage your library's book collection"
        actions={
          <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Books" value={totalBooks} icon={<BookMarked className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Available" value={availableBooks} icon={<BookOpen className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Currently Issued" value={issuedBooks} icon={<CheckCircle className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Categories" value={categories.length} icon={<Filter className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Book Collection</CardTitle>
            <CardDescription>{filteredBooks.length} books found</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ISBN</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book: any) => (
                <TableRow key={book.id}>
                  <TableCell className="font-mono text-xs">{book.isbn || "N/A"}</TableCell>
                  <TableCell className="font-medium">{book.title || "N/A"}</TableCell>
                  <TableCell className="text-muted-foreground">{book.author || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{book.category || "N/A"}</Badge>
                  </TableCell>
                  <TableCell>{book.total_copies ?? book.totalCopies ?? 0}</TableCell>
                  <TableCell>{book.available_copies ?? book.availableCopies ?? 0}</TableCell>
                  <TableCell>
                    <Badge variant={(book.available_copies ?? book.availableCopies ?? 0) > 0 ? "success" : "destructive"}>
                      {(book.available_copies ?? book.availableCopies ?? 0) > 0 ? "Available" : "All Issued"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedBook(book)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedBook?.title}</DialogTitle>
            <DialogDescription>Book Details</DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">ISBN</Label>
                  <p className="font-mono text-sm">{selectedBook.isbn || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Author</Label>
                  <p className="text-sm font-medium">{selectedBook.author || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Category</Label>
                  <p className="text-sm">{selectedBook.category || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Total Copies</Label>
                  <p className="text-sm">{selectedBook.total_copies ?? selectedBook.totalCopies ?? 0}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Available</Label>
                  <p className="text-sm">{selectedBook.available_copies ?? selectedBook.availableCopies ?? 0}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <Badge variant={(selectedBook.available_copies ?? selectedBook.availableCopies ?? 0) > 0 ? "success" : "destructive"}>
                    {(selectedBook.available_copies ?? selectedBook.availableCopies ?? 0) > 0 ? "Available" : "All Issued"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>Enter the book details below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ISBN</Label>
                <Input placeholder="978-81-..." />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Book title" />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input placeholder="Author name" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Total Copies</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Book description..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowAddDialog(false)}>Add Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
