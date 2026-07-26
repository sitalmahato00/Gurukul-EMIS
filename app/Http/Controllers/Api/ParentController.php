<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolParent;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        $data = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'name' => 'required_without:user_id|string|max:255',
            'email' => 'required_without:user_id|email|unique:users,email',
            'password' => 'required_without:user_id|confirmed',
            'phone' => 'nullable|string|max:20',
            'occupation' => 'nullable|string|max:255',
            'relation' => 'nullable|string|max:50',
        ]);

        if (!empty($data['user_id'])) {
            $userId = $data['user_id'];
        } else {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'parent',
                'school_id' => $request->user()->school_id,
                'phone' => $data['phone'] ?? null,
                'is_active' => true,
            ]);
            $userId = $user->id;
        }

        $parent = SchoolParent::create([
            'user_id' => $userId,
            'school_id' => $request->user()->school_id,
            'occupation' => $data['occupation'] ?? null,
            'relation' => $data['relation'] ?? null,
        ]);

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
