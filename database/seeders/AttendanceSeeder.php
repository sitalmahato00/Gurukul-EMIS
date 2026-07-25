<?php

namespace Database\Seeders;

use App\Models\{Attendance, Student};
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
        $students = Student::where('school_id', $schoolId)->get();
        $teacherId = \App\Models\Teacher::where('school_id', $schoolId)->first()?->user_id;

        $statuses = ['present', 'present', 'present', 'present', 'absent', 'late', 'half_day'];

        for ($day = 0; $day < 30; $day++) {
            $date = now()->subDays($day);

            if ($date->isWeekend()) {
                continue;
            }

            foreach ($students as $student) {
                Attendance::create([
                    'student_id' => $student->id,
                    'school_id' => $schoolId,
                    'class_id' => $student->class_id,
                    'date' => $date->toDateString(),
                    'status' => $statuses[array_rand($statuses)],
                    'remark' => null,
                    'marked_by' => $teacherId,
                ]);
            }
        }
    }
}
