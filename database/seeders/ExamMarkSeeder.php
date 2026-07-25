<?php

namespace Database\Seeders;

use App\Models\{Exam, ExamSubject, Mark, Subject, Student};
use Illuminate\Database\Seeder;

class ExamMarkSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
        $students = Student::where('school_id', $schoolId)->get();
        $teacherId = \App\Models\Teacher::where('school_id', $schoolId)->first()?->user_id;

        // Exam 1: Unit Test
        $exam1 = Exam::create([
            'school_id' => $schoolId,
            'name' => 'Unit Test 1',
            'type' => 'unit_test',
            'start_date' => now()->subDays(45),
            'end_date' => now()->subDays(40),
            'class_id' => 1,
            'is_published' => true,
        ]);

        // Exam 2: Half Yearly
        $exam2 = Exam::create([
            'school_id' => $schoolId,
            'name' => 'Half Yearly Examination',
            'type' => 'half_yearly',
            'start_date' => now()->subDays(15),
            'end_date' => now()->subDays(5),
            'class_id' => 1,
            'is_published' => false,
        ]);

        $classSubjects = Subject::where('school_id', $schoolId)->where('class_id', 1)->get();

        foreach ([$exam1, $exam2] as $exam) {
            foreach ($classSubjects as $subject) {
                $examSubject = ExamSubject::create([
                    'exam_id' => $exam->id,
                    'subject_id' => $subject->id,
                    'max_marks' => 100,
                    'passing_marks' => 33,
                    'exam_date' => $exam->start_date,
                ]);

                $classStudents = $students->where('class_id', 1);

                foreach ($classStudents as $student) {
                    Mark::create([
                        'exam_subject_id' => $examSubject->id,
                        'student_id' => $student->id,
                        'marks_obtained' => rand(25, 98),
                        'remarks' => null,
                        'graded_by' => $teacherId,
                    ]);
                }
            }
        }
    }
}
