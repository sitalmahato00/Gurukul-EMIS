import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Users, Plus, Search, Eye, BookMarked, Edit } from "lucide-react"
import { books } from "@/shared/utils/mock-data"
import { cn, getInitials } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const authorList = [
  { id: "1", name: "R.D. Sharma", nationality: "Indian", bio: "Renowned mathematics author with 30+ years of experience", booksCount: 12 },
  { id: "2", name: "Lakhmir Singh", nationality: "Indian", bio: "Science textbook author for CBSE curriculum", booksCount: 8 },
  { id: "3", name: "H.C. Verma", nationality: "Indian", bio: "Physics professor and author of Concepts of Physics", booksCount: 5 },
  { id: "4", name: "NCERT", nationality: "Indian", bio: "National Council of Educational Research and Training", booksCount: 45 },
  { id: "5", name: "Wren & Martin", nationality: "British", bio: "Classic English grammar reference book authors", booksCount: 3 },
  { id: "6", name: "Oswaal", nationality: "Indian", bio: "Educational publisher specializing in exam preparation", booksCount: 20 },
  { id: "7", name: "Arihant", nationality: "Indian", bio: "Competitive exam preparation books publisher", booksCount: 35 },
]

const authorColors = ["#ec4899", "#f43f5e", "#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#10b981"]

const authorBookData = authorList.map((a, i) => ({
  name: a.name.length > 12 ? a.name.substring(0, 12) + "..." : a.name,
  books: a.booksCount,
  fill: authorColors[i % authorColors.length],
}))

export function AuthorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState<typeof authorList[0] | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredAuthors = authorList.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const authorBooks = selectedAuthor
    ? books.filter((b) => b.author === selectedAuthor.name)
    : []

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Authors"
        description="Browse and manage library authors"
        actions={
          <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4" />
            Add Author
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Authors" value={authorList.length} icon={<Users className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Total Books" value={authorList.reduce((s, a) => s + a.booksCount, 0)} icon={<BookMarked className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Indian Authors" value={authorList.filter((a) => a.nationality === "Indian").length} icon={<Users className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Avg Books/Author" value={Math.round(authorList.reduce((s, a) => s + a.booksCount, 0) / authorList.length)} icon={<BookMarked className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Author Directory</CardTitle>
              <CardDescription>{filteredAuthors.length} authors</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-56"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredAuthors.map((author, i) => (
                <motion.div
                  key={author.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedAuthor(author)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md",
                    selectedAuthor?.id === author.id && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-11 w-11">
                      <AvatarFallback style={{ backgroundColor: `${authorColors[i % authorColors.length]}20`, color: authorColors[i % authorColors.length] }}>
                        {getInitials(author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{author.name}</p>
                      <p className="text-xs text-muted-foreground">{author.nationality}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-[10px]">{author.booksCount} books</Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Books by Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={authorBookData} layout="vertical" barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                      formatter={(value) => [`${value} books`, "Count"]}
                    />
                    <Bar dataKey="books" radius={[0, 6, 6, 0]}>
                      {authorBookData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {selectedAuthor && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{selectedAuthor.name}</CardTitle>
                <CardDescription>Author Profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{selectedAuthor.bio}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Nationality:</span>
                  <span className="font-medium">{selectedAuthor.nationality}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Books in Library:</span>
                  <Badge variant="secondary">{selectedAuthor.booksCount}</Badge>
                </div>
                {authorBooks.length > 0 && (
                  <div className="space-y-2 pt-2 border-t">
                    <p className="text-xs font-medium text-muted-foreground">Available Titles:</p>
                    {authorBooks.map((b) => (
                      <p key={b.id} className="text-sm">{b.title}</p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Author</DialogTitle>
            <DialogDescription>Add a new author to the library</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Author name" />
            </div>
            <div className="space-y-2">
              <Label>Nationality</Label>
              <Input placeholder="Nationality" />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea placeholder="Author biography..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowAddDialog(false)}>Add Author</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
