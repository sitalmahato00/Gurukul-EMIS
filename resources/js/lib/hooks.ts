import { api } from "@/lib/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// Helper to extract paginated data
function extractPaginated(res: any): { data: any[]; total: number; currentPage: number; lastPage: number } {
  const d = res.data
  const p = res.pagination
  if (d?.data) {
    return { data: d.data, total: p?.total ?? d.total ?? d.data.length, currentPage: p?.current_page ?? d.current_page ?? 1, lastPage: p?.last_page ?? d.last_page ?? 1 }
  }
  return { data: Array.isArray(d) ? d : [], total: p?.total ?? (Array.isArray(d) ? d.length : 0), currentPage: p?.current_page ?? 1, lastPage: p?.last_page ?? 1 }
}

// ─── Dashboard ─────────────────────────────────────
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await api.get<any>("/dashboard/stats")
      return res.data
    },
  })
}

// ─── Students ──────────────────────────────────────
export function useStudents(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const res = await api.get<any>("/students" + qs)
      return extractPaginated(res)
    },
  })
}

export function useStudent(id: number | string) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const res = await api.get<any>(`/students/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateStudent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/students", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  })
}

// ─── Teachers ──────────────────────────────────────
export function useTeachers(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["teachers", params],
    queryFn: async () => {
      const res = await api.get<any>("/teachers" + qs)
      return extractPaginated(res)
    },
  })
}

export function useTeacher(id: number | string) {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: async () => {
      const res = await api.get<any>(`/teachers/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateTeacher() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/teachers", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  })
}

// ─── Parents ───────────────────────────────────────
export function useParents(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["parents", params],
    queryFn: async () => {
      const res = await api.get<any>("/parents" + qs)
      return extractPaginated(res)
    },
  })
}

export function useCreateParent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/parents", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parents"] }),
  })
}

// ─── Classes ───────────────────────────────────────
export function useClasses(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["classes", params],
    queryFn: async () => {
      const res = await api.get<any>("/classes" + qs)
      return extractPaginated(res)
    },
  })
}

export function useMyClasses() {
  return useQuery({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const res = await api.get<any>("/my/classes")
      return res.data
    },
  })
}

// ─── Subjects ──────────────────────────────────────
export function useSubjects(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["subjects", params],
    queryFn: async () => {
      const res = await api.get<any>("/subjects" + qs)
      return extractPaginated(res)
    },
  })
}

export function useMySubjects() {
  return useQuery({
    queryKey: ["my-subjects"],
    queryFn: async () => {
      const res = await api.get<any>("/my/subjects")
      return res.data
    },
  })
}

// ─── Employees ─────────────────────────────────────
export function useEmployees(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["employees", params],
    queryFn: async () => {
      const res = await api.get<any>("/employees" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Attendance ────────────────────────────────────
export function useAttendance(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["attendance", params],
    queryFn: async () => {
      const res = await api.get<any>("/attendance" + qs)
      return extractPaginated(res)
    },
  })
}

export function useMyAttendance() {
  return useQuery({
    queryKey: ["my-attendance"],
    queryFn: async () => {
      const res = await api.get<any>("/my/attendance")
      return extractPaginated(res)
    },
  })
}

export function useAttendanceReport(params: Record<string, string>) {
  const qs = "?" + new URLSearchParams(params).toString()
  return useQuery({
    queryKey: ["attendance-report", params],
    queryFn: async () => {
      const res = await api.get<any>("/attendance/report" + qs)
      return res.data
    },
    enabled: !!params.class_id && !!params.start_date && !!params.end_date,
  })
}

// ─── Exams ─────────────────────────────────────────
export function useExams(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["exams", params],
    queryFn: async () => {
      const res = await api.get<any>("/exams" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Marks ─────────────────────────────────────────
export function useMarks(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["marks", params],
    queryFn: async () => {
      const res = await api.get<any>("/marks" + qs)
      return extractPaginated(res)
    },
  })
}

export function useMyMarks() {
  return useQuery({
    queryKey: ["my-marks"],
    queryFn: async () => {
      const res = await api.get<any>("/my/marks")
      return res.data
    },
  })
}

// ─── Homework ──────────────────────────────────────
export function useHomeworks(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["homeworks", params],
    queryFn: async () => {
      const res = await api.get<any>("/homeworks" + qs)
      return extractPaginated(res)
    },
  })
}

