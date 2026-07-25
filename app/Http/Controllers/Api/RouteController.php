<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Route;
use App\Models\RouteStop;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = Route::forSchool($schoolId)->withCount('stops');

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('start_point', 'like', "%{$search}%")
                      ->orWhere('end_point', 'like', "%{$search}%");
                });
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $routes = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $routes,
                'message' => 'Routes retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $route = Route::forSchool($request->user()->school_id)
                ->with(['stops' => function ($q) {
                    $q->orderBy('order');
                }])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $route,
                'message' => 'Route retrieved successfully.',
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
                'start_point' => 'nullable|string|max:255',
                'end_point' => 'nullable|string|max:255',
                'distance_km' => 'nullable|numeric|min:0',
                'fare' => 'nullable|numeric|min:0',
                'is_active' => 'boolean',
                'stops' => 'nullable|array',
                'stops.*.name' => 'required|string|max:255',
                'stops.*.latitude' => 'nullable|numeric',
                'stops.*.longitude' => 'nullable|numeric',
                'stops.*.order' => 'required|integer|min:1',
                'stops.*.arrival_time' => 'nullable|string|max:10',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $stopsData = $validated['stops'] ?? [];
            unset($validated['stops']);

            $route = Route::create($validated);

            foreach ($stopsData as $stop) {
                $route->stops()->create($stop);
            }

            return response()->json([
                'success' => true,
                'data' => $route->load('stops'),
                'message' => 'Route created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $route = Route::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'start_point' => 'nullable|string|max:255',
                'end_point' => 'nullable|string|max:255',
                'distance_km' => 'nullable|numeric|min:0',
                'fare' => 'nullable|numeric|min:0',
                'is_active' => 'boolean',
            ]);

            $route->update($validated);

            return response()->json([
                'success' => true,
                'data' => $route->fresh()->load('stops'),
                'message' => 'Route updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $route = Route::forSchool($request->user()->school_id)->findOrFail($id);
            $route->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Route deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function addStop(Request $request, $id): JsonResponse
    {
        try {
            $route = Route::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
                'order' => 'required|integer|min:1',
                'arrival_time' => 'nullable|string|max:10',
            ]);

            $stop = $route->stops()->create($validated);

            return response()->json([
                'success' => true,
                'data' => $stop,
                'message' => 'Stop added successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updateStop(Request $request, $routeId, $stopId): JsonResponse
    {
        try {
            $route = Route::forSchool($request->user()->school_id)->findOrFail($routeId);
            $stop = RouteStop::where('route_id', $route->id)->findOrFail($stopId);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
                'order' => 'sometimes|integer|min:1',
                'arrival_time' => 'nullable|string|max:10',
            ]);

            $stop->update($validated);

            return response()->json([
                'success' => true,
                'data' => $stop->fresh(),
                'message' => 'Stop updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function removeStop(Request $request, $routeId, $stopId): JsonResponse
    {
        try {
            $route = Route::forSchool($request->user()->school_id)->findOrFail($routeId);
            $stop = RouteStop::where('route_id', $route->id)->findOrFail($stopId);
            $stop->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Stop removed successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
