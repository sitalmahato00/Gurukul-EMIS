<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mark;
use App\Models\ExamSubject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarkController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Mark::with(['examSubject.exam', 'examSubject.subject', 'student.user', 'gradedBy']);

            if ($request->has('exam_id')) {
                $examSubjectIds = ExamSubject::where('exam_id', $request->exam_id)->pluck('id');
                $query->whereIn('exam_subject_id', $examSubjectIds);
            }

            if ($request->has('exam_subject_id')) {
                $query->where('exam_subject_id', $request->exam_subject_id);
            }

            if ($request->has('student_id')) {
                $query->where('student_id', $request->student_id);
            }

            $marks = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $marks,
                'message' => 'Marks retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $mark = Mark::with(['examSubject.exam', 'examSubject.subject', 'student.user', 'gradedBy'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $mark,
                'message' => 'Mark retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'exam_subject_id' => 'required|exists:exam_subjects,id',
                'marks' => 'required|array|min:1',
                'marks.*.student_id' => 'required|exists:students,id',
                'marks.*.marks_obtained' => 'required|numeric|min:0',
                'marks.*.remarks' => 'nullable|string|max:255',
            ]);

            DB::beginTransaction();

            foreach ($validated['marks'] as $record) {
                Mark::updateOrCreate(
                    [
                        'exam_subject_id' => $validated['exam_subject_id'],
                        'student_id' => $record['student_id'],
                    ],
                    [
                        'marks_obtained' => $record['marks_obtained'],
                        'remarks' => $record['remarks'] ?? null,
                        'graded_by' => $request->user()->id,
                    ]
                );
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Marks saved successfully.',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function studentResults(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $studentId = $request->input('student_id');

            if (!$studentId && $user->role === 'student') {
                $student = $user->studentProfile;
                $studentId = $student?->id;
            }

            if (!$studentId) {
                return response()->json(['success' => false, 'message' => 'Student ID is required.'], 422);
            }

            $marks = Mark::where('student_id', $studentId)
                ->with(['examSubject.exam', 'examSubject.subject'])
                ->get()
                ->groupBy('examSubject.exam.name');

            return response()->json([
                'success' => true,
                'data' => $marks,
                'message' => 'Student results retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