export function useMyHomeworks() {
  return useQuery({
    queryKey: ["my-homeworks"],
    queryFn: async () => {
      const res = await api.get<any>("/my/homeworks")
      return res.data
    },
  })
}

// ─── Fee Structures ────────────────────────────────
export function useFeeStructures(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["fee-structures", params],
    queryFn: async () => {
      const res = await api.get<any>("/fee-structures" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Fee Payments ──────────────────────────────────
export function useFeePayments(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["fee-payments", params],
    queryFn: async () => {
      const res = await api.get<any>("/fee-payments" + qs)
      return extractPaginated(res)
    },
  })
}

export function useFeeReport() {
  return useQuery({
    queryKey: ["fee-report"],
    queryFn: async () => {
      const res = await api.get<any>("/fee-report")
      return res.data
    },
  })
}

export function useOutstandingDues() {
  return useQuery({
    queryKey: ["outstanding-dues"],
    queryFn: async () => {
      const res = await api.get<any>("/outstanding-dues")
      return res.data
    },
  })
}

export function useMyFees() {
  return useQuery({
    queryKey: ["my-fees"],
    queryFn: async () => {
      const res = await api.get<any>("/my/fees")
      return res.data
    },
  })
}

// ─── Library Books ─────────────────────────────────
export function useLibraryBooks(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["library-books", params],
    queryFn: async () => {
      const res = await api.get<any>("/library/books" + qs)
      return extractPaginated(res)
    },
  })
}

export function useLibraryIssues(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["library-issues", params],
    queryFn: async () => {
      const res = await api.get<any>("/library/issues" + qs)
      return extractPaginated(res)
    },
  })
}

export function useLibraryOverdue() {
  return useQuery({
    queryKey: ["library-overdue"],
    queryFn: async () => {
      const res = await api.get<any>("/library/overdue")
      return extractPaginated(res)
    },
  })
}

