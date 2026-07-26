<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    private const PLATFORM_ROLES = [
        'super_admin', 'school_admin',
    ];

    public function index(Request $request): JsonResponse
    {
        $query = User::with('school');

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        } else {
            $query->whereIn('role', self::PLATFORM_ROLES);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $perPage = min((int) $request->get('per_page', 20), 100);
        $users = $query->latest()->paginate($perPage);

        $total = User::count();
        $roleCounts = User::selectRaw('role, count(*) as count')->groupBy('role')->pluck('count', 'role');
        $activeCount = User::where('is_active', true)->count();

        return response()->json([
            'success' => true,
            'data' => $users,
            'summary' => [
                'total' => $total,
                'active' => $activeCount,
                'inactive' => $total - $activeCount,
                'role_counts' => $roleCounts,
            ],
            'message' => 'Users retrieved successfully.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => ['required', 'confirmed', Password::min(6)],
            'role' => 'required|string|in:' . implode(',', self::PLATFORM_ROLES),
            'school_id' => 'nullable|exists:schools,id',
            'phone' => 'nullable|string|max:20',
            'is_active' => 'sometimes|boolean',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        $user = User::create($validated);

        return response()->json([
            'success' => true,
            'data' => $user->load('school'),
            'message' => 'User created successfully.',
        ], 201);
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
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'role' => 'sometimes|string|in:super_admin,school_admin,principal,teacher,student,parent,librarian,transport_manager,hostel_warden,accountant',
            'school_id' => 'nullable|exists:schools,id',
            'phone' => 'nullable|string|max:20',
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

    public function resetPassword(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'password' => ['required', 'confirmed', Password::min(6)],
        ]);

        $user->update(['password' => Hash::make($validated['password'])]);

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Password reset successfully.',
        ]);
    }

    public function toggleActive(User $user): JsonResponse
    {
        $user->update(['is_active' => !$user->is_active]);

        return response()->json([
            'success' => true,
            'data' => $user->fresh()->load('school'),
            'message' => $user->is_active ? 'User activated.' : 'User deactivated.',
        ]);
    }
}
