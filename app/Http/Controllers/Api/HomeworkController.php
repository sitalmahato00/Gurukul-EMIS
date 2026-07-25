<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{Homework, HomeworkSubmission};
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeworkController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $homeworks = Homework::where('school_id', $request->user()->school_id)
            ->with('class', 'subject', 'teacher', 'submissions.student.user')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $homeworks,
            'message' => 'Homeworks retrieved.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date|after:today',
            'assigned_date' => 'nullable|date',
        ]);

        $validated['school_id'] = $request->user()->school_id;
        $validated['teacher_id'] = $request->user()->id;
        $validated['assigned_date'] = $validated['assigned_date'] ?? now();

        $homework = Homework::create($validated);

        return response()->json([
            'success' => true,
            'data' => $homework->load('class', 'subject'),
            'message' => 'Homework created.',
        ], 201);
    }

    public function show(Request $request, Homework $homework): JsonResponse
    {
        $homework->load('class', 'subject', 'teacher', 'submissions.student.user');

        return response()->json([
            'success' => true,
            'data' => $homework,
            'message' => 'Homework retrieved.',
        ]);
    }

    public function update(Request $request, Homework $homework): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'sometimes|date',
        ]);

        $homework->update($validated);

        return response()->json([
            'success' => true,
            'data' => $homework->fresh()->load('class', 'subject'),
            'message' => 'Homework updated.',
        ]);
    }

    public function destroy(Homework $homework): JsonResponse
    {
        $homework->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Homework deleted.',
        ]);
    }

    public function submissions(Request $request, Homework $homework): JsonResponse
    {
        $submissions = $homework->submissions()->with('student.user')->get();

        return response()->json([
            'success' => true,
            'data' => $submissions,
            'message' => 'Submissions retrieved.',
        ]);
    }

    public function gradeSubmission(Request $request, Homework $homework, HomeworkSubmission $submission): JsonResponse
    {
        $validated = $request->validate([
            'grade' => 'required|string|max:10',
            'feedback' => 'nullable|string|max:500',
        ]);

        $submission->update([
            'grade' => $validated['grade'],
            'feedback' => $validated['feedback'] ?? null,
            'status' => 'graded',
        ]);

        return response()->json([
            'success' => true,
            'data' => $submission->fresh()->load('student.user'),
            'message' => 'Submission graded.',
        ]);
    }

    public function myHomeworks(Request $request): JsonResponse
    {
        $student = $request->user()->studentProfile;

        if (!$student) {
            return response()->json(['success' => false, 'message' => 'No student profile found.'], 404);
        }

        $homeworks = Homework::where('school_id', $request->user()->school_id)
            ->where('class_id', $student->class_id)
            ->with('subject', 'teacher')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $homeworks,
            'message' => 'My homeworks retrieved.',
        ]);
    }
}
