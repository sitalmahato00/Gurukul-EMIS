import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { MessageSquare, Send, Inbox, FileText, Plus, Search, User, Clock, Mail, MailOpen } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

type TabType = "inbox" | "sent" | "drafts"

const inboxMessages = [
  { id: "MSG001", from: "Rajesh Sharma (Warden)", subject: "Annual Hostel Maintenance Schedule", preview: "Dear residents, please note the maintenance schedule for the upcoming month...", time: "10:30 AM", date: "2025-06-20", read: true, priority: "normal" },
  { id: "MSG002", from: "Admin Office", subject: "Hostel Fee Payment Reminder", preview: "This is a reminder that hostel fees for June 2025 are due by 5th July...", time: "09:15 AM", date: "2025-06-19", read: false, priority: "high" },
  { id: "MSG003", from: "Anita Verma (Block C Warden)", subject: "Water Supply Interruption Notice", preview: "Due to pipeline repair work, water supply will be interrupted on 22nd June...", time: "04:45 PM", date: "2025-06-18", read: false, priority: "high" },
  { id: "MSG004", from: "Student Council", subject: "Common Room Movie Night", preview: "Join us for a movie night in the common room this Saturday at 7 PM...", time: "11:00 AM", date: "2025-06-17", read: true, priority: "normal" },
  { id: "MSG005", from: "Security Desk", subject: "Visitor Policy Update", preview: "Please note the updated visitor policy effective from July 1st. All visitors...", time: "02:30 PM", date: "2025-06-16", read: true, priority: "normal" },
  { id: "MSG006", from: "Dr. Priya Mehta (Principal)", subject: "Examination Leave Instructions", preview: "Students who require examination leave from hostel must submit applications...", time: "10:00 AM", date: "2025-06-15", read: true, priority: "normal" },
]

const sentMessages = [
  { id: "MSG101", to: "Admin Office", subject: "Room Change Request", preview: "I would like to request a room change from A-101 to B-202 due to...", time: "03:20 PM", date: "2025-06-18", status: "Delivered" },
  { id: "MSG102", to: "Rajesh Sharma (Warden)", subject: "Complaint: Broken Window", preview: "I am writing to report a broken window in room A-102. The latch is...", time: "11:45 AM", date: "2025-06-15", status: "Read" },
  { id: "MSG103", to: "Security Desk", subject: "Visitor Approval - Parent Visit", preview: "My parents will be visiting on 22nd June. Please approve their entry...", time: "09:00 AM", date: "2025-06-14", status: "Delivered" },
]

const draftMessages = [
  { id: "MSG201", to: "Maintenance Team", subject: "AC Not Working - Room A-101", preview: "The air conditioner in room A-101 has stopped working since yesterday...", time: "Draft", date: "2025-06-20" },
  { id: "MSG202", to: "Admin Office", subject: "Fee Concession Request", preview: "I am writing to request a fee concession for the upcoming quarter due to...", time: "Draft", date: "2025-06-19" },
]

export function MessagesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("inbox")
  const [searchTerm, setSearchTerm] = useState("")
  const [composeOpen, setComposeOpen] = useState(false)

  const currentMessages = activeTab === "inbox" ? inboxMessages : activeTab === "sent" ? sentMessages : draftMessages

  const filtered = currentMessages.filter((m: any) => {
    const searchField = activeTab === "inbox" ? m.from : m.to
    return searchField.toLowerCase().includes(searchTerm.toLowerCase()) || m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const unreadCount = inboxMessages.filter(m => !m.read).length

  const tabs = [
    { id: "inbox" as TabType, label: "Inbox", icon: Inbox, count: inboxMessages.length },
    { id: "sent" as TabType, label: "Sent", icon: Send, count: sentMessages.length },
    { id: "drafts" as TabType, label: "Drafts", icon: FileText, count: draftMessages.length },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Messages" description="Communicate with hostel administration and staff" actions={<Button onClick={() => setComposeOpen(true)}><Plus className="mr-2 h-4 w-4" />Compose</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Inbox" value={inboxMessages.length} icon={<Inbox className="h-5 w-5" />} />
        <StatCard title="Unread" value={unreadCount} icon={<Mail className="h-5 w-5" />} />
        <StatCard title="Sent" value={sentMessages.length} icon={<Send className="h-5 w-5" />} />
        <StatCard title="Drafts" value={draftMessages.length} icon={<FileText className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 bg-muted p-1 rounded-lg">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                  onClick={() => { setActiveTab(tab.id); setSearchTerm("") }}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  <Badge variant="secondary" className="ml-1 text-[10px] h-5">{tab.count}</Badge>
                </Button>
              ))}
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px]">
            <div className="space-y-1">
              {filtered.map((msg: any) => {
                const isUnread = !msg.read && activeTab === "inbox"
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-4 rounded-xl p-4 hover:bg-muted/50 transition-colors cursor-pointer group ${isUnread ? "bg-blue-50/50 border-l-4 border-blue-500" : ""}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${isUnread ? "bg-blue-100 text-blue-600" : "bg-muted text-muted-foreground"}`}>
                      {isUnread ? <Mail className="h-5 w-5" /> : <MailOpen className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm truncate ${isUnread ? "font-bold" : "font-medium"}`}>
                            {activeTab === "inbox" ? msg.from : msg.to}
                          </p>
                          {msg.priority === "high" && (
                            <Badge className="bg-red-100 text-red-800 text-[10px]">Urgent</Badge>
                          )}
                          {msg.status === "Delivered" && (
                            <Badge className="bg-blue-100 text-blue-800 text-[10px]">Delivered</Badge>
                          )}
                          {msg.status === "Read" && (
                            <Badge className="bg-green-100 text-green-800 text-[10px]">Read</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                          <Clock className="h-3 w-3" />
                          <span>{msg.time}</span>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${isUnread ? "font-semibold" : "font-medium"}`}>{msg.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{msg.preview}</p>
                    </div>
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No messages found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>Send a message to hostel administration</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>To</Label>
              <Input placeholder="Recipient name or role" />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Message subject" />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-green-600">Normal</Button>
                <Button variant="outline" size="sm" className="text-red-600">Urgent</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Write your message here..." className="min-h-[120px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComposeOpen(false)}>Save Draft</Button>
            <Button onClick={() => setComposeOpen(false)}><Send className="mr-2 h-4 w-4" />Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
