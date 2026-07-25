import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Send,
  Inbox,
  FileEdit,
  Search,
  Plus,
  Mail,
  MailOpen,
  Reply,
  Trash2,
  Star,
  Clock,
  CheckCircle2,
  Users,
  Paperclip,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useMessages } from "@/lib/hooks"

const inboxMessages = [
  { id: "MSG-001", from: "Dr. Sunita Sharma", subject: "Science Lab Budget Request", preview: "I would like to request an additional budget of ₹50,000 for science lab equipment...", date: "2024-06-15", read: false, priority: "high", hasAttachment: true },
  { id: "MSG-002", from: "Rajesh Verma", subject: "Re: Salary Slip Query", preview: "Thank you for clarifying. I have verified the deductions and everything looks correct...", date: "2024-06-14", read: true, priority: "medium", hasAttachment: false },
  { id: "MSG-003", from: "Parent - Mr. Sharma", subject: "Fee Payment Confirmation", preview: "I have transferred the fee amount for Aarav. Please find the UPI reference number...", date: "2024-06-14", read: false, priority: "low", hasAttachment: true },
  { id: "MSG-004", from: "Vikram Singh", subject: "Sports Day Expense Approval", preview: "The sports day arrangements need a budget of ₹75,000. I have attached the detailed...", date: "2024-06-13", read: true, priority: "high", hasAttachment: true },
  { id: "MSG-005", from: "Anita Joshi", subject: "Monthly Stationery Order", preview: "Please process the monthly stationery order for June. The total comes to ₹12,500...", date: "2024-06-12", read: true, priority: "medium", hasAttachment: false },
  { id: "MSG-006", from: "Bank - SBI", subject: "Salary Transfer Confirmation", preview: "All salary transfers for the month of June have been processed successfully...", date: "2024-06-11", read: true, priority: "low", hasAttachment: true },
]

const sentMessages = [
  { id: "MSG-S01", to: "All Staff", subject: "June Salary Processing Update", preview: "Dear Team, I am writing to inform you that the salary processing for June...", date: "2024-06-14", status: "delivered", recipients: 45 },
  { id: "MSG-S02", to: "Dr. Sunita Sharma", subject: "Re: Science Lab Budget", preview: "Thank you for your request. I have reviewed the proposal and forwarding it...", date: "2024-06-13", status: "read", recipients: 1 },
  { id: "MSG-S03", to: "All Parents - Class 10", subject: "Fee Payment Reminder", preview: "Dear Parents, this is a gentle reminder that the fee payment for Q2 is due...", date: "2024-06-10", status: "delivered", recipients: 89 },
]

const draftMessages = [
  { id: "MSG-D01", to: "Principal", subject: "Annual Budget Proposal 2024-25", preview: "Dear Sir/Madam, I have prepared the annual budget proposal for the upcoming...", date: "2024-06-14" },
  { id: "MSG-D02", to: "Vikram Singh", subject: "Re: Sports Day Budget", preview: "After reviewing your proposal, I have some suggestions regarding the budget...", date: "2024-06-13" },
]

const priorityConfig: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

export function MessagesPage() {
  const [search, setSearch] = useState("")
  const [composOpen, setComposOpen] = useState(false)

  const { data: messagesData, isLoading } = useMessages()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const inboxMessages = (messagesData?.data || []).map((m: any) => ({
    id: String(m?.id || ""),
    from: m?.sender_name || m?.from || "Unknown",
    subject: m?.subject || "No Subject",
    preview: m?.body || m?.preview || "",
    date: m?.created_at || m?.date || "",
    read: !!m?.read,
    priority: m?.priority || "low",
    hasAttachment: !!m?.has_attachment,
  }))

  const unreadCount = inboxMessages.filter((m) => !m.read).length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Messages"
        description="Internal messaging system for staff communication"
        actions={
          <Dialog open={composOpen} onOpenChange={setComposOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Compose</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" /> Compose Message
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">To</p>
                  <Input placeholder="Enter recipient name or email" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Subject</p>
                  <Input placeholder="Enter subject" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Priority</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-red-50">High</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-amber-50">Medium</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Low</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Message</p>
                  <textarea className="w-full h-32 rounded-xl border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Type your message here..." />
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm"><Paperclip className="mr-2 h-4 w-4" /> Attach</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setComposOpen(false)}>Save Draft</Button>
                    <Button onClick={() => setComposOpen(false)}><Send className="mr-2 h-4 w-4" /> Send</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Inbox" value={inboxMessages.length} icon={<Inbox className="h-6 w-6" />} description={`${unreadCount} unread`} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Sent" value={sentMessages.length} icon={<Send className="h-6 w-6" />} description="messages sent" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Drafts" value={draftMessages.length} icon={<FileEdit className="h-6 w-6" />} description="unsent drafts" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Total Messages" value={inboxMessages.length + sentMessages.length + draftMessages.length} icon={<MessageSquare className="h-6 w-6" />} description="all messages" gradient="from-violet-500 to-purple-500" />
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="inbox" className="gap-1.5">
              <Inbox className="h-3.5 w-3.5" /> Inbox
              {unreadCount > 0 && <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="sent" className="gap-1.5"><Send className="h-3.5 w-3.5" /> Sent</TabsTrigger>
            <TabsTrigger value="drafts" className="gap-1.5"><FileEdit className="h-3.5 w-3.5" /> Drafts</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 h-9 w-[250px] text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <TabsContent value="inbox">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="p-0">
              <div className="divide-y">
                {inboxMessages
                  .filter((m) => m.subject.toLowerCase().includes(search.toLowerCase()) || m.from.toLowerCase().includes(search.toLowerCase()))
                  .map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${!msg.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${!msg.read ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-muted text-muted-foreground"}`}>
                        {!msg.read ? <Mail className="h-5 w-5" /> : <MailOpen className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium truncate ${!msg.read ? "font-bold" : ""}`}>{msg.from}</p>
                          <Badge variant="secondary" className={`text-[10px] ${priorityConfig[msg.priority]}`}>{msg.priority}</Badge>
                          {msg.hasAttachment && <Paperclip className="h-3 w-3 text-muted-foreground" />}
                        </div>
                        <p className={`text-sm truncate mt-0.5 ${!msg.read ? "font-semibold" : "text-muted-foreground"}`}>{msg.subject}</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.preview}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Reply className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Star className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="p-0">
              <div className="divide-y">
                {sentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 shrink-0">
                      <Send className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">To: {msg.to}</p>
                        <Badge variant="secondary" className="text-[10px]">{msg.recipients} recipient{msg.recipients > 1 ? "s" : ""}</Badge>
                      </div>
                      <p className="text-sm font-medium truncate mt-0.5">{msg.subject}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.preview}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">{msg.date}</p>
                      <Badge variant="secondary" className="text-[10px] mt-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" />{msg.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="p-0">
              <div className="divide-y">
                {draftMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">
                      <FileEdit className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">To: {msg.to}</p>
                      <p className="text-sm font-medium truncate mt-0.5">{msg.subject}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.preview}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">{msg.date}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Button variant="ghost" size="sm" className="h-7 px-3 text-xs"><Send className="mr-1 h-3 w-3" /> Send</Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
