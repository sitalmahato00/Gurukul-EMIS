<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $subjects = Subject::where('school_id', $request->user()->school_id)
            ->with('class', 'teacher')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $subjects,
            'message' => 'Subjects retrieved.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:20',
            'class_id' => 'required|exists:classes,id',
            'teacher_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
        ]);

        $validated['school_id'] = $request->user()->school_id;

        $subject = Subject::create($validated);

        return response()->json([
            'success' => true,
            'data' => $subject->load('class', 'teacher'),
            'message' => 'Subject created.',
        ], 201);
    }

    public function show(Request $request, Subject $subject): JsonResponse
    {
        $subject->load('class', 'teacher', 'examSubjects', 'homeworks');

        return response()->json([
            'success' => true,
            'data' => $subject,
            'message' => 'Subject retrieved.',
        ]);
    }

    public function update(Request $request, Subject $subject): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'nullable|string|max:20',
            'class_id' => 'sometimes|exists:classes,id',
            'teacher_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $subject->update($validated);

        return response()->json([
            'success' => true,
            'data' => $subject->fresh()->load('class', 'teacher'),
            'message' => 'Subject updated.',
        ]);
    }

    public function destroy(Subject $subject): JsonResponse
    {
        $subject->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Subject deleted.',
        ]);
    }

    public function mySubjects(Request $request): JsonResponse
    {
        $subjects = Subject::where('school_id', $request->user()->school_id)
            ->where('teacher_id', $request->user()->id)
            ->with('class', 'homeworks')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $subjects,
            'message' => 'My subjects retrieved.',
        ]);
    }
}
