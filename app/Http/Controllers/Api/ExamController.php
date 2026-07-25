<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\ExamSubject;
use App\Models\Mark;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = Exam::forSchool($schoolId)->with(['class', 'examSubjects.subject']);

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where('name', 'like', "%{$search}%");
            }

            if ($request->has('class_id')) {
                $query->where('class_id', $request->class_id);
            }

            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            $exams = $query->orderBy('start_date', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $exams,
                'message' => 'Exams retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $exam = Exam::forSchool($request->user()->school_id)
                ->with(['class', 'examSubjects.subject'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $exam,
                'message' => 'Exam retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'nullable|string|max:50',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'class_id' => 'required|exists:classes,id',
                'exam_subjects' => 'nullable|array',
                'exam_subjects.*.subject_id' => 'required|exists:subjects,id',
                'exam_subjects.*.max_marks' => 'required|integer|min:1',
                'exam_subjects.*.passing_marks' => 'required|integer|min:1',
                'exam_subjects.*.exam_date' => 'nullable|date',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $examSubjectsData = $validated['exam_subjects'] ?? [];
            unset($validated['exam_subjects']);

            $exam = Exam::create($validated);

            foreach ($examSubjectsData as $es) {
                $exam->examSubjects()->create($es);
            }

            return response()->json([
                'success' => true,
                'data' => $exam->load('examSubjects.subject'),
                'message' => 'Exam created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $exam = Exam::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'type' => 'nullable|string|max:50',
                'start_date' => 'sometimes|date',
                'end_date' => 'sometimes|date|after_or_equal:start_date',
                'class_id' => 'sometimes|exists:classes,id',
                'is_published' => 'boolean',
            ]);

            $exam->update($validated);

            return response()->json([
                'success' => true,
                'data' => $exam->fresh()->load('examSubjects.subject'),
                'message' => 'Exam updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $exam = Exam::forSchool($request->user()->school_id)->findOrFail($id);
            $exam->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Exam deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function publish(Request $request, $id): JsonResponse
    {
        try {
            $exam = Exam::forSchool($request->user()->school_id)->findOrFail($id);
            $exam->update(['is_published' => true]);

            return response()->json([
                'success' => true,
                'data' => $exam->fresh(),
                'message' => 'Exam results published successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function resultsByStudent(Request $request, $id): JsonResponse
    {
        try {
            $request->validate([
                'student_id' => 'required|exists:students,id',
            ]);

            $exam = Exam::forSchool($request->user()->school_id)
                ->with(['examSubjects.subject', 'examSubjects.marks' => function ($q) use ($request) {
                    $q->where('student_id', $request->student_id);
                }])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $exam,
                'message' => 'Exam results retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
