<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HostelRoom;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HostelRoomController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = HostelRoom::forSchool($schoolId)->withCount('allocations');

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('room_number', 'like', "%{$search}%")
                      ->orWhere('block', 'like', "%{$search}%");
                });
            }

            if ($request->has('block')) {
                $query->where('block', $request->block);
            }

            if ($request->has('room_type')) {
                $query->where('room_type', $request->room_type);
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $rooms = $query->orderBy('block')
                ->orderBy('room_number')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $rooms,
                'message' => 'Hostel rooms retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $room = HostelRoom::forSchool($request->user()->school_id)
                ->with(['allocations.student.user'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $room,
                'message' => 'Hostel room retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'room_number' => 'required|string|max:50',
                'block' => 'nullable|string|max:50',
                'floor' => 'nullable|integer',
                'room_type' => 'nullable|string|max:50',
                'capacity' => 'required|integer|min:1',
                'status' => 'nullable|string|max:50',
                'rent' => 'nullable|numeric|min:0',
                'is_active' => 'boolean',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $validated['occupied'] = 0;

            $room = HostelRoom::create($validated);

            return response()->json([
                'success' => true,
                'data' => $room,
                'message' => 'Hostel room created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $room = HostelRoom::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'room_number' => 'sometimes|string|max:50',
                'block' => 'nullable|string|max:50',
                'floor' => 'nullable|integer',
                'room_type' => 'nullable|string|max:50',
                'capacity' => 'sometimes|integer|min:1',
                'status' => 'nullable|string|max:50',
                'rent' => 'nullable|numeric|min:0',
                'is_active' => 'boolean',
            ]);

            $room->update($validated);

            return response()->json([
                'success' => true,
                'data' => $room->fresh(),
                'message' => 'Hostel room updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $room = HostelRoom::forSchool($request->user()->school_id)->findOrFail($id);
            $room->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Hostel room deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