// ─── Vehicles ──────────────────────────────────────
export function useVehicles(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["vehicles", params],
    queryFn: async () => {
      const res = await api.get<any>("/vehicles" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Drivers ───────────────────────────────────────
export function useDrivers(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["drivers", params],
    queryFn: async () => {
      const res = await api.get<any>("/drivers" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Routes ────────────────────────────────────────
export function useTransportRoutes(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["transport-routes", params],
    queryFn: async () => {
      const res = await api.get<any>("/routes" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Transport Allocations ─────────────────────────
export function useTransportAllocations(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["transport-allocations", params],
    queryFn: async () => {
      const res = await api.get<any>("/transport-allocations" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Hostel Rooms ──────────────────────────────────
export function useHostelRooms(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["hostel-rooms", params],
    queryFn: async () => {
      const res = await api.get<any>("/hostel/rooms" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Hostel Allocations ────────────────────────────
export function useHostelAllocations(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["hostel-allocations", params],
    queryFn: async () => {
      const res = await api.get<any>("/hostel/allocations" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Hostel Visitors ───────────────────────────────
export function useHostelVisitors(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["hostel-visitors", params],
    queryFn: async () => {
      const res = await api.get<any>("/hostel/visitors" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Hostel Complaints ─────────────────────────────
export function useHostelComplaints(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["hostel-complaints", params],
    queryFn: async () => {
      const res = await api.get<any>("/hostel/complaints" + qs)
      return extractPaginated(res)
    },
  })
}

// ─── Schools ───────────────────────────────────────
export function useSchools(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["schools", params],
    queryFn: async () => {
      const res = await api.get<any>("/schools" + qs)
      return extractPaginated(res)
    },
  })
}

export function useSchool(id: number | string) {
  return useQuery({
    queryKey: ["schools", id],
    queryFn: async () => {
      const res: any = await api.get<any>(`/schools/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateSchool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/schools", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  })
}

export function useUpdateSchool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => api.put(`/schools/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  })
}

export function useDeleteSchool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/schools/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  })
}

// ─── Super Admin: API Keys ─────────────────────────
export function useApiKeys(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["api-keys", params],
    queryFn: async () => {
      const res = await api.get<any>("/api-keys" + qs)
      return { ...extractPaginated(res), summary: (res as any).summary || {} }
    },
  })
}

export function useCreateApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/api-keys", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["api-keys"] }),
  })
}

export function useUpdateApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: any) => api.put(`/api-keys/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["api-keys"] }),
  })
}

export function useToggleApiKeyStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.post(`/api-keys/${id}/toggle-status`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["api-keys"] }),
  })
}

export function useDeleteApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/api-keys/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["api-keys"] }),
  })
}

// ─── Super Admin: Audit Logs ───────────────────────
export function useAuditLogs(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "" && v !== "all") as [string, string][]
  ).toString() : ""
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: async () => {
      const res: any = await api.get<any>("/audit-logs" + qs)
      const paginated = extractPaginated(res)
      return { ...paginated, summary: res.summary || {} }
    },
  })
}

// ─── Super Admin: Backups ──────────────────────────
export function useBackups() {
  return useQuery({
    queryKey: ["backups"],
    queryFn: async () => {
      const res: any = await api.get<any>("/backups")
      return { backups: res.data || [], summary: res.summary || {} }
    },
  })
}

export function useCreateBackup() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data?: { type?: string }) => api.post("/backups", { type: data?.type || "full" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["backups"] }),
  })
}

export function useDeleteBackup() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/backups/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["backups"] }),
  })
}

export function useDownloadBackup() {
  return useMutation({
    mutationFn: async (id: number | string) => {
      const token = localStorage.getItem("sms_token")
      const res = await fetch(`/api/backups/${id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Download failed")
      const blob = await res.blob()
      const disposition = res.headers.get("content-disposition")
      const filename = disposition ? disposition.split("filename=")[1]?.replace(/"/g, "") : "backup.sqlite"
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    },
  })
}

export function useDownloadLatestBackup() {
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("sms_token")
      const res = await fetch("/api/backups/download/latest", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Download failed")
      const blob = await res.blob()
      const disposition = res.headers.get("content-disposition")
      const filename = disposition ? disposition.split("filename=")[1]?.replace(/"/g, "") : "backup.sqlite"
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    },
  })
}

export function useAutoBackupSettings() {
  return useQuery({
    queryKey: ["auto-backup-settings"],
    queryFn: async () => {
      const res: any = await api.get<any>("/auto-backup-settings")
      return res.data || {}
    },
  })
}

export function useSaveAutoBackupSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/auto-backup-settings", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["auto-backup-settings"] }),
  })
}

// ─── Super Admin: Support Tickets ──────────────────
export function useSupportTickets(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["support-tickets", params],
    queryFn: async () => {
      const res = await api.get<any>("/support-tickets" + qs)
      return extractPaginated(res)
    },
  })
}

export function useSupportTicket(id: number | string | null) {
  return useQuery({
    queryKey: ["support-tickets", id],
    queryFn: async () => {
      const res = await api.get<any>(`/support-tickets/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateSupportTicket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/support-tickets", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["support-tickets"] }),
  })
}

export function useUpdateTicket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => api.put(`/support-tickets/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["support-tickets"] }),
  })
}

export function useDeleteSupportTicket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/support-tickets/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["support-tickets"] }),
  })
}

// ─── Super Admin: Subscription Plans ───────────────
export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const res = await api.get<any>("/subscription-plans")
      return extractPaginated(res)
    },
  })
}

export function useCreatePlan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/subscription-plans", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription-plans"] }),
  })
}

export function useUpdatePlan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => api.put(`/subscription-plans/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription-plans"] }),
  })
}

export function useDeletePlan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/subscription-plans/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription-plans"] }),
  })
}

// ─── Super Admin: Users ────────────────────────────
export function useAdminUsers(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const res: any = await api.get<any>("/admin/users" + qs)
      return { ...extractPaginated(res), summary: res.summary || {} }
    },
  })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/admin/users", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => api.put(`/admin/users/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/admin/users/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  })
}

export function useResetPassword() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, password }: { id: number | string; password: string }) =>
      api.post(`/admin/users/${id}/reset-password`, { password, password_confirmation: password }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  })
}

export function useToggleUserActive() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.post(`/admin/users/${id}/toggle-active`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  })
}

// ─── Super Admin: Platform Analytics ───────────────
export function usePlatformAnalytics() {
  return useQuery({
    queryKey: ["platform-analytics"],
    queryFn: async () => {
      const res = await api.get<any>("/analytics")
      return res.data
    },
  })
}

