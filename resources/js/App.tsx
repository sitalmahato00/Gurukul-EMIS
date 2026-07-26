import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider, useAuth } from "@/providers/auth-provider"
import { LoginPage } from "@/features/auth/login-page"
import { ROLE_ROUTE_PREFIX, type UserRole } from "@/shared/types"
import { Toaster } from "sonner"

// Portal Layouts
import { SuperAdminLayout } from "@/modules/super-admin/pages/dashboard"
import { SchoolAdminLayout } from "@/modules/school-admin/pages/dashboard"
import { PrincipalLayout } from "@/modules/principal/pages/dashboard"
import { AccountantLayout } from "@/modules/accountant/pages/dashboard"
import { LibrarianLayout } from "@/modules/librarian/pages/dashboard"
import { HostelWardenLayout } from "@/modules/hostel/pages/dashboard"
import { TransportManagerLayout } from "@/modules/transport/pages/dashboard"
import { TeacherLayout } from "@/modules/teacher/pages/dashboard"
import { StudentLayout } from "@/modules/student/pages/dashboard"
import { ParentLayout } from "@/modules/parent/pages/dashboard"

// Dashboard Pages
import { SuperAdminDashboard } from "@/modules/super-admin/pages/dashboard"
import { SchoolAdminDashboard } from "@/modules/school-admin/pages/dashboard"
import { PrincipalDashboard } from "@/modules/principal/pages/dashboard"
import { AccountantDashboard } from "@/modules/accountant/pages/dashboard"
import { LibrarianDashboard } from "@/modules/librarian/pages/dashboard"
import { HostelWardenDashboard } from "@/modules/hostel/pages/dashboard"
import { TransportManagerDashboard } from "@/modules/transport/pages/dashboard"
import { TeacherDashboard } from "@/modules/teacher/pages/dashboard"
import { StudentDashboard } from "@/modules/student/pages/dashboard"
import { ParentDashboard } from "@/modules/parent/pages/dashboard"

// Super Admin Pages
import { PlatformSettingsPage } from "@/modules/super-admin/pages/settings"
import { SystemLogsPage } from "@/modules/super-admin/pages/system-logs"
import { AuditLogsPage } from "@/modules/super-admin/pages/audit-logs"
import { BackupPage } from "@/modules/super-admin/pages/backup"
import { SchoolsPage as SchoolManagementPage } from "@/modules/super-admin/pages/schools"
import { SchoolUsagePage } from "@/modules/super-admin/pages/school-usage"
import { SubscriptionPlansPage } from "@/modules/super-admin/pages/plans"
import { PaymentHistoryPage } from "@/modules/super-admin/pages/payment-history"
import { RevenueAnalyticsPage } from "@/modules/super-admin/pages/analytics"
import { UserManagementPage } from "@/modules/super-admin/pages/users"
import { ApiKeysPage } from "@/modules/super-admin/pages/api-keys"
import { AdminNotificationsPage } from "@/modules/super-admin/pages/notifications"
import { SupportTicketsPage, SupportTicketFormPage, SupportTicketViewPage } from "@/modules/super-admin/pages/support"
import { ProfilePage as SuperAdminProfilePage } from "@/modules/super-admin/pages/profile"

// School Admin Pages
import { SchoolProfilePage } from "@/modules/school-admin/pages/profile"
import { StudentsPage as SchoolStudentsPage } from "@/modules/school-admin/pages/students"
import { ParentsPage } from "@/modules/school-admin/pages/parents"
import { TeachersPage } from "@/modules/school-admin/pages/teachers"
import { EmployeesPage } from "@/modules/school-admin/pages/employees"
import { AcademicsPage } from "@/modules/school-admin/pages/academics"
import { AttendancePage as SchoolAttendancePage } from "@/modules/school-admin/pages/attendance"
import { ExaminationsPage } from "@/modules/school-admin/pages/examinations"
import { HomeworkPage as SchoolHomeworkPage } from "@/modules/school-admin/pages/homework"
import { FinancePage } from "@/modules/school-admin/pages/finance"
import { AccountingPage } from "@/modules/school-admin/pages/accounting"
import { LibraryPage as SchoolLibraryPage } from "@/modules/school-admin/pages/library"
import { TransportPage as SchoolTransportPage } from "@/modules/school-admin/pages/transport"
import { HostelPage as SchoolHostelPage } from "@/modules/school-admin/pages/hostel"
import { MessagesPage as SchoolMessagesPage } from "@/modules/school-admin/pages/messages"
import { CertificatesPage as SchoolCertificatesPage } from "@/modules/school-admin/pages/certificates"
import { SchoolNotificationsPage } from "@/modules/school-admin/pages/notifications"
import { ReportsPage as SchoolReportsPage } from "@/modules/school-admin/pages/reports"
import { SchoolSettingsPage } from "@/modules/school-admin/pages/settings"

