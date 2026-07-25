import type { Student, Teacher, DashboardStats, Fee, Exam, Book, Vehicle, HostelRoom, Transaction, Activity, Notification } from "@/types"

export const dashboardStats: DashboardStats = {
  totalStudents: 1248,
  totalTeachers: 64,
  totalParents: 980,
  totalClasses: 24,
  todayAttendance: 92,
  todayRevenue: 45200,
  pendingFees: 234000,
  activeStaff: 89,
}

export const students: Student[] = [
  { id: "1", admissionNumber: "ADM-2024-001", firstName: "Aarav", lastName: "Sharma", email: "aarav@school.com", phone: "9876543210", dateOfBirth: "2010-05-15", gender: "male", class: "10", section: "A", rollNumber: 1, admissionDate: "2024-04-01", status: "active", feesPaid: 45000, feesTotal: 60000, parentName: "Rajesh Sharma", bloodGroup: "B+", avatar: "" },
  { id: "2", admissionNumber: "ADM-2024-002", firstName: "Priya", lastName: "Patel", email: "priya@school.com", phone: "9876543211", dateOfBirth: "2010-08-22", gender: "female", class: "10", section: "A", rollNumber: 2, admissionDate: "2024-04-01", status: "active", feesPaid: 60000, feesTotal: 60000, parentName: "Sanjay Patel", bloodGroup: "O+" },
  { id: "3", admissionNumber: "ADM-2024-003", firstName: "Rohan", lastName: "Gupta", email: "rohan@school.com", phone: "9876543212", dateOfBirth: "2011-01-10", gender: "male", class: "9", section: "B", rollNumber: 5, admissionDate: "2024-04-01", status: "active", feesPaid: 30000, feesTotal: 55000, parentName: "Amit Gupta", bloodGroup: "A+" },
  { id: "4", admissionNumber: "ADM-2024-004", firstName: "Ananya", lastName: "Singh", email: "ananya@school.com", phone: "9876543213", dateOfBirth: "2009-11-30", gender: "female", class: "11", section: "A", rollNumber: 3, admissionDate: "2024-04-01", status: "active", feesPaid: 52000, feesTotal: 65000, parentName: "Vikram Singh", bloodGroup: "AB+" },
  { id: "5", admissionNumber: "ADM-2024-005", firstName: "Kiran", lastName: "Desai", email: "kiran@school.com", phone: "9876543214", dateOfBirth: "2010-03-18", gender: "female", class: "10", section: "B", rollNumber: 8, admissionDate: "2024-04-01", status: "active", feesPaid: 60000, feesTotal: 60000, parentName: "Manoj Desai", bloodGroup: "B-" },
  { id: "6", admissionNumber: "ADM-2024-006", firstName: "Arjun", lastName: "Mehta", email: "arjun@school.com", phone: "9876543215", dateOfBirth: "2011-07-05", gender: "male", class: "9", section: "A", rollNumber: 12, admissionDate: "2024-04-01", status: "active", feesPaid: 25000, feesTotal: 55000, parentName: "Suresh Mehta", bloodGroup: "O-" },
  { id: "7", admissionNumber: "ADM-2024-007", firstName: "Nisha", lastName: "Joshi", email: "nisha@school.com", phone: "9876543216", dateOfBirth: "2010-09-12", gender: "female", class: "10", section: "A", rollNumber: 15, admissionDate: "2024-04-01", status: "active", feesPaid: 60000, feesTotal: 60000, parentName: "Deepak Joshi", bloodGroup: "A-" },
  { id: "8", admissionNumber: "ADM-2024-008", firstName: "Vivek", lastName: "Rao", email: "vivek@school.com", phone: "9876543217", dateOfBirth: "2009-12-25", gender: "male", class: "11", section: "B", rollNumber: 7, admissionDate: "2024-04-01", status: "active", feesPaid: 40000, feesTotal: 65000, parentName: "Prakash Rao", bloodGroup: "B+" },
  { id: "9", admissionNumber: "ADM-2024-009", firstName: "Sneha", lastName: "Kulkarni", email: "sneha@school.com", phone: "9876543218", dateOfBirth: "2010-06-08", gender: "female", class: "10", section: "B", rollNumber: 20, admissionDate: "2024-04-01", status: "active", feesPaid: 55000, feesTotal: 60000, parentName: "Ashok Kulkarni", bloodGroup: "O+" },
  { id: "10", admissionNumber: "ADM-2024-010", firstName: "Aditya", lastName: "Bhatt", email: "aditya@school.com", phone: "9876543219", dateOfBirth: "2011-02-14", gender: "male", class: "9", section: "A", rollNumber: 25, admissionDate: "2024-04-01", status: "active", feesPaid: 35000, feesTotal: 55000, parentName: "Nitin Bhatt", bloodGroup: "AB-" },
  { id: "11", admissionNumber: "ADM-2024-011", firstName: "Pooja", lastName: "Verma", email: "pooja@school.com", phone: "9876543220", dateOfBirth: "2010-04-20", gender: "female", class: "10", section: "A", rollNumber: 30, admissionDate: "2024-04-01", status: "active", feesPaid: 60000, feesTotal: 60000, parentName: "Rakesh Verma", bloodGroup: "A+" },
  { id: "12", admissionNumber: "ADM-2024-012", firstName: "Karan", lastName: "Tiwari", email: "karan@school.com", phone: "9876543221", dateOfBirth: "2009-08-03", gender: "male", class: "11", section: "A", rollNumber: 10, admissionDate: "2024-04-01", status: "active", feesPaid: 48000, feesTotal: 65000, parentName: "Anil Tiwari", bloodGroup: "B+" },
]

