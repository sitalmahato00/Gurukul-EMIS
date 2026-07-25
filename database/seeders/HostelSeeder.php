<?php

namespace Database\Seeders;

use App\Models\{HostelRoom, HostelAllocation, HostelVisitor, HostelComplaint, Student, User};
use Illuminate\Database\Seeder;

class HostelSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
        $students = Student::where('school_id', $schoolId)->get();
        $wardenId = User::where('school_id', $schoolId)->where('role', 'hostel_warden')->first()?->id;

        // Hostel Rooms
        $rooms = [];
        $roomTypes = ['single', 'double', 'triple'];

        $blocks = ['A', 'B'];
        foreach ($blocks as $block) {
            for ($floor = 1; $floor <= 2; $floor++) {
                for ($roomNum = 1; $roomNum <= 5; $roomNum++) {
                    $type = $roomTypes[array_rand($roomTypes)];
                    $capacity = match ($type) { 'single' => 1, 'double' => 2, 'triple' => 3, default => 2 };
                    $rent = match ($type) { 'single' => 5000, 'double' => 3500, 'triple' => 2500, default => 3500 };

                    $rooms[] = HostelRoom::create([
                        'school_id' => $schoolId,
                        'room_number' => $block . $floor . str_pad($roomNum, 2, '0', STR_PAD_LEFT),
                        'block' => $block,
                        'floor' => $floor,
                        'room_type' => $type,
                        'capacity' => $capacity,
                        'occupied' => 0,
                        'status' => 'available',
                        'rent' => $rent,
                        'is_active' => true,
                    ]);
                }
            }
        }

        // Allocate 10 students to rooms
        foreach ($students->take(10) as $i => $student) {
            $room = $rooms[$i];

            HostelAllocation::create([
                'student_id' => $student->id,
                'room_id' => $room->id,
                'academic_year' => '2025-26',
                'allocated_date' => now()->subMonths(rand(1, 6)),
                'vacated_date' => null,
                'status' => 'active',
            ]);

            $room->increment('occupied');
            if ($room->occupied >= $room->capacity) {
                $room->update(['status' => 'occupied']);
            }
        }

        // Visitor Records
        $visitorNames = ['Rajesh Sharma', 'Sunita Patel', 'Mohit Verma', 'Anjali Gupta', 'Kishore Reddy'];
        $relations = ['Father', 'Mother', 'Brother', 'Sister', 'Uncle'];
        $purposes = ['Personal Visit', 'Bringing Clothes', 'Medical Emergency', 'Family Function', 'Parent Teacher Meeting'];

        foreach ($students->take(5) as $i => $student) {
            HostelVisitor::create([
                'school_id' => $schoolId,
                'student_id' => $student->id,
                'visitor_name' => $visitorNames[$i],
                'visitor_phone' => '+91-96000000' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'relation' => $relations[$i],
                'purpose' => $purposes[$i],
                'id_proof' => 'Aadhaar',
                'check_in' => now()->subDays(rand(1, 10))->setTime(10, 30),
                'check_out' => now()->subDays(rand(0, 9))->setTime(16, 45),
            ]);
        }

        // Complaints
        $complaintTitles = [
            'Broken Fan', 'Water Leakage', 'No Hot Water', 'Electrical Issue', 'Furniture Damaged',
        ];
        $categories = ['Electrical', 'Plumbing', 'Electrical', 'Electrical', 'Furniture'];
        $severities = ['medium', 'high', 'low', 'high', 'low'];
        $statuses = ['open', 'in_progress', 'resolved', 'open', 'resolved'];

        foreach ($students->take(5) as $i => $student) {
            $complaint = HostelComplaint::create([
                'school_id' => $schoolId,
                'student_id' => $student->id,
                'title' => $complaintTitles[$i],
                'description' => 'Issue reported by student in their room.',
                'category' => $categories[$i],
                'severity' => $severities[$i],
                'status' => $statuses[$i],
                'resolved_by' => $statuses[$i] === 'resolved' ? $wardenId : null,
                'resolved_at' => $statuses[$i] === 'resolved' ? now()->subDays(rand(1, 5)) : null,
            ]);
        }
    }
}