// Principal Pages
import { TeacherPerformance } from "@/modules/principal/pages/teacher-performance"
import { StudentPerformance } from "@/modules/principal/pages/student-performance"
import { SchoolPerformance } from "@/modules/principal/pages/school-performance"
import { Attendance as PrincipalAttendance } from "@/modules/principal/pages/attendance"
import { AcademicReports } from "@/modules/principal/pages/academic-reports"
import { ExamReports } from "@/modules/principal/pages/exam-reports"
import { FeeSummary } from "@/modules/principal/pages/fee-summary"
import { Budget } from "@/modules/principal/pages/budget"
import { Approvals } from "@/modules/principal/pages/approvals"
import { CalendarPage as PrincipalCalendar } from "@/modules/principal/pages/calendar"
import { Discipline } from "@/modules/principal/pages/discipline"
import { Messages as PrincipalMessages } from "@/modules/principal/pages/messages"
import { Notifications as PrincipalNotifications } from "@/modules/principal/pages/notifications"

// Accountant Pages
import { FeeCollectionPage } from "@/modules/accountant/pages/fee-collection"
import { StudentBillingPage } from "@/modules/accountant/pages/student-billing"
import { ScholarshipsPage } from "@/modules/accountant/pages/scholarships"
import { DiscountsPage } from "@/modules/accountant/pages/discounts"
import { IncomeSourcesPage } from "@/modules/accountant/pages/income-sources"
import { OnlinePaymentsPage } from "@/modules/accountant/pages/online-payments"
import { ExpensesPage } from "@/modules/accountant/pages/expenses"
import { PayrollPage } from "@/modules/accountant/pages/payroll"
import { FinancialReportsPage } from "@/modules/accountant/pages/financial-reports"
import { OutstandingDuesPage } from "@/modules/accountant/pages/outstanding-dues"
import { MonthlySummaryPage } from "@/modules/accountant/pages/monthly-summary"
import { InvoicesPage } from "@/modules/accountant/pages/invoices"
import { ReceiptsPage as AccountantReceiptsPage } from "@/modules/accountant/pages/receipts"
import { MessagesPage as AccountantMessagesPage } from "@/modules/accountant/pages/messages"
import { NotificationsPage as AccountantNotificationsPage } from "@/modules/accountant/pages/notifications"

// Librarian Pages
import { BooksPage } from "@/modules/librarian/pages/books"
import { CategoriesPage } from "@/modules/librarian/pages/categories"
import { AuthorsPage } from "@/modules/librarian/pages/authors"
import { PublishersPage } from "@/modules/librarian/pages/publishers"
import { IssuePage } from "@/modules/librarian/pages/issue"
import { ReturnPage } from "@/modules/librarian/pages/return"
import { OverduePage } from "@/modules/librarian/pages/overdue"
import { MembersPage } from "@/modules/librarian/pages/members"
import { FinesPage } from "@/modules/librarian/pages/fines"
import { BarcodePage } from "@/modules/librarian/pages/barcode"
import { QRCodePage } from "@/modules/librarian/pages/qr"
import { StudentIDCardsPage } from "@/modules/librarian/pages/id-cards/student"
import { TeacherIDCardsPage } from "@/modules/librarian/pages/id-cards/teacher"
import { StaffIDCardsPage } from "@/modules/librarian/pages/id-cards/staff"
import { ReportsPage as LibrarianReportsPage } from "@/modules/librarian/pages/reports"
import { PopularBooksPage } from "@/modules/librarian/pages/reports/popular"
import { UsageStatsPage } from "@/modules/librarian/pages/reports/usage"
import { MessagesPage as LibrarianMessagesPage } from "@/modules/librarian/pages/messages"
import { NotificationsPage as LibrarianNotificationsPage } from "@/modules/librarian/pages/notifications"

