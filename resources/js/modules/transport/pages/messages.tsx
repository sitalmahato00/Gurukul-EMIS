import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { MessageSquare, Send, Inbox, FileText, Pencil, Mail, MailOpen, Search, Clock, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const messages = [
  { id: "1", sender: "Rajesh Sharma", initials: "RS", subject: "Route D Delay Alert", preview: "Due to construction on Ajmer Road, Route D bus will be delayed by 15 minutes today. Please inform parents accordingly.", timestamp: "5 min ago", unread: true, category: "alert", type: "inbox" },
  { id: "2", sender: "Transport Admin", initials: "TA", subject: "Monthly Fuel Report Ready", preview: "The monthly fuel consumption report for July is now available. Please review the attached summary and share with the principal.", timestamp: "1 hr ago", unread: true, category: "report", type: "inbox" },
  { id: "3", sender: "Suresh Kumar", initials: "SK", subject: "Vehicle RJ-14-EF - Service Required", preview: "The engine is making unusual sounds. I recommend taking it to RAJ Motors for a thorough check. The vehicle should not be used until inspected.", timestamp: "2 hrs ago", unread: true, category: "maintenance", type: "inbox" },
  { id: "4", sender: "Accounts Dept", initials: "AD", subject: "Transport Fee Collection Update", preview: "Fee collection for this month stands at ₹5.65L against a target of ₹6.2L. Route C and Route H need attention for pending collections.", timestamp: "3 hrs ago", unread: false, category: "finance", type: "inbox" },
  { id: "5", sender: "Gopal Singh", initials: "GS", subject: "Route B - New Stop Request", preview: "A parent from Pratap Nagar has requested adding a new stop near the temple. This would add 2 more students to our route.", timestamp: "5 hrs ago", unread: false, category: "request", type: "inbox" },
  { id: "6", sender: "Principal Office", initials: "PO", subject: "School Trip Transport Plan", preview: "The annual school trip to Amber Fort is scheduled for next Friday. Please arrange 3 buses and coordinate with the event committee.", timestamp: "Yesterday", unread: false, category: "event", type: "inbox" },
  { id: "7", sender: "GPS System", initials: "GS", subject: "Speed Alert - Vehicle RJ-14-AB", preview: "Vehicle RJ-14-AB-1234 exceeded speed limit of 40 km/h at Mansarovar crossing. Current speed: 52 km/h.", timestamp: "Yesterday", unread: false, category: "alert", type: "inbox" },
  { id: "8", sender: "Deepak Joshi", initials: "DJ", subject: "Leave Request - Aug 5-7", preview: "I would like to request leave from August 5th to 7th due to personal reasons. Route E driver can be covered by Raju Verma.", timestamp: "2 days ago", unread: false, category: "request", type: "inbox" },
]

const sentMessages = [
  { id: "S1", sender: "Me", receiver: "All Drivers", initials: "AD", subject: "Monsoon Driving Advisory", preview: "Please ensure extra caution while driving during monsoon season. Keep headlights on and maintain safe distance. Report any water logging on routes.", timestamp: "3 days ago", unread: false, category: "notice", type: "sent" },
  { id: "S2", sender: "Me", receiver: "Accounts Dept", initials: "AC", subject: "Route Fee Structure Update", preview: "Please update the fee structure for Route D. The new monthly fee is ₹2800 effective from August. Refer to the attached breakdown.", timestamp: "5 days ago", unread: false, category: "finance", type: "sent" },
  { id: "S3", sender: "Me", receiver: "Principal Office", initials: "PO", subject: "Fleet Expansion Proposal", preview: "Based on increasing demand, I recommend adding 2 more mini buses to the fleet. This would cover 50 additional students.", timestamp: "1 week ago", unread: false, category: "proposal", type: "sent" },
]

const categoryConfig: Record<string, { color: string }> = {
  alert: { color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  report: { color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  maintenance: { color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  finance: { color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  request: { color: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  event: { color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
  notice: { color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  proposal: { color: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function TransportMessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [search, setSearch] = useState("")
  const [composeOpen, setComposeOpen] = useState(false)

  const allMessages = [...messages, ...sentMessages]
  const filtered = allMessages.filter((m) => {
    const matchesSearch = m.subject.toLowerCase().includes(search.toLowerCase()) || m.sender.toLowerCase().includes(search.toLowerCase()) || m.preview.toLowerCase().includes(search.toLowerCase())
    if (activeTab === "inbox") return matchesSearch && m.type === "inbox"
    if (activeTab === "sent") return matchesSearch && m.type === "sent"
    if (activeTab === "drafts") return false
    return matchesSearch
  })

  const unreadCount = messages.filter(m => m.unread).length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground mt-1">Transport department communications</p>
          </div>
          <Button onClick={() => setComposeOpen(true)} className="gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25">
            <Pencil className="h-4 w-4" />Compose
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Messages" value={allMessages.length} icon={<MessageSquare className="h-6 w-6" />} description="all time" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Unread" value={unreadCount} icon={<Mail className="h-6 w-6" />} trend="up" trendValue={`${unreadCount}`} description="need attention" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Sent Messages" value={sentMessages.length} icon={<Send className="h-6 w-6" />} description="this month" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
            <CardTitle className="text-base">Message Threads</CardTitle>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="inbox" className="gap-1.5">
                  <Inbox className="h-3.5 w-3.5" />Inbox
                  {unreadCount > 0 && <Badge variant="secondary" className="ml-1 text-[10px] h-5 px-1.5">{unreadCount}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="sent" className="gap-1.5">
                  <Send className="h-3.5 w-3.5" />Sent
                </TabsTrigger>
                <TabsTrigger value="drafts" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" />Drafts
                </TabsTrigger>
              </TabsList>

              <div className="divide-y divide-border">
                {filtered.map((msg, idx) => {
                  const cat = categoryConfig[msg.category] || categoryConfig.notice
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={cn(
                        "flex items-start gap-4 py-4 px-2 rounded-lg transition-colors hover:bg-muted/50 cursor-pointer",
                        msg.unread && "bg-emerald-50/50 dark:bg-emerald-950/10"
                      )}
                    >
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                          {msg.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <p className={cn("text-sm", msg.unread ? "font-semibold" : "font-medium")}>
                              {msg.sender}
                            </p>
                            <Badge className={cn("text-[10px] px-1.5 py-0 capitalize", cat.color)}>
                              {msg.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                            <Clock className="h-3 w-3" />
                            {msg.timestamp}
                          </div>
                        </div>
                        <p className={cn("text-sm mt-0.5", msg.unread ? "font-medium" : "text-muted-foreground")}>
                          {msg.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {msg.preview}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {msg.unread ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Tabs>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">No messages found</p>
                <p className="text-xs mt-1">Try adjusting your search or filter</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>Send a message to transport department</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>To</Label><Select><SelectTrigger><SelectValue placeholder="Select recipient" /></SelectTrigger><SelectContent><SelectItem value="all-drivers">All Drivers</SelectItem><SelectItem value="principal">Principal Office</SelectItem><SelectItem value="accounts">Accounts Dept</SelectItem><SelectItem value="specific">Specific Person</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Subject</Label><Input placeholder="Message subject" /></div>
            <div className="space-y-2"><Label>Category</Label><Select defaultValue="notice"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="notice">Notice</SelectItem><SelectItem value="alert">Alert</SelectItem><SelectItem value="request">Request</SelectItem><SelectItem value="report">Report</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Message</Label><Textarea placeholder="Write your message..." rows={4} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComposeOpen(false)}>Cancel</Button>
            <Button onClick={() => setComposeOpen(false)} className="gap-2"><Send className="h-4 w-4" />Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
