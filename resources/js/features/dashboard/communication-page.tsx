import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import {
  MessageSquare,
  Send,
  Search,
  Plus,
  Mail,
  Bell,
  Users,
  Phone,
  Video,
  Paperclip,
  Smile,
  MoreVertical,
} from "lucide-react"

const conversations = [
  { id: "1", name: "Rajesh Sharma", lastMessage: "Thank you for the update", time: "2 min ago", unread: 2, type: "parent" },
  { id: "2", name: "Sunita Sharma", lastMessage: "Class 10-A attendance submitted", time: "15 min ago", unread: 0, type: "teacher" },
  { id: "3", name: "All Teachers", lastMessage: "Staff meeting tomorrow at 3 PM", time: "1 hour ago", unread: 5, type: "group" },
  { id: "4", name: "Sanjay Patel", lastMessage: "Fee payment confirmed", time: "3 hours ago", unread: 0, type: "parent" },
  { id: "5", name: "Vikram Singh", lastMessage: "Is the science lab available?", time: "Yesterday", unread: 1, type: "parent" },
]

export function CommunicationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Communication"
        description="Messages, announcements, and parent-teacher communication"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Communication" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Message
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </div>
            <div className="divide-y">
              {conversations.map((conv) => (
                <div key={conv.id} className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {getInitials(conv.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">RS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Rajesh Sharma</p>
                  <p className="text-xs text-muted-foreground">Parent of Aarav Sharma &middot; Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm"><Phone className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon-sm"><Video className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon-sm"><MoreVertical className="h-4 w-4" /></Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">RS</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl rounded-tl-md p-3">
                  <p className="text-sm">Hello, I wanted to inquire about Aarav&apos;s progress in mathematics.</p>
                  <p className="text-[10px] text-muted-foreground mt-1">10:30 AM</p>
                </div>
              </div>
              <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md p-3">
                  <p className="text-sm">Hello Mr. Sharma! Aarav is doing very well in mathematics. He scored 85% in the last test.</p>
                  <p className="text-[10px] text-white/70 mt-1">10:32 AM</p>
                </div>
              </div>
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">RS</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl rounded-tl-md p-3">
                  <p className="text-sm">That&apos;s great to hear! Thank you for the update.</p>
                  <p className="text-[10px] text-muted-foreground mt-1">10:35 AM</p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm"><Paperclip className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon-sm"><Smile className="h-4 w-4" /></Button>
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon-sm"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