export const teachers: Teacher[] = [
  { id: "1", employeeId: "EMP-001", firstName: "Sunita", lastName: "Sharma", email: "sunita@school.com", phone: "9876543300", qualification: "M.Sc Mathematics", experience: 12, department: "Mathematics", subjects: ["Mathematics", "Statistics"], classes: ["10-A", "10-B", "11-A"], joiningDate: "2012-06-15", status: "active", salary: 55000 },
  { id: "2", employeeId: "EMP-002", firstName: "Rahul", lastName: "Verma", email: "rahul@school.com", phone: "9876543301", qualification: "M.A English", experience: 8, department: "English", subjects: ["English", "Literature"], classes: ["9-A", "9-B", "10-A"], joiningDate: "2016-04-01", status: "active", salary: 48000 },
  { id: "3", employeeId: "EMP-003", firstName: "Meena", lastName: "Iyer", email: "meena@school.com", phone: "9876543302", qualification: "M.Sc Physics", experience: 15, department: "Science", subjects: ["Physics"], classes: ["11-A", "11-B", "12-A"], joiningDate: "2009-07-01", status: "active", salary: 62000 },
  { id: "4", employeeId: "EMP-004", firstName: "Vikash", lastName: "Kumar", email: "vikash@school.com", phone: "9876543303", qualification: "B.Ed, M.A Hindi", experience: 6, department: "Languages", subjects: ["Hindi", "Sanskrit"], classes: ["9-A", "10-A", "10-B"], joiningDate: "2018-04-01", status: "active", salary: 42000 },
  { id: "5", employeeId: "EMP-005", firstName: "Anjali", lastName: "Desai", email: "anjali@school.com", phone: "9876543304", qualification: "M.Sc Chemistry", experience: 10, department: "Science", subjects: ["Chemistry"], classes: ["10-A", "10-B", "11-A"], joiningDate: "2014-06-01", status: "active", salary: 52000 },
  { id: "6", employeeId: "EMP-006", firstName: "Suresh", lastName: "Pandey", email: "suresh@school.com", phone: "9876543305", qualification: "M.A History", experience: 20, department: "Social Studies", subjects: ["History", "Civics"], classes: ["9-A", "9-B", "10-A", "10-B"], joiningDate: "2004-01-15", status: "active", salary: 68000 },
]

export const fees: Fee[] = [
  { id: "1", studentId: "1", studentName: "Aarav Sharma", admissionNumber: "ADM-2024-001", class: "10-A", feeType: "Tuition Fee", amount: 15000, paidAmount: 15000, dueDate: "2024-04-15", status: "paid", lastPaymentDate: "2024-04-10" },
  { id: "2", studentId: "3", studentName: "Rohan Gupta", admissionNumber: "ADM-2024-003", class: "9-B", feeType: "Tuition Fee", amount: 12000, paidAmount: 8000, dueDate: "2024-04-15", status: "partial", lastPaymentDate: "2024-04-08" },
  { id: "3", studentId: "6", studentName: "Arjun Mehta", admissionNumber: "ADM-2024-006", class: "9-A", feeType: "Tuition Fee", amount: 12000, paidAmount: 0, dueDate: "2024-04-15", status: "pending" },
  { id: "4", studentId: "8", studentName: "Vivek Rao", admissionNumber: "ADM-2024-008", class: "11-B", feeType: "Tuition Fee", amount: 18000, paidAmount: 10000, dueDate: "2024-03-30", status: "overdue", lastPaymentDate: "2024-03-15" },
  { id: "5", studentId: "10", studentName: "Aditya Bhatt", admissionNumber: "ADM-2024-010", class: "9-A", feeType: "Lab Fee", amount: 5000, paidAmount: 5000, dueDate: "2024-04-15", status: "paid", lastPaymentDate: "2024-04-05" },
]

