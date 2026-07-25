<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeeStructure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeeStructureController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = FeeStructure::forSchool($schoolId)->with(['class', 'installments']);

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where('name', 'like', "%{$search}%");
            }

            if ($request->has('class_id')) {
                $query->where('class_id', $request->class_id);
            }

            if ($request->has('frequency')) {
                $query->where('frequency', $request->frequency);
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $structures = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $structures,
                'message' => 'Fee structures retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $structure = FeeStructure::forSchool($request->user()->school_id)
                ->with(['class', 'installments', 'payments'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $structure,
                'message' => 'Fee structure retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'class_id' => 'required|exists:classes,id',
                'name' => 'required|string|max:255',
                'amount' => 'required|numeric|min:0',
                'frequency' => 'nullable|string|max:50',
                'due_day' => 'nullable|integer|min:1|max:31',
                'is_active' => 'boolean',
            ]);

            $validated['school_id'] = $request->user()->school_id;

            $structure = FeeStructure::create($validated);

            return response()->json([
                'success' => true,
                'data' => $structure->load('class'),
                'message' => 'Fee structure created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $structure = FeeStructure::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'class_id' => 'sometimes|exists:classes,id',
                'name' => 'sometimes|string|max:255',
                'amount' => 'sometimes|numeric|min:0',
                'frequency' => 'nullable|string|max:50',
                'due_day' => 'nullable|integer|min:1|max:31',
                'is_active' => 'boolean',
            ]);

            $structure->update($validated);

            return response()->json([
                'success' => true,
                'data' => $structure->fresh()->load('class'),
                'message' => 'Fee structure updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $structure = FeeStructure::forSchool($request->user()->school_id)->findOrFail($id);
            $structure->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Fee structure deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
