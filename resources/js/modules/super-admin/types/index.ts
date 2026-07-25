export type UserRole =
  | "super_admin"
  | "school_admin"
  | "principal"
  | "accountant"
  | "librarian"
  | "hostel_warden"
  | "transport_manager"
  | "teacher"
  | "student"
  | "parent"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  schoolId?: string
  schoolName?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  getUser: () => User | null
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  school_admin: "School Admin",
  principal: "Principal",
  accountant: "Accountant",
  librarian: "Librarian",
  hostel_warden: "Hostel Warden",
  transport_manager: "Transport Manager",
  teacher: "Teacher",
  student: "Student",
  parent: "Parent",
}

export const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: "from-violet-500 to-purple-600",
  school_admin: "from-emerald-500 to-teal-600",
  principal: "from-blue-500 to-indigo-600",
  accountant: "from-amber-500 to-orange-600",
  librarian: "from-pink-500 to-rose-600",
  hostel_warden: "from-cyan-500 to-blue-600",
  transport_manager: "from-yellow-500 to-amber-600",
  teacher: "from-indigo-500 to-blue-600",
  student: "from-green-500 to-emerald-600",
  parent: "from-purple-500 to-pink-600",
}

export const ROLE_ROUTE_PREFIX: Record<UserRole, string> = {
  super_admin: "/super-admin",
  school_admin: "/school-admin",
  principal: "/principal",
  accountant: "/accountant",
  librarian: "/librarian",
  hostel_warden: "/hostel",
  transport_manager: "/transport",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
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
  status: "active" | "inactive"
  avatar?: string
  feesPaid: number
  feesTotal: number
  parentName?: string
  parentId?: string
  bloodGroup?: string
  admissionDate: string
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
}

export interface School {
  id: string
  name: string
  logo?: string
  address: string
  phone: string
  email: string
  establishedYear: number
  totalStudents: number
  totalTeachers: number
  subscription: string
  status: "active" | "inactive" | "suspended"
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
}

export interface Exam {
  id: string
  name: string
  type: string
  class: string
  section: string
  startDate: string
  endDate: string
  status: "upcoming" | "ongoing" | "completed"
  totalMarks: number
  passingMarks: number
}

export interface Book {
  id: string
  isbn: string
  title: string
  author: string
  category: string
  totalCopies: number
  availableCopies: number
  status: "available" | "issued"
}

export interface Vehicle {
  id: string
  number: string
  type: string
  capacity: number
  driver: string
  route: string
  status: "active" | "maintenance"
}

export interface HostelRoom {
  id: string
  roomNumber: string
  floor: number
  type: string
  capacity: number
  occupied: number
  fee: number
  status: "available" | "occupied" | "maintenance"
}

export interface Transaction {
  id: string
  type: "income" | "expense"
  category: string
  description: string
  amount: number
  date: string
  paymentMethod: string
}

export interface Attendance {
  id: string
  studentId: string
  studentName: string
  date: string
  status: "present" | "absent" | "late" | "half_day"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

export interface DashboardStats {
  [key: string]: number | string
}
