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
        $apiKeys = ApiKey::with('school')->latest()->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $apiKeys,
            'message' => 'API keys retrieved successfully.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'school_id' => 'nullable|exists:schools,id',
            'rate_limit' => 'nullable|integer|min:1|max:100000',
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

    public function destroy(ApiKey $apiKey): JsonResponse
    {
        $apiKey->revoke();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'API key revoked successfully.',
        ]);
    }
}
