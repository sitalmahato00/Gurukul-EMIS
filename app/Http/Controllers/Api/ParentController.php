<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolParent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $parents = SchoolParent::where('school_id', $request->user()->school_id)
            ->with('user', 'students')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $parents,
            'message' => 'Parents retrieved.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'occupation' => 'nullable|string|max:255',
            'relation' => 'nullable|string|max:50',
        ]);

        $validated['school_id'] = $request->user()->school_id;

        $parent = SchoolParent::create($validated);

        return response()->json([
            'success' => true,
            'data' => $parent->load('user'),
            'message' => 'Parent created.',
        ], 201);
    }

    public function show(Request $request, SchoolParent $parent): JsonResponse
    {
        $parent->load('user', 'students');

        return response()->json([
            'success' => true,
            'data' => $parent,
            'message' => 'Parent retrieved.',
        ]);
    }

    public function update(Request $request, SchoolParent $parent): JsonResponse
    {
        $validated = $request->validate([
            'occupation' => 'nullable|string|max:255',
            'relation' => 'nullable|string|max:50',
            'is_active' => 'sometimes|boolean',
        ]);

        $parent->update($validated);

        return response()->json([
            'success' => true,
            'data' => $parent->fresh()->load('user'),
            'message' => 'Parent updated.',
        ]);
    }

    public function destroy(SchoolParent $parent): JsonResponse
    {
        $parent->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Parent deleted.',
        ]);
    }

    public function myChildren(Request $request): JsonResponse
    {
        $parent = $request->user()->parentProfile;

        if (!$parent) {
            return response()->json([
                'success' => false,
                'message' => 'No parent profile found.',
            ], 404);
        }

        $children = $parent->students()->with('class', 'user')->get();

        return response()->json([
            'success' => true,
            'data' => $children,
            'message' => 'Children retrieved.',
        ]);
    }
}