export const exams: Exam[] = [
  { id: "1", name: "Mid-Term Examination", type: "mid_term", class: "10", section: "A", startDate: "2024-09-15", endDate: "2024-09-25", status: "upcoming", totalMarks: 500, passingMarks: 175 },
  { id: "2", name: "Unit Test - 1", type: "unit_test", class: "9", section: "B", startDate: "2024-08-10", endDate: "2024-08-12", status: "completed", totalMarks: 100, passingMarks: 35 },
  { id: "3", name: "Quarterly Examination", type: "quarterly", class: "11", section: "A", startDate: "2024-09-20", endDate: "2024-09-30", status: "upcoming", totalMarks: 400, passingMarks: 140 },
  { id: "4", name: "Final Examination", type: "final", class: "10", section: "B", startDate: "2024-12-01", endDate: "2024-12-15", status: "upcoming", totalMarks: 600, passingMarks: 210 },
]

export const books: Book[] = [
  { id: "1", isbn: "978-81-203-4567-8", title: "NCERT Mathematics Class 10", author: "R.D. Sharma", category: "Mathematics", publisher: "Pearson", publishYear: 2023, totalCopies: 50, availableCopies: 42, shelf: "A1", status: "available" },
  { id: "2", isbn: "978-81-203-4568-5", title: "NCERT Science Class 10", author: "Lakhmir Singh", category: "Science", publisher: "S. Chand", publishYear: 2023, totalCopies: 45, availableCopies: 38, shelf: "A2", status: "available" },
  { id: "3", isbn: "978-81-203-4569-2", title: "NCERT English Class 10", author: "Beehive", category: "English", publisher: "NCERT", publishYear: 2023, totalCopies: 40, availableCopies: 35, shelf: "B1", status: "available" },
  { id: "4", isbn: "978-81-203-4570-8", title: "NCERT Social Science Class 10", author: "Various", category: "Social Studies", publisher: "NCERT", publishYear: 2023, totalCopies: 35, availableCopies: 30, shelf: "B2", status: "available" },
  { id: "5", isbn: "978-81-203-4571-5", title: "HC Verma Physics", author: "H.C. Verma", category: "Physics", publisher: "Bharti Bhawan", publishYear: 2022, totalCopies: 20, availableCopies: 15, shelf: "C1", status: "available" },
]

export const vehicles: Vehicle[] = [
  { id: "1", number: "MH-12-AB-1234", type: "Bus", capacity: 40, driver: "Ram Kumar", driverPhone: "9876543400", route: "Route A - Downtown", status: "active" },
  { id: "2", number: "MH-12-CD-5678", type: "Bus", capacity: 35, driver: "Shyam Singh", driverPhone: "9876543401", route: "Route B - Suburbs", status: "active" },
  { id: "3", number: "MH-12-EF-9012", type: "Van", capacity: 12, driver: "Gopal Verma", driverPhone: "9876543402", route: "Route C - City Center", status: "maintenance" },
  { id: "4", number: "MH-12-GH-3456", type: "Bus", capacity: 45, driver: "Mohan Das", driverPhone: "9876543403", route: "Route D - Highway", status: "active" },
]

export const hostelRooms: HostelRoom[] = [
  { id: "1", roomNumber: "101", floor: 1, type: "double", capacity: 2, occupied: 2, fee: 5000, status: "occupied" },
  { id: "2", roomNumber: "102", floor: 1, type: "double", capacity: 2, occupied: 1, fee: 5000, status: "available" },
  { id: "3", roomNumber: "103", floor: 1, type: "triple", capacity: 3, occupied: 3, fee: 4000, status: "occupied" },
  { id: "4", roomNumber: "201", floor: 2, type: "single", capacity: 1, occupied: 1, fee: 8000, status: "occupied" },
  { id: "5", roomNumber: "202", floor: 2, type: "double", capacity: 2, occupied: 0, fee: 5000, status: "available" },
  { id: "6", roomNumber: "203", floor: 2, type: "shared", capacity: 4, occupied: 3, fee: 3000, status: "available" },
]

