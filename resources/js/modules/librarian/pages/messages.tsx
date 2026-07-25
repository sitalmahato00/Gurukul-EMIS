import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Send, Inbox, Mail, FileEdit, Search, Plus, Star, Trash2, Paperclip } from "lucide-react"
import { useMessages } from "@/lib/hooks"

export function MessagesPage() {
  const { data: messagesResult, isLoading } = useMessages()
  const [activeTab, setActiveTab] = useState("inbox")
  const [showComposeDialog, setShowComposeDialog] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null)

  const allMessages = messagesResult?.data || []
  const inboxMessages = allMessages.filter((m: any) => !m.is_sent)
  const sentMessages = allMessages.filter((m: any) => m.is_sent)

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const unreadCount = inboxMessages.filter((m: any) => !m.read).length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Messages" description="Communicate with students, teachers, and staff" actions={<Button className="gap-2" onClick={() => setShowComposeDialog(true)}><Plus className="h-4 w-4" />Compose</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Inbox" value={inboxMessages.length} icon={<Inbox className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Unread" value={unreadCount} icon={<Mail className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Sent" value={sentMessages.length} icon={<Send className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Drafts" value={0} icon={<FileEdit className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between border-b px-6 pt-4">
              <TabsList>
                <TabsTrigger value="inbox" className="gap-1.5">
                  <Inbox className="h-3.5 w-3.5" /> Inbox
                  {unreadCount > 0 && <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center">{unreadCount}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="sent" className="gap-1.5"><Send className="h-3.5 w-3.5" /> Sent</TabsTrigger>
                <TabsTrigger value="drafts" className="gap-1.5"><FileEdit className="h-3.5 w-3.5" /> Drafts</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9 w-56" />
              </div>
            </div>

            <TabsContent value="inbox" className="p-0">
              <div className="divide-y">
                {inboxMessages.map((msg: any) => (
                  <div key={msg.id} onClick={() => setSelectedMessage(msg)} className={"flex items-center gap-4 px-6 py-4 hover:bg-muted/50 cursor-pointer transition-colors " + (!msg.read ? "bg-pink-50/50 dark:bg-pink-950/10" : "")}>
                    <div className={"h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold " + (!msg.read ? "bg-pink-500 text-white" : "bg-muted text-muted-foreground")}>
                      {(msg.sender_name || msg.from || "NA").split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={"text-sm truncate " + (!msg.read ? "font-bold" : "font-medium")}>{msg.sender_name || msg.from || "N/A"}</p>
                      </div>
                      <p className={"text-xs truncate " + (!msg.read ? "font-medium" : "text-muted-foreground")}>{msg.subject || "No subject"}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.body || msg.preview || ""}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{msg.created_at ? new Date(msg.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}</span>
                  </div>
                ))}
                {inboxMessages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No messages</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="sent" className="p-0">
              <div className="divide-y">
                {sentMessages.map((msg: any) => (
                  <div key={msg.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {(msg.recipient_name || msg.to || "NA").split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">To: {msg.recipient_name || msg.to || "N/A"}</p>
                      <p className="text-xs text-muted-foreground truncate">{msg.subject || "No subject"}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.body || msg.preview || ""}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{msg.created_at ? new Date(msg.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="p-0">
              <p className="text-sm text-muted-foreground text-center py-8">No drafts</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>From: {selectedMessage?.from}</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
                  {selectedMessage.from.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedMessage.from}</p>
                  <p className="text-xs text-muted-foreground">{selectedMessage.time}</p>
                </div>
              </div>
              <div className="rounded-xl border p-4 text-sm text-muted-foreground leading-relaxed">
                {selectedMessage.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="gap-1"><Send className="h-3 w-3" /> Reply</Button>
                <Button size="sm" variant="outline" className="gap-1"><Trash2 className="h-3 w-3" /> Delete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>Write and send a new message</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>To</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select recipient" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="teachers">All Teachers</SelectItem>
                  <SelectItem value="staff">All Staff</SelectItem>
                  <SelectItem value="specific">Specific Member</SelectItem>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Paperclip className="h-3 w-3" /> Attach</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeDialog(false)}>Save Draft</Button>
            <Button onClick={() => setShowComposeDialog(false)} className="gap-1"><Send className="h-3 w-3" /> Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