// Hostel Pages
import { RoomsPage } from "@/modules/hostel/pages/rooms"
import { BedAllocationPage } from "@/modules/hostel/pages/bed-allocation"
import { RoomAllocationPage } from "@/modules/hostel/pages/room-allocation"
import { StudentsPage as HostelStudentsPage } from "@/modules/hostel/pages/students"
import { AttendancePage as HostelAttendancePage } from "@/modules/hostel/pages/attendance"
import { VisitorsPage } from "@/modules/hostel/pages/visitors"
import { ComplaintsPage } from "@/modules/hostel/pages/complaints"
import { InventoryPage } from "@/modules/hostel/pages/inventory"
import { FeesPage as HostelFeesPage } from "@/modules/hostel/pages/fees"
import { PaymentsPage as HostelPaymentsPage } from "@/modules/hostel/pages/payments"
import { OccupancyReportPage } from "@/modules/hostel/pages/occupancy-report"
import { FeeReportPage as HostelFeeReportPage } from "@/modules/hostel/pages/fee-report"
import { AttendanceReportPage as HostelAttendanceReportPage } from "@/modules/hostel/pages/attendance-report"
import { MessagesPage as HostelMessagesPage } from "@/modules/hostel/pages/messages"
import { NotificationsPage as HostelNotificationsPage } from "@/modules/hostel/pages/notifications"

// Transport Pages
import { VehiclesPage } from "@/modules/transport/pages/vehicles"
import { DriversPage } from "@/modules/transport/pages/drivers"
import { RoutesPage } from "@/modules/transport/pages/routes"
import { RouteAssignmentPage } from "@/modules/transport/pages/route-assignment"
import { StudentsPage as TransportStudentsPage } from "@/modules/transport/pages/students"
import { AllocationsPage } from "@/modules/transport/pages/allocations"
import { MaintenancePage } from "@/modules/transport/pages/maintenance"
import { FuelLogsPage } from "@/modules/transport/pages/fuel-logs"
import { GPSPage } from "@/modules/transport/pages/gps"
import { FeesPage as TransportFeesPage } from "@/modules/transport/pages/fees"
import { PaymentsPage as TransportPaymentsPage } from "@/modules/transport/pages/payments"
import { RouteReportPage } from "@/modules/transport/pages/route-report"
import { VehicleReportPage } from "@/modules/transport/pages/vehicle-report"
import { FeeReportPage as TransportFeeReportPage } from "@/modules/transport/pages/fee-report"
import { TransportMessagesPage } from "@/modules/transport/pages/messages"
import { TransportNotificationsPage } from "@/modules/transport/pages/notifications"

// Teacher Pages
import { ClassesPage } from "@/modules/teacher/pages/classes"
import { TimetablePage as TeacherTimetablePage } from "@/modules/teacher/pages/timetable"
import { AttendancePage as TeacherAttendancePage } from "@/modules/teacher/pages/attendance"
import { HomeworkPage as TeacherHomeworkPage } from "@/modules/teacher/pages/homework"
import { AssignmentsPage as TeacherAssignmentsPage } from "@/modules/teacher/pages/assignments"
import { ExamsPage } from "@/modules/teacher/pages/exams"
import { MarksEntryPage } from "@/modules/teacher/pages/marks-entry"
import { GradeBookPage as TeacherGradeBookPage } from "@/modules/teacher/pages/grade-book"
import { StudentPerformancePage } from "@/modules/teacher/pages/student-performance"
import { MyStudentsPage } from "@/modules/teacher/pages/my-students"
import { MessagesPage as TeacherMessagesPage } from "@/modules/teacher/pages/messages"
import { LeaveRequestsPage } from "@/modules/teacher/pages/leave-requests"
import { NotificationsPage as TeacherNotificationsPage } from "@/modules/teacher/pages/notifications"
import { ProfilePage as TeacherProfilePage } from "@/modules/teacher/pages/profile"
import { SalaryPage } from "@/modules/teacher/pages/salary"
import { DocumentsPage as TeacherDocumentsPage } from "@/modules/teacher/pages/documents"