export const transactions: Transaction[] = [
  { id: "1", type: "income", category: "Fee Collection", description: "Tuition Fee - Class 10", amount: 15000, date: "2024-04-10", paymentMethod: "Online", reference: "TXN-001" },
  { id: "2", type: "income", category: "Fee Collection", description: "Lab Fee - Class 11", amount: 5000, date: "2024-04-09", paymentMethod: "Cash", reference: "TXN-002" },
  { id: "3", type: "expense", category: "Salary", description: "Teacher Salary - March", amount: 327000, date: "2024-04-01", paymentMethod: "Bank Transfer", reference: "SAL-001" },
  { id: "4", type: "expense", category: "Utilities", description: "Electricity Bill", amount: 18000, date: "2024-04-05", paymentMethod: "Online", reference: "UTL-001" },
  { id: "5", type: "income", category: "Fee Collection", description: "Transport Fee", amount: 8000, date: "2024-04-08", paymentMethod: "Online", reference: "TXN-003" },
  { id: "6", type: "expense", category: "Maintenance", description: "Building Repair", amount: 25000, date: "2024-04-07", paymentMethod: "Cash", reference: "MNT-001" },
]

export const activities: Activity[] = [
  { id: "1", user: "Admin", action: "Added new student", target: "Aarav Sharma", timestamp: "2 minutes ago", icon: "user-plus" },
  { id: "2", user: "Sunita Sharma", action: "Marked attendance", target: "Class 10-A", timestamp: "15 minutes ago", icon: "check-circle" },
  { id: "3", user: "Accountant", action: "Collected fee", target: "₹15,000 from Priya Patel", timestamp: "1 hour ago", icon: "credit-card" },
  { id: "4", user: "Admin", action: "Generated report", target: "Monthly Attendance Report", timestamp: "2 hours ago", icon: "file-text" },
  { id: "5", user: "Librarian", action: "Issued book", target: "NCERT Mathematics to Rohan", timestamp: "3 hours ago", icon: "book-open" },
  { id: "6", user: "Transport", action: "Updated route", target: "Route B - Suburbs", timestamp: "4 hours ago", icon: "map-pin" },
]

export const notifications: Notification[] = [
  { id: "1", title: "Fee Reminder", message: "15 students have pending fees", type: "warning", read: false, createdAt: "2024-04-10T10:00:00Z" },
  { id: "2", title: "Exam Schedule", message: "Mid-term exams starting next week", type: "info", read: false, createdAt: "2024-04-10T09:00:00Z" },
  { id: "3", title: "New Admission", message: "5 new students admitted today", type: "success", read: true, createdAt: "2024-04-09T16:00:00Z" },
  { id: "4", title: "System Update", message: "Scheduled maintenance on Sunday", type: "info", read: true, createdAt: "2024-04-08T12:00:00Z" },
]

export const attendanceData = [
  { month: "Jan", present: 92, absent: 8 },
  { month: "Feb", present: 89, absent: 11 },
  { month: "Mar", present: 94, absent: 6 },
  { month: "Apr", present: 91, absent: 9 },
  { month: "May", present: 88, absent: 12 },
  { month: "Jun", present: 93, absent: 7 },
]

export const feeCollectionData = [
  { month: "Jan", collected: 450000, pending: 120000 },
  { month: "Feb", collected: 480000, pending: 90000 },
  { month: "Mar", collected: 520000, pending: 85000 },
  { month: "Apr", collected: 510000, pending: 95000 },
  { month: "May", collected: 490000, pending: 110000 },
  { month: "Jun", collected: 530000, pending: 80000 },
]

export const admissionData = [
  { month: "Jan", admissions: 25 },
  { month: "Feb", admissions: 18 },
  { month: "Mar", admissions: 45 },
  { month: "Apr", admissions: 32 },
  { month: "May", admissions: 15 },
  { month: "Jun", admissions: 20 },
]

export const genderDistribution = [
  { name: "Male", value: 680, fill: "#4f46e5" },
  { name: "Female", value: 568, fill: "#ec4899" },
]

export const studentGrowth = [
  { year: "2020", students: 850 },
  { year: "2021", students: 920 },
  { year: "2022", students: 1050 },
  { year: "2023", students: 1180 },
  { year: "2024", students: 1248 },
]
