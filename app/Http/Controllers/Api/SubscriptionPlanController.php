<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
    public function index(): JsonResponse
    {
        $plans = SubscriptionPlan::withCount('schools')->latest()->get();

        $plans->each(function ($plan) {
            $plan->active_schools_count = $plan->schools()->where('is_active', true)->count();
            $plan->total_students = \App\Models\Student::whereIn('school_id', $plan->schools()->pluck('id'))->count();
        });

        return response()->json([
            'success' => true,
            'data' => $plans,
            'message' => 'Subscription plans retrieved successfully.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'period' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'max_schools' => 'required|integer|min:1',
            'max_students' => 'required|integer|min:1',
            'storage_gb' => 'required|integer|min:1',
            'features' => 'required|array',
            'is_popular' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $plan = SubscriptionPlan::create($validated);

        return response()->json([
            'success' => true,
            'data' => $plan,
            'message' => 'Subscription plan created successfully.',
        ], 201);
    }

    public function show(SubscriptionPlan $subscriptionPlan): JsonResponse
    {
        $subscriptionPlan->loadCount('schools');

        return response()->json([
            'success' => true,
            'data' => $subscriptionPlan,
            'message' => 'Subscription plan retrieved successfully.',
        ]);
    }

    public function update(Request $request, SubscriptionPlan $subscriptionPlan): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'period' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'max_schools' => 'sometimes|integer|min:1',
            'max_students' => 'sometimes|integer|min:1',
            'storage_gb' => 'sometimes|integer|min:1',
            'features' => 'sometimes|array',
            'is_popular' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $subscriptionPlan->update($validated);

        return response()->json([
            'success' => true,
            'data' => $subscriptionPlan->fresh(),
            'message' => 'Subscription plan updated successfully.',
        ]);
    }

    public function destroy(SubscriptionPlan $subscriptionPlan): JsonResponse
    {
        $subscriptionPlan->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Subscription plan deleted successfully.',
        ]);
    }
}