// Student Pages
import { TimetablePage as StudentTimetablePage } from "@/modules/student/pages/timetable"
import { AttendancePage as StudentAttendancePage } from "@/modules/student/pages/attendance"
import { HomeworkPage as StudentHomeworkPage } from "@/modules/student/pages/homework"
import { AssignmentsPage as StudentAssignmentsPage } from "@/modules/student/pages/assignments"
import { ExamResultsPage } from "@/modules/student/pages/exam-results"
import { GradeBookPage as StudentGradeBookPage } from "@/modules/student/pages/grade-book"
import { ReportCardsPage as StudentReportCardsPage } from "@/modules/student/pages/report-cards"
import { FeeStatusPage } from "@/modules/student/pages/fee-status"
import { PaymentHistoryPage as StudentPaymentHistoryPage } from "@/modules/student/pages/payment-history"
import { LibraryPage as StudentLibraryPage } from "@/modules/student/pages/library"
import { CertificatesPage as StudentCertificatesPage } from "@/modules/student/pages/certificates"
import { HostelPage as StudentHostelPage } from "@/modules/student/pages/hostel"
import { TransportPage as StudentTransportPage } from "@/modules/student/pages/transport"
import { CalendarPage as StudentCalendar } from "@/modules/student/pages/calendar"
import { MessagesPage as StudentMessagesPage } from "@/modules/student/pages/messages"
import { NotificationsPage as StudentNotificationsPage } from "@/modules/student/pages/notifications"
import { ProfilePage as StudentProfilePage } from "@/modules/student/pages/profile"
import { DocumentsPage as StudentDocumentsPage } from "@/modules/student/pages/documents"

// Parent Pages
import { ChildrenPage } from "@/modules/parent/pages/children"
import { ChildProfilePage } from "@/modules/parent/pages/child-profile"
import { AttendancePage as ParentAttendancePage } from "@/modules/parent/pages/attendance"
import { HomeworkPage as ParentHomeworkPage } from "@/modules/parent/pages/homework"
import { ExamResultsPage as ParentExamResultsPage } from "@/modules/parent/pages/exam-results"
import { ReportCardsPage as ParentReportCardsPage } from "@/modules/parent/pages/report-cards"
import { FeePaymentPage } from "@/modules/parent/pages/fee-payment"
import { PaymentHistoryPage as ParentPaymentHistoryPage } from "@/modules/parent/pages/payment-history"
import { ReceiptsPage as ParentReceiptsPage } from "@/modules/parent/pages/receipts"
import { MessagesPage as ParentMessagesPage } from "@/modules/parent/pages/messages"
import { TeacherCommunicationPage } from "@/modules/parent/pages/teacher-communication"
import { NotificationsPage as ParentNotificationsPage } from "@/modules/parent/pages/notifications"
import { TimetablePage as ParentTimetablePage } from "@/modules/parent/pages/timetable"
import { CalendarPage as ParentCalendarPage } from "@/modules/parent/pages/calendar"
import { CertificatesPage as ParentCertificatesPage } from "@/modules/parent/pages/certificates"
import { ProfilePage as ParentProfilePage } from "@/modules/parent/pages/profile"
import { SettingsPage as ParentSettingsPage } from "@/modules/parent/pages/settings"

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
})

const ROLE_LAYOUTS: Record<UserRole, React.ComponentType> = {
  super_admin: SuperAdminLayout,
  school_admin: SchoolAdminLayout,
  principal: PrincipalLayout,
  accountant: AccountantLayout,
  librarian: LibrarianLayout,
  hostel_warden: HostelWardenLayout,
  transport_manager: TransportManagerLayout,
  teacher: TeacherLayout,
  student: StudentLayout,
  parent: ParentLayout,
}

const ROLE_DASHBOARDS: Record<UserRole, React.ComponentType> = {
  super_admin: SuperAdminDashboard,
  school_admin: SchoolAdminDashboard,
  principal: PrincipalDashboard,
  accountant: AccountantDashboard,
  librarian: LibrarianDashboard,
  hostel_warden: HostelWardenDashboard,
  transport_manager: TransportManagerDashboard,
  teacher: TeacherDashboard,
  student: StudentDashboard,
  parent: ParentDashboard,
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function ProtectedRoute({ allowedRoles }: { allowedRoles?: UserRole[] }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  if (isLoading) return <LoadingScreen />
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />
  const role = user.role as UserRole
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROLE_ROUTE_PREFIX[role] + "/dashboard"} replace />
  }
  const Layout = ROLE_LAYOUTS[role]
  return <Layout />
}

