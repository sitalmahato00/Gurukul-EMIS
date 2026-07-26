<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiKeyController extends Controller
{
    public function index(): JsonResponse
    {
        $query = ApiKey::with('school');

        if (request()->filled('status')) {
            $query->where('status', request('status'));
        }
        if (request()->filled('school_id')) {
            $query->where('school_id', request('school_id'));
        }

        $apiKeys = $query->latest()->paginate(15);

        $summary = [
            'total' => ApiKey::count(),
            'active' => ApiKey::where('status', 'active')->count(),
            'inactive' => ApiKey::where('status', 'inactive')->count(),
            'revoked' => ApiKey::where('status', 'revoked')->count(),
            'total_calls' => (int) ApiKey::sum('total_calls'),
        ];

        return response()->json([
            'success' => true,
            'data' => $apiKeys,
            'summary' => $summary,
            'message' => 'API keys retrieved successfully.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'school_id' => 'nullable|exists:schools,id',
            'device_type' => 'required|string|in:web,mobile,attendance_device,accounting_software,government_portal,parent_app,other',
            'rate_limit' => 'nullable|integer|min:1|max:100000',
            'description' => 'nullable|string|max:500',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $apiKey = ApiKey::create($validated);

        return response()->json([
            'success' => true,
            'data' => $apiKey->load('school'),
            'message' => 'API key created successfully.',
        ], 201);
    }

    public function show(ApiKey $apiKey): JsonResponse
    {
        $apiKey->load('school');

        return response()->json([
            'success' => true,
            'data' => $apiKey,
            'message' => 'API key retrieved successfully.',
        ]);
    }

    public function update(Request $request, ApiKey $apiKey): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'school_id' => 'nullable|exists:schools,id',
            'device_type' => 'sometimes|string|in:web,mobile,attendance_device,accounting_software,government_portal,parent_app,other',
            'rate_limit' => 'sometimes|integer|min:1|max:100000',
            'description' => 'nullable|string|max:500',
        ]);

        $apiKey->update($validated);

        return response()->json([
            'success' => true,
            'data' => $apiKey->fresh()->load('school'),
            'message' => 'API key updated successfully.',
        ]);
    }

    public function toggleStatus(ApiKey $apiKey): JsonResponse
    {
        $newStatus = $apiKey->status === 'active' ? 'inactive' : 'active';
        $apiKey->update(['status' => $newStatus]);

        return response()->json([
            'success' => true,
            'data' => $apiKey->fresh()->load('school'),
            'message' => "API key {$newStatus} successfully.",
        ]);
    }

    public function destroy(ApiKey $apiKey): JsonResponse
    {
        $apiKey->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'API key deleted successfully.',
        ]);
    }
}
