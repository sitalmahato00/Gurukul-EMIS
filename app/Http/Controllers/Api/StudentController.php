<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $students = Student::where('school_id', $request->user()->school_id)
            ->with('class', 'user', 'parents')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $students,
            'message' => 'Students retrieved.',
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
            'class_id' => 'required|exists:classes,id',
            'admission_number' => 'required|string|unique:students,admission_number',
            'admission_date' => 'required|date',
            'roll_number' => 'nullable|integer',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'blood_group' => 'nullable|string|max:5',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
            'aadhar_number' => 'nullable|string|max:12',
            'rte' => 'nullable|boolean',
        ]);

        if (!empty($data['user_id'])) {
            $userId = $data['user_id'];
        } else {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'student',
                'school_id' => $request->user()->school_id,
                'phone' => $data['phone'] ?? null,
                'is_active' => true,
            ]);
            $userId = $user->id;
        }

        $student = Student::create([
            'user_id' => $userId,
            'school_id' => $request->user()->school_id,
            'class_id' => $data['class_id'],
            'admission_number' => $data['admission_number'],
            'admission_date' => $data['admission_date'],
            'roll_number' => $data['roll_number'] ?? null,
            'date_of_birth' => $data['date_of_birth'] ?? null,
            'gender' => $data['gender'] ?? null,
            'blood_group' => $data['blood_group'] ?? null,
            'address' => $data['address'] ?? null,
            'city' => $data['city'] ?? null,
            'state' => $data['state'] ?? null,
            'pincode' => $data['pincode'] ?? null,
            'aadhar_number' => $data['aadhar_number'] ?? null,
            'rte' => $data['rte'] ?? false,
        ]);

        return response()->json([
            'success' => true,
            'data' => $student->load('class', 'user'),
            'message' => 'Student created.',
        ], 201);
    }

    public function show(Request $request, Student $student): JsonResponse
    {
        $student->load('class', 'user', 'parents', 'attendances', 'marks', 'feePayments');

        return response()->json([
            'success' => true,
            'data' => $student,
            'message' => 'Student retrieved.',
        ]);
    }

    public function update(Request $request, Student $student): JsonResponse
    {
        $validated = $request->validate([
            'class_id' => 'sometimes|exists:classes,id',
            'roll_number' => 'nullable|integer',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'blood_group' => 'nullable|string|max:5',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
            'is_active' => 'sometimes|boolean',
        ]);

        $student->update($validated);

        return response()->json([
            'success' => true,
            'data' => $student->fresh()->load('class', 'user'),
            'message' => 'Student updated.',
        ]);
    }

    public function destroy(Student $student): JsonResponse
    {
        $student->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Student deleted.',
        ]);
    }

    public function myStudents(Request $request): JsonResponse
    {
        $user = $request->user();

        $subjectClassIds = \App\Models\Subject::where('teacher_id', $user->id)
            ->where('school_id', $user->school_id)
            ->pluck('class_id')
            ->unique();

        $students = Student::where('school_id', $user->school_id)
            ->whereIn('class_id', $subjectClassIds)
            ->with('class', 'user')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $students,
            'message' => 'My students retrieved.',
        ]);
    }
}
