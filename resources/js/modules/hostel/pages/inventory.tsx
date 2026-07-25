import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Package, Search, Plus, Edit, AlertTriangle, ShoppingCart, Warehouse, ArrowUpDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const stockData = [
  { name: "Beds", stocked: 48, used: 36 },
  { name: "Fans", stocked: 60, used: 48 },
  { name: "Desks", stocked: 48, used: 30 },
  { name: "Chairs", stocked: 48, used: 32 },
  { name: "Cupboards", stocked: 24, used: 18 },
  { name: "Mattresses", stocked: 50, used: 38 },
  { name: "Pillows", stocked: 100, used: 72 },
  { name: "Blankets", stocked: 80, used: 54 },
]

const items = [
  { id: "INV001", name: "Steel Cot Bed", category: "Furniture", room: "All Blocks", quantity: 48, used: 36, unit: 8000, reorderLevel: 10, supplier: "SteelWorks Ltd.", lastRestock: "2025-05-15", status: "In Stock" },
  { id: "INV002", name: "Ceiling Fan", category: "Electronics", room: "All Blocks", quantity: 60, used: 48, unit: 2500, reorderLevel: 8, supplier: "FanTech Pvt.", lastRestock: "2025-06-01", status: "In Stock" },
  { id: "INV003", name: "Study Desk", category: "Furniture", room: "Block A & B", quantity: 48, used: 30, unit: 3500, reorderLevel: 12, supplier: "WoodCraft Co.", lastRestock: "2025-04-20", status: "In Stock" },
  { id: "INV004", name: "Plastic Chair", category: "Furniture", room: "All Blocks", quantity: 48, used: 32, unit: 1200, reorderLevel: 10, supplier: "PlastiMould Inc.", lastRestock: "2025-06-10", status: "In Stock" },
  { id: "INV005", name: "Steel Cupboard", category: "Furniture", room: "All Blocks", quantity: 24, used: 18, unit: 12000, reorderLevel: 5, supplier: "SteelWorks Ltd.", lastRestock: "2025-03-25", status: "Low Stock" },
  { id: "INV006", name: "Coir Mattress", category: "Bedding", room: "All Blocks", quantity: 50, used: 38, unit: 2000, reorderLevel: 10, supplier: "SleepWell Ltd.", lastRestock: "2025-06-05", status: "In Stock" },
  { id: "INV007", name: "Pillow", category: "Bedding", room: "All Blocks", quantity: 100, used: 72, unit: 350, reorderLevel: 20, supplier: "SleepWell Ltd.", lastRestock: "2025-06-12", status: "In Stock" },
  { id: "INV008", name: "Wool Blanket", category: "Bedding", room: "All Blocks", quantity: 80, used: 54, unit: 800, reorderLevel: 15, supplier: "TextileHub", lastRestock: "2025-05-30", status: "In Stock" },
  { id: "INV009", name: "Tube Light", category: "Electronics", room: "Corridors", quantity: 30, used: 24, unit: 250, reorderLevel: 8, supplier: "BrightLED Co.", lastRestock: "2025-06-08", status: "Low Stock" },
  { id: "INV010", name: "Room Heater", category: "Electronics", room: "Block C", quantity: 12, used: 8, unit: 3500, reorderLevel: 4, supplier: "WarmTech Pvt.", lastRestock: "2025-01-15", status: "In Stock" },
  { id: "INV011", name: "Water Cooler", category: "Electronics", room: "Common Areas", quantity: 6, used: 6, unit: 15000, reorderLevel: 2, supplier: "AquaFresh Ltd.", lastRestock: "2025-04-10", status: "Critical" },
  { id: "INV012", name: "Broom Set", category: "Cleaning", room: "All Blocks", quantity: 20, used: 15, unit: 150, reorderLevel: 10, supplier: "CleanPro", lastRestock: "2025-06-18", status: "Low Stock" },
]

