<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = Driver::forSchool($schoolId)->with(['user', 'vehicle']);

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('license_number', 'like', "%{$search}%")
                      ->orWhereHas('user', function ($uq) use ($search) {
                          $uq->where('name', 'like', "%{$search}%");
                      });
                });
            }

            if ($request->has('vehicle_id')) {
                $query->where('vehicle_id', $request->vehicle_id);
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $drivers = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $drivers,
                'message' => 'Drivers retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $driver = Driver::forSchool($request->user()->school_id)
                ->with(['user', 'vehicle'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $driver,
                'message' => 'Driver retrieved successfully.',
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
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
                'phone' => 'nullable|string|max:20',
                'license_number' => 'nullable|string|max:50',
                'license_expiry' => 'nullable|date',
                'vehicle_id' => 'nullable|exists:vehicles,id',
            ]);

            $schoolId = $request->user()->school_id;

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
                'role' => 'driver',
                'school_id' => $schoolId,
                'phone' => $validated['phone'] ?? null,
                'is_active' => true,
            ]);

            $driver = Driver::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'license_number' => $validated['license_number'] ?? null,
                'license_expiry' => $validated['license_expiry'] ?? null,
                'vehicle_id' => $validated['vehicle_id'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'is_active' => true,
            ]);

            return response()->json([
                'success' => true,
                'data' => $driver->load(['user', 'vehicle']),
                'message' => 'Driver created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $driver = Driver::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'phone' => 'nullable|string|max:20',
                'license_number' => 'nullable|string|max:50',
                'license_expiry' => 'nullable|date',
                'vehicle_id' => 'nullable|exists:vehicles,id',
                'is_active' => 'boolean',
            ]);

            if (isset($validated['name']) || isset($validated['phone'])) {
                $driver->user->update(collect($validated)->only(['name', 'phone'])->filter()->toArray());
            }

            $driver->update(collect($validated)->except(['name', 'phone'])->toArray());

            return response()->json([
                'success' => true,
                'data' => $driver->fresh()->load(['user', 'vehicle']),
                'message' => 'Driver updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $driver = Driver::forSchool($request->user()->school_id)->findOrFail($id);
            $driver->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Driver deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
