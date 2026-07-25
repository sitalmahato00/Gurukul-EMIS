import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { MessageSquare, Send, Inbox, Mail, MailOpen, Search, Plus, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useMessages } from "@/lib/hooks"

const inboxMessages = [
  { id: 1, from: "Sunita Sharma", role: "Teacher - Mathematics", subject: "Upcoming Math Exam Preparation", preview: "Dear students, please ensure you revise chapters 14 and 15 before the exam...", time: "10:30 AM", date: "Today", read: false },
  { id: 2, from: "Amit Verma", role: "Teacher - Physics", subject: "Physics Lab Report Feedback", preview: "Your lab report on Ohm's Law has been reviewed. Please check the comments...", time: "Yesterday", date: "Jul 23", read: false },
  { id: 3, from: "Priya Nair", role: "Teacher - Computer Science", subject: "Project Submission Reminder", preview: "This is a reminder that your web development project is due on Aug 2...", time: "Jul 22", date: "Jul 22", read: true },
  { id: 4, from: "Admin Office", role: "Administrator", subject: "Fee Payment Reminder", preview: "This is a reminder that your exam fee and transport fee are due on Aug 5...", time: "Jul 20", date: "Jul 20", read: true },
  { id: 5, from: "Neha Gupta", role: "Teacher - English", subject: "Creative Writing Contest", preview: "The annual creative writing contest will be held on Aug 10. Interested students...", time: "Jul 18", date: "Jul 18", read: true },
]

const sentMessages = [
  { id: 6, to: "Sunita Sharma", subject: "Query about Quadratic Equations", preview: "Ma'am, I have a doubt regarding question 5 in Exercise 4.3...", time: "Jul 21", date: "Jul 21" },
  { id: 7, to: "Admin Office", subject: "Leave Application", preview: "I would like to request leave on Jul 28 due to a family function...", time: "Jul 19", date: "Jul 19" },
]

const teachers = [
  { name: "Sunita Sharma", subject: "Mathematics" },
  { name: "Amit Verma", subject: "Physics" },
  { name: "Neha Gupta", subject: "English" },
  { name: "Rajesh Kumar", subject: "Chemistry" },
  { name: "Priya Nair", subject: "Computer Science" },
  { name: "Admin Office", subject: "General" },
]

export function MessagesPage() {
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null)
  const { data: msgData, isLoading } = useMessages()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiMessages = msgData?.data || []
  const inboxMessagesList = apiMessages.length > 0 ? apiMessages.map((m: any) => ({
    id: m.id || 0,
    from: m.from || m.sender?.name || "Unknown",
    role: m.sender?.role || "Teacher",
    subject: m.subject || "No Subject",
    preview: m.preview || m.body || m.message || "",
    time: m.time || m.created_at || "",
    date: m.date || "",
    read: m.read || m.is_read || false,
  })) : inboxMessages
  const unreadCount = inboxMessagesList.filter((m: any) => !m.read).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Messages"
        description="Communicate with teachers and administration"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Compose
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>To</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select recipient" /></SelectTrigger>
                    <SelectContent>
                      {teachers.map(t => (
                        <SelectItem key={t.name} value={t.name}>{t.name} ({t.subject})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="Message subject" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Type your message here..." rows={6} />
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Unread Messages" value={unreadCount.toString()} icon={<Mail className="h-6 w-6" />} description="New messages" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Total Inbox" value={inboxMessagesList.length.toString()} icon={<Inbox className="h-6 w-6" />} description="All messages" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Sent" value={sentMessages.length.toString()} icon={<Send className="h-6 w-6" />} description="Outgoing messages" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Teachers" value={teachers.length.toString()} icon={<User className="h-6 w-6" />} description="Available contacts" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
          <CardHeader>
            <Tabs defaultValue="inbox">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <TabsList>
                  <TabsTrigger value="inbox" className="flex items-center gap-1.5">
                    <Inbox className="h-4 w-4" />
                    Inbox ({inboxMessagesList.length})
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex items-center gap-1.5">
                    <Send className="h-4 w-4" />
                    Sent ({sentMessages.length})
                  </TabsTrigger>
                </TabsList>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-9 w-56" />
                </div>
              </div>
              <TabsContent value="inbox" className="mt-4">
                <div className="space-y-2">
                  {inboxMessagesList.map((msg: any) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMsg(msg)}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                        !msg.read
                          ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10"
                          : "border-border bg-card hover:bg-muted/30"
                      )}
                    >
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs font-semibold">
                          {msg.from.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={cn("text-sm", !msg.read ? "font-bold" : "font-medium")}>{msg.from}</p>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{msg.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{msg.role}</p>
                        <p className={cn("text-sm mt-1 truncate", !msg.read ? "font-semibold" : "")}>{msg.subject}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.preview}</p>
                      </div>
                      {!msg.read && (
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="sent" className="mt-4">
                <div className="space-y-2">
                  {sentMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all cursor-pointer">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                          {msg.to.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">To: {msg.to}</p>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className={cn("text-sm mt-1 font-medium")}>{msg.subject}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.preview}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">
              {selectedMsg ? "Message Details" : "Select a Message"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMsg ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold">
                      {selectedMsg.from.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{selectedMsg.from}</p>
                    <p className="text-xs text-muted-foreground">{selectedMsg.role}</p>
                    <p className="text-xs text-muted-foreground">{selectedMsg.date} &middot; {selectedMsg.time}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-semibold text-sm">{selectedMsg.subject}</p>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {selectedMsg.preview}
                </div>
                <div className="pt-2 border-t border-border/50">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/40 mb-4" />
                <p className="text-sm text-muted-foreground">Click on a message to view its details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