const categoryData = [
  { name: "Furniture", value: 168, color: "#3b82f6" },
  { name: "Bedding", value: 230, color: "#22c55e" },
  { name: "Electronics", value: 108, color: "#f59e0b" },
  { name: "Cleaning", value: 20, color: "#8b5cf6" },
]

export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = filterCategory === "all" || i.category.toLowerCase() === filterCategory
    const matchStatus = filterStatus === "all" || i.status.toLowerCase().replace(" ", "") === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const totalValue = items.reduce((s, i) => s + i.quantity * i.unit, 0)
  const lowStock = items.filter(i => i.status === "Low Stock" || i.status === "Critical").length

  const statusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-800"
      case "Low Stock": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Inventory Management" description="Track hostel inventory, stock levels, and reorder alerts" actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Item</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Items" value={totalItems} icon={<Package className="h-5 w-5" />} />
        <StatCard title="Stock Value" value={`₹${(totalValue / 1000).toFixed(0)}K`} icon={<Warehouse className="h-5 w-5" />} />
        <StatCard title="Low Stock Alerts" value={lowStock} icon={<AlertTriangle className="h-5 w-5" />} />
        <StatCard title="Categories" value={categoryData.length} icon={<ArrowUpDown className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>Complete list of hostel inventory</CardDescription>
            <div className="flex gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search items..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="bedding">Bedding</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="instock">In Stock</SelectItem>
                  <SelectItem value="lowstock">Low Stock</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[420px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>In Use</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item) => {
                    const reorder = item.quantity - item.used
                    const belowReorder = reorder <= item.reorderLevel
                    return (
                      <TableRow key={item.id} className={belowReorder ? "bg-red-50/50" : ""}>
                        <TableCell className="font-mono text-xs">{item.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.supplier}</p>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                        <TableCell className="font-medium">{item.quantity}</TableCell>
                        <TableCell>{item.used}</TableCell>
                        <TableCell>{formatCurrency(item.unit)}</TableCell>
                        <TableCell>
                          <Badge className={statusColor(item.status)}>{item.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => { setSelectedItem(item); setDialogOpen(true) }}><Edit className="h-4 w-4" /></Button>
                            {belowReorder && <Button size="sm" variant="outline" className="text-red-600 border-red-200"><ShoppingCart className="h-3 w-3 mr-1" />Reorder</Button>}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Levels</CardTitle>
            <CardDescription>Stocked vs In Use</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={stockData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value} units`, ""]} />
                <Legend />
                <Bar dataKey="stocked" fill="#3b82f6" name="Stocked" radius={[0, 4, 4, 0]} />
                <Bar dataKey="used" fill="#06b6d4" name="In Use" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedItem ? "Edit Item" : "Add Inventory Item"}</DialogTitle>
            <DialogDescription>{selectedItem ? "Update inventory details" : "Add a new item to inventory"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Item Name</Label><Input defaultValue={selectedItem?.name || ""} placeholder="e.g. Steel Cot" /></div>
            <div className="space-y-2"><Label>Category</Label><Select defaultValue={selectedItem?.category?.toLowerCase() || ""}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="furniture">Furniture</SelectItem><SelectItem value="bedding">Bedding</SelectItem><SelectItem value="electronics">Electronics</SelectItem><SelectItem value="cleaning">Cleaning</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Quantity</Label><Input type="number" defaultValue={selectedItem?.quantity || ""} placeholder="Total quantity" /></div>
            <div className="space-y-2"><Label>Unit Price (₹)</Label><Input type="number" defaultValue={selectedItem?.unit || ""} placeholder="Price per unit" /></div>
            <div className="space-y-2"><Label>Reorder Level</Label><Input type="number" defaultValue={selectedItem?.reorderLevel || ""} placeholder="Minimum stock" /></div>
            <div className="space-y-2"><Label>Supplier</Label><Input defaultValue={selectedItem?.supplier || ""} placeholder="Supplier name" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedItem(null) }}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); setSelectedItem(null) }}>{selectedItem ? "Update" : "Add Item"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
