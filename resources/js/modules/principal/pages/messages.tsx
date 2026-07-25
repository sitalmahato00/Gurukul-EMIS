import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Send,
  Inbox,
  PenSquare,
  Search,
  Download,
  Mail,
  MailOpen,
  Clock,
  CheckCheck,
  Paperclip,
  Reply,
  Forward,
  Trash2,
  Star,
  MoreHorizontal,
  CircleDot,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMessages } from "@/lib/hooks"

const inboxMessages = [
  { id: "MSG-001", from: "Mrs. Sunita Rao", avatar: "", subject: "Exam Results Submission", preview: "Dear Principal, I have completed the exam results for Class 10 Mathematics. Please review and approve...", time: "30 min ago", unread: true, starred: false, attachments: 1 },
  { id: "MSG-002", from: "Mr. Rajesh Kumar", avatar: "", subject: "Attendance Report - July", preview: "Please find attached the monthly attendance report for July 2026. The overall attendance rate is 92.4%...", time: "1 hour ago", unread: true, starred: true, attachments: 2 },
  { id: "MSG-003", from: "Admin Office", avatar: "", subject: "Fee Collection Update", preview: "The fee collection for this month stands at ₹3.5L out of ₹5L target. Detailed breakdown attached...", time: "2 hours ago", unread: true, starred: false, attachments: 1 },
  { id: "MSG-004", from: "Mrs. Meena Sharma", avatar: "", subject: "Science Exhibition Proposal", preview: "I would like to propose a Science Exhibition on August 12th. The budget required is approximately...", time: "3 hours ago", unread: false, starred: false, attachments: 0 },
  { id: "MSG-005", from: "Transport Dept", avatar: "", subject: "New Bus Route Schedule", preview: "Starting from next week, Bus MH-12-CD-5678 will follow a revised route covering the new colony...", time: "4 hours ago", unread: false, starred: false, attachments: 1 },
  { id: "MSG-006", from: "Mr. Anil Kulkarni", avatar: "", subject: "PTM Arrangements", preview: "The parent-teacher meeting scheduled for July 28th requires arrangement for 300+ parents. Room...", time: "5 hours ago", unread: false, starred: true, attachments: 0 },
  { id: "MSG-007", from: "Library", avatar: "", subject: "New Book Acquisitions", preview: "We have received 200 new reference books for the school library. The total cost was ₹18,000...", time: "Yesterday", unread: false, starred: false, attachments: 1 },
  { id: "MSG-008", from: "Mrs. Priya Verma", avatar: "", subject: "Maternity Leave Request", preview: "I am writing to inform you about my upcoming maternity leave starting August 1st. I have prepared...", time: "Yesterday", unread: false, starred: false, attachments: 2 },
]

const sentMessages = [
  { id: "MSG-S01", to: "All Teachers", subject: "Mid-Term Exam Schedule", preview: "Please find the mid-term examination schedule starting from July 18th. All teachers are requested...", time: "Jul 10, 2026", read: true },
  { id: "MSG-S02", to: "Mrs. Sunita Rao", subject: "RE: Exam Results Submission", preview: "Approved. Please proceed with the results publication. Also ensure the class ranking is updated...", time: "Jul 10, 2026", read: true },
  { id: "MSG-S03", to: "All Staff", subject: "Weekly Assembly Notice", preview: "This is to inform all staff that the weekly assembly will be held on Monday at 8:00 AM sharp...", time: "Jul 8, 2026", read: true },
  { id: "MSG-S04", to: "Admin Office", subject: "Budget Approval - Lab Equipment", preview: "I have approved the purchase of 10 microscopes for the science laboratory. Please proceed with...", time: "Jul 5, 2026", read: true },
]

