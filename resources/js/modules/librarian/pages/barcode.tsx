import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { ScanBarcode, Search, BookOpen, Clock, CheckCircle, Camera, Zap } from "lucide-react"

const mockBooks = [
  { id: "1", isbn: "978-81-203-4567-8", title: "NCERT Mathematics Class 10", author: "NCERT", category: "Mathematics", available: true, location: "Rack A-1" },
  { id: "2", isbn: "978-81-203-4568-5", title: "HC Verma Physics", author: "H.C. Verma", category: "Science", available: false, location: "Rack B-3" },
  { id: "3", isbn: "978-81-203-4569-2", title: "Oswaal Chemistry", author: "Oswaal", category: "Science", available: true, location: "Rack B-1" },
  { id: "4", isbn: "978-81-203-4570-8", title: "RD Sharma Mathematics", author: "R.D. Sharma", category: "Mathematics", available: true, location: "Rack A-2" },
  { id: "5", isbn: "978-81-203-4571-5", title: "NCERT English Class 10", author: "NCERT", category: "English", available: true, location: "Rack C-1" },
]

const scanHistory = [
  { time: "14:32:15", isbn: "978-81-203-4567-8", title: "NCERT Mathematics Class 10", action: "Issued", user: "Aarav Sharma" },
  { time: "14:28:40", isbn: "978-81-203-4568-5", title: "HC Verma Physics", action: "Returned", user: "Priya Patel" },
  { time: "14:15:22", isbn: "978-81-203-4569-2", title: "Oswaal Chemistry", action: "Checked", user: "-" },
  { time: "13:58:10", isbn: "978-81-203-4570-8", title: "RD Sharma Mathematics", action: "Issued", user: "Rohan Gupta" },
  { time: "13:42:55", isbn: "978-81-203-4571-5", title: "NCERT English Class 10", action: "Checked", user: "-" },
]

export function BarcodePage() {
  const [scanInput, setScanInput] = useState("")
  const [scanResult, setScanResult] = useState<(typeof mockBooks)[0] | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    if (!scanInput.trim()) return
    setIsScanning(true)
    setTimeout(() => {
      const found = mockBooks.find((b) => b.isbn === scanInput || b.title.toLowerCase().includes(scanInput.toLowerCase()))
      setScanResult(found || null)
      setIsScanning(false)
    }, 800)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Barcode Scanner" description="Scan barcodes to look up and manage books" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Scans Today" value={42} icon={<ScanBarcode className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Books Found" value={38} icon={<BookOpen className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Issues Today" value={15} icon={<CheckCircle className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Last Scan" value="2m ago" icon={<Clock className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Camera className="h-4 w-4 text-pink-500" /> Scan Barcode</CardTitle>
            <CardDescription>Enter or scan a barcode number</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50/50 dark:bg-pink-950/20 p-8 flex flex-col items-center justify-center gap-4">
              <motion.div animate={isScanning ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}} transition={{ duration: 0.8, repeat: isScanning ? Infinity : 0 }}>
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg">
                  <ScanBarcode className="h-10 w-10" />
                </div>
              </motion.div>
              <p className="text-sm text-muted-foreground font-medium">{isScanning ? "Scanning..." : "Ready to Scan"}</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter ISBN or barcode..." value={scanInput} onChange={(e) => setScanInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleScan()} className="font-mono" />
              <Button onClick={handleScan} disabled={isScanning} className="gap-1 shrink-0">
                <Zap className="h-4 w-4" />
                {isScanning ? "..." : "Scan"}
              </Button>
            </div>
            {scanResult && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">Book Found</span>
                </div>
                <p className="text-sm font-bold">{scanResult.title}</p>
                <p className="text-xs text-muted-foreground">{scanResult.author} - {scanResult.category}</p>
                <div className="flex items-center justify-between pt-1">
                  <Badge variant={scanResult.available ? "default" : "destructive"} className="text-[10px]">
                    {scanResult.available ? "Available" : "Issued"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{scanResult.location}</span>
                </div>
              </motion.div>
            )}
            {!scanResult && scanInput && !isScanning && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                <p className="text-sm text-amber-700">No book found for &quot;{scanInput}&quot;</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Scan History</CardTitle>
              <CardDescription>{scanHistory.length} scans today</CardDescription>
            </div>
            <Badge variant="secondary" className="text-[10px]"><Clock className="mr-1 h-3 w-3" /> Live</Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scanHistory.map((scan, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono text-xs">{scan.time}</TableCell>
                    <TableCell className="font-mono text-xs">{scan.isbn}</TableCell>
                    <TableCell className="text-sm">{scan.title}</TableCell>
                    <TableCell>
                      <Badge variant={scan.action === "Issued" ? "default" : scan.action === "Returned" ? "secondary" : "outline"} className="text-[10px]">
                        {scan.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{scan.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
