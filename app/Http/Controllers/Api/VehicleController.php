<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = Vehicle::forSchool($schoolId);

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('registration_number', 'like', "%{$search}%");
                });
            }

            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $vehicles = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $vehicles,
                'message' => 'Vehicles retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $vehicle = Vehicle::forSchool($request->user()->school_id)
                ->with(['drivers', 'transportAllocations'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $vehicle,
                'message' => 'Vehicle retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'registration_number' => 'required|string|max:50|unique:vehicles,registration_number',
                'type' => 'nullable|string|max:50',
                'capacity' => 'required|integer|min:1',
                'fuel_type' => 'nullable|string|max:50',
                'is_active' => 'boolean',
            ]);

            $validated['school_id'] = $request->user()->school_id;

            $vehicle = Vehicle::create($validated);

            return response()->json([
                'success' => true,
                'data' => $vehicle,
                'message' => 'Vehicle created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $vehicle = Vehicle::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'registration_number' => 'sometimes|string|max:50|unique:vehicles,registration_number,' . $id,
                'type' => 'nullable|string|max:50',
                'capacity' => 'sometimes|integer|min:1',
                'fuel_type' => 'nullable|string|max:50',
                'is_active' => 'boolean',
            ]);

            $vehicle->update($validated);

            return response()->json([
                'success' => true,
                'data' => $vehicle->fresh(),
                'message' => 'Vehicle updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $vehicle = Vehicle::forSchool($request->user()->school_id)->findOrFail($id);
            $vehicle->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Vehicle deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
