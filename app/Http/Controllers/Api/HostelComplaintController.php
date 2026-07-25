<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HostelComplaint;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HostelComplaintController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = HostelComplaint::forSchool($schoolId)->with(['student.user', 'resolvedBy']);

            if ($request->has('student_id')) {
                $query->where('student_id', $request->student_id);
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            if ($request->has('category')) {
                $query->where('category', $request->category);
            }

            if ($request->has('severity')) {
                $query->where('severity', $request->severity);
            }

            $complaints = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $complaints,
                'message' => 'Hostel complaints retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $complaint = HostelComplaint::forSchool($request->user()->school_id)
                ->with(['student.user', 'resolvedBy'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $complaint,
                'message' => 'Hostel complaint retrieved successfully.',
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
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'nullable|string|max:100',
                'severity' => 'nullable|string|max:50',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $validated['status'] = 'open';

            $complaint = HostelComplaint::create($validated);

            return response()->json([
                'success' => true,
                'data' => $complaint->load('student.user'),
                'message' => 'Complaint created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $complaint = HostelComplaint::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'category' => 'nullable|string|max:100',
                'severity' => 'nullable|string|max:50',
                'status' => 'sometimes|string|max:50',
            ]);

            $complaint->update($validated);

            return response()->json([
                'success' => true,
                'data' => $complaint->fresh()->load(['student.user', 'resolvedBy']),
                'message' => 'Complaint updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $complaint = HostelComplaint::forSchool($request->user()->school_id)->findOrFail($id);
            $complaint->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Complaint deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function resolve(Request $request, $id): JsonResponse
    {
        try {
            $complaint = HostelComplaint::forSchool($request->user()->school_id)
                ->where('status', '!=', 'resolved')
                ->findOrFail($id);

            $complaint->update([
                'status' => 'resolved',
                'resolved_by' => $request->user()->id,
                'resolved_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'data' => $complaint->fresh()->load(['student.user', 'resolvedBy']),
                'message' => 'Complaint resolved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
