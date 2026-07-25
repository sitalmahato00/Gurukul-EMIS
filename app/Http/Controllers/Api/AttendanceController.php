<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Attendance::where('school_id', $request->user()->school_id)
            ->with('student.user', 'class', 'markedBy');

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }
        if ($request->has('class_id')) {
            $query->where('class_id', $request->class_id);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $attendances = $query->latest('date')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $attendances,
            'message' => 'Attendance retrieved.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'class_id' => 'required|exists:classes,id',
            'date' => 'required|date',
            'status' => 'required|string|in:present,absent,late,half_day',
            'remark' => 'nullable|string|max:255',
        ]);

        $validated['school_id'] = $request->user()->school_id;
        $validated['marked_by'] = $request->user()->id;

        $attendance = Attendance::updateOrCreate(
            ['student_id' => $validated['student_id'], 'date' => $validated['date'], 'school_id' => $validated['school_id']],
            $validated
        );

        return response()->json([
            'success' => true,
            'data' => $attendance->load('student.user', 'class'),
            'message' => 'Attendance recorded.',
        ], 201);
    }

    public function report(Request $request): JsonResponse
    {
        $request->validate([
            'class_id' => 'required|exists:classes,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $report = Attendance::where('school_id', $request->user()->school_id)
            ->where('class_id', $request->class_id)
            ->whereBetween('date', [$request->start_date, $request->end_date])
            ->selectRaw('student_id, status, count(*) as count')
            ->groupBy('student_id', 'status')
            ->with('student.user')
            ->get()
            ->groupBy('student_id');

        return response()->json([
            'success' => true,
            'data' => $report,
            'message' => 'Attendance report retrieved.',
        ]);
    }

    public function myAttendance(Request $request): JsonResponse
    {
        $student = $request->user()->studentProfile;

        if (!$student) {
            return response()->json(['success' => false, 'message' => 'No student profile found.'], 404);
        }

        $attendances = Attendance::where('student_id', $student->id)
            ->latest('date')
            ->paginate(30);

        return response()->json([
            'success' => true,
            'data' => $attendances,
            'message' => 'My attendance retrieved.',
        ]);
    }

    public function studentAttendance(Request $request, string $student): JsonResponse
    {
        $attendances = Attendance::where('student_id', $student)
            ->latest('date')
            ->paginate(30);

        return response()->json([
            'success' => true,
            'data' => $attendances,
            'message' => 'Student attendance retrieved.',
        ]);
    }
}
