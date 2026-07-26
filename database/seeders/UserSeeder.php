<?php

namespace Database\Seeders;

use App\Models\{User, Teacher, Student, SchoolParent, Employee, SchoolClass};
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password');
        $schoolId = 1;

        // Create classes (needed for students)
        $classNames = ['1', '2', '3', '4', '5'];
        foreach ($classNames as $i => $name) {
            SchoolClass::firstOrCreate(
                ['school_id' => $schoolId, 'name' => $name],
                ['section' => 'A', 'capacity' => 40, 'is_active' => true]
            );
        }

        // Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gurukul.com',
            'password' => $password,
            'role' => 'super_admin',
            'school_id' => null,
            'phone' => '+91-9000000001',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // School Admin
        User::create([
            'name' => 'School Admin',
            'email' => 'admin@gurukul.com',
            'password' => $password,
            'role' => 'school_admin',
            'school_id' => $schoolId,
            'phone' => '+91-9000000002',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Principal
        User::create([
            'name' => 'Dr. Rajesh Sharma',
            'email' => 'principal@gurukul.com',
            'password' => $password,
            'role' => 'principal',
            'school_id' => $schoolId,
            'phone' => '+91-9000000003',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Accountant
        User::create([
            'name' => 'Priya Mehta',
            'email' => 'accountant@gurukul.com',
            'password' => $password,
            'role' => 'accountant',
            'school_id' => $schoolId,
            'phone' => '+91-9000000004',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Librarian
        User::create([
            'name' => 'Sunita Verma',
            'email' => 'librarian@gurukul.com',
            'password' => $password,
            'role' => 'librarian',
            'school_id' => $schoolId,
            'phone' => '+91-9000000005',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Hostel Warden
        User::create([
            'name' => 'Amit Singh',
            'email' => 'warden@gurukul.com',
            'password' => $password,
            'role' => 'hostel_warden',
            'school_id' => $schoolId,
            'phone' => '+91-9000000006',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Transport Manager
        User::create([
            'name' => 'Ravi Kumar',
            'email' => 'transport@gurukul.com',
            'password' => $password,
            'role' => 'transport_manager',
            'school_id' => $schoolId,
            'phone' => '+91-9000000007',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Teachers (5)
        $teacherData = [
            ['name' => 'Anita Gupta', 'email' => 'teacher@gurukul.com', 'qualification' => 'M.Sc Mathematics', 'specialization' => 'Mathematics', 'experience_years' => 8],
            ['name' => 'Vikram Patel', 'email' => 'vikram@gurukul.com', 'qualification' => 'M.Sc Physics', 'specialization' => 'Science', 'experience_years' => 12],
            ['name' => 'Neha Agarwal', 'email' => 'neha@gurukul.com', 'qualification' => 'M.A English', 'specialization' => 'English', 'experience_years' => 6],
            ['name' => 'Sanjay Mishra', 'email' => 'sanjay@gurukul.com', 'qualification' => 'M.A Hindi', 'specialization' => 'Hindi', 'experience_years' => 10],
            ['name' => 'Pooja Reddy', 'email' => 'pooja@gurukul.com', 'qualification' => 'MCA', 'specialization' => 'Computer Science', 'experience_years' => 5],
        ];

        $teacherUsers = [];
        foreach ($teacherData as $i => $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $password,
                'role' => 'teacher',
                'school_id' => $schoolId,
                'phone' => '+91-91000000' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            Teacher::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'employee_id' => 'TCH' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                'qualification' => $data['qualification'],
                'experience_years' => $data['experience_years'],
                'specialization' => $data['specialization'],
                'joining_date' => now()->subYears(rand(1, 8)),
                'salary' => rand(35000, 65000),
                'department' => 'Academic',
                'is_active' => true,
            ]);

            $teacherUsers[] = $user;
        }

        // Students (20)
        $studentNames = [
            'Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Arjun Patel', 'Sai Reddy',
            'Diya Gupta', 'Ananya Verma', 'Isha Agarwal', 'Priya Singh', 'Nisha Sharma',
            'Rohan Mehta', 'Karan Patel', 'Deepak Kumar', 'Amit Verma', 'Ravi Sharma',
            'Sneha Gupta', 'Pooja Singh', 'Kavita Reddy', 'Meera Patel', 'Riya Agarwal',
        ];

        $studentUsers = [];
        foreach ($studentNames as $i => $name) {
            $parts = explode(' ', $name);
            $email = strtolower($parts[0]) . ($i + 1) . '@gurukul.com';

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'role' => 'student',
                'school_id' => $schoolId,
                'phone' => '+91-92000000' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            $student = Student::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'class_id' => ($i % 5) + 1,
                'admission_number' => 'ADM' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
                'admission_date' => now()->subYears(rand(0, 3)),
                'roll_number' => $i + 1,
                'date_of_birth' => now()->subYears(rand(7, 15))->subDays(rand(0, 364)),
                'gender' => $i < 10 ? 'male' : 'female',
                'blood_group' => ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-'][array_rand(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-'])],
                'address' => '123 Student Colony, Jaipur',
                'city' => 'Jaipur',
                'state' => 'Rajasthan',
                'pincode' => '302001',
                'is_active' => true,
            ]);

            $studentUsers[] = ['user' => $user, 'student' => $student];
        }

        // Parents (10) - each parent has 2 children
        $parentNames = [
            'Ramesh Sharma', 'Suresh Singh', 'Mahesh Kumar', 'Dinesh Patel', 'Ganesh Reddy',
            'Kamla Gupta', 'Suman Verma', 'Geeta Agarwal', 'Savita Mehta', 'Usha Devi',
        ];

        $parentUsers = [];
        foreach ($parentNames as $i => $name) {
            $parts = explode(' ', $name);
            $email = strtolower($parts[0]) . '@gurukul.com';

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'role' => 'parent',
                'school_id' => $schoolId,
                'phone' => '+91-93000000' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            $parent = SchoolParent::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'occupation' => ['Engineer', 'Doctor', 'Teacher', 'Business', 'Lawyer', 'Accountant', 'Manager', 'Consultant', 'Officer', 'Architect'][$i],
                'relation' => $i < 5 ? 'Father' : 'Mother',
                'is_active' => true,
            ]);

            $parentUsers[] = ['user' => $user, 'parent' => $parent];
        }

        // Link parents to students (each parent has 2 children)
        for ($i = 0; $i < 10; $i++) {
            $studentIdx1 = $i * 2;
            $studentIdx2 = $i * 2 + 1;
            if (isset($studentUsers[$studentIdx1])) {
                $parentUsers[$i]['parent']->students()->attach($studentUsers[$studentIdx1]['student']['id'], ['relation' => $parentUsers[$i]['parent']->relation]);
            }
            if (isset($studentUsers[$studentIdx2])) {
                $parentUsers[$i]['parent']->students()->attach($studentUsers[$studentIdx2]['student']['id'], ['relation' => $parentUsers[$i]['parent']->relation]);
            }
        }

        // Employees (non-teaching staff)
        $employeeNames = [
            ['name' => 'Deepak Joshi', 'dept' => 'Admin', 'designation' => 'Office Manager'],
            ['name' => 'Kavita Sharma', 'dept' => 'Accounts', 'designation' => 'Accountant'],
            ['name' => 'Rajesh Tiwari', 'dept' => 'Maintenance', 'designation' => 'Facilities Manager'],
        ];

        foreach ($employeeNames as $i => $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => strtolower(explode(' ', $data['name'])[0]) . '@gurukul.com',
                'password' => $password,
                'role' => 'accountant',
                'school_id' => $schoolId,
                'phone' => '+91-94000000' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            Employee::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'employee_id' => 'EMP' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                'department' => $data['dept'],
                'designation' => $data['designation'],
                'joining_date' => now()->subYears(rand(1, 5)),
                'salary' => rand(25000, 45000),
                'is_active' => true,
            ]);
        }
    }
}
