<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $classes = SchoolClass::where('school_id', $request->user()->school_id)
            ->with('classTeacher', 'subjects')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $classes,
            'message' => 'Classes retrieved.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'section' => 'nullable|string|max:10',
            'class_teacher_id' => 'nullable|exists:users,id',
            'capacity' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
        ]);

        $validated['school_id'] = $request->user()->school_id;

        $class = SchoolClass::create($validated);

        return response()->json([
            'success' => true,
            'data' => $class,
            'message' => 'Class created.',
        ], 201);
    }

    public function show(Request $request, SchoolClass $class): JsonResponse
    {
        $class->load('classTeacher', 'subjects', 'students');

        return response()->json([
            'success' => true,
            'data' => $class,
            'message' => 'Class retrieved.',
        ]);
    }

    public function update(Request $request, SchoolClass $class): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'section' => 'nullable|string|max:10',
            'class_teacher_id' => 'nullable|exists:users,id',
            'capacity' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $class->update($validated);

        return response()->json([
            'success' => true,
            'data' => $class->fresh(),
            'message' => 'Class updated.',
        ]);
    }

    public function destroy(SchoolClass $class): JsonResponse
    {
        $class->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Class deleted.',
        ]);
    }

    public function myClasses(Request $request): JsonResponse
    {
        $classes = SchoolClass::where('school_id', $request->user()->school_id)
            ->where('class_teacher_id', $request->user()->id)
            ->with('students', 'subjects')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $classes,
            'message' => 'My classes retrieved.',
        ]);
    }
}
