<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'role' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($user->role !== $request->role) {
            return response()->json([
                'success' => false,
                'message' => 'The provided role does not match your account role.',
            ], 422);
        }

        if (! $user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Your account has been deactivated.',
            ], 422);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user->load('school'),
                'token' => $token,
            ],
            'message' => 'Login successful.',
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string',
            'school_id' => 'required|exists:schools,id',
            'phone' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role,
            'school_id' => $request->school_id,
            'phone' => $request->phone,
            'is_active' => true,
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user->load('school'),
                'token' => $token,
            ],
            'message' => 'Registration successful.',
        ], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Logged out successfully.',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()->load('school'),
            'message' => 'User retrieved successfully.',
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        $user->update($request->only(['name', 'phone', 'avatar']));

        return response()->json([
            'success' => true,
            'data' => $user->fresh()->load('school'),
            'message' => 'Profile updated successfully.',
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (! Hash::check($request->current_password, $request->user()->password)) {
            return response()->json([
                'success' => false,
                'message' => 'The current password is incorrect.',
            ], 422);
        }

        $request->user()->update([
            'password' => $request->password,
        ]);

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Password changed successfully.',
        ]);
    }

    public function sessions(Request $request): JsonResponse
    {
        $tokens = $request->user()->tokens()->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $tokens->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->name,
                'last_used' => $t->last_used_at,
                'created_at' => $t->created_at,
                'is_current' => $t->id === $request->user()->currentAccessToken()->id,
            ]),
            'message' => 'Sessions retrieved successfully.',
        ]);
    }

    public function revokeSession(Request $request, $tokenId): JsonResponse
    {
        $token = $request->user()->tokens()->findOrFail($tokenId);

        if ($token->id === $request->user()->currentAccessToken()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot revoke your current session.',
            ], 422);
        }

        $token->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Session revoked successfully.',
        ]);
    }

    public function revokeAllSessions(Request $request): JsonResponse
    {
        $request->user()->tokens()->where('id', '!=', $request->user()->currentAccessToken()->id)->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'All other sessions revoked successfully.',
        ]);
    }
}
