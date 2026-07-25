<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $teachers = Teacher::where('school_id', $request->user()->school_id)
            ->with('user')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $teachers,
            'message' => 'Teachers retrieved.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'employee_id' => 'required|string|unique:teachers,employee_id',
            'qualification' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'specialization' => 'nullable|string|max:255',
            'joining_date' => 'nullable|date',
            'salary' => 'nullable|numeric|min:0',
            'department' => 'nullable|string|max:100',
        ]);

        $validated['school_id'] = $request->user()->school_id;

        $teacher = Teacher::create($validated);

        return response()->json([
            'success' => true,
            'data' => $teacher->load('user'),
            'message' => 'Teacher created.',
        ], 201);
    }

    public function show(Request $request, Teacher $teacher): JsonResponse
    {
        $teacher->load('user');

        return response()->json([
            'success' => true,
            'data' => $teacher,
            'message' => 'Teacher retrieved.',
        ]);
    }

    public function update(Request $request, Teacher $teacher): JsonResponse
    {
        $validated = $request->validate([
            'qualification' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'specialization' => 'nullable|string|max:255',
            'joining_date' => 'nullable|date',
            'salary' => 'nullable|numeric|min:0',
            'department' => 'nullable|string|max:100',
            'is_active' => 'sometimes|boolean',
        ]);

        $teacher->update($validated);

        return response()->json([
            'success' => true,
            'data' => $teacher->fresh()->load('user'),
            'message' => 'Teacher updated.',
        ]);
    }

    public function destroy(Teacher $teacher): JsonResponse
    {
        $teacher->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Teacher deleted.',
        ]);
    }
}