const draftMessages = [
  { id: "MSG-D01", to: "All Parents", subject: "Annual Day Invitation", preview: "Dear Parents, We are pleased to invite you to our Annual Day Celebration scheduled for August 5th...", lastEdited: "Jul 23, 2026" },
  { id: "MSG-D02", to: "Transport Dept", subject: "Route Optimization Plan", preview: "I have reviewed the current bus routes and have some suggestions for optimization. The proposed...", lastEdited: "Jul 20, 2026" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Messages() {
  const { data: messagesData, isLoading } = useMessages()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const inboxMessages = (messagesData?.data || []).map((m: any) => ({
    id: String(m?.id || ""),
    from: m?.sender_name || m?.from || "Unknown",
    avatar: m?.sender_avatar || "",
    subject: m?.subject || "No Subject",
    preview: m?.body || m?.preview || "",
    time: m?.created_at || m?.time || "",
    unread: !m?.read,
    starred: m?.starred || false,
    attachments: m?.attachments || 0,
  }))

  const unreadCount = inboxMessages.filter((m) => m.unread).length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Messages"
        description="Internal communication hub for school staff and administration"
        actions={
          <Button size="sm" className="gap-2">
            <PenSquare className="h-4 w-4" /> Compose
          </Button>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Inbox" value={String(inboxMessages.length)} icon={<Inbox className="h-6 w-6" />} description={`${unreadCount} unread messages`} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Sent" value="0" icon={<Send className="h-6 w-6" />} description="this week" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Drafts" value="0" icon={<FileText className="h-6 w-6" />} description="unsent drafts" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Response Time" value="2.1 hrs" icon={<Clock className="h-6 w-6" />} trend="down" trendValue="-30 min" description="avg. reply time" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="p-0">
            <Tabs defaultValue="inbox" className="w-full">
              <div className="border-b border-border px-6 pt-4">
                <TabsList className="bg-transparent p-0 h-auto gap-0 w-full justify-start">
                  <TabsTrigger value="inbox" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-6 py-3">
                    <Inbox className="h-4 w-4 mr-2" />
                    Inbox
                    <Badge variant="secondary" className="ml-2 text-[10px] bg-blue-100 text-blue-700">{unreadCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-6 py-3">
                    <Send className="h-4 w-4 mr-2" />
                    Sent
                  </TabsTrigger>
                  <TabsTrigger value="drafts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-6 py-3">
                    <FileText className="h-4 w-4 mr-2" />
                    Drafts
                    <Badge variant="secondary" className="ml-2 text-[10px]">2</Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="inbox" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search messages..." className="pl-9 h-9 text-sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        <Star className="h-3.5 w-3.5" /> Starred
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        <MailOpen className="h-3.5 w-3.5" /> Mark All Read
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-[520px]">
                    <div className="space-y-1">
                      {inboxMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex items-start gap-4 rounded-xl p-4 transition-colors cursor-pointer group",
                            msg.unread ? "bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50/80 dark:hover:bg-blue-950/30" : "hover:bg-muted/50"
                          )}
                        >
                          <div className="relative shrink-0">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={msg.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">
                                {msg.from.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            {msg.unread && (
                              <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-blue-500 border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <div className="flex items-center gap-2">
                                <p className={cn("text-sm", msg.unread ? "font-bold" : "font-medium")}>{msg.from}</p>
                                {msg.starred && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {msg.attachments > 0 && (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Paperclip className="h-3 w-3" />
                                    <span className="text-[10px]">{msg.attachments}</span>
                                  </div>
                                )}
                                <span className="text-xs text-muted-foreground">{msg.time}</span>
                              </div>
                            </div>
                            <p className={cn("text-sm mb-0.5", msg.unread ? "font-semibold" : "font-medium")}>{msg.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Reply className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Forward className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="sent" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search sent messages..." className="pl-9 h-9 text-sm" />
                    </div>
                  </div>
                  <ScrollArea className="h-[520px]">
                    <div className="space-y-1">
                      {sentMessages.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-4 rounded-xl p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 shrink-0">
                            <Send className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <p className="text-sm font-medium">To: {msg.to}</p>
                              <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
                            </div>
                            <p className="text-sm font-semibold mb-0.5">{msg.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {msg.read ? (
                              <CheckCheck className="h-4 w-4 text-blue-500" />
                            ) : (
                              <CheckCheck className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="drafts" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search drafts..." className="pl-9 h-9 text-sm" />
                    </div>
                  </div>
                  <ScrollArea className="h-[520px]">
                    <div className="space-y-1">
                      {draftMessages.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-4 rounded-xl p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30 shrink-0">
                            <FileText className="h-4 w-4 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <p className="text-sm font-medium">To: {msg.to}</p>
                              <span className="text-xs text-muted-foreground shrink-0">Edited: {msg.lastEdited}</span>
                            </div>
                            <p className="text-sm font-semibold mb-0.5">{msg.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs">
                              <Send className="h-3.5 w-3.5" /> Send
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </div>
                      ))}
                      {draftMessages.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <FileText className="h-10 w-10 text-muted-foreground/40 mb-3" />
                          <p className="text-sm text-muted-foreground">No drafts</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
