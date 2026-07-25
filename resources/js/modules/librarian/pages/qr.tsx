import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { QrCode, Search, BookOpen, Download, CheckCircle, Camera, Layers } from "lucide-react"

const qrBooks = [
  { id: "1", isbn: "978-81-203-4567-8", title: "NCERT Mathematics Class 10", author: "NCERT", category: "Mathematics", copies: 25, available: 20 },
  { id: "2", isbn: "978-81-203-4568-5", title: "HC Verma Physics", author: "H.C. Verma", category: "Science", copies: 20, available: 12 },
  { id: "3", isbn: "978-81-203-4569-2", title: "Oswaal Chemistry", author: "Oswaal", category: "Science", copies: 15, available: 14 },
  { id: "4", isbn: "978-81-203-4570-8", title: "RD Sharma Mathematics", author: "R.D. Sharma", category: "Mathematics", copies: 35, available: 0 },
  { id: "5", isbn: "978-81-203-4571-5", title: "NCERT English Class 10", author: "NCERT", category: "English", copies: 20, available: 18 },
]

const scanLogs = [
  { time: "15:10", book: "NCERT Mathematics Class 10", type: "lookup" },
  { time: "15:05", book: "HC Verma Physics", type: "issue" },
  { time: "14:52", book: "Oswaal Chemistry", type: "return" },
  { time: "14:38", book: "RD Sharma Mathematics", type: "lookup" },
]

const qrCells = Array.from({ length: 25 }, (_, i) => {
  if (i < 6 || i > 18 || i % 5 === 0 || i % 5 === 4 || i === 7 || i === 12 || i === 17) return "bg-gray-900"
  if (i % 3 === 0) return "bg-gray-700"
  return "bg-gray-100"
})

export function QRCodePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState<(typeof qrBooks)[0] | null>(null)
  const [scanInput, setScanInput] = useState("")
  const [scanResult, setScanResult] = useState<(typeof qrBooks)[0] | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const filtered = qrBooks.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.isbn.includes(searchQuery)
  )

  const handleQRScan = () => {
    if (!scanInput.trim()) return
    setIsScanning(true)
    setTimeout(() => {
      const found = qrBooks.find((b) => b.isbn === scanInput || b.title.toLowerCase().includes(scanInput.toLowerCase()))
      setScanResult(found || null)
      setIsScanning(false)
    }, 600)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="QR Code Management" description="Generate and scan QR codes for library books" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="QR Codes Generated" value={qrBooks.length} icon={<QrCode className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Scans Today" value={18} icon={<Camera className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Books Mapped" value={qrBooks.length} icon={<Layers className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Unique Users" value={12} icon={<BookOpen className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Camera className="h-4 w-4 text-pink-500" /> QR Scanner</CardTitle>
            <CardDescription>Scan or enter a QR code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-8 flex flex-col items-center justify-center gap-3 text-white">
              <motion.div animate={isScanning ? { rotate: 360 } : {}} transition={{ duration: 1, repeat: isScanning ? Infinity : 0, ease: "linear" }}>
                <QrCode className="h-16 w-16" />
              </motion.div>
              <p className="text-sm font-medium opacity-90">{isScanning ? "Scanning..." : "Point camera at QR code"}</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter QR code value..." value={scanInput} onChange={(e) => setScanInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleQRScan()} className="font-mono text-sm" />
              <Button onClick={handleQRScan} disabled={isScanning} className="gap-1 shrink-0"><Search className="h-4 w-4" /> Go</Button>
            </div>
            {scanResult && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Match Found</span>
                </div>
                <p className="text-sm font-bold">{scanResult.title}</p>
                <p className="text-xs text-muted-foreground">{scanResult.author}</p>
                <div className="flex gap-2 pt-1">
                  <Badge variant="secondary" className="text-[10px]">{scanResult.category}</Badge>
                  <Badge variant={scanResult.available > 0 ? "default" : "destructive"} className="text-[10px]">{scanResult.available} available</Badge>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">QR Code Preview</CardTitle>
            <CardDescription>Select a book to generate QR</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedBook ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                <div className="rounded-2xl border bg-white p-6 flex flex-col items-center gap-3">
                  <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="grid grid-cols-5 gap-1">
                      {qrCells.map((cls, i) => (
                        <div key={i} className={"w-5 h-5 rounded-sm " + cls} />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-mono text-muted-foreground">{selectedBook.isbn}</p>
                    <p className="text-sm font-bold mt-1">{selectedBook.title}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2"><Download className="h-4 w-4" /> Download QR Code</Button>
              </motion.div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-muted p-12 flex flex-col items-center gap-3">
                <QrCode className="h-12 w-12 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Select a book from the list</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Recent Scans</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scanLogs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 dark:bg-pink-950/30">
                        <QrCode className="h-4 w-4 text-pink-500" />
                      </div>
                      <div>
                        <p className="text-xs font-medium truncate max-w-[140px]">{log.book}</p>
                        <p className="text-[10px] text-muted-foreground">{log.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{log.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Books</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-1">
                {filtered.map((book) => (
                  <button key={book.id} onClick={() => setSelectedBook(book)} className={"w-full text-left rounded-lg px-3 py-2 transition-colors text-sm " + (selectedBook?.id === book.id ? "bg-pink-50 border border-pink-200 dark:bg-pink-950/20 dark:border-pink-800" : "hover:bg-muted/50")}>
                    <p className="font-medium truncate">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.isbn}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
