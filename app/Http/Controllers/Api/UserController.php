<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::with('school');

        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->latest()->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $users,
            'message' => 'Users retrieved successfully.',
        ]);
    }

    public function show(User $user): JsonResponse
    {
        $user->load('school');

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User retrieved successfully.',
        ]);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'role' => 'sometimes|string|in:super_admin,school_admin,principal,teacher,student,parent,librarian,transport_manager,hostel_warden,accountant',
            'is_active' => 'sometimes|boolean',
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'data' => $user->fresh()->load('school'),
            'message' => 'User updated successfully.',
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->update(['is_active' => false]);

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'User deactivated successfully.',
        ]);
    }
}
