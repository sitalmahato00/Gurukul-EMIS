import { useState } from "react"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Send,
  Inbox,
  FileText,
  Search,
  Plus,
  Reply,
  Forward,
  Trash2,
  Star,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useMessages } from "@/lib/hooks"

const inboxMessages = [
  { id: "1", from: "Rajesh Sharma", role: "Parent", subject: "Regarding Aarav's attendance", preview: "Dear Ms. Sharma, I wanted to discuss Aarav's recent absence...", time: "10:30 AM", date: "Today", unread: true, avatar: "RS" },
  { id: "2", from: "Principal Office", role: "Admin", subject: "Staff Meeting Notice", preview: "This is to inform all staff members about the upcoming meeting...", time: "9:15 AM", date: "Today", unread: true, avatar: "PO" },
  { id: "3", from: "Suresh Patel", role: "Parent", subject: "Priya's project feedback", preview: "Thank you for the feedback on Priya's project. She worked hard...", time: "4:30 PM", date: "Yesterday", unread: false, avatar: "SP" },
  { id: "4", from: "Anil Desai", role: "Parent", subject: "Leave request for Kiran", preview: "Dear teacher, Kiran will be absent on July 28 due to a family...", time: "2:00 PM", date: "Yesterday", unread: false, avatar: "AD" },
  { id: "5", from: "Vikram Gupta", role: "Parent", subject: "Concern about Rohan's grades", preview: "I am concerned about Rohan's recent performance in mathematics...", time: "11:00 AM", date: "Jul 23", unread: false, avatar: "VG" },
]

const sentMessages = [
  { id: "s1", from: "Me", role: "Teacher", to: "All Parents - 10-A", subject: "Parent-Teacher Meeting Schedule", preview: "Dear Parents, I am writing to inform you about the upcoming...", time: "3:00 PM", date: "Jul 22", unread: false, avatar: "AP" },
  { id: "s2", from: "Me", role: "Teacher", to: "Rajesh Sharma", subject: "Re: Aarav's attendance", preview: "Dear Mr. Sharma, thank you for reaching out. Aarav has missed...", time: "11:00 AM", date: "Jul 22", unread: false, avatar: "RS" },
  { id: "s3", from: "Me", role: "Teacher", to: "Principal Office", subject: "Monthly Report - July", preview: "Please find attached the monthly performance report for...", time: "5:00 PM", date: "Jul 20", unread: false, avatar: "PO" },
]

const draftMessages = [
  { id: "d1", to: "All Students - 12-A", subject: "Assignment Reminder", preview: "This is a reminder that the calculus assignment is due on...", date: "Today", avatar: "AS" },
  { id: "d2", to: "Manoj Singh", subject: "Ananya's progress update", preview: "Dear Mr. Singh, I wanted to share some updates about...", date: "Yesterday", avatar: "MS" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function MessagesPage() {
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null)
  const [search, setSearch] = useState("")
  const { data: msgData, isLoading } = useMessages()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiMessages = msgData?.data || []
  const inboxMessagesList = apiMessages.length > 0 ? apiMessages.map((m: any) => ({
    id: String(m.id),
    from: m.from || m.sender?.name || m.sender_name || "Unknown",
    role: m.sender?.role || m.sender_role || "User",
    subject: m.subject || "No Subject",
    preview: m.preview || m.body || m.message || "",
    time: m.time || m.created_at || "",
    date: m.date || "",
    unread: !m.read,
    avatar: (m.from || m.sender?.name || "U").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
  })) : inboxMessages

  const unreadCount = inboxMessagesList.filter((m: any) => m.unread).length

  const filterMessages = (msgs: any[]) =>
    msgs.filter((m) => ((m.from || m.to || "") as string).toLowerCase().includes(search.toLowerCase()) || m.subject?.toLowerCase().includes(search.toLowerCase()))

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Messages"
          description="Communicate with parents, students, and staff"
          actions={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9 w-52" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Compose
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>To</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select recipient" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Input placeholder="Enter subject" />
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea placeholder="Type your message..." rows={6} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsComposeOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsComposeOpen(false)} className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Inbox" value={inboxMessages.length} icon={<Inbox className="h-6 w-6" />} description={`${unreadCount} unread`} gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Sent" value={sentMessages.length} icon={<Send className="h-6 w-6" />} description="messages" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Drafts" value={draftMessages.length} icon={<FileText className="h-6 w-6" />} description="unsent" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Unread" value={unreadCount} icon={<MessageSquare className="h-6 w-6" />} description="new messages" gradient="from-rose-500 to-red-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="inbox">
              <TabsList className="mb-4">
                <TabsTrigger value="inbox" className="gap-2">
                  <Inbox className="h-3.5 w-3.5" />
                  Inbox
                  {unreadCount > 0 && <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-red-500">{unreadCount}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="sent" className="gap-2">
                  <Send className="h-3.5 w-3.5" />
                  Sent ({sentMessages.length})
                </TabsTrigger>
                <TabsTrigger value="drafts" className="gap-2">
                  <FileText className="h-3.5 w-3.5" />
                  Drafts ({draftMessages.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inbox">
                <div className="space-y-2">
                  {filterMessages(inboxMessages).map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-muted/50",
                        msg.unread ? "border-indigo-200 bg-indigo-50/30 dark:border-indigo-800 dark:bg-indigo-900/10" : "border-border"
                      )}
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-xs font-semibold">
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm", msg.unread ? "font-bold" : "font-medium")}>{msg.from}</p>
                          <Badge variant="secondary" className="text-[10px]">{msg.role}</Badge>
                          {msg.unread && <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />}
                        </div>
                        <p className={cn("text-sm mt-0.5", msg.unread ? "font-semibold" : "")}>{msg.subject}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.preview}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground">{msg.time}</p>
                        <p className="text-[10px] text-muted-foreground">{msg.date}</p>
                        <div className="flex items-center gap-1 mt-1.5 justify-end">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Reply className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Star className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sent">
                <div className="space-y-2">
                  {filterMessages(sentMessages).map((msg) => (
                    <div key={msg.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs font-semibold">
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">To: {(msg as { to?: string }).to || "N/A"}</p>
                        <p className="text-sm mt-0.5">{msg.subject}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.preview}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground">{msg.time}</p>
                        <p className="text-[10px] text-muted-foreground">{msg.date}</p>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-1.5 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="drafts">
                <div className="space-y-2">
                  {draftMessages.map((msg) => (
                    <div key={msg.id} className="flex items-center gap-4 p-4 rounded-xl border border-amber-200 bg-amber-50/30 dark:border-amber-800 dark:bg-amber-900/10 hover:bg-muted/50 transition-colors">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-semibold">
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">To: {(msg as { to?: string }).to || "N/A"}</p>
                        <p className="text-sm mt-0.5">{msg.subject}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.preview}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground">{msg.date}</p>
                        <Button variant="ghost" size="sm" className="h-7 text-xs mt-1">
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-xs font-semibold">
                    {selectedMessage.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedMessage.from}</p>
                  <p className="text-xs text-muted-foreground">{selectedMessage.date} at {selectedMessage.time}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 text-sm leading-relaxed">
                {selectedMessage.preview}
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                  <Reply className="mr-2 h-3.5 w-3.5" />
                  Reply
                </Button>
                <Button size="sm" variant="outline">
                  <Forward className="mr-2 h-3.5 w-3.5" />
                  Forward
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedMessage(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
