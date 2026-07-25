<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SchoolController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = School::with('subscriptionPlan')
            ->withCount('users', 'students', 'teachers', 'classes');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('state', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->filled('plan_id')) {
            $query->where('subscription_plan_id', $request->input('plan_id'));
        }

        if ($sortBy = $request->input('sort_by')) {
            $sortDir = $request->input('sort_dir', 'asc');
            $allowed = ['name', 'created_at', 'students_count', 'is_active'];
            if (in_array($sortBy, $allowed)) {
                $query->orderBy($sortBy, $sortDir === 'desc' ? 'desc' : 'asc');
            }
        } else {
            $query->latest('created_at');
        }

        $perPage = min((int) $request->input('per_page', 15), 100);
        $paginated = $query->paginate($perPage);

        $schools = $paginated->getCollection()->map(function (School $school) {
            $endsAt = $school->subscription_ends_at;
            $daysRemaining = $endsAt ? max(0, $endsAt->diffInDays(now())) : null;
            $isExpired = $endsAt && $endsAt->isPast();

            return [
                'id' => $school->id,
                'name' => $school->name,
                'slug' => $school->slug,
                'email' => $school->email,
                'phone' => $school->phone,
                'address' => $school->address,
                'city' => $school->city,
                'state' => $school->state,
                'pincode' => $school->pincode,
                'board' => $school->board,
                'medium' => $school->medium,
                'website' => $school->website,
                'established_year' => $school->established_year,
                'logo' => $school->logo,
                'is_active' => $school->is_active,
                'subscription_plan_id' => $school->subscription_plan_id,
                'subscription_starts_at' => $school->subscription_starts_at?->toISOString(),
                'subscription_ends_at' => $school->subscription_ends_at?->toISOString(),
                'custom_price' => $school->custom_price,
                'subscription_plan' => $school->subscriptionPlan ? [
                    'id' => $school->subscriptionPlan->id,
                    'name' => $school->subscriptionPlan->name,
                    'price' => $school->subscriptionPlan->price,
                    'period' => $school->subscriptionPlan->period,
                    'max_students' => $school->subscriptionPlan->max_students,
                    'storage_gb' => $school->subscriptionPlan->storage_gb,
                ] : null,
                'subscription_status' => $isExpired ? 'expired' : ($daysRemaining !== null && $daysRemaining <= 30 ? 'expiring_soon' : 'active'),
                'days_remaining' => $daysRemaining,
                'users_count' => $school->users_count,
                'students_count' => $school->students_count,
                'teachers_count' => $school->teachers_count,
                'classes_count' => $school->classes_count,
                'created_at' => $school->created_at->toISOString(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $schools,
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
            'message' => 'Schools retrieved successfully.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:schools,slug',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
            'website' => 'nullable|url|max:255',
            'established_year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'board' => 'nullable|string|max:50',
            'medium' => 'nullable|string|max:50',
            'timezone' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'subscription_plan_id' => 'nullable|exists:subscription_plans,id',
            'subscription_starts_at' => 'nullable|date',
            'subscription_ends_at' => 'nullable|date|after_or_equal:subscription_starts_at',
            'custom_price' => 'nullable|numeric|min:0',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $school = School::create($validated);

        $school->load('subscriptionPlan');

        return response()->json([
            'success' => true,
            'data' => $school,
            'message' => 'School created successfully.',
        ], 201);
    }

    public function show(School $school): JsonResponse
    {
        $school->load('subscriptionPlan')
            ->withCount('users', 'students', 'teachers', 'classes');

        $endsAt = $school->subscription_ends_at;
        $daysRemaining = $endsAt ? max(0, $endsAt->diffInDays(now())) : null;

        $data = $school->toArray();
        $data['days_remaining'] = $daysRemaining;
        $data['subscription_status'] = $endsAt && $endsAt->isPast() ? 'expired' : ($daysRemaining !== null && $daysRemaining <= 30 ? 'expiring_soon' : 'active');

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'School retrieved successfully.',
        ]);
    }

    public function update(Request $request, School $school): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:schools,slug,' . $school->id,
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
            'website' => 'nullable|url|max:255',
            'established_year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'board' => 'nullable|string|max:50',
            'medium' => 'nullable|string|max:50',
            'timezone' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'subscription_plan_id' => 'nullable|exists:subscription_plans,id',
            'subscription_starts_at' => 'nullable|date',
            'subscription_ends_at' => 'nullable|date',
            'custom_price' => 'nullable|numeric|min:0',
        ]);

        $school->update($validated);
        $school->load('subscriptionPlan');

        return response()->json([
            'success' => true,
            'data' => $school,
            'message' => 'School updated successfully.',
        ]);
    }

    public function destroy(School $school): JsonResponse
    {
        $school->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'School deleted successfully.',
        ]);
    }
}
