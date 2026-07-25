export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  schoolId?: string
  schoolName?: string
}

export type UserRole =
  | "super_admin"
  | "school_admin"
  | "principal"
  | "teacher"
  | "student"
  | "parent"
  | "accountant"
  | "librarian"
  | "hostel_warden"
  | "transport_manager"

export interface School {
  id: string
  name: string
  logo?: string
  address: string
  phone: string
  email: string
  website?: string
  establishedYear: number
  subscription: SubscriptionPlan
}

export interface Student {
  id: string
  admissionNumber: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  class: string
  section: string
  rollNumber: number
  admissionDate: string
  status: "active" | "inactive" | "graduated" | "transferred"
  avatar?: string
  address?: string
  bloodGroup?: string
  emergencyContact?: string
  parentId?: string
  parentName?: string
  feesPaid: number
  feesTotal: number
}

export interface Teacher {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  qualification: string
  experience: number
  department: string
  subjects: string[]
  classes: string[]
  joiningDate: string
  status: "active" | "inactive" | "on_leave"
  salary: number
  avatar?: string
}

export interface Parent {
  id: string
  name: string
  email: string
  phone: string
  relationship: string
  occupation?: string
  children: Student[]
}

export interface Attendance {
  id: string
  studentId: string
  studentName: string
  date: string
  status: "present" | "absent" | "late" | "half_day" | "excused"
  checkIn?: string
  checkOut?: string
  remarks?: string
}

export interface Exam {
  id: string
  name: string
  type: "mid_term" | "final" | "unit_test" | "quarterly"
  class: string
  section: string
  startDate: string
  endDate: string
  status: "upcoming" | "ongoing" | "completed"
  totalMarks: number
  passingMarks: number
}

export interface Fee {
  id: string
  studentId: string
  studentName: string
  admissionNumber: string
  class: string
  feeType: string
  amount: number
  paidAmount: number
  dueDate: string
  status: "paid" | "partial" | "pending" | "overdue"
  lastPaymentDate?: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  studentId: string
  studentName: string
  amount: number
  paidAmount: number
  dueDate: string
  issuedDate: string
  status: "paid" | "pending" | "overdue" | "cancelled"
  items: InvoiceItem[]
}

export interface InvoiceItem {
  description: string
  amount: number
}

export interface Transaction {
  id: string
  type: "income" | "expense"
  category: string
  description: string
  amount: number
  date: string
  paymentMethod: string
  reference?: string
}

export interface Book {
  id: string
  isbn: string
  title: string
  author: string
  category: string
  publisher: string
  publishYear: number
  totalCopies: number
  availableCopies: number
  shelf: string
  status: "available" | "issued" | "reserved" | "damaged"
}

export interface Vehicle {
  id: string
  number: string
  type: string
  capacity: number
  driver: string
  driverPhone: string
  route: string
  status: "active" | "maintenance" | "inactive"
}

export interface HostelRoom {
  id: string
  roomNumber: string
  floor: number
  type: "single" | "double" | "triple" | "shared"
  capacity: number
  occupied: number
  fee: number
  status: "available" | "occupied" | "maintenance"
}

export interface Certificate {
  id: string
  type: string
  studentId?: string
  studentName?: string
  issuedDate: string
  verified: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  billing: "monthly" | "yearly"
  features: string[]
  studentLimit: number
  teacherLimit: number
  storage: string
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalParents: number
  totalClasses: number
  todayAttendance: number
  todayRevenue: number
  pendingFees: number
  activeStaff: number
}

export interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

export interface Activity {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
  icon: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  type: "exam" | "holiday" | "meeting" | "event"
  color: string
}
