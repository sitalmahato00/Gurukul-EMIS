import { useState } from "react"
import {
  Send,
  Search,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  BookOpen,
  Clock,
  Star,
  ChevronRight,
  Video,
  User,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn, getInitials } from "@/lib/utils"

const teachers = [
  { id: 1, name: "Mrs. Sunita Sharma", subject: "Mathematics", role: "Class Teacher", class: "10-A", phone: "9876543210", email: "sunita@gurukul.edu", avatar: "SS", rating: 4.8, experience: "12 years" },
  { id: 2, name: "Mr. Vikash Kumar", subject: "Science", role: "Teacher", class: "10-A", phone: "9876543211", email: "vikash@gurukul.edu", avatar: "VK", rating: 4.6, experience: "8 years" },
  { id: 3, name: "Mr. Rahul Verma", subject: "English", role: "Teacher", class: "10-A", phone: "9876543212", email: "rahul@gurukul.edu", avatar: "RV", rating: 4.5, experience: "10 years" },
  { id: 4, name: "Mrs. Meena Iyer", subject: "Hindi", role: "Teacher", class: "10-A", phone: "9876543213", email: "meena@gurukul.edu", avatar: "MI", rating: 4.7, experience: "15 years" },
  { id: 5, name: "Mr. Suresh Pandey", subject: "Social Studies", role: "Teacher", class: "10-A", phone: "9876543214", email: "suresh@gurukul.edu", avatar: "SP", rating: 4.4, experience: "9 years" },
  { id: 6, name: "Ms. Priya Nair", subject: "Computer Science", role: "Teacher", class: "10-A", phone: "9876543215", email: "priya@gurukul.edu", avatar: "PN", rating: 4.9, experience: "6 years" },
]

const communicationHistory = [
  { id: 1, teacher: "Mrs. Sunita Sharma", subject: "Re: Progress Report", date: "Jul 25, 2026", type: "message" },
  { id: 2, teacher: "Mr. Vikash Kumar", subject: "Science Lab Safety", date: "Jul 22, 2026", type: "message" },
  { id: 3, teacher: "Mrs. Sunita Sharma", subject: "PTM Discussion", date: "Jul 15, 2026", type: "meeting" },
  { id: 4, teacher: "Mr. Rahul Verma", subject: "Essay Competition", date: "Jul 18, 2026", type: "message" },
]

const stats = [
  { title: "Teachers", value: "6", icon: User, gradient: "from-purple-500 to-pink-500", description: "Aarav's class" },
  { title: "Messages", value: "4", icon: MessageSquare, gradient: "from-blue-500 to-indigo-500", description: "This month" },
  { title: "Meetings", value: "1", icon: Calendar, gradient: "from-emerald-500 to-teal-500", description: "Scheduled" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function TeacherCommunicationPage() {
  const [search, setSearch] = useState("")
  const [messageOpen, setMessageOpen] = useState(false)
  const [meetingOpen, setMeetingOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null)

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Teacher Communication"
        description="Connect with Aarav's teachers and view communication history"
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
        {/* Teacher Directory */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search teachers by name or subject..." className="pl-10 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((teacher) => (
              <Card key={teacher.id} className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14 shrink-0 border-2 border-purple-200">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white font-semibold">
                        {teacher.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm truncate">{teacher.name}</h3>
                        {teacher.role === "Class Teacher" && (
                          <Badge className="text-[9px] bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Class Teacher</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{teacher.subject} • {teacher.class}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-medium">{teacher.rating}</span>
                        <span className="text-xs text-muted-foreground">• {teacher.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8 rounded-xl"
                          onClick={() => {
                            setSelectedTeacher(teacher)
                            setMessageOpen(true)
                          }}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8 rounded-xl"
                          onClick={() => {
                            setSelectedTeacher(teacher)
                            setMeetingOpen(true)
                          }}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Meet
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Communication History */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Recent Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {communicationHistory.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
                    item.type === "message" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-emerald-100 dark:bg-emerald-900/30"
                  )}>
                    {item.type === "message" ? (
                      <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.teacher}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.subject}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Message Dialog */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              Message {selectedTeacher?.name}
            </DialogTitle>
            <DialogDescription>Send a quick message to the teacher</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs font-semibold">
                  {selectedTeacher?.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{selectedTeacher?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedTeacher?.subject} • {selectedTeacher?.class}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Enter subject" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Type your message..." className="rounded-xl min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageOpen(false)}>Cancel</Button>
            <Button onClick={() => setMessageOpen(false)} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Meeting Dialog */}
      <Dialog open={meetingOpen} onOpenChange={setMeetingOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Meeting</DialogTitle>
            <DialogDescription>Request a meeting with {selectedTeacher?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Input type="date" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">9:00 AM - 10:00 AM</SelectItem>
                  <SelectItem value="10">10:00 AM - 11:00 AM</SelectItem>
                  <SelectItem value="11">11:00 AM - 12:00 PM</SelectItem>
                  <SelectItem value="2">2:00 PM - 3:00 PM</SelectItem>
                  <SelectItem value="3">3:00 PM - 4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Meeting Mode</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl gap-2">
                  <Video className="h-4 w-4" />
                  Online
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl gap-2">
                  <User className="h-4 w-4" />
                  In Person
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Purpose</Label>
              <Textarea placeholder="Briefly describe the reason for this meeting..." className="rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMeetingOpen(false)}>Cancel</Button>
            <Button onClick={() => setMeetingOpen(false)} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Request Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