function LoginRedirect() {
  const { isAuthenticated, isLoading, user } = useAuth()
  if (isLoading) return <LoadingScreen />
  if (isAuthenticated && user) {
    return <Navigate to={ROLE_ROUTE_PREFIX[user.role as UserRole] + "/dashboard"} replace />
  }
  return <LoginPage />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginRedirect />} />
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Super Admin */}
              <Route path="/super-admin" element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="settings" element={<PlatformSettingsPage />} />
                <Route path="system-logs" element={<SystemLogsPage />} />
                <Route path="audit-logs" element={<AuditLogsPage />} />
                <Route path="backup" element={<BackupPage />} />
                <Route path="schools" element={<SchoolManagementPage />} />
                <Route path="school-usage" element={<SchoolUsagePage />} />
                <Route path="billing/plans" element={<SubscriptionPlansPage />} />
                <Route path="billing/history" element={<PaymentHistoryPage />} />
                <Route path="billing/analytics" element={<RevenueAnalyticsPage />} />
                <Route path="users" element={<UserManagementPage />} />
                <Route path="api-keys" element={<ApiKeysPage />} />
                <Route path="notifications" element={<AdminNotificationsPage />} />
                <Route path="support" element={<SupportTicketsPage />} />
                <Route path="support/new" element={<SupportTicketFormPage />} />
                <Route path="support/:ticketId" element={<SupportTicketViewPage />} />
                <Route path="support/:ticketId/edit" element={<SupportTicketFormPage />} />
                <Route path="profile" element={<SuperAdminProfilePage />} />
              </Route>

              {/* School Admin */}
              <Route path="/school-admin" element={<ProtectedRoute allowedRoles={["school_admin"]} />}>
                <Route path="dashboard" element={<SchoolAdminDashboard />} />
                <Route path="profile" element={<SchoolProfilePage />} />
                <Route path="students" element={<SchoolStudentsPage />} />
                <Route path="parents" element={<ParentsPage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="employees" element={<EmployeesPage />} />
                <Route path="academics" element={<AcademicsPage />} />
                <Route path="attendance" element={<SchoolAttendancePage />} />
                <Route path="examinations" element={<ExaminationsPage />} />
                <Route path="homework" element={<SchoolHomeworkPage />} />
                <Route path="finance" element={<FinancePage />} />
                <Route path="accounting" element={<AccountingPage />} />
                <Route path="library" element={<SchoolLibraryPage />} />
                <Route path="transport" element={<SchoolTransportPage />} />
                <Route path="hostel" element={<SchoolHostelPage />} />
                <Route path="messages" element={<SchoolMessagesPage />} />
                <Route path="certificates" element={<SchoolCertificatesPage />} />
                <Route path="notifications" element={<SchoolNotificationsPage />} />
                <Route path="reports" element={<SchoolReportsPage />} />
                <Route path="settings" element={<SchoolSettingsPage />} />
              </Route>

              {/* Principal */}
              <Route path="/principal" element={<ProtectedRoute allowedRoles={["principal"]} />}>
                <Route path="dashboard" element={<PrincipalDashboard />} />
                <Route path="teacher-performance" element={<TeacherPerformance />} />
                <Route path="student-performance" element={<StudentPerformance />} />
                <Route path="school-performance" element={<SchoolPerformance />} />
                <Route path="attendance" element={<PrincipalAttendance />} />
                <Route path="academic-reports" element={<AcademicReports />} />
                <Route path="exam-reports" element={<ExamReports />} />
                <Route path="fee-summary" element={<FeeSummary />} />
                <Route path="budget" element={<Budget />} />
                <Route path="approvals" element={<Approvals />} />
                <Route path="calendar" element={<PrincipalCalendar />} />
                <Route path="discipline" element={<Discipline />} />
                <Route path="messages" element={<PrincipalMessages />} />
                <Route path="notifications" element={<PrincipalNotifications />} />
              </Route>

              {/* Accountant */}
              <Route path="/accountant" element={<ProtectedRoute allowedRoles={["accountant"]} />}>
                <Route path="dashboard" element={<AccountantDashboard />} />
                <Route path="fee-collection" element={<FeeCollectionPage />} />
                <Route path="student-billing" element={<StudentBillingPage />} />
                <Route path="scholarships" element={<ScholarshipsPage />} />
                <Route path="discounts" element={<DiscountsPage />} />
                <Route path="income-sources" element={<IncomeSourcesPage />} />
                <Route path="online-payments" element={<OnlinePaymentsPage />} />
                <Route path="expenses" element={<ExpensesPage />} />
                <Route path="payroll" element={<PayrollPage />} />
                <Route path="financial-reports" element={<FinancialReportsPage />} />
                <Route path="outstanding-dues" element={<OutstandingDuesPage />} />
                <Route path="monthly-summary" element={<MonthlySummaryPage />} />
                <Route path="invoices" element={<InvoicesPage />} />
                <Route path="receipts" element={<AccountantReceiptsPage />} />
                <Route path="messages" element={<AccountantMessagesPage />} />
                <Route path="notifications" element={<AccountantNotificationsPage />} />
              </Route>

              {/* Librarian */}
              <Route path="/librarian" element={<ProtectedRoute allowedRoles={["librarian"]} />}>
                <Route path="dashboard" element={<LibrarianDashboard />} />
                <Route path="books" element={<BooksPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="authors" element={<AuthorsPage />} />
                <Route path="publishers" element={<PublishersPage />} />
                <Route path="issue" element={<IssuePage />} />
                <Route path="return" element={<ReturnPage />} />
                <Route path="overdue" element={<OverduePage />} />
                <Route path="members" element={<MembersPage />} />
                <Route path="fines" element={<FinesPage />} />
                <Route path="barcode" element={<BarcodePage />} />
                <Route path="qr" element={<QRCodePage />} />
                <Route path="id-cards/student" element={<StudentIDCardsPage />} />
                <Route path="id-cards/teacher" element={<TeacherIDCardsPage />} />
                <Route path="id-cards/staff" element={<StaffIDCardsPage />} />
                <Route path="reports" element={<LibrarianReportsPage />} />
                <Route path="reports/popular" element={<PopularBooksPage />} />
                <Route path="reports/usage" element={<UsageStatsPage />} />
                <Route path="messages" element={<LibrarianMessagesPage />} />
                <Route path="notifications" element={<LibrarianNotificationsPage />} />
              </Route>

              {/* Hostel Warden */}
              <Route path="/hostel" element={<ProtectedRoute allowedRoles={["hostel_warden"]} />}>
                <Route path="dashboard" element={<HostelWardenDashboard />} />
                <Route path="rooms" element={<RoomsPage />} />
                <Route path="bed-allocation" element={<BedAllocationPage />} />
                <Route path="room-allocation" element={<RoomAllocationPage />} />
                <Route path="students" element={<HostelStudentsPage />} />
                <Route path="attendance" element={<HostelAttendancePage />} />
                <Route path="visitors" element={<VisitorsPage />} />
                <Route path="complaints" element={<ComplaintsPage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="fees" element={<HostelFeesPage />} />
                <Route path="payments" element={<HostelPaymentsPage />} />
                <Route path="occupancy-report" element={<OccupancyReportPage />} />
                <Route path="fee-report" element={<HostelFeeReportPage />} />
                <Route path="attendance-report" element={<HostelAttendanceReportPage />} />
                <Route path="messages" element={<HostelMessagesPage />} />
                <Route path="notifications" element={<HostelNotificationsPage />} />
              </Route>

              {/* Transport Manager */}
              <Route path="/transport" element={<ProtectedRoute allowedRoles={["transport_manager"]} />}>
                <Route path="dashboard" element={<TransportManagerDashboard />} />
                <Route path="vehicles" element={<VehiclesPage />} />
                <Route path="drivers" element={<DriversPage />} />
                <Route path="routes" element={<RoutesPage />} />
                <Route path="route-assignment" element={<RouteAssignmentPage />} />
                <Route path="students" element={<TransportStudentsPage />} />
                <Route path="allocations" element={<AllocationsPage />} />
                <Route path="maintenance" element={<MaintenancePage />} />
                <Route path="fuel-logs" element={<FuelLogsPage />} />
                <Route path="gps" element={<GPSPage />} />
                <Route path="fees" element={<TransportFeesPage />} />
                <Route path="payments" element={<TransportPaymentsPage />} />
                <Route path="route-report" element={<RouteReportPage />} />
                <Route path="vehicle-report" element={<VehicleReportPage />} />
                <Route path="fee-report" element={<TransportFeeReportPage />} />
                <Route path="messages" element={<TransportMessagesPage />} />
                <Route path="notifications" element={<TransportNotificationsPage />} />
              </Route>

              {/* Teacher */}
              <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]} />}>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="timetable" element={<TeacherTimetablePage />} />
                <Route path="attendance" element={<TeacherAttendancePage />} />
                <Route path="homework" element={<TeacherHomeworkPage />} />
                <Route path="assignments" element={<TeacherAssignmentsPage />} />
                <Route path="exams" element={<ExamsPage />} />
                <Route path="marks-entry" element={<MarksEntryPage />} />
                <Route path="grade-book" element={<TeacherGradeBookPage />} />
                <Route path="student-performance" element={<StudentPerformancePage />} />
                <Route path="my-students" element={<MyStudentsPage />} />
                <Route path="messages" element={<TeacherMessagesPage />} />
                <Route path="leave-requests" element={<LeaveRequestsPage />} />
                <Route path="notifications" element={<TeacherNotificationsPage />} />
                <Route path="profile" element={<TeacherProfilePage />} />
                <Route path="salary" element={<SalaryPage />} />
                <Route path="documents" element={<TeacherDocumentsPage />} />
              </Route>

              {/* Student */}
              <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]} />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="timetable" element={<StudentTimetablePage />} />
                <Route path="attendance" element={<StudentAttendancePage />} />
                <Route path="homework" element={<StudentHomeworkPage />} />
                <Route path="assignments" element={<StudentAssignmentsPage />} />
                <Route path="exam-results" element={<ExamResultsPage />} />
                <Route path="grade-book" element={<StudentGradeBookPage />} />
                <Route path="report-cards" element={<StudentReportCardsPage />} />
                <Route path="fee-status" element={<FeeStatusPage />} />
                <Route path="payment-history" element={<StudentPaymentHistoryPage />} />
                <Route path="library" element={<StudentLibraryPage />} />
                <Route path="certificates" element={<StudentCertificatesPage />} />
                <Route path="hostel" element={<StudentHostelPage />} />
                <Route path="transport" element={<StudentTransportPage />} />
                <Route path="calendar" element={<StudentCalendar />} />
                <Route path="messages" element={<StudentMessagesPage />} />
                <Route path="notifications" element={<StudentNotificationsPage />} />
                <Route path="profile" element={<StudentProfilePage />} />
                <Route path="documents" element={<StudentDocumentsPage />} />
              </Route>

              {/* Parent */}
              <Route path="/parent" element={<ProtectedRoute allowedRoles={["parent"]} />}>
                <Route path="dashboard" element={<ParentDashboard />} />
                <Route path="children" element={<ChildrenPage />} />
                <Route path="child-profile" element={<ChildProfilePage />} />
                <Route path="attendance" element={<ParentAttendancePage />} />
                <Route path="homework" element={<ParentHomeworkPage />} />
                <Route path="exam-results" element={<ParentExamResultsPage />} />
                <Route path="report-cards" element={<ParentReportCardsPage />} />
                <Route path="fee-payment" element={<FeePaymentPage />} />
                <Route path="payment-history" element={<ParentPaymentHistoryPage />} />
                <Route path="receipts" element={<ParentReceiptsPage />} />
                <Route path="messages" element={<ParentMessagesPage />} />
                <Route path="teacher-communication" element={<TeacherCommunicationPage />} />
                <Route path="notifications" element={<ParentNotificationsPage />} />
                <Route path="timetable" element={<ParentTimetablePage />} />
                <Route path="calendar" element={<ParentCalendarPage />} />
                <Route path="certificates" element={<ParentCertificatesPage />} />
                <Route path="profile" element={<ParentProfilePage />} />
                <Route path="settings" element={<ParentSettingsPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  )
}

export default App
