<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

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
        $data = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'name' => 'required_without:user_id|string|max:255',
            'email' => 'required_without:user_id|email|unique:users,email',
            'password' => 'required_without:user_id|confirmed',
            'phone' => 'nullable|string|max:20',
            'employee_id' => 'required|string|unique:teachers,employee_id',
            'qualification' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'specialization' => 'nullable|string|max:255',
            'joining_date' => 'nullable|date',
            'salary' => 'nullable|numeric|min:0',
            'department' => 'nullable|string|max:100',
        ]);

        if (!empty($data['user_id'])) {
            $userId = $data['user_id'];
        } else {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'teacher',
                'school_id' => $request->user()->school_id,
                'phone' => $data['phone'] ?? null,
                'is_active' => true,
            ]);
            $userId = $user->id;
        }

        $teacher = Teacher::create([
            'user_id' => $userId,
            'school_id' => $request->user()->school_id,
            'employee_id' => $data['employee_id'],
            'qualification' => $data['qualification'] ?? null,
            'experience_years' => $data['experience_years'] ?? null,
            'specialization' => $data['specialization'] ?? null,
            'joining_date' => $data['joining_date'] ?? null,
            'salary' => $data['salary'] ?? null,
            'department' => $data['department'] ?? null,
        ]);

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
