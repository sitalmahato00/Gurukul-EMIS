<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HostelVisitor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HostelVisitorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = HostelVisitor::forSchool($schoolId)->with(['student.user']);

            if ($request->has('student_id')) {
                $query->where('student_id', $request->student_id);
            }

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('visitor_name', 'like', "%{$search}%")
                      ->orWhere('visitor_phone', 'like', "%{$search}%");
                });
            }

            $visitors = $query->orderBy('check_in', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $visitors,
                'message' => 'Hostel visitors retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $visitor = HostelVisitor::forSchool($request->user()->school_id)
                ->with(['student.user'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $visitor,
                'message' => 'Hostel visitor retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'student_id' => 'required|exists:students,id',
                'visitor_name' => 'required|string|max:255',
                'visitor_phone' => 'nullable|string|max:20',
                'relation' => 'nullable|string|max:50',
                'purpose' => 'nullable|string|max:255',
                'id_proof' => 'nullable|string|max:255',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $validated['check_in'] = now();

            $visitor = HostelVisitor::create($validated);

            return response()->json([
                'success' => true,
                'data' => $visitor->load('student.user'),
                'message' => 'Visitor checked in successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $visitor = HostelVisitor::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'visitor_name' => 'sometimes|string|max:255',
                'visitor_phone' => 'nullable|string|max:20',
                'relation' => 'nullable|string|max:50',
                'purpose' => 'nullable|string|max:255',
                'id_proof' => 'nullable|string|max:255',
                'check_out' => 'nullable|date',
            ]);

            $visitor->update($validated);

            return response()->json([
                'success' => true,
                'data' => $visitor->fresh()->load('student.user'),
                'message' => 'Visitor record updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $visitor = HostelVisitor::forSchool($request->user()->school_id)->findOrFail($id);
            $visitor->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Visitor record deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function checkout(Request $request, $id): JsonResponse
    {
        try {
            $visitor = HostelVisitor::forSchool($request->user()->school_id)
                ->whereNull('check_out')
                ->findOrFail($id);

            $visitor->update(['check_out' => now()]);

            return response()->json([
                'success' => true,
                'data' => $visitor->fresh()->load('student.user'),
                'message' => 'Visitor checked out successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
