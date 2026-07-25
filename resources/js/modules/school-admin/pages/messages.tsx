import { useState } from "react"
import {
  MessageSquare,
  Send,
  Inbox,
  FileText,
  Pencil,
  Mail,
  MailOpen,
  Search,
  Clock,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getInitials, cn } from "@/lib/utils"

const messageThreads = [
  {
    id: "1",
    sender: "Rajesh Sharma",
    initials: "RS",
    subject: "PTM Notice - 25th January",
    preview: "Dear Parents, we would like to inform you that the Parent-Teacher Meeting is scheduled for 25th January 2025...",
    timestamp: "2 min ago",
    unread: true,
    category: "notice",
  },
  {
    id: "2",
    sender: "Accounts Dept",
    initials: "AD",
    subject: "Fee Reminder - Q4 Dues",
    preview: "This is a gentle reminder that the Q4 fee payment is due by 31st January. Please clear the outstanding amount...",
    timestamp: "15 min ago",
    unread: true,
    category: "finance",
  },
  {
    id: "3",
    sender: "Dr. Anita Mehta",
    initials: "AM",
    subject: "Exam Schedule - Mid Terms",
    preview: "The mid-term examination schedule has been finalized. Please find the detailed timetable attached. The exams...",
    timestamp: "1 hour ago",
    unread: true,
    category: "exam",
  },
  {
    id: "4",
    sender: "Transport Dept",
    initials: "TD",
    subject: "Route Update - Bus MH-12-AB",
    preview: "Due to road construction on MG Road, Bus MH-12-AB will follow an alternate route starting tomorrow. The pickup...",
    timestamp: "2 hours ago",
    unread: false,
    category: "transport",
  },
  {
    id: "5",
    sender: "Sports Dept",
    initials: "SD",
    subject: "Annual Sports Day - 5th Feb",
    preview: "We are excited to announce the Annual Sports Day on 5th February. All students are expected to participate...",
    timestamp: "3 hours ago",
    unread: false,
    category: "event",
  },
  {
    id: "6",
    sender: "HR Department",
    initials: "HR",
    subject: "Holiday Notice - Republic Day",
    preview: "The school will remain closed on 26th January on account of Republic Day. Classes will resume on 27th January...",
    timestamp: "5 hours ago",
    unread: false,
    category: "notice",
  },
  {
    id: "7",
    sender: "Science Lab",
    initials: "SL",
    subject: "Lab Equipment Inventory",
    preview: "The annual lab equipment inventory has been completed. A few items need replacement. Please review the list...",
    timestamp: "Yesterday",
    unread: false,
    category: "academic",
  },
  {
    id: "8",
    sender: "Library",
    initials: "LB",
    subject: "Overdue Books Reminder",
    preview: "The following students have overdue library books. Please return them at the earliest to avoid late fees...",
    timestamp: "Yesterday",
    unread: false,
    category: "library",
  },
  {
    id: "9",
    sender: "Sunita Sharma",
    initials: "SS",
    subject: "Class 10-A Attendance Concern",
    preview: "I wanted to bring to your attention the attendance pattern of Class 10-A. The average attendance has dropped...",
    timestamp: "2 days ago",
    unread: false,
    category: "academic",
  },
  {
    id: "10",
    sender: "Principal Office",
    initials: "PO",
    subject: "Staff Meeting - Monthly Review",
    preview: "A monthly staff meeting has been scheduled for this Friday at 3:00 PM in the conference room. All department...",
    timestamp: "2 days ago",
    unread: false,
    category: "admin",
  },
  {
    id: "11",
    sender: "PTA Committee",
    initials: "PC",
    subject: "PTA Fundraising Event",
    preview: "The PTA is organizing a fundraising event next month. We need volunteers and suggestions for activities...",
    timestamp: "3 days ago",
    unread: false,
    category: "event",
  },
  {
    id: "12",
    sender: "Accounts Dept",
    initials: "AD",
    subject: "Salary Disbursement Notice",
    preview: "This is to inform all staff that the salary for January will be credited on 1st February. Please update your...",
    timestamp: "4 days ago",
    unread: false,
    category: "finance",
  },
  {
    id: "13",
    sender: "Vice Principal",
    initials: "VP",
    subject: "Curriculum Update - New Subjects",
    preview: "As per the new education policy, we are introducing additional skill-based subjects from the next academic year...",
    timestamp: "5 days ago",
    unread: false,
    category: "academic",
  },
  {
    id: "14",
    sender: "Canteen Manager",
    initials: "CM",
    subject: "New Menu Card - February",
    preview: "The canteen menu for February has been updated with healthier options. The new menu will be effective from...",
    timestamp: "1 week ago",
    unread: false,
    category: "admin",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = messageThreads.filter((msg) => {
    const matchesSearch =
      msg.subject.toLowerCase().includes(search.toLowerCase()) ||
      msg.sender.toLowerCase().includes(search.toLowerCase()) ||
      msg.preview.toLowerCase().includes(search.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "inbox") return matchesSearch
    if (activeTab === "sent") return matchesSearch
    if (activeTab === "drafts") return false
    return matchesSearch
  })

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Manage internal communications and messages
            </p>
          </div>
          <Button className="gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25">
            <Pencil className="h-4 w-4" />
            Compose
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Messages"
          value="1,240"
          icon={<MessageSquare className="h-6 w-6" />}
          trend="up"
          trendValue="+18.2%"
          description="this month"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Unread"
          value="45"
          icon={<Mail className="h-6 w-6" />}
          trend="up"
          trendValue="+8"
          description="need attention"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Sent Today"
          value="128"
          icon={<Send className="h-6 w-6" />}
          trend="up"
          trendValue="+23"
          description="vs yesterday"
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
      </motion.div>

      {/* Message Threads */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
            <CardTitle className="text-base">Message Threads</CardTitle>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all" className="gap-1.5">
                  <Inbox className="h-3.5 w-3.5" />
                  All
                </TabsTrigger>
                <TabsTrigger value="inbox" className="gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="sent" className="gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Sent
                </TabsTrigger>
                <TabsTrigger value="drafts" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Drafts
                </TabsTrigger>
              </TabsList>

              <div className="divide-y divide-border">
                {filtered.map((msg, idx) => (
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
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                          {msg.initials}
                        </AvatarFallback>
                      </Avatar>
                      {msg.unread && (
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-blue-500 border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm", msg.unread ? "font-semibold" : "font-medium")}>
                            {msg.sender}
                          </p>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize">
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
                ))}
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
    </motion.div>
  )
}
