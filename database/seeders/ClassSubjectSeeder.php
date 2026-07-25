<?php

namespace Database\Seeders;

use App\Models\{SchoolClass, Subject, Teacher};
use Illuminate\Database\Seeder;

class ClassSubjectSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;

        $classNames = [
            ['name' => '1', 'section' => 'A'],
            ['name' => '2', 'section' => 'A'],
            ['name' => '3', 'section' => 'A'],
            ['name' => '4', 'section' => 'A'],
            ['name' => '5', 'section' => 'A'],
        ];

        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH'],
            ['name' => 'Science', 'code' => 'SCI'],
            ['name' => 'English', 'code' => 'ENG'],
            ['name' => 'Hindi', 'code' => 'HIN'],
            ['name' => 'Social Studies', 'code' => 'SST'],
            ['name' => 'Computer Science', 'code' => 'CS'],
        ];

        foreach ($classNames as $i => $classData) {
            $class = SchoolClass::create([
                'school_id' => $schoolId,
                'name' => $classData['name'],
                'section' => $classData['section'],
                'class_teacher_id' => null,
                'capacity' => 40,
                'description' => 'Class ' . $classData['name'] . ' Section ' . $classData['section'],
                'is_active' => true,
            ]);

            foreach ($subjects as $subjectData) {
                Subject::create([
                    'school_id' => $schoolId,
                    'name' => $subjectData['name'],
                    'code' => $subjectData['code'] . $classData['name'],
                    'class_id' => $class->id,
                    'teacher_id' => null,
                    'description' => $subjectData['name'] . ' for Class ' . $classData['name'],
                    'is_active' => true,
                ]);
            }
        }

        // Now assign teachers to classes and subjects (if teachers exist)
        $teachers = Teacher::where('school_id', $schoolId)->get();
        if ($teachers->isEmpty()) {
            return;
        }

        $classes = SchoolClass::where('school_id', $schoolId)->get();
        $subjectsAll = Subject::where('school_id', $schoolId)->get();

        foreach ($classes as $i => $class) {
            $class->update(['class_teacher_id' => $teachers[$i % count($teachers)]->user_id]);
        }

        $teacherIndex = 0;
        foreach ($subjectsAll as $subject) {
            $subject->update(['teacher_id' => $teachers[$teacherIndex % count($teachers)]->user_id]);
            $teacherIndex++;
        }
    }
}
