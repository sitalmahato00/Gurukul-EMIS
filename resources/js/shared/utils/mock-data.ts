import type { Student, Teacher, School, Fee, Exam, Book, Vehicle, HostelRoom, Transaction } from "@/shared/types"

export const schools: School[] = [
  { id: "sch-1", name: "Gurukul International School", address: "123 Education Lane, Knowledge City", phone: "+91 98765 43210", email: "admin@gurukul.edu", establishedYear: 2005, totalStudents: 1248, totalTeachers: 64, subscription: "Professional", status: "active" },
  { id: "sch-2", name: "Vidya Academy", address: "456 Learning Road, Study Town", phone: "+91 98765 43211", email: "admin@vidya.edu", establishedYear: 2010, totalStudents: 850, totalTeachers: 42, subscription: "Enterprise", status: "active" },
  { id: "sch-3", name: "Knowledge Hub School", address: "789 Wisdom Ave, Scholar City", phone: "+91 98765 43212", email: "admin@knowledge.edu", establishedYear: 2015, totalStudents: 620, totalTeachers: 28, subscription: "Starter", status: "active" },
  { id: "sch-4", name: "Sunrise Public School", address: "321 Dawn Street, Morning Town", phone: "+91 98765 43213", email: "admin@sunrise.edu", establishedYear: 2008, totalStudents: 1100, totalTeachers: 55, subscription: "Professional", status: "suspended" },
  { id: "sch-5", name: "Prestige International", address: "654 Elite Road, Premium City", phone: "+91 98765 43214", email: "admin@prestige.edu", establishedYear: 2012, totalStudents: 980, totalTeachers: 48, subscription: "Enterprise", status: "active" },
]

export const students: Student[] = [
  { id: "1", admissionNumber: "ADM-2024-001", firstName: "Aarav", lastName: "Sharma", email: "aarav@school.com", phone: "9876543210", dateOfBirth: "2010-05-15", gender: "male", class: "10", section: "A", rollNumber: 1, admissionDate: "2024-04-01", status: "active", feesPaid: 45000, feesTotal: 60000, parentName: "Rajesh Sharma", bloodGroup: "B+" },
  { id: "2", admissionNumber: "ADM-2024-002", firstName: "Priya", lastName: "Patel", email: "priya@school.com", phone: "9876543211", dateOfBirth: "2010-08-22", gender: "female", class: "10", section: "A", rollNumber: 2, admissionDate: "2024-04-01", status: "active", feesPaid: 60000, feesTotal: 60000, parentName: "Sanjay Patel", bloodGroup: "O+" },
  { id: "3", admissionNumber: "ADM-2024-003", firstName: "Rohan", lastName: "Gupta", email: "rohan@school.com", phone: "9876543212", dateOfBirth: "2011-01-10", gender: "male", class: "9", section: "B", rollNumber: 5, admissionDate: "2024-04-01", status: "active", feesPaid: 30000, feesTotal: 55000, parentName: "Amit Gupta", bloodGroup: "A+" },
  { id: "4", admissionNumber: "ADM-2024-004", firstName: "Ananya", lastName: "Singh", email: "ananya@school.com", phone: "9876543213", dateOfBirth: "2009-11-30", gender: "female", class: "11", section: "A", rollNumber: 3, admissionDate: "2024-04-01", status: "active", feesPaid: 52000, feesTotal: 65000, parentName: "Vikram Singh", bloodGroup: "AB+" },
  { id: "5", admissionNumber: "ADM-2024-005", firstName: "Kiran", lastName: "Desai", email: "kiran@school.com", phone: "9876543214", dateOfBirth: "2010-03-18", gender: "female", class: "10", section: "B", rollNumber: 8, admissionDate: "2024-04-01", status: "active", feesPaid: 60000, feesTotal: 60000, parentName: "Manoj Desai", bloodGroup: "B-" },
  { id: "6", admissionNumber: "ADM-2024-006", firstName: "Arjun", lastName: "Mehta", email: "arjun@school.com", phone: "9876543215", dateOfBirth: "2011-07-05", gender: "male", class: "9", section: "A", rollNumber: 12, admissionDate: "2024-04-01", status: "active", feesPaid: 25000, feesTotal: 55000, parentName: "Suresh Mehta", bloodGroup: "O-" },
  { id: "7", admissionNumber: "ADM-2024-007", firstName: "Nisha", lastName: "Joshi", email: "nisha@school.com", phone: "9876543216", dateOfBirth: "2010-09-12", gender: "female", class: "10", section: "A", rollNumber: 15, admissionDate: "2024-04-01", status: "active", feesPaid: 60000, feesTotal: 60000, parentName: "Deepak Joshi", bloodGroup: "A-" },
  { id: "8", admissionNumber: "ADM-2024-008", firstName: "Vivek", lastName: "Rao", email: "vivek@school.com", phone: "9876543217", dateOfBirth: "2009-12-25", gender: "male", class: "11", section: "B", rollNumber: 7, admissionDate: "2024-04-01", status: "active", feesPaid: 40000, feesTotal: 65000, parentName: "Prakash Rao", bloodGroup: "B+" },
]

