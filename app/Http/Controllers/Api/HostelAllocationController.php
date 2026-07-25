<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HostelAllocation;
use App\Models\HostelRoom;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HostelAllocationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = HostelAllocation::with(['student.user', 'room']);

            if ($request->has('student_id')) {
                $query->where('student_id', $request->student_id);
            }

            if ($request->has('room_id')) {
                $query->where('room_id', $request->room_id);
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            if ($request->has('academic_year')) {
                $query->where('academic_year', $request->academic_year);
            }

            $allocations = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $allocations,
                'message' => 'Hostel allocations retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $allocation = HostelAllocation::with(['student.user', 'room'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $allocation,
                'message' => 'Hostel allocation retrieved successfully.',
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
                'room_id' => 'required|exists:hostel_rooms,id',
                'academic_year' => 'required|string|max:20',
                'allocated_date' => 'required|date',
            ]);

            $room = HostelRoom::findOrFail($validated['room_id']);

            if ($room->occupied >= $room->capacity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Room is already at full capacity.',
                ], 422);
            }

            $allocation = HostelAllocation::create([
                'student_id' => $validated['student_id'],
                'room_id' => $validated['room_id'],
                'academic_year' => $validated['academic_year'],
                'allocated_date' => $validated['allocated_date'],
                'status' => 'active',
            ]);

            $room->increment('occupied');

            return response()->json([
                'success' => true,
                'data' => $allocation->load(['student.user', 'room']),
                'message' => 'Hostel allocation created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $allocation = HostelAllocation::findOrFail($id);

            $validated = $request->validate([
                'room_id' => 'sometimes|exists:hostel_rooms,id',
                'status' => 'sometimes|string|max:50',
            ]);

            if (isset($validated['room_id']) && $validated['room_id'] != $allocation->room_id) {
                $oldRoom = HostelRoom::find($allocation->room_id);
                $newRoom = HostelRoom::find($validated['room_id']);

                if ($newRoom->occupied >= $newRoom->capacity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'New room is already at full capacity.',
                    ], 422);
                }

                $oldRoom->decrement('occupied');
                $newRoom->increment('occupied');
            }

            $allocation->update($validated);

            return response()->json([
                'success' => true,
                'data' => $allocation->fresh()->load(['student.user', 'room']),
                'message' => 'Hostel allocation updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $allocation = HostelAllocation::findOrFail($id);
            $room = HostelRoom::find($allocation->room_id);

            if ($room) {
                $room->decrement('occupied');
            }

            $allocation->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Hostel allocation deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
