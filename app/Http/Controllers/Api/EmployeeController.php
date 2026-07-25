<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $employees = Employee::where('school_id', $request->user()->school_id)
            ->with('user')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $employees,
            'message' => 'Employees retrieved.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'employee_id' => 'required|string|unique:employees,employee_id',
            'department' => 'nullable|string|max:100',
            'designation' => 'nullable|string|max:100',
            'joining_date' => 'nullable|date',
            'salary' => 'nullable|numeric|min:0',
        ]);

        $validated['school_id'] = $request->user()->school_id;

        $employee = Employee::create($validated);

        return response()->json([
            'success' => true,
            'data' => $employee->load('user'),
            'message' => 'Employee created.',
        ], 201);
    }

    public function show(Request $request, Employee $employee): JsonResponse
    {
        $employee->load('user');

        return response()->json([
            'success' => true,
            'data' => $employee,
            'message' => 'Employee retrieved.',
        ]);
    }

    public function update(Request $request, Employee $employee): JsonResponse
    {
        $validated = $request->validate([
            'department' => 'nullable|string|max:100',
            'designation' => 'nullable|string|max:100',
            'joining_date' => 'nullable|date',
            'salary' => 'nullable|numeric|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $employee->update($validated);

        return response()->json([
            'success' => true,
            'data' => $employee->fresh()->load('user'),
            'message' => 'Employee updated.',
        ]);
    }

    public function destroy(Employee $employee): JsonResponse
    {
        $employee->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Employee deleted.',
        ]);
    }
}
