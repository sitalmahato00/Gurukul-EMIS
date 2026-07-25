import { useState } from "react"
import {
  MessageSquare,
  Send,
  Search,
  Mail,
  MailOpen,
  Clock,
  Plus,
  Reply,
  Archive,
  Trash2,
  ChevronRight,
  User,
  FileText,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { cn, getInitials, formatCurrency } from "@/lib/utils"
import { useMessages } from "@/lib/hooks"

const threadMessages = [
  { id: 1, sender: "Mrs. Sunita Sharma", text: "Hello! I wanted to share Aarav's progress report for this term. He has been performing very well in mathematics.", time: "Jul 24, 3:45 PM", isOwn: false },
  { id: 2, sender: "You", text: "Thank you, Mrs. Sharma! We are very happy to hear about Aarav's progress. Are there any areas where he needs improvement?", time: "Jul 24, 5:20 PM", isOwn: true },
  { id: 3, sender: "Mrs. Sunita Sharma", text: "Overall he is doing great. I would suggest a bit more practice in English writing skills. The school is also organizing a creative writing workshop next month.", time: "Jul 25, 9:00 AM", isOwn: false },
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
  const [activeTab, setActiveTab] = useState("inbox")
  const [search, setSearch] = useState("")
  const [composeOpen, setComposeOpen] = useState(false)
  const [selectedThread, setSelectedThread] = useState<any | null>(null)
  const [replyText, setReplyText] = useState("")

  const { data: messagesRes, isLoading } = useMessages() as any
  const messagesData = Array.isArray(messagesRes?.data) ? messagesRes.data : Array.isArray(messagesRes) ? messagesRes : []
  const inboxMessages = messagesData.filter((m: any) => m.receiver_id !== undefined && m.type === "received" || m.direction === "in")
  const sentMessages = messagesData.filter((m: any) => m.sender_id !== undefined && m.type === "sent" || m.direction === "out")
  const allMessages = inboxMessages.length > 0 || sentMessages.length > 0 ? messagesData : messagesData
  const displayInbox = inboxMessages.length > 0 ? inboxMessages : allMessages

  const unreadCount = displayInbox.filter((m: any) => !m.read_at).length
  const stats = [
    { title: "Unread Messages", value: String(unreadCount), icon: Mail, gradient: "from-purple-500 to-pink-500", description: "In inbox" },
    { title: "Total Messages", value: String(allMessages.length), icon: MessageSquare, gradient: "from-blue-500 to-indigo-500", description: "This month" },
    { title: "Sent Messages", value: String(sentMessages.length), icon: Send, gradient: "from-emerald-500 to-teal-500", description: "By you" },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Messages"
        description="Communicate with teachers and school administration"
        actions={
          <Button onClick={() => setComposeOpen(true)} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25">
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
        }
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Message List */}
        <motion.div variants={item} className={cn("space-y-4", selectedThread ? "hidden lg:block" : "")}>
          <Tabs defaultValue="inbox" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between gap-4">
              <TabsList className="bg-slate-100 dark:bg-slate-900 rounded-2xl">
                <TabsTrigger value="inbox" className="rounded-xl">
                  Inbox
                  {unreadCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-purple-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="sent" className="rounded-xl">Sent</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="inbox" className="mt-4 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-10 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              {displayInbox.map((msg: any) => {
                const avatarText = getInitials(msg.sender?.name || msg.from || "S")
                return (
                <div
                  key={msg.id}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                    !msg.read_at
                      ? "border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950",
                    selectedThread?.id === msg.id && "ring-2 ring-purple-500"
                  )}
                  onClick={() => setSelectedThread(msg)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs font-semibold">
                        {avatarText}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={cn("text-sm font-semibold truncate", !msg.read_at && "text-purple-700 dark:text-purple-300")}>{msg.sender?.name || msg.from || "Teacher"}</p>
                        <span className="text-xs text-muted-foreground shrink-0">{msg.created_at?.substring(0, 10) || msg.date || ""}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{msg.sender?.role || msg.role || ""}</p>
                      <p className={cn("text-sm mt-1 truncate", !msg.read_at ? "font-medium" : "text-muted-foreground")}>{msg.subject || ""}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.body || msg.preview || ""}</p>
                    </div>
                    {!msg.read_at && <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0 mt-2" />}
                  </div>
                </div>
                )
              })}
            </TabsContent>

            <TabsContent value="sent" className="mt-4 space-y-2">
              {sentMessages.map((msg: any) => {
                const avatarText = getInitials(msg.receiver?.name || msg.to || "T")
                return (
                <div key={msg.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                        {avatarText}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold truncate">To: {msg.receiver?.name || msg.to || "Teacher"}</p>
                        <span className="text-xs text-muted-foreground shrink-0">{msg.created_at?.substring(0, 10) || msg.date || ""}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">{msg.subject || ""}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.body || msg.preview || ""}</p>
                    </div>
                  </div>
                </div>
                )
              })}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Message Thread / Empty State */}
        <motion.div variants={item} className="lg:col-span-2">
          {selectedThread ? (
            <Card className="shadow-xl rounded-2xl border-0 h-full flex flex-col">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSelectedThread(null)}>
                      ←
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs font-semibold">
                        {getInitials(selectedThread.sender?.name || selectedThread.from || "S")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{selectedThread.sender?.name || selectedThread.from || "Teacher"}</p>
                      <p className="text-xs text-muted-foreground">{selectedThread.sender?.role || selectedThread.role || ""}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{selectedThread.subject || ""}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                {threadMessages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl",
                      msg.isOwn
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-br-sm"
                        : "bg-slate-100 dark:bg-slate-900 rounded-bl-sm"
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn("text-xs mt-1", msg.isOwn ? "text-white/70" : "text-muted-foreground")}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-end gap-2">
                  <Textarea
                    placeholder="Type your reply..."
                    className="rounded-xl min-h-[60px] resize-none"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shrink-0 h-10 w-10 rounded-xl p-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="shadow-xl rounded-2xl border-0 h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-lg font-semibold">Select a message</p>
                <p className="text-sm text-muted-foreground mt-1">Choose a conversation to view the thread</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Compose Dialog */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>Send a message to teacher or administration</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>To</Label>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunita">Mrs. Sunita Sharma - Class Teacher</SelectItem>
                  <SelectItem value="vikash">Mr. Vikash Kumar - Science Teacher</SelectItem>
                  <SelectItem value="rahul">Mr. Rahul Verma - English Teacher</SelectItem>
                  <SelectItem value="admin">School Administration</SelectItem>
                  <SelectItem value="principal">Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Enter subject" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Type your message..." className="rounded-xl min-h-[120px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComposeOpen(false)}>Cancel</Button>
            <Button onClick={() => setComposeOpen(false)} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