export const teachers: Teacher[] = [
  { id: "1", employeeId: "EMP-001", firstName: "Sunita", lastName: "Sharma", email: "sunita@school.com", phone: "9876543300", qualification: "M.Sc Mathematics", experience: 12, department: "Mathematics", subjects: ["Mathematics", "Statistics"], classes: ["10-A", "10-B"], joiningDate: "2012-06-15", status: "active", salary: 55000 },
  { id: "2", employeeId: "EMP-002", firstName: "Rahul", lastName: "Verma", email: "rahul@school.com", phone: "9876543301", qualification: "M.A English", experience: 8, department: "English", subjects: ["English", "Literature"], classes: ["9-A", "9-B"], joiningDate: "2016-04-01", status: "active", salary: 48000 },
  { id: "3", employeeId: "EMP-003", firstName: "Meena", lastName: "Iyer", email: "meena@school.com", phone: "9876543302", qualification: "M.Sc Physics", experience: 15, department: "Science", subjects: ["Physics"], classes: ["11-A", "11-B"], joiningDate: "2009-07-01", status: "active", salary: 62000 },
  { id: "4", employeeId: "EMP-004", firstName: "Vikash", lastName: "Kumar", email: "vikash@school.com", phone: "9876543303", qualification: "B.Ed, M.A Hindi", experience: 6, department: "Languages", subjects: ["Hindi", "Sanskrit"], classes: ["9-A", "10-A"], joiningDate: "2018-04-01", status: "active", salary: 42000 },
  { id: "5", employeeId: "EMP-005", firstName: "Anjali", lastName: "Desai", email: "anjali@school.com", phone: "9876543304", qualification: "M.Sc Chemistry", experience: 10, department: "Science", subjects: ["Chemistry"], classes: ["10-A", "10-B"], joiningDate: "2014-06-01", status: "active", salary: 52000 },
  { id: "6", employeeId: "EMP-006", firstName: "Suresh", lastName: "Pandey", email: "suresh@school.com", phone: "9876543305", qualification: "M.A History", experience: 20, department: "Social Studies", subjects: ["History", "Civics"], classes: ["9-A", "10-A"], joiningDate: "2004-01-15", status: "active", salary: 68000 },
]

export const fees: Fee[] = [
  { id: "1", studentId: "1", studentName: "Aarav Sharma", admissionNumber: "ADM-2024-001", class: "10-A", feeType: "Tuition Fee", amount: 15000, paidAmount: 15000, dueDate: "2024-04-15", status: "paid" },
  { id: "2", studentId: "3", studentName: "Rohan Gupta", admissionNumber: "ADM-2024-003", class: "9-B", feeType: "Tuition Fee", amount: 12000, paidAmount: 8000, dueDate: "2024-04-15", status: "partial" },
  { id: "3", studentId: "6", studentName: "Arjun Mehta", admissionNumber: "ADM-2024-006", class: "9-A", feeType: "Tuition Fee", amount: 12000, paidAmount: 0, dueDate: "2024-04-15", status: "pending" },
  { id: "4", studentId: "8", studentName: "Vivek Rao", admissionNumber: "ADM-2024-008", class: "11-B", feeType: "Tuition Fee", amount: 18000, paidAmount: 10000, dueDate: "2024-03-30", status: "overdue" },
]

