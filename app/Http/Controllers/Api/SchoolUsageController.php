<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\FeePayment;
use Illuminate\Http\JsonResponse;

class SchoolUsageController extends Controller
{
    public function index(): JsonResponse
    {
        $schools = School::with('subscriptionPlan')
            ->withCount('students', 'teachers', 'classes', 'users')
            ->get()
            ->map(function ($school) {
                $lastActivity = $this->getLastActivity($school->id);

                $totalRevenue = FeePayment::where('school_id', $school->id)
                    ->where('status', 'paid')
                    ->sum('amount');

                $pendingFees = FeePayment::where('school_id', $school->id)
                    ->where('status', 'pending')
                    ->sum('amount');

                $endsAt = $school->subscription_ends_at;
                $daysRemaining = $endsAt ? max(0, $endsAt->diffInDays(now())) : null;

                return [
                    'id' => $school->id,
                    'name' => $school->name,
                    'city' => $school->city,
                    'is_active' => $school->is_active,
                    'student_count' => $school->students_count,
                    'teacher_count' => $school->teachers_count,
                    'class_count' => $school->classes_count,
                    'user_count' => $school->users_count,
                    'total_revenue' => (float) $totalRevenue,
                    'pending_fees' => (float) $pendingFees,
                    'last_activity' => $lastActivity,
                    'subscription_plan' => $school->subscriptionPlan ? [
                        'id' => $school->subscriptionPlan->id,
                        'name' => $school->subscriptionPlan->name,
                        'price' => $school->subscriptionPlan->price,
                        'max_students' => $school->subscriptionPlan->max_students,
                        'storage_gb' => $school->subscriptionPlan->storage_gb,
                    ] : null,
                    'subscription_ends_at' => $endsAt?->toISOString(),
                    'days_remaining' => $daysRemaining,
                    'subscription_status' => $daysRemaining !== null
                        ? ($endsAt->isPast() ? 'expired' : ($daysRemaining <= 30 ? 'expiring_soon' : 'active'))
                        : 'none',
                ];
            });

        $totalStudents = $schools->sum('student_count');
        $totalTeachers = $schools->sum('teacher_count');
        $activeSchools = $schools->where('is_active', true)->count();
        $totalRevenue = $schools->sum('total_revenue');
        $avgStudentsPerSchool = $activeSchools > 0 ? round($totalStudents / $activeSchools) : 0;

        return response()->json([
            'success' => true,
            'data' => $schools,
            'summary' => [
                'total_schools' => $schools->count(),
                'active_schools' => $activeSchools,
                'total_students' => $totalStudents,
                'total_teachers' => $totalTeachers,
                'avg_students_per_school' => $avgStudentsPerSchool,
                'total_revenue' => $totalRevenue,
            ],
            'message' => 'School usage data retrieved successfully.',
        ]);
    }

    private function getLastActivity(int $schoolId): ?string
    {
        $lastStudent = Student::where('school_id', $schoolId)
            ->latest('updated_at')
            ->value('updated_at');

        $lastTeacher = Teacher::where('school_id', $schoolId)
            ->latest('updated_at')
            ->value('updated_at');

        $dates = array_filter([$lastStudent, $lastTeacher]);

        return !empty($dates) ? max($dates)?->toISOString() : null;
    }
}
