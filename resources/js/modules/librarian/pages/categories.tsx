import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Tags, Plus, Edit, Trash2, BookMarked } from "lucide-react"
import { books } from "@/shared/utils/mock-data"
import { cn } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const initialCategories = [
  { id: "1", name: "Mathematics", description: "Mathematics textbooks and references", color: "#ec4899" },
  { id: "2", name: "Science", description: "Physics, Chemistry, Biology", color: "#f43f5e" },
  { id: "3", name: "English", description: "English literature and grammar", color: "#8b5cf6" },
  { id: "4", name: "Hindi", description: "Hindi literature and language", color: "#6366f1" },
  { id: "5", name: "Social Studies", description: "History, Geography, Civics", color: "#3b82f6" },
  { id: "6", name: "Physics", description: "Physics textbooks and references", color: "#06b6d4" },
  { id: "7", name: "Chemistry", description: "Chemistry textbooks and references", color: "#10b981" },
]

export function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState<typeof categories[0] | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const bookCountByCategory = categories.map((cat) => ({
    name: cat.name,
    count: books.filter((b) => b.category === cat.name).length + Math.floor(Math.random() * 50) + 10,
    fill: cat.color,
  }))

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Book Categories"
        description="Organize your library collection by categories"
        actions={
          <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Categories" value={categories.length} icon={<Tags className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Total Books" value={bookCountByCategory.reduce((s, c) => s + c.count, 0)} icon={<BookMarked className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Most Popular" value={bookCountByCategory.sort((a, b) => b.count - a.count)[0]?.name || "N/A"} icon={<Tags className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Avg Books/Category" value={Math.round(bookCountByCategory.reduce((s, c) => s + c.count, 0) / categories.length)} icon={<BookMarked className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Books by Category</CardTitle>
              <CardDescription>Distribution across categories</CardDescription>
            </div>
            <Badge variant="secondary" className="text-[10px]">Bar Chart</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookCountByCategory} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                    formatter={(value) => [`${value} books`, "Count"]}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {bookCountByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Category List</CardTitle>
            <div className="flex gap-1">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="h-8 px-3 text-xs">Grid</Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 px-3 text-xs">List</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredCategories.map((cat) => (
                  <motion.div key={cat.id} whileHover={{ scale: 1.02 }} className="rounded-xl border p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingCategory(cat)}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="font-medium text-sm">{cat.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                    <Badge variant="secondary" className="mt-2 text-[10px]">
                      {bookCountByCategory.find((b) => b.name === cat.name)?.count || 0} books
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCategories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between rounded-xl border p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <div>
                        <p className="text-sm font-medium">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {bookCountByCategory.find((b) => b.name === cat.name)?.count || 0} books
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingCategory(cat)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Create a new book category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Category name" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Category description..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowAddDialog(false)}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={editingCategory?.name} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea defaultValue={editingCategory?.description} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
            <Button onClick={() => setEditingCategory(null)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
