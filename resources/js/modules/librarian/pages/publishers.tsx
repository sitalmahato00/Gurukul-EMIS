import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Building2, Plus, Search, BookMarked, Globe, Mail, Phone } from "lucide-react"
import { books } from "@/shared/utils/mock-data"
import { cn, getInitials } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const publisherList = [
  { id: "1", name: "NCERT", location: "New Delhi, India", phone: "+91 11 2656 2158", email: "info@ncert.nic.in", booksCount: 45 },
  { id: "2", name: "Oswaal Books", location: "Noida, India", phone: "+91 120 456 7890", email: "info@oswaalbooks.com", booksCount: 20 },
  { id: "3", name: "Arihant Publications", location: "Meerut, India", phone: "+91 121 234 5678", email: "info@arihantbooks.com", booksCount: 35 },
  { id: "4", name: "S. Chand Publishing", location: "New Delhi, India", phone: "+91 11 2345 6789", email: "info@schandpublishing.com", booksCount: 28 },
  { id: "5", name: "Dhanpat Rai & Co", location: "Delhi, India", phone: "+91 11 4567 8901", email: "info@dhanpatrai.com", booksCount: 15 },
]

const pieColors = ["#ec4899", "#f43f5e", "#8b5cf6", "#3b82f6", "#10b981"]

const publisherData = publisherList.map((p, i) => ({
  name: p.name,
  value: p.booksCount,
  fill: pieColors[i % pieColors.length],
}))

export function PublishersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPublisher, setSelectedPublisher] = useState<(typeof publisherList)[0] | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredPublishers = publisherList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalBooks = publisherList.reduce((s, p) => s + p.booksCount, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Publishers"
        description="Manage library publishers and their book collections"
        actions={
          <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4" />
            Add Publisher
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Publishers" value={publisherList.length} icon={<Building2 className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Total Books" value={totalBooks} icon={<BookMarked className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Top Publisher" value={publisherList.sort((a, b) => b.booksCount - a.booksCount)[0]?.name || "N/A"} icon={<Building2 className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Avg Books/Publisher" value={Math.round(totalBooks / publisherList.length)} icon={<BookMarked className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Publisher Directory</CardTitle>
                <CardDescription>{filteredPublishers.length} publishers registered</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search publishers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 w-56" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPublishers.map((pub, i) => (
                  <motion.div key={pub.id} whileHover={{ scale: 1.01 }} onClick={() => setSelectedPublisher(pub)}
                    className={cn("flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md", selectedPublisher?.id === pub.id && "border-primary bg-primary/5")}>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback style={{ backgroundColor: `${pieColors[i % pieColors.length]}20`, color: pieColors[i % pieColors.length] }}>
                          {getInitials(pub.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{pub.name}</p>
                        <p className="text-xs text-muted-foreground">{pub.location}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{pub.booksCount} books</Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Books by Publisher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={publisherData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                      {publisherData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value} books`, "Count"]} />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {selectedPublisher && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{selectedPublisher.name}</CardTitle>
                <CardDescription>Publisher Details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedPublisher.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedPublisher.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedPublisher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookMarked className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedPublisher.booksCount} books in library</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Publisher</DialogTitle>
            <DialogDescription>Add a new publisher to the library</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Publisher name" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="City, Country" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+91 ..." />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="email@example.com" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowAddDialog(false)}>Add Publisher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