export const exams: Exam[] = [
  { id: "1", name: "Mid-Term Examination", type: "mid_term", class: "10", section: "A", startDate: "2024-09-15", endDate: "2024-09-25", status: "upcoming", totalMarks: 500, passingMarks: 175 },
  { id: "2", name: "Unit Test - 1", type: "unit_test", class: "9", section: "B", startDate: "2024-08-10", endDate: "2024-08-12", status: "completed", totalMarks: 100, passingMarks: 35 },
  { id: "3", name: "Quarterly Examination", type: "quarterly", class: "11", section: "A", startDate: "2024-09-20", endDate: "2024-09-30", status: "upcoming", totalMarks: 400, passingMarks: 140 },
]

export const books: Book[] = [
  { id: "1", isbn: "978-81-203-4567-8", title: "NCERT Mathematics Class 10", author: "R.D. Sharma", category: "Mathematics", totalCopies: 50, availableCopies: 42, status: "available" },
  { id: "2", isbn: "978-81-203-4568-5", title: "NCERT Science Class 10", author: "Lakhmir Singh", category: "Science", totalCopies: 45, availableCopies: 38, status: "available" },
  { id: "3", isbn: "978-81-203-4569-2", title: "NCERT English Class 10", author: "Beehive", category: "English", totalCopies: 40, availableCopies: 35, status: "available" },
  { id: "4", isbn: "978-81-203-4570-8", title: "HC Verma Physics", author: "H.C. Verma", category: "Physics", totalCopies: 20, availableCopies: 15, status: "available" },
  { id: "5", isbn: "978-81-203-4571-5", title: "Oswaal Chemistry", author: "Oswaal", category: "Chemistry", totalCopies: 30, availableCopies: 22, status: "available" },
]

export const vehicles: Vehicle[] = [
  { id: "1", number: "MH-12-AB-1234", type: "Bus", capacity: 40, driver: "Ram Kumar", route: "Route A - Downtown", status: "active" },
  { id: "2", number: "MH-12-CD-5678", type: "Bus", capacity: 35, driver: "Shyam Singh", route: "Route B - Suburbs", status: "active" },
  { id: "3", number: "MH-12-EF-9012", type: "Van", capacity: 12, driver: "Gopal Verma", route: "Route C - City Center", status: "maintenance" },
  { id: "4", number: "MH-12-GH-3456", type: "Bus", capacity: 45, driver: "Mohan Das", route: "Route D - Highway", status: "active" },
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
  { id: "1", type: "income", category: "Fee Collection", description: "Tuition Fee - Class 10", amount: 15000, date: "2024-04-10", paymentMethod: "Online" },
  { id: "2", type: "income", category: "Fee Collection", description: "Lab Fee - Class 11", amount: 5000, date: "2024-04-09", paymentMethod: "Cash" },
  { id: "3", type: "expense", category: "Salary", description: "Teacher Salary - March", amount: 327000, date: "2024-04-01", paymentMethod: "Bank Transfer" },
  { id: "4", type: "expense", category: "Utilities", description: "Electricity Bill", amount: 18000, date: "2024-04-05", paymentMethod: "Online" },
  { id: "5", type: "income", category: "Fee Collection", description: "Transport Fee", amount: 8000, date: "2024-04-08", paymentMethod: "Online" },
  { id: "6", type: "expense", category: "Maintenance", description: "Building Repair", amount: 25000, date: "2024-04-07", paymentMethod: "Cash" },
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

export const revenueData = [
  { month: "Jan", revenue: 520000, expense: 380000 },
  { month: "Feb", revenue: 490000, expense: 365000 },
  { month: "Mar", revenue: 580000, expense: 410000 },
  { month: "Apr", revenue: 550000, expense: 395000 },
  { month: "May", revenue: 510000, expense: 370000 },
  { month: "Jun", revenue: 600000, expense: 420000 },
]

export const platformRevenue = [
  { month: "Jan", revenue: 12500, schools: 42 },
  { month: "Feb", revenue: 13200, schools: 44 },
  { month: "Mar", revenue: 14800, schools: 48 },
  { month: "Apr", revenue: 15500, schools: 50 },
  { month: "May", revenue: 16200, schools: 52 },
  { month: "Jun", revenue: 18000, schools: 56 },
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
