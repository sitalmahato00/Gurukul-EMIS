<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TransportAllocation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransportAllocationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = TransportAllocation::with(['student.user', 'vehicle', 'route', 'stop']);

            if ($request->has('student_id')) {
                $query->where('student_id', $request->student_id);
            }

            if ($request->has('vehicle_id')) {
                $query->where('vehicle_id', $request->vehicle_id);
            }

            if ($request->has('route_id')) {
                $query->where('route_id', $request->route_id);
            }

            if ($request->has('academic_year')) {
                $query->where('academic_year', $request->academic_year);
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $allocations = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $allocations,
                'message' => 'Transport allocations retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $allocation = TransportAllocation::with(['student.user', 'vehicle', 'route', 'stop'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $allocation,
                'message' => 'Transport allocation retrieved successfully.',
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
                'vehicle_id' => 'required|exists:vehicles,id',
                'route_id' => 'required|exists:routes,id',
                'stop_id' => 'nullable|exists:route_stops,id',
                'academic_year' => 'required|string|max:20',
                'monthly_fee' => 'nullable|numeric|min:0',
                'is_active' => 'boolean',
            ]);

            $allocation = TransportAllocation::create($validated);

            return response()->json([
                'success' => true,
                'data' => $allocation->load(['student.user', 'vehicle', 'route', 'stop']),
                'message' => 'Transport allocated successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $allocation = TransportAllocation::findOrFail($id);

            $validated = $request->validate([
                'vehicle_id' => 'sometimes|exists:vehicles,id',
                'route_id' => 'sometimes|exists:routes,id',
                'stop_id' => 'nullable|exists:route_stops,id',
                'monthly_fee' => 'nullable|numeric|min:0',
                'is_active' => 'boolean',
            ]);

            $allocation->update($validated);

            return response()->json([
                'success' => true,
                'data' => $allocation->fresh()->load(['student.user', 'vehicle', 'route', 'stop']),
                'message' => 'Transport allocation updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $allocation = TransportAllocation::findOrFail($id);
            $allocation->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Transport allocation deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