// ─── Super Admin: School Usage ─────────────────────
export function useSchoolUsage() {
  return useQuery({
    queryKey: ["school-usage"],
    queryFn: async () => {
      const res: any = await api.get<any>("/school-usage")
      return { data: res.data || [], summary: res.summary || {} }
    },
  })
}

// ─── Super Admin: System Logs ──────────────────────
export function useSystemLogs(params?: { level?: string; search?: string; lines?: number }) {
  const qs = params
    ? "?" + new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== "" && v !== "all") as [string, string][]
      ).toString()
    : ""
  return useQuery({
    queryKey: ["system-logs", params?.level, params?.search, params?.lines],
    queryFn: async () => {
      const res: any = await api.get<any>("/system-logs" + qs)
      return { logs: res.data || [], summary: res.summary || { total: 0, info: 0, warning: 0, error: 0, critical: 0 } }
    },
  })
}

// ─── Messages ──────────────────────────────────────
export function useMessages(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["messages", params],
    queryFn: async () => {
      const res = await api.get<any>("/messages" + qs)
      return extractPaginated(res)
    },
  })
}

export function useSendMessage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { receiver_id: number; subject?: string; body: string; type?: string }) =>
      api.post("/messages", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["messages"] })
    },
  })
}

// ─── Notifications ─────────────────────────────────
export function useNotifications(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : ""
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: async () => {
      const res = await api.get<any>("/notifications" + qs)
      return res.data
    },
  })
}

export function useMarkNotificationRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.post(`/notifications/${id}/read`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => api.post("/notifications/read-all"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

// ─── Settings ──────────────────────────────────────
export function useSettings(group?: string) {
  const qs = group ? `?group=${group}` : ""
  return useQuery({
    queryKey: ["settings", group],
    queryFn: async () => {
      const res = await api.get<any>("/settings" + qs)
      return res.data
    },
  })
}

// ─── Platform Settings (Super Admin) ────────────────
export function usePlatformSettings(group?: string) {
  const qs = group ? `?group=${group}` : ""
  return useQuery({
    queryKey: ["platform-settings", group],
    queryFn: async () => {
      const res: any = await api.get<any>("/platform-settings" + qs)
      return { flat: res.flat || {}, grouped: res.data || {} }
    },
  })
}

export function useUpdatePlatformSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (settings: Array<{ key: string; value: string; group?: string; type?: string; is_active?: boolean }>) =>
      api.post("/platform-settings", { settings }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["platform-settings"] })
    },
  })
}

export function useDeletePlatformSetting() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (key: string) => api.delete(`/platform-settings/by-key/${key}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform-settings"] })
    },
  })
}

// ─── My Students (Teacher) ─────────────────────────
export function useMyStudents() {
  return useQuery({
    queryKey: ["my-students"],
    queryFn: async () => {
      const res = await api.get<any>("/my/students")
      return res.data
    },
  })
}

// ─── My Children (Parent) ──────────────────────────
export function useMyChildren() {
  return useQuery({
    queryKey: ["my-children"],
    queryFn: async () => {
      const res = await api.get<any>("/my/children")
      return res.data
    },
  })
}

// ─── Generic CRUD mutations ────────────────────────
export function useCreateResource(resource: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post(`/${resource}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
  })
}

export function useUpdateResource(resource: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => api.put(`/${resource}/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
  })
}

export function useDeleteResource(resource: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/${resource}/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
  })
}

export function usePostAction(path: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ path: p, data }: { path: string; data?: any }) => api.post(p, data),
    onSuccess: () => qc.invalidateQueries(),
  })
}

// ─── Profile ───────────────────────────────────────
export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.put("/profile", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: { current_password: string; password: string; password_confirmation: string }) =>
      api.post("/change-password", data),
  })
}

export function usePersonalAccessTokens() {
  return useQuery({
    queryKey: ["personal-access-tokens"],
    queryFn: async () => {
      const res = await api.get<any>("/settings")
      return res.data
    },
  })
}

export function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await api.get<any>("/sessions")
      return res.data
    },
  })
}

export function useRevokeSession() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (tokenId: number | string) => api.post(`/sessions/${tokenId}/revoke`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
  })
}

export function useRevokeAllSessions() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => api.post("/sessions/revoke-all"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
  })
}
