import { useState } from "react"
import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen flex flex-col"
      >
        <TopNav collapsed={sidebarCollapsed} />
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </motion.div>
    </div>
  )
}
