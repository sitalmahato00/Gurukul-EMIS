import { useState } from "react"
import {
  Search,
  Users,
  UserPlus,
  Phone,
  Mail,
  Eye,
  Edit,
  MoreHorizontal,
  UserCheck,
  TrendingUp,
  Link2,
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
import { getInitials } from "@/lib/utils"

const parents = [
  { id: "1", name: "Rajesh Sharma", phone: "+91 98765 43210", email: "rajesh.sharma@email.com", children: [{ name: "Aarav Sharma", class: "10-A" }], status: "active", joinDate: "2024-04-01" },
  { id: "2", name: "Sanjay Patel", phone: "+91 98765 43211", email: "sanjay.patel@email.com", children: [{ name: "Priya Patel", class: "10-A" }], status: "active", joinDate: "2024-04-01" },
  { id: "3", name: "Amit Gupta", phone: "+91 98765 43212", email: "amit.gupta@email.com", children: [{ name: "Rohan Gupta", class: "9-B" }, { name: "Saanvi Gupta", class: "10-A" }], status: "active", joinDate: "2024-04-01" },
  { id: "4", name: "Vikram Singh", phone: "+91 98765 43213", email: "vikram.singh@email.com", children: [{ name: "Ananya Singh", class: "11-A" }, { name: "Reyansh Singh", class: "11-B" }], status: "active", joinDate: "2024-04-01" },
  { id: "5", name: "Manoj Desai", phone: "+91 98765 43214", email: "manoj.desai@email.com", children: [{ name: "Kiran Desai", class: "10-B" }], status: "active", joinDate: "2024-04-01" },
  { id: "6", name: "Suresh Mehta", phone: "+91 98765 43215", email: "suresh.mehta@email.com", children: [{ name: "Arjun Mehta", class: "9-A" }], status: "active", joinDate: "2024-04-01" },
  { id: "7", name: "Deepak Joshi", phone: "+91 98765 43216", email: "deepak.joshi@email.com", children: [{ name: "Nisha Joshi", class: "10-A" }, { name: "Advait Joshi", class: "12-B" }], status: "active", joinDate: "2024-04-01" },
  { id: "8", name: "Prakash Rao", phone: "+91 98765 43217", email: "prakash.rao@email.com", children: [{ name: "Vivek Rao", class: "11-B" }], status: "inactive", joinDate: "2024-04-01" },
  { id: "9", name: "Ashok Malhotra", phone: "+91 98765 43218", email: "ashok.malhotra@email.com", children: [{ name: "Ishita Malhotra", class: "12-A" }], status: "active", joinDate: "2024-04-01" },
  { id: "10", name: "Ravi Nair", phone: "+91 98765 43219", email: "ravi.nair@email.com", children: [{ name: "Kabir Nair", class: "11-A" }], status: "active", joinDate: "2024-04-01" },
  { id: "11", name: "Kiran Rao", phone: "+91 98765 43220", email: "kiran.rao@email.com", children: [{ name: "Diya Rao", class: "9-B" }], status: "active", joinDate: "2024-04-01" },
  { id: "12", name: "Neha Kapoor", phone: "+91 98765 43221", email: "neha.kapoor@email.com", children: [{ name: "Aryan Kapoor", class: "10-B" }, { name: "Myra Kapoor", class: "9-A" }], status: "active", joinDate: "2024-05-15" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ParentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = parents.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Parents</h1>
            <p className="text-muted-foreground mt-1">
              Manage parent accounts and linked students
            </p>
          </div>
          <Button className="gap-2 rounded-xl">
            <UserPlus className="h-4 w-4" />
            Add Parent
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Parents"
          value="980"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+28"
          description="new this month"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Active"
          value="950"
          icon={<UserCheck className="h-6 w-6" />}
          trend="up"
          trendValue="96.9%"
          description="of total parents"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="New This Month"
          value="28"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+5"
          description="vs last month"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
      </motion.div>

      {/* Filters */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      {/* Parent List */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4">
        {filtered.map((parent, idx) => (
          <motion.div
            key={parent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Parent Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                        {getInitials(parent.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold truncate">{parent.name}</h3>
                        <Badge variant={parent.status === "active" ? "success" : "secondary"}>
                          {parent.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {parent.phone}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {parent.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center gap-3 md:border-l md:pl-4">
                    <Link2 className="h-4 w-4 text-muted-foreground shrink-0 hidden md:block" />
                    <div className="flex flex-wrap gap-2">
                      {parent.children.map((child) => (
                        <div key={child.name} className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Users className="h-3 w-3" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">{child.name}</p>
                            <p className="text-[10px] text-muted-foreground">{child.class}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Children Count Badge */}
                  <div className="flex items-center gap-2 shrink-0 md:border-l md:pl-4">
                    <Badge variant="outline" className="gap-1 px-2.5 py-1">
                      <Users className="h-3 w-3" />
                      {parent.children.length} {parent.children.length === 1 ? "child" : "children"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
